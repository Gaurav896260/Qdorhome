import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar.jsx';
import Footer from '../components/Footer/Footer.jsx';
import { FaTrashAlt } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Import images
import sideTableImage1 from '../assets/sideTables/side2.jpg';
import sideTableImage2 from '../assets/sideTables/side5.jpg';

const Cart = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState([
    {
      id: 1,
      heading: 'VIRGO SIDE TABLE',
      image: sideTableImage1,
      price: 99.99,
      quantity: 1,
    },
    {
      id: 2,
      heading: 'ORBIT SIDE TABLE',
      image: sideTableImage2,
      price: 89.99,
      quantity: 2,
    },
  ]);

  const handleIncrease = (id) => {
    setCart(cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const handleDecrease = (id) => {
    setCart(cart.map(item => item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
  };

  const handleRemove = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleBuyNow = () => {
    navigate('/orderAddress', { state: { cart } });
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: 'ease-in-sine',
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 mt-10">
        <h1 className="text-7xl mb-10 text-center font-futura ">SHOPPING CART</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty. <Link to="/shop" className="text-blue-500">Shop more</Link></p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              {cart.map(item => (
                <div key={item.id} className="flex items-center border p-4 mb-4 rounded-lg shadow-lg">
                  <img src={item.image} alt={item.heading} className="w-20 h-20 object-cover mr-4" />
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">{item.heading}</h2>
                    <p className="text-gray-700">${item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-2">
                      <button onClick={() => handleDecrease(item.id)} className="mx-2 px-2 py-1 border border-gray-300">-</button>
                      <input type="number" value={item.quantity} readOnly className="mx-2 px-2 py-1 border border-gray-300 w-12 text-center" />
                      <button onClick={() => handleIncrease(item.id)} className="mx-2 px-2 py-1 border border-gray-300">+</button>
                    </div>
                  </div>
                  <button onClick={() => handleRemove(item.id)} className="text-black"><FaTrashAlt /></button>
                </div>
              ))}
            </div>
            <div className="border p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <p className="text-gray-700">Total Price: ${totalPrice}</p>
              <button onClick={handleBuyNow} className="btn-theme btn bg-gray-800 text-white px-4 py-2 mt-4 w-full">Buy Now</button>
              <Link to="/ourCollection" className="btn-theme btn bg-black text-white px-4 py-2 mt-4 w-full text-center block">Shop More</Link>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
