import { Product } from '@/types';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="product-card">
            <span className="category">{product.category}</span>
            <h3 className="product-name">{product.name}</h3>
            <p className="product-desc">{product.description}</p>
            <div className="price">${product.price.toFixed(2)}</div>
            <div className="tags">
                {product.tags.map(tag => (
                    <span key={tag} className="tag">#{tag}</span>
                ))}
            </div>
        </div>
    );
}
