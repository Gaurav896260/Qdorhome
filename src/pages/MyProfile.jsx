import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar.jsx'; // Adjust the path as necessary
import Footer from '../components/Footer/Footer.jsx'; // Adjust the path as necessary

const MyProfile = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    mobile: '123-456-7890',
  });

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      address: '123 Main St, Springfield, IL',
    },
    {
      id: 2,
      address: '456 Elm St, Springfield, IL',
    },
  ]);

  const [newAddress, setNewAddress] = useState('');

  const handleAddAddress = () => {
    setAddresses([
      ...addresses,
      { id: addresses.length + 1, address: newAddress },
    ]);
    setNewAddress('');
  };

  const handleEditAddress = (id, updatedAddress) => {
    setAddresses(
      addresses.map((address) =>
        address.id === id ? { ...address, address: updatedAddress } : address
      )
    );
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">My Profile</h1>
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Personal Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Mobile</label>
              <input
                type="text"
                name="mobile"
                value={user.mobile}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Saved Addresses</h2>
          <div className="mb-4">
            {addresses.map((address) => (
              <div key={address.id} className="flex justify-between items-center mb-2">
                <span>{address.address}</span>
                <button
                  onClick={() => handleEditAddress(address.id, prompt('Edit Address', address.address))}
                  className="bg-black text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center mb-4">
            <input
              type="text"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              placeholder="New Address"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <button
              onClick={handleAddAddress}
              className="ml-2 bg-black text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Other Details</h2>
          {/* Add other details here */}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MyProfile;
