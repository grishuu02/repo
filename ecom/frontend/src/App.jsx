import { useState, useEffect } from 'react';
import './index.css';

const API_URL = '/api';
const fmt = n => '₹' + n.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [message, setMessage] = useState('');
  const [localQtys, setLocalQtys] = useState({});

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/products`);
      const data = await res.json();
      setProducts(data);
      const qtys = {};
      data.forEach(p => qtys[p._id] = 1);
      setLocalQtys(qtys);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCart = async () => {
    try {
      const res = await fetch(`${API_URL}/cart`);
      const data = await res.json();
      setCartItems(data);
    } catch (err) {
      console.error(err);
    }
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 2200);
  };

  const updateLocalQty = (id, delta) => {
    setLocalQtys(prev => {
      let val = (prev[id] || 1) + delta;
      if (val < 1) val = 1;
      return { ...prev, [id]: val };
    });
  };

  const addToCart = async (product) => {
    const qty = localQtys[product._id] || 1;
    try {
      await fetch(`${API_URL}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...product, quantity: qty })
      });
      showMessage('Product added to cart');
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const removeItem = async (id) => {
    try {
      await fetch(`${API_URL}/cart/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: 0 })
      });
      showMessage('Product removed');
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      showMessage('Cart is empty');
      return;
    }
    try {
      await fetch(`${API_URL}/cart`, { method: 'DELETE' });
      showMessage('Order placed');
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const totalCartItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartValue = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = totalCartValue > 50000 ? 0 : (totalCartValue > 0 ? 199 : 0);

  return (
    <div className="app">
      <header className="topbar">
        <h1>Simple Shop</h1>
        <p>Cart Items: {totalCartItems}</p>
      </header>

      {message && <div className="message">{message}</div>}

      <main className="layout">
        <section className="products-section">
          <h2>Products</h2>

          <div className="product-grid">
            {products.map(p => (
              <div className="product-card" key={p._id}>
                <img src={p.image} alt={p.name} />
                <h3>{p.name}</h3>
                <p>Category: {p.category || 'General'}</p>
                <p><b>Price:</b> {fmt(p.price)}</p>

                <div className="qty-row">
                  <button onClick={() => updateLocalQty(p._id, -1)}>-</button>
                  <span>{localQtys[p._id] || 1}</span>
                  <button onClick={() => updateLocalQty(p._id, 1)}>+</button>
                </div>

                <button className="main-btn" onClick={() => addToCart(p)}>Add to Cart</button>
              </div>
            ))}
          </div>
        </section>

        <aside className="cart-section">
          <h2>Cart</h2>

          {cartItems.length === 0 ? (
            <p>No items in cart.</p>
          ) : (
            <div className="cart-list">
              {cartItems.map(item => (
                <div className="cart-item" key={item._id}>
                  <img src={item.image} alt={item.name} />
                  <div>
                    <h4>{item.name}</h4>
                    <p>{item.quantity} x {fmt(item.price)}</p>
                    <p>Total: {fmt(item.price * item.quantity)}</p>
                    <button onClick={() => removeItem(item._id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="summary">
            <p>Subtotal: {fmt(totalCartValue)}</p>
            <p>Shipping: {shipping === 0 && totalCartValue > 0 ? 'Free' : (shipping > 0 ? fmt(shipping) : '0')}</p>
            <h3>Total: {fmt(totalCartValue + shipping)}</h3>
            <button className="main-btn" onClick={handleCheckout}>Place Order</button>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default App;
