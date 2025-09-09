import React from 'react';
import { deleteProduct } from '../api/products';

export default function DeleteDialog({ product, onClose, onSuccess }) {
  if (!product) return null;
  const handleDelete = async () => {
    try {
      await deleteProduct(product.id);
      onSuccess();
    } catch (err) {
      alert('Failed to delete product.');
    }
  };

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="pointer-events-auto bg-[#FFFFFF] rounded-[8.75px] shadow-[0_10px_15px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.1)] border border-[rgba(0,0,0,0.1)] w-[444px] p-[32px] relative flex flex-col">
        <button className="absolute top-[15px] right-[15px] w-[24px] h-[24px] flex items-center justify-center text-[#18182A] text-[24px] font-bold" onClick={onClose}>
          <span className="sr-only">Close</span>
          &times;
        </button>
        <h2 className="text-[18px] font-semibold text-[#18182A] mb-[18px]">Delete Product</h2>
        <p className="text-[14px] text-[#717182] mb-[28px]">Are you sure you want to delete <span className="font-semibold text-[#717182]">"{product.name}"</span>? This action cannot be undone.</p>
        <div className="flex gap-[14px] justify-end mt-auto">
          <button
            className="inline-flex items-center border border-[rgba(0,0,0,0.1)] rounded-[8px] px-[18px] py-[8px] text-[14px] font-medium text-[#18182A] bg-[#fff] hover:bg-[#F3F3F5] transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="inline-flex items-center bg-[#D4183D] text-[#fff] font-medium rounded-[8px] px-[18px] py-[8px] text-[14px] shadow hover:bg-[#B31232] transition"
            onClick={handleDelete}
          >
            Delete Product
          </button>
        </div>
      </div>
    </div>
  );
}
