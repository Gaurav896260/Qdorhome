import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar.jsx';
import Footer from '../components/Footer/Footer.jsx';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = location.state || { cart: [] }; // Default to empty array if no cart state
  
  // Sample address for demonstration. You may want to fetch this from your state or a store.
  const address = {
    name: 'John Doe',
    contactNumber: '1234567890',
    pincode: '123456',
    locality: 'Some Locality',
    address: '123, Some Street, Some Area',
    city: 'Some City',
    state: 'Some State',
    landmark: '',
    alternatePhone: '',
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  const handleOrder = () => {
    // Implement order logic here
    console.log('Order placed');
    // Redirect or show a success message
  };

  const handleChangeAddress = () => {
    navigate('/orderAddress'); // Redirect to the address selection page
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 mt-10">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Products Summary */}
          <div className="border p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            {cart.map(item => (
              <div key={item.id} className="flex items-center border-b py-2 mb-2">
                <img src={item.image} alt={item.heading} className="w-20 h-20 object-cover mr-4" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.heading}</h3>
                  <p className="text-gray-700">${item.price.toFixed(2)} x {item.quantity}</p>
                </div>
              </div>
            ))}
            <p className="text-xl font-semibold mt-4">Total Price: ${totalPrice}</p>
          </div>

          {/* Address Details */}
          <div className="border p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
            <p className="text-lg font-semibold">{address.name}</p>
            <p>{address.contactNumber}</p>
            <p>{address.address}, {address.locality}, {address.city}, {address.state} - {address.pincode}</p>
            {address.landmark && <p>Landmark: {address.landmark}</p>}
            {address.alternatePhone && <p>Alternate Phone: {address.alternatePhone}</p>}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 mt-6 mb-10">
          <button 
            onClick={handleOrder} 
            className="btn-theme btn bg-blue-500 text-white px-4 py-2 w-full md:w-1/2">
            Order and Pay
          </button>
          <button 
            onClick={handleChangeAddress} 
            className="btn-theme btn bg-gray-500 text-white px-4 py-2 w-full md:w-1/2">
            Change Address
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
