// src/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', form, {
        headers: {
          'X-API-KEY': '1234567890' // ← あなたのAPIキーに合わせて変更
        }
      });

      const token = res.data.token;
      console.log('JWT:', token); // ← デバッグ用に追加

      if (token) {
        localStorage.setItem('jwt', token); // JWT保存
        navigate('/products');
      } else {
        setError('ログインに失敗しました（トークンなし）');
      }
    } catch (err) {
      console.error(err);
      setError('ログインに失敗しました');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="メールアドレス"
        /><br />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="パスワード"
        /><br />
        <button type="submit">ログイン</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Login;
