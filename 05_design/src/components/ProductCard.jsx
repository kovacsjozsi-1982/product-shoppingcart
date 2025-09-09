import React from 'react';

export default function ProductCard({ product, onView, onEdit, onDelete }) {
  return (
    <div
      className="bg-[#fff] border border-[rgba(0,0,0,0.13)] rounded-[12px] p-[16px] min-h-[274px] flex flex-col justify-between shadow-sm"
      style={{ width: 'fit-content', minWidth: '320px', maxWidth: '340px' }}
    >
      <div>
        <h4 className="text-[18px] font-semibold text-[#18182A] mb-[12px]">{product.name}</h4>
        <div className="text-[14px] text-[#717182] leading-[1.4] mb-[18px]">{product.description}</div>
        <div className="flex justify-between items-center mb-[18px]">
          <span className="text-[18px] font-semibold text-[#18182A]">${Number(product.price).toFixed(2)}</span>
          <span className="text-[14px] text-[#717182]">Stock: {product.stock}</span>
        </div>
      </div>
      <div className="flex gap-[8px] mt-auto w-full">
        <button
          className="flex-1 flex items-center border border-[rgba(0,0,0,0.13)] rounded-[8px] py-[8px] text-[18px] font-medium text-[#18182A] bg-[#fff] hover:bg-[#F3F3F5] transition"
          onClick={onView}
        >
          {/* Figma Eye Icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '22px' }}>
            <path d="M1.5 12C3.5 7.5 7.5 4.5 12 4.5C16.5 4.5 20.5 7.5 22.5 12C20.5 16.5 16.5 19.5 12 19.5C7.5 19.5 3.5 16.5 1.5 12Z" stroke="#18182A" strokeWidth="2"/>
            <circle cx="12" cy="12" r="3" stroke="#18182A" strokeWidth="2"/>
          </svg>
          View
        </button>
        <button
          className="flex-1 flex items-center border border-[#E3E6EA] rounded-[8px] py-[8px] text-[18px] font-medium text-[#18182A] bg-[#fff] hover:bg-[#F3F3F5] transition"
          onClick={onEdit}
        >
          {/* Figma Edit Icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"  fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '22px' }}>
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          Edit
        </button>
        <button
          className="flex items-center justify-center rounded-[8px] bg-[#D4183D] hover:bg-[#B31232] transition"
          onClick={onDelete}
        >
          {/* Figma Trash Icon (solid red) */}
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="24" height="24" rx="8" fill="#D4183D"/>
            <path d="M11 10V17C11 17.5523 11.4477 18 12 18H16C16.5523 18 17 17.5523 17 17V10" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13 12V16" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15 12V16" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 10H18" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 10V9C12 8.44772 12.4477 8 13 8H15C15.5523 8 16 8.44772 16 9V10" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>  
    </div>
  );
}
