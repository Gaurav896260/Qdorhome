import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar.jsx'; // Adjust the path as necessary
import Footer from '../../components/Footer/Footer.jsx'; // Adjust the path as necessary
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useParams, useNavigate } from 'react-router-dom';

import image11 from '../../assets/Lifestyle/Virgo/virgo1.jpg'
import image12 from '../../assets/Lifestyle/Virgo/virgo2.jpg'
import image13 from '../../assets/Lifestyle/Virgo/virgo3.jpeg'
import image14 from '../../assets/Lifestyle/Virgo/virgo4.jpg'
import image15 from '../../assets/sidetables/side222.png'

import image21 from '../../assets/Lifestyle/Orbit/orbit1.jpeg'
import image22 from '../../assets/Lifestyle/Orbit/orbit2.jpeg'
import image23 from '../../assets/Lifestyle/Orbit/orbit3.jpg'
import image24 from '../../assets/Lifestyle/Orbit/orbit4.jpeg'
import image25 from '../../assets/sidetables/side555.png'

import image31 from '../../assets/Lifestyle/Pluto/pluto1.jpg'
import image32 from '../../assets/Lifestyle/Pluto/pluto2.jpeg'
import image33 from '../../assets/Lifestyle/Pluto/pluto3.jpg'
import image34 from '../../assets/Lifestyle/Pluto/pluto4.jpg'
import image35 from '../../assets/sidetables/side111.png'

import image41 from '../../assets/Lifestyle/Vega/vega1.jpg'
import image42 from '../../assets/Lifestyle/Vega/vega2.jpg'
import image43 from '../../assets/Lifestyle/Vega/vega3.jpeg'
import image44 from '../../assets/Lifestyle/Vega/vega4.jpg'
import image45 from '../../assets/sidetables/side333.png'

import image51 from '../../assets/Lifestyle/Wooden/SideTable/sidetable1.jpeg'
import image52 from '../../assets/Lifestyle/Wooden/SideTable/sidetable2.jpeg'
import image53 from '../../assets/Lifestyle/Wooden/SideTable/sidetable3.jpg'
import image54 from '../../assets/sidetables/side444.png'

import image61 from '../../assets/Lifestyle/Cosmic/cosmic1.jpg'
import image62 from '../../assets/Lifestyle/Cosmic/cosmic2.jpg'
import image63 from '../../assets/Lifestyle/Cosmic/cosmic3.jpeg'
import image64 from '../../assets/Lifestyle/Cosmic/cosmic4.jpeg'


