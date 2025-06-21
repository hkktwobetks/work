// src/components/ProductForm.jsx
import { useState } from 'react';
import axios from 'axios';

function ProductForm({ onCreated }) {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: ''
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8080/api/products', {
      ...product,
      price: Number(product.price),
      stock: Number(product.stock)
    });
    setProduct({ name: '', description: '', price: '', stock: '' });
    if (onCreated) onCreated();  // 商品追加後に一覧再取得など
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>商品登録</h2>
      <input
        type="text"
        name="name"
        placeholder="商品名"
        value={product.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="description"
        placeholder="説明"
        value={product.description}
        onChange={handleChange}
      />
      <input
        type="number"
        name="price"
        placeholder="価格"
        value={product.price}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="stock"
        placeholder="在庫数"
        value={product.stock}
        onChange={handleChange}
        required
      />
      <button type="submit">登録</button>
    </form>
  );
}

export default ProductForm;
