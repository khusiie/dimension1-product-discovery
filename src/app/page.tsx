'use client';

import { useState, useEffect } from 'react';
import { Product, AskResponse } from '@/types';
import ProductCard from '@/components/ProductCard';

export default function Home() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setAllProducts(data);
      setDisplayedProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products.');
    }
  };

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError('');
    setSummary('');

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      const data: AskResponse = await res.json();

      setSummary(data.summary);

      if (data.productIds && data.productIds.length > 0) {
        const filtered = allProducts.filter(p => data.productIds.includes(p.id));
        setDisplayedProducts(filtered);
      } else {
        setDisplayedProducts([]);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const resetSearch = () => {
    setQuery('');
    setSummary('');
    setDisplayedProducts(allProducts);
    setError('');
  };

  return (
    <main className="container">
      <header className="header">
        <h1>Dimension Discovery</h1>
        <p>AI-Powered Product Expert</p>
      </header>

      <section className="ask-section">
        <form onSubmit={handleAsk} className="ask-form">
          <input
            type="text"
            className="ask-input"
            placeholder="Ask anything (e.g., 'What is good for gaming?' or 'Show me budget tablets')"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="ask-button" disabled={isLoading}>
            {isLoading ? 'Thinking...' : 'Ask AI'}
          </button>
        </form>

        {error && (
          <p style={{ color: '#ef4444', marginTop: '1rem', fontWeight: 500 }}>
            {error}
          </p>
        )}

        {summary && (
          <div className="ai-summary">
            <p>{summary}</p>
          </div>
        )}

        {(summary || displayedProducts.length !== allProducts.length) && !isLoading && (
          <button
            onClick={resetSearch}
            style={{
              marginTop: '1rem',
              background: 'none',
              border: 'none',
              color: '#6366f1',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            ← Back to all products
          </button>
        )}
      </section>

      {isLoading ? (
        <div className="loading-spinner">
          <div className="spinner">Searching products...</div>
        </div>
      ) : (
        <div className="product-grid">
          {displayedProducts.length > 0 ? (
            displayedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="no-results">
              <p>No products found matching your search.</p>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
