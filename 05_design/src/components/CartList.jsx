import React, { useState } from 'react';

export default function CartList({ cart, onRemoveFromCart }) {
  const [removeAmounts, setRemoveAmounts] = useState({});
  if (!cart || cart.length === 0) return null;
  const handleInputChange = (id, value) => {
    setRemoveAmounts({ ...removeAmounts, [id]: value });
  };
  return (
    <div className="bg-[#fff] border border-[rgba(0,0,0,0.13)] rounded-[12px] p-[16px] shadow-sm w-full max-w-[340px] min-w-[320px]">
      <h3 className="text-[18px] font-semibold text-[#18182A] mb-[12px]">Shopping Cart</h3>
      <ul>
        {cart.map(item => (
          <li key={item.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
            <span className="text-[16px] text-[#18182A] flex-1">{item.name}</span>
            <span className="text-[14px] text-[#717182] mx-2">x{item.cart_quantity}</span>
            <input
              type="number"
              min={1}
              max={item.cart_quantity}
              value={removeAmounts[item.id] || 1}
              onChange={e => handleInputChange(item.id, Math.max(1, Math.min(item.cart_quantity, Number(e.target.value))))}
              className="w-12 border rounded px-1 mx-2 text-center"
            />
            <button
              className="flex items-center justify-center rounded-[8px] bg-[#D4183D] hover:bg-[#B31232] transition text-white py-[6px] px-[6px]"
              onClick={() => onRemoveFromCart(item.id, removeAmounts[item.id] || 1)}
              disabled={item.cart_quantity < 1}
              title="Remove from cart"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0" y="0" width="24" height="24" rx="8" fill="#D4183D"/>
                <path d="M11 10V17C11 17.5523 11.4477 18 12 18H16C16.5523 18 17 17.5523 17 17V10" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13 12V16" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 12V16" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 10H18" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 10V9C12 8.44772 12.4477 8 13 8H15C15.5523 8 16 8.44772 16 9V10" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
