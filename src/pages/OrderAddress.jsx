import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar.jsx';
import Footer from '../components/Footer/Footer.jsx';

const OrderAddress = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'John Doe',
      contactNumber: '1234567890',
      pincode: '123456',
      locality: 'Some Locality',
      address: '123, Some Street, Some Area',
      city: 'Some City',
      state: 'Some State',
      landmark: '',
      alternatePhone: '',
    }
  ]);
  const [newAddress, setNewAddress] = useState({
    name: '',
    contactNumber: '',
    pincode: '',
    locality: '',
    address: '',
    city: '',
    state: '',
    landmark: '',
    alternatePhone: '',
  });

  const handleChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleSaveAddress = () => {
    setAddresses([...addresses, { ...newAddress, id: addresses.length + 1 }]);
    setShowForm(false);
    navigate('/checkout'); // Redirect to checkout page
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 mt-10">
        <h1 className="text-3xl font-bold mb-6">Select Delivery Address</h1>
        {addresses.map((address) => (
          <div key={address.id} className="border p-4 mb-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">{address.name}</h2>
            <p>{address.contactNumber}</p>
            <p>{address.address}, {address.locality}, {address.city}, {address.state} - {address.pincode}</p>
            <button 
              onClick={() => navigate('/checkout')} 
              className="btn-theme btn bg-blue-500 text-white px-4 py-2 mt-4">
              Deliver Here
            </button>
          </div>
        ))}
        <button 
          onClick={() => setShowForm(true)} 
          className="btn-theme btn bg-green-500 text-white px-4 py-2 mt-4 mb-10">
          Add New Address
        </button>
        {showForm && (
          <div className="border p-4 mt-6 rounded-lg shadow-lg mb-10">
            <h2 className="text-xl font-semibold mb-4">New Address</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={newAddress.name} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 border rounded" 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Contact Number</label>
                <input 
                  type="text" 
                  name="contactNumber" 
                  value={newAddress.contactNumber} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 border rounded" 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Pincode</label>
                <input 
                  type="text" 
                  name="pincode" 
                  value={newAddress.pincode} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 border rounded" 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Locality</label>
                <input 
                  type="text" 
                  name="locality" 
                  value={newAddress.locality} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 border rounded" 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Address</label>
                <input 
                  type="text" 
                  name="address" 
                  value={newAddress.address} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 border rounded" 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">City/District/Town</label>
                <input 
                  type="text" 
                  name="city" 
                  value={newAddress.city} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 border rounded" 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">State</label>
                <input 
                  type="text" 
                  name="state" 
                  value={newAddress.state} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 border rounded" 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Landmark (Optional)</label>
                <input 
                  type="text" 
                  name="landmark" 
                  value={newAddress.landmark} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 border rounded" 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Alternate Phone no. (Optional)</label>
                <input 
                  type="text" 
                  name="alternatePhone" 
                  value={newAddress.alternatePhone} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 border rounded" 
                />
              </div>
              <div className="flex items-center justify-between">
                <button 
                  type="button" 
                  onClick={handleSaveAddress} 
                  className="btn-theme btn bg-blue-500 text-white px-4 py-2">
                  Save Address and Deliver Here
                </button>
                <button 
                  type="button" 
                  onClick={handleCancel} 
                  className="btn-theme btn bg-gray-500 text-white px-4 py-2">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default OrderAddress;
