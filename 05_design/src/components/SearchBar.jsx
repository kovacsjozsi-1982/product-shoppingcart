import React from 'react';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-[392px]">
      <input
        type="text"
        className="w-full rounded-[6.75px] bg-[#F3F3F5] pl-[35px] pr-[16px] py-[8px] text-[15.7px] text-[#0A0A0A] placeholder:text-[#0A0A0A] focus:outline-none border-none"
        placeholder="Search products..."
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{ fontFamily: 'Inter', fontWeight: 400, lineHeight: '1.37em' }}
      />
      <span
        className="absolute left-[8px] top-[6px]"
        style={{ borderRadius: 0, mixBlendMode: 'normal' }}
      >
        {/* Figma search icon from node-id=6-9 */}
        <svg width="17" height="17" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="13.5" cy="13.5" r="9.5" stroke="#18182A" strokeWidth="2" />
          <path d="M21.5 21.5L27 27" stroke="#18182A" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </span>
    </div>
  );
}
