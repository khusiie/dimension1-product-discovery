import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import products from '@/data/products.json';
import { Product } from '@/types';

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: Request) {
    try {
        const { query } = await request.json();

        if (!query) {
            return NextResponse.json({ error: 'Query is required' }, { status: 400 });
        }

        const productContext = products.map(p => ({
            id: p.id,
            name: p.name,
            category: p.category,
            price: p.price,
            tags: p.tags,
            description: p.description
        }));

        const systemPrompt = `
      You are an AI product discovery assistant. Below is a catalog of products in JSON format:
      ${JSON.stringify(productContext, null, 2)}

      Your task is to analyze the user's natural language query and return exactly two things in a JSON format:
      1. productIds: An array of strings representing the IDs of products that match the query.
      2. summary: A short, engaging 1-2 sentence summary of why these products were selected.

      If no products match, return an empty array for productIds and a polite message saying no matches were found.
      Only return valid JSON. No other text.
    `;

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: query },
            ],
            model: 'llama-3.3-70b-versatile',
            response_format: { type: 'json_object' },
        });

        const content = chatCompletion.choices[0]?.message?.content;
        if (!content) {
            throw new Error('Failed to get response from Groq');
        }

        const responseData = JSON.parse(content);

        return NextResponse.json(responseData);
    } catch (error: any) {
        console.error('Groq API Error:', error);
        return NextResponse.json(
            { error: 'Service Unavailable', message: 'The AI assistant is currently unavailable. Please try again later.' },
            { status: 503 }
        );
    }
}
