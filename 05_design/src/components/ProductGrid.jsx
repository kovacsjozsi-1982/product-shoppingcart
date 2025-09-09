import React from 'react';
import ProductCard from './ProductCard';

export default function ProductGrid({ products, onView, onEdit, onDelete, onAddToCart }) {
  return (
    <div
      className="flex flex-wrap gap-[32px] w-full justify-start"
      style={{ minHeight: '1px' }}
    >
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onView={() => onView(product.id)}
          onEdit={() => onEdit(product.id)}
          onDelete={() => onDelete(product.id)}
          onAddToCart={() => onAddToCart(product.id)}
        />
      ))}
    </div>
  );
}