import {
  FaTruck,
  FaTag,
  FaMoneyBillAlt,
  FaUndo,
  FaBusinessTime,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";

// Product images
const productImages = {
  'virgo-side-table': [image11, image12, image13, image14, image15],
  'orbit-side-table': [image21, image22, image23, image24, image25],
  'pluto-side-table': [image31, image32, image33, image34, image35],
  'vega-side-table': [image41, image42, image43, image44, image45],
  'acacia-wood-side-table': [image51, image52, image53, image54],
  'the-cosmic-mirror-side-table': [image61, image62, image63, image64]
};

const products = [
  {
    id: 'virgo-side-table',
    name: 'VIRGO SIDE TABLE',
    description: [
      'White Marble Accent Table with textured black metal base',
      'Luxurious design enhances home aesthetics',
      'Dimensions: 14" diameter, 22" height',
      'Elegant and functional',
      'Rust proof and outdoor friendly',
      'Ideal for gardens and open terraces'
    ],
    price: 99.99, // Changed to number
  },
  {
    id: 'orbit-side-table',
    name: 'ORBIT SIDE TABLE',
    description: [
      'Enhances both garden spaces and living rooms',
      'Ideal for outdoor settings and elegant beside the sofa',
      'Crafted from durable mild steel with cement-like textured finish',
      'Features a sustainable jute rope handle',
      'Stylish and built to last'
    ],
    price: 89.99, // Changed to number
  },
  {
    id: 'pluto-side-table',
    name: 'PLUTO SIDE TABLE',
    description: [
      'Made from durable iron with rust-free, copper-tinted coating',
      'Suitable for both indoor and outdoor settings',
      'Minimalist design for maximum functionality',
      'Perfect for flower pots, planters, and decorative items',
      'The Pluto Side Table is built to last with a timeless design',
      'Adds sophistication to any space'
    ],
    price: 79.99, // Changed to number
  },
  {
    id: 'vega-side-table',
    name: 'VEGA SIDE TABLE',
    description: [
      'Luxurious marble top with a natural solid wood base',
      'Blend of sustainable materials and Indian craftsmanship',
      'The Vega Side Table features strong structure and high-end aesthetics',
      'Ideal statement piece for the living room',
      'Elevates decor and adds elegance',
      'Combines style and durability',
      'Celebrates the artistry and sophistication of Indian design'
    ],
    price: 119.99, // Changed to number
  },
  {
    id: 'acacia-wood-side-table',
    name: 'ACACIA WOOD SIDE TABLE',
    description: [
      'Perfect for a showpiece, holding a coffee mug, or stacking books',
      'Crafted from sustainably sourced, eco-friendly wood',
      'Handmade with a stunning natural finish and beautiful wood grains',
      'Showcases Indian craftsmanship',
      'Adds elegance and sustainability to your space'
    ],
    price: 69.99, // Changed to number
  },
  {
    id: 'the-cosmic-mirror-side-table',
    name: 'THE COSMIC MIRROR SIDE TABLE',
    description: [
      'Meticulously Crafted From Brass & Antique Mirror ',
      'Ultra-Luxury & Limited Edition ',
      'High-end, Premium, Chic ',
      'Mirror Top and Heavy Brass Base ',
      '⁠Reflect your inner self with the addition of our Cosmic Side Table in your home',
      'True Indian Craftmanship at its best with the fusion of Brass and Mirror'
    ],
    price: 69.99, // Changed to number
  }
];

const SideTableProducts = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [activeProduct, setActiveProduct] = useState(
    () => products.find((product) => product.id === productId) || products[0]
  );
  const [activeImg, setActiveImage] = useState(
    productImages[activeProduct.id][0]
  );
  const [amount, setAmount] = useState(1);
  const [showDescription, setShowDescription] = useState(false);
  const [showDimensions, setShowDimensions] = useState(false);
  const [showCareInstructions, setShowCareInstructions] = useState(false);
  const [showShipping, setShowShipping] = useState(false);

  useEffect(() => {
    setActiveImage(productImages[activeProduct.id][0]);
  }, [activeProduct]);

  const handleBuyNow = () => {
    navigate("/checkout"); // Navigate to the checkout page
  };

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
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Center the main content */}
      <div className="flex flex-col items-center lg:items-start lg:flex-row gap-8 lg:gap-16 py-8 px-4 lg:px-20 mx-auto max-w-7xl">
        {/* Product Images Section */}
        <div className="flex flex-col lg:flex-row items-center lg:w-1/2 gap-4">
          {/* Main Product Image */}
          <div className="flex flex-col items-center">
            <img
              src={activeImg}
              alt={activeProduct.name}
              className="w-full max-w-6xl h-auto object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="flex flex-row lg:flex-col gap-4 lg:gap-2 mt-4 lg:mt-0 lg:ml-6">
            {productImages[activeProduct.id].map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="w-20 h-auto aspect-[3/4] lg:w-40 lg:h-auto rounded-md cursor-pointer hover:opacity-80"
                onClick={() => setActiveImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col lg:w-1/2">
          <h1 className="text-2xl lg:text-6xl font-bold text-gray-800 mb-4 text-center lg:text-left">
            {activeProduct.name}
          </h1>
          <ul className="text-gray-700 text-sm lg:text-lg list-disc list-inside mb-4">
            {activeProduct.description.map((line, index) => (
              <li key={index}>{line}</li>
            ))}
          </ul>

          <h2 className="text-xl lg:text-2xl font-semibold mb-4">
            ${activeProduct.price.toFixed(2)}
          </h2>

          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12 mb-8">
            <div className="flex items-center">
              <button
                className="bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-lg lg:text-2xl"
                onClick={() => setAmount((prev) => Math.max(1, prev - 1))}
              >
                -
              </button>
              <span className="py-2 px-4 text-lg lg:text-xl">{amount}</span>
              <button
                className="bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-lg lg:text-2xl"
                onClick={() => setAmount((prev) => prev + 1)}
              >
                +
              </button>
            </div>

            <button className="bg-black text-white font-semibold py-2 px-6 lg:py-3 lg:px-10 rounded-xl">
              Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              className="bg-gray-900 text-white font-semibold py-2 px-6 lg:py-3 lg:px-10 rounded-xl"
            >
              Buy Now
            </button>
          </div>

          {/* Shipping and Features Icons */}
          <div className="flex justify-around items-center py-4 bg-gray-100 rounded-lg">
            <IconFeature icon={<FaTruck />} text="Free Delivery" />
            <IconFeature icon={<FaMoneyBillAlt />} text="Cash on Delivery" />
            <IconFeature icon={<FaUndo />} text="7 Days Return" />
            <IconFeature icon={<FaBusinessTime />} text="1-2 Days Dispatch" />
          </div>

          {/* Collapsible Sections */}
          <div className="mt-8 w-full">
            <CollapsibleSection
              title="Description"
              isOpen={showDescription}
              toggle={() => setShowDescription((prev) => !prev)}
            >
              <ul className="text-gray-700 text-sm lg:text-base list-disc list-inside">
                {activeProduct.description.map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>
            </CollapsibleSection>

            <CollapsibleSection
              title="Dimensions & Material"
              isOpen={showDimensions}
              toggle={() => setShowDimensions((prev) => !prev)}
            >
              <p className="text-gray-700 text-sm lg:text-base">
                Dimensions: 12" x 8" x 6"
              </p>
              <p className="text-gray-700 text-sm lg:text-base">Material: Steel</p>
            </CollapsibleSection>

            <CollapsibleSection
              title="Care Instructions"
              isOpen={showCareInstructions}
              toggle={() => setShowCareInstructions((prev) => !prev)}
            >
              <p className="text-gray-700 text-sm lg:text-base">
                Clean with a dry cloth.
              </p>
            </CollapsibleSection>

            <CollapsibleSection
              title="Shipping & Returns"
              isOpen={showShipping}
              toggle={() => setShowShipping((prev) => !prev)}
            >
              <p className="text-gray-700 text-sm lg:text-base">
                Free shipping available. Returns accepted within 7 days.
              </p>
            </CollapsibleSection>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

const CollapsibleSection = ({ title, isOpen, toggle, children }) => (
  <div className="my-4">
    <div className="flex items-center cursor-pointer" onClick={toggle}>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      {isOpen ? (
        <FaChevronDown className="ml-2 text-gray-600" />
      ) : (
        <FaChevronDown className="ml-2 text-gray-600" />
      )}
    </div>
    {isOpen && <div className="mt-2">{children}</div>}
  </div>
);

const IconFeature = ({ icon, text }) => (
  <div className="flex flex-col items-center">
    {icon}
    <span className="text-sm text-gray-700">{text}</span>
  </div>
);

export default SideTableProducts;
