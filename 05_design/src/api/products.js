import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/products';
const CART_URL = 'http://127.0.0.1:8000/cart';
export const addToCart = async (productId) => {
  const res = await axios.post(`${CART_URL}/add/${productId}`);
  return res.data;
};

export const removeFromCart = async (productId) => {
  const res = await axios.post(`${CART_URL}/remove/${productId}`);
  return res.data;
};

export const getCart = async () => {
  const res = await axios.get(`${CART_URL}/`);
  return res.data;
};

export const getProducts = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getProductById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const createProduct = async (product) => {
  const res = await axios.post(API_URL, product);
  return res.data;
};

export const updateProduct = async (id, product) => {
  const res = await axios.put(`${API_URL}/${id}`, product);
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
