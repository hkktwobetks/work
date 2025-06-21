// src/Products.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:8080/api/products');
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = '商品名は必須です';
    if (form.price === '' || Number(form.price) < 0) errs.price = '価格は0以上で';
    if (form.stock === '' || Number(form.stock) < 0) errs.stock = '在庫は0以上で';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;
    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock)
    };
    if (editingId) {
      await axios.put(`http://localhost:8080/api/products/${editingId}`, payload);
    } else {
      await axios.post('http://localhost:8080/api/products', payload);
    }
    setForm({ name: '', description: '', price: '', stock: '' });
    setEditingId(null);
    fetchProducts();
  };

  const handleDelete = async id => {
    await axios.delete(`http://localhost:8080/api/products/${id}`);
    fetchProducts();
  };

  const handleEdit = p => {
    setForm({
      name: p.name,
      description: p.description,
      price: p.price,
      stock: p.stock
    });
    setEditingId(p.id);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>商品管理</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="商品名" />
        {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}<br />
        <input name="description" value={form.description} onChange={handleChange} placeholder="説明" /><br />
        <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="価格" />
        {errors.price && <span style={{ color: 'red' }}>{errors.price}</span>}<br />
        <input name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="在庫数" />
        {errors.stock && <span style={{ color: 'red' }}>{errors.stock}</span>}<br />
        <button type="submit">{editingId ? '更新' : '登録'}</button>
      </form>

      <h2>商品一覧</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th><th>名前</th><th>説明</th><th>価格</th><th>在庫</th><th>操作</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.description}</td>
              <td>{p.price}</td>
              <td>{p.stock}</td>
              <td>
                <button onClick={() => handleEdit(p)}>編集</button>
                <button onClick={() => handleDelete(p.id)}>削除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
