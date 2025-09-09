import React, { useState, useEffect } from 'react';

export default function ProductFormDialog({ open, onClose, onSubmit, initial }) {
  const [name, setName] = useState(initial?.name || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [price, setPrice] = useState(initial?.price || 0);
  const [stock, setStock] = useState(initial?.stock || 0);

  useEffect(() => {
    setName(initial?.name || '');
    setDescription(initial?.description || '');
    setPrice(initial?.price || 0);
    setStock(initial?.stock || 0);
  }, [initial, open]);

  if (!open) return null;

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ name, description, price, stock });
  };

  const isEdit = !!initial?.id;
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="pointer-events-auto bg-[#FFFFFF] rounded-[8.75px] shadow-[0_10px_15px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.1)] w-[365px] p-[24px] relative flex flex-col">
        <button className="absolute top-[20px] right-[20px] w-[24px] h-[24px] flex items-center justify-center text-[#18182A] hover:text-[#000] text-[28px] font-bold" type="button" onClick={onClose}>
          <span className="sr-only">Close</span>
          &times;
        </button>
        <h2 className="text-[18px] font-semibold text-[#18182A] mb-[20px]">{isEdit ? 'Edit Product' : 'Add New Product'}</h2>
        <label className="text-[14px] font-medium text-[#18182A] mb-[6px]">Product Name</label>
        <input
          className="mb-[16px] rounded-[8px] bg-[#F3F3F5] px-[16px] py-[10px] text-[14px] text-[#18182A] placeholder:text-[#999] border-none focus:outline-none"
            placeholder="Enter product name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <label className="text-[14px] font-medium text-[#18182A] mb-[6px]">Description</label>
          <textarea
            className="mb-[16px] rounded-[8px] bg-[#F3F3F5] px-[16px] py-[10px] text-[14px] text-[#18182A] placeholder:text-[#999] border-none focus:outline-none resize-none"
            placeholder="Enter product description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={2}
          />
          <div className="flex gap-[12px] mb-[20px] w-full">
            <div className="flex flex-col w-full max-w-[calc(50%-6px)]">
              <label className="text-[14px] font-medium text-[#18182A] mb-[6px]">Price ($)</label>
              <input
                type="number"
                className="rounded-[8px] bg-[#F3F3F5] px-[16px] py-[10px] text-[14px] text-[#18182A] placeholder:text-[#999] border-none focus:outline-none "
                placeholder="0.00"
                value={price}
                onChange={e => setPrice(e.target.value)}
                min="0"
                step="0.01"
                required
              />
            </div>
            <div className="flex flex-col w-full max-w-[calc(50%-6px)]">
              <label className="text-[14px] font-medium text-[#18182A] mb-[6px]">Stock</label>
              <input
                type="number"
                className="rounded-[8px] bg-[#F3F3F5] px-[16px] py-[10px] text-[14px] text-[#18182A] placeholder:text-[#999] border-none focus:outline-none "
                placeholder="0"
                value={stock}
                onChange={e => setStock(e.target.value)}
                min="0"
                required
              />
            </div>
          </div>
          <div className="flex gap-[12px] justify-end mt-auto">
            <button
              className="inline-flex items-center border border-[rgba(0,0,0,0.1)] rounded-[8px] px-[18px] py-[8px] text-[14px] font-medium text-[#18182A] bg-[#fff] hover:bg-[#F3F3F5] transition"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="inline-flex items-center bg-[#18182A] text-[#fff] font-medium rounded-[8px] px-[18px] py-[8px] text-[14px] shadow hover:bg-[#000] transition"
              type="submit"
            >
              {isEdit ? 'Update Product' : 'Add Product'}
            </button>
          </div>
      </form>
    </div>
  );
}
