import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar.jsx'; // Adjust the path as necessary
import Footer from '../../components/Footer/Footer.jsx'; // Adjust the path as necessary
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useParams, useNavigate } from 'react-router-dom';

import image61 from '../../assets/Lifestyle/Wooden/Fruit/fruit1.jpeg'
import image62 from '../../assets/Lifestyle/Wooden/Fruit/fruit2.jpeg'
import image63 from '../../assets/Lifestyle/Wooden/Fruit/fruit3.jpeg'
import image64 from '../../assets/wooden/wc66.png'

import image51 from '../../assets/Lifestyle/Wooden/Bowl/bowl1.jpeg'
import image52 from '../../assets/Lifestyle/Wooden/Bowl/bowl2.jpeg'
import image53 from '../../assets/Lifestyle/Wooden/Bowl/bowl3.jpeg'
import image54 from '../../assets/Lifestyle/Wooden/Bowl/bowl4.jpg'

import image41 from '../../assets/Lifestyle/Wooden/Cereal/cereal1.jpeg'
import image42 from '../../assets/Lifestyle/Wooden/Cereal/cereal2.jpeg'
import image43 from '../../assets/Lifestyle/Wooden/Cereal/cereal3.jpeg'
import image44 from '../../assets/Lifestyle/Wooden/Cereal/cereal4.jpg'

import image31 from '../../assets/Lifestyle/Wooden/Wavy/wavy1.jpeg'
import image32 from '../../assets/Lifestyle/Wooden/Wavy/wavy2.jpeg'
import image33 from '../../assets/Lifestyle/Wooden/Wavy/wavy3.jpg'
import image34 from '../../assets/wooden/wc33.png'

import image21 from '../../assets/Lifestyle/Wooden/SideTable/sidetable1.jpeg'
import image22 from '../../assets/Lifestyle/Wooden/SideTable/sidetable2.jpeg'
import image23 from '../../assets/Lifestyle/Wooden/SideTable/sidetable3.jpg'
import image24 from '../../assets/sidetables/side444.png'

import image11 from '../../assets/Lifestyle/Wooden/Candle/candle1.jpg'
import image12 from '../../assets/Lifestyle/Wooden/Candle/candle2.jpg'
import image13 from '../../assets/Lifestyle/Wooden/Candle/candle3.jpeg'
import image14 from '../../assets/Lifestyle/Wooden/Candle/candle4.jpg'
import image15 from '../../assets/CandleHolders/ch555.png'


// import image22 from '../../assets/wooden/wc22.png';
// import image33 from '../../assets/wooden/wc33.png';
// import image4 from '../../assets/wooden/wc4.png';
// import image5 from '../../assets/wooden/wc5.png';
import image66 from '../../assets/wooden/wc66.png';
import { FaChevronDown, FaTruck, FaTag, FaMoneyBillAlt, FaUndo, FaBusinessTime } from 'react-icons/fa'
// Product images
const productImages = {
  'acacia-wood-candle-holder': [image11, image12, image13, image14, image15],
  'acacia-wood-side-table': [image21, image22, image23, image24],
  'acacia-wood-bowl-i': [image31, image32, image33, image34],
  'acacia-circular-wood-bowl-and-spoon-set': [image41, image42, image43, image44],
  'acacia-wood-bowl-and-serve-set': [image51, image52, image53, image54],
  'acacia-wood-bowl-ii': [image61, image62, image63, image64],
};

const products = [
  {
    id: 'acacia-wood-candle-holder',
    name: 'ACACIA WOOD CANDLE HOLDER',
    description: [
      'Crafted from sustainable, eco-friendly, and natural wood.',
      'Handmade pieces highlight exquisite Indian craftsmanship with a beautiful natural finish and unique wood grains.',
      'Elevate your home decor with these elegant and sustainable Candle Holders.',
      'Perfect to place on one of your consoles or on a side table.',
    ],
    price: 99.99, // Changed to number
  },
  {
    id: 'acacia-wood-side-table',
    name: 'ACACIA WOOD SIDE TABLE',
    description: [
      'Made from sustainable, eco-friendly, and natural materials.',
      'Showcases exquisite Indian craftsmanship with a stunning natural finish and beautiful wood grains.',
      'Elevate your dining experience with elegance and sustainability.',
    ],    
    price: 89.99, // Changed to number
  },
  {
    id: 'acacia-wood-bowl-i',
    name: 'ACACIA WOOD BOWL-I',
    description: [
      'Experience the elegance of our beautifully handcrafted acacia wood bowl.',
      'Crafted from sustainable, eco-friendly, and natural materials.',
      'This exquisite piece showcases the finest Indian craftsmanship.',
      'Each bowl is handmade to perfection, highlighting a stunning natural finish and the unique beauty of wood grains.',
    ],    
    price: 99.99, // Changed to number
  },
  {
    id: 'acacia-circular-wood-bowl-and-spoon-set',
    name: 'ACACIA CIRCULAR WOOD BOWL & SPOON SET',
    description: [
      'Made from sustainable, eco-friendly acacia wood.',
      'This piece showcases exquisite Indian craftsmanship with its natural finish and stunning wood grains.',
      'Elevate your dining experience with this elegant and eco-conscious addition.',
    ],    
    price: 89.99, // Changed to number
  },
  {
    id: 'acacia-wood-bowl-and-serve-set',
    name: 'ACACIA WOOD BOWL & SERVE SET',
    description: [
      'Made from sustainable, eco-friendly, and natural materials.',
      'Showcases exquisite Indian craftsmanship with a stunning natural finish and beautiful wood grains.',
      'Elevate your dining experience with elegance and sustainability.',
    ],    
    price: 99.99, // Changed to number
  },
  {
    id: 'acacia-wood-bowl-ii',
    name: 'ACACIA WOOD BOWL-II',
    description: [
      'A versatile acacia wood bowl perfect for holding fruits or serving your favorite dish.',
      'Crafted from sustainably procured, eco-friendly wood.',
      'This handmade piece showcases the finest Indian craftsmanship.',
      'Enjoy its beautiful natural finish and stunning wood grains, adding a touch of elegance to any setting.',
    ],    
    price: 89.99, // Changed to number
  }
];

const WoodenProductDesc = () => {
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

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  const handleBuyNow = () => {
    navigate("/checkout"); // Navigate to the checkout page
  };

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
              className="w-full max-w-3xl h-auto object-cover rounded-lg shadow-lg"
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

export default WoodenProductDesc;
