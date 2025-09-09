import React from 'react';

export default function ProductDialog({ product, onClose }) {
  if (!product) return null;
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-[#fff] rounded-[12px] shadow-[0_10px_15px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.1)] border border-[rgba(0,0,0,0.13)] w-[485px] p-[28px] relative flex flex-col">
        <button className="absolute top-[20px] right-[20px] w-[24px] h-[24px] flex items-center justify-center text-[#18182A] hover:text-[#000] text-[28px] font-bold" onClick={onClose}>
          <span className="sr-only">Close</span>
          &times;
        </button>
        <h2 className="text-[18px] font-semibold text-[#18182A] mb-[10px]">Product Details</h2>
        <h3 className="text-[18px] font-semibold text-[#18182A] mb-[10px]">{product.name}</h3>
        <div className="text-[15px] text-[#717182] mb-[18px]">{product.description}</div>
        <hr className="w-full border-t border-[#E3E6EA] mb-[18px]" />
        <div className="flex justify-between mb-[10px]">
          <div>
            <div className="text-[13px] font-medium text-[#18182A] mb-[2px]">Price:</div>
            <div className="text-[15px] text-[#18182A]">$ {Number(product.price).toFixed(2)}</div>
          </div>
          <div>
            <div className="text-[13px] font-medium text-[#18182A] mb-[2px]">Stock:</div>
            <div className="text-[15px] text-[#18182A]">{product.stock} units</div>
          </div>
        </div>
        <div className="text-[13px] font-medium text-[#18182A] mt-[10px]">Product ID:</div>
        <div className="text-[15px] text-[#18182A]">{product.id}</div>
      </div>
    </div>
  );
}
