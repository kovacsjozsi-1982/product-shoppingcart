import React, { useState, useEffect } from 'react';
import ProductGrid from './components/ProductGrid';
import ProductDialog from './components/ProductDialog';
import ProductFormDialog from './components/ProductFormDialog';
import DeleteDialog from './components/DeleteDialog';
import SearchBar from './components/SearchBar';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from './api/products';

export default function App() {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [search, setSearch] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getProducts().then(setProducts);
  }, [refresh]);

  useEffect(() => {
    // Update modal state whenever any modal opens/closes
    const isAnyModalOpen = selected || showForm || showDelete;
    setIsModalOpen(isAnyModalOpen);
    
    // Apply/remove body scroll lock
    document.body.style.overflow = isAnyModalOpen ? 'hidden' : 'auto';
  }, [selected, showForm, showDelete]);

  const closeAllModals = () => {
    setSelected(null);
    setShowForm(false);
    setShowDelete(false);
    setEditProduct(null);
  };

  const handleView = async (id) => {
    closeAllModals();
    const product = await getProductById(id);
    setSelected(product);
  };

  const handleEdit = async (id) => {
    closeAllModals();
    // Wait for refresh to complete before fetching product
    await setRefresh(r => !r);
    const product = await getProductById(id);
    setEditProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    closeAllModals();
    setEditProduct(products.find(p => p.id === id));
    setShowDelete(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditProduct(null);
    setRefresh(r => !r);
  };

  const handleDeleteSuccess = () => {
    setShowDelete(false);
    setEditProduct(null);
    setRefresh(r => !r);
  };

  const handleAdd = () => {
    closeAllModals();
    setEditProduct(null);
    setShowForm(true);
  };
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8F9FB] relative">
      <div className={`flex flex-col items-center py-8 px-4 landscape:flex-row landscape:justify-center landscape:items-start ${isModalOpen ? 'pointer-events-none' : ''}`}>
        <div className="w-full max-w-7xl mx-auto landscape:w-[90vw] landscape:max-w-none">
          <h1 className="text-[15px] font-medium text-[#18182A] mb-[18px] tracking-tight">Product Management</h1>
          <div className="flex items-center justify-between mb-[32px]">
            <div className="w-[340px]">
              <SearchBar value={search} onChange={setSearch} />
            </div>
            <button
              className="inline-flex items-center gap-[24px] bg-[#18182A] text-[#fff] font-medium rounded-[10px] px-[38px] py-[12px] text-[16px] shadow hover:bg-[#18182A] transition"
              onClick={handleAdd}
            >
              <span className="text-[22px] font-bold">+</span>
              Add Product
            </button>
          </div>
          <ProductGrid
            products={filteredProducts}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {/* Modals */}
      {selected && (
        <ProductDialog product={selected} onClose={() => setSelected(null)} />
      )}
      <ProductFormDialog
        open={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={async (data) => {
          if (editProduct && editProduct.id) {
            await updateProduct(editProduct.id, data);
          } else {
            await createProduct(data);
          }
          setShowForm(false);
          setEditProduct(null);
          setRefresh(r => !r);
        }}
        initial={editProduct}
      />
      {showDelete && (
        <DeleteDialog
          product={editProduct}
          onClose={() => setShowDelete(false)}
          onSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  );
}
