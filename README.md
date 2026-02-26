# Dimension Discovery - AI Product Expert

A full-stack product discovery application built with Next.js and Groq AI.

## Features
- **Product Listing:** Browse a catalog of high-quality mock products.
- **AI-Powered "Ask":** Use natural language to find products (e.g., "Show me budget laptops" or "What's good for gaming?").
- **Structured AI Insights:** The backend uses Groq (Llama 3.3 70B) to interpret queries and return product IDs with a descriptive summary.
- **Premium UI:** Modern, responsive design with a clean aesthetic.

## Tech Stack
- **Frontend:** Next.js (App Router), TypeScript, Vanilla CSS.
- **Backend:** Next.js API Routes.
- **AI Integration:** Groq SDK (Llama 3.3 70B model).

## Setup Instructions

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and add your Groq API key:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   ```

3. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## How it Works
- **GET /api/products:** Fetches the mock product catalog from a JSON file.
- **POST /api/ask:** 
  1. Accepts a user query.
  2. Sends the query along with the full product catalog as context to Groq.
  3. Groq returns a structured JSON response containing matching `productIds` and a `summary`.
  4. The frontend filters the product list based on the returned IDs and displays the AI summary.

## Time Spent
- ~1 hour: Project setup and Next.js configuration.
- ~1 hour: Backend API development and Groq integration.
- ~1 hour: Frontend UI and integration.
Total: ~3 hours.
