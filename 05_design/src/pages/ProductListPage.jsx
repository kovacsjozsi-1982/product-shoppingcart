import React from 'react';
import ProductList from '../components/ProductList';

export default function ProductListPage({ onSelect, onAdd, onEdit }) {
  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col items-center justify-start py-12 px-4">
      <ProductList onSelect={onSelect} onAdd={onAdd} onEdit={onEdit} />
    </div>
  );
}
