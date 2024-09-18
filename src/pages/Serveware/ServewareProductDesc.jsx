import s11 from "../../assets/Serveware/s11.jpg";
import s12 from "../../assets/Serveware/s12.jpg";
import s13 from "../../assets/Serveware/s13.jpg";
import s14 from "../../assets/Serveware/s14.jpg";
import s21 from "../../assets/Serveware/s21.jpg";
import s22 from "../../assets/Serveware/s22.jpg";
import s23 from "../../assets/Serveware/s23.jpg";
import s24 from "../../assets/Serveware/s24.jpg";
import s25 from "../../assets/Serveware/s25.jpg";
import s26 from "../../assets/Serveware/s26.jpg";
import s31 from "../../assets/Serveware/s31.jpg";
import s32 from "../../assets/Serveware/s32.jpg";
import s33 from "../../assets/Serveware/s33.jpg";
import s34 from "../../assets/Serveware/s34.jpg";
import { FaChevronDown, FaTruck, FaTag, FaMoneyBillAlt, FaUndo, FaBusinessTime } from 'react-icons/fa'
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useParams, useNavigate } from 'react-router-dom';

const productImages = {
    'acacia-wood-bowl-serveware': [s11, s12, s13, s14],
    'chopping-board-serveware': [s21, s22, s23, s24, s25, s26],
    'cake-dome-serveware': [s31, s32, s33, s34]
  };
  
  const products = [
    {
      id: 'acacia-wood-bowl-serveware',
      name: 'ACACIA WOOD BOWL',
      description: [
        'Elevate your home dining experience with Qdore Home’s versatile 𝐀𝐜𝐚𝐜𝐢𝐚 𝐖𝐨𝐨𝐝 𝐁𝐨𝐰𝐥. ',
        'Perfect for serving everything from soups and salads to snacks and even doubling as a chic plant pot, this multipurpose bowl brings natural elegance to your table. ',
        'Crafted for style and function, it’s an excellent gift for any occasion. ',
        'Complete with a matching spoon, it’s a must-have for your rustic kitchen decor.'
      ],
      price: 99.99,
    },
    {
      id: 'chopping-board-serveware',
      name: 'CHOPPING BOARD',
      description: [
        'Upgrade your kitchen with our new Acacia Wood 𝐂𝐡𝐨𝐩𝐩𝐢𝐧𝐠 𝐁𝐨𝐚𝐫𝐝𝐬!',
        'Now available in two sleek shapes with rounded edges and a convenient handle for easy use.',
        'Crafted from sustainably sourced, food-safe wood, these boards are not only eco-friendly but also durable and stylish. ',
        'Say NO to Plastic—our heavy, thick Acacia boards bring a premium feel and natural beauty that will compliment your kitchen. ',
        'Easy and safe to clean, just rinse with mild detergent.'
      ],
      price: 89.99,
    },
    {
        id: 'cake-dome-serveware',
        name: 'CAKE DOME',
        description: [
          'Showcase your desserts in style with our 𝐂𝐚𝐤𝐞 𝐃𝐨𝐦𝐞, featuring a beautifully crafted Acacia wood stand with a clear glass cloche',
          'Ideal for cakes, cupcakes, and more, this elegant piece is both eco-friendly and food-safe, made from sustainably sourced wood. ',
          'A must-have for any kitchen, it’s expertly crafted by skilled artisans to bring a touch of sophistication to your home.'
        ],
        price: 89.99,
      }
  ];
  
  const ServewaresDesc = () => {
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
  
  export default ServewaresDesc;
  