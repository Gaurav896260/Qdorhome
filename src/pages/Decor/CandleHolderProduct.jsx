import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx"; // Adjust the path as necessary
import Footer from "../../components/Footer/Footer.jsx"; // Adjust the path as necessary
import AOS from "aos";
import "aos/dist/aos.css";
import { useParams, useNavigate } from "react-router-dom";

import image11 from "../../assets/Lifestyle/ClassicStarbust/classicStarbust1.jpeg";
import image12 from "../../assets/Lifestyle/ClassicStarbust/classicStarbust2.jpeg";
import image13 from "../../assets/Lifestyle/ClassicStarbust/classicStarbust3.jpeg";
import image14 from "../../assets/Lifestyle/ClassicStarbust/classicStarbust4.jpeg";
import image15 from "../../assets/CandleHolders/ch111.png";

import image21 from "../../assets/Lifestyle/Starburst/starburst1.jpeg";
import image22 from "../../assets/Lifestyle/Starburst/starburst2.jpeg";
import image23 from "../../assets/Lifestyle/Starburst/starburst3.jpeg";
import image24 from "../../assets/Lifestyle/Starburst/starburst4.jpeg";
import image25 from "../../assets/CandleHolders/ch222.png";

import image31 from "../../assets/Lifestyle/SolarCandle/solar1.jpg";
import image32 from "../../assets/Lifestyle/SolarCandle/solar2.jpg";
import image33 from "../../assets/Lifestyle/SolarCandle/solar3.jpg";
import image34 from "../../assets/CandleHolders/ch333.png";

import image41 from "../../assets/Lifestyle/Grand/grand1.jpeg";
import image42 from "../../assets/Lifestyle/Grand/grand2.jpeg";
import image43 from "../../assets/CandleHolders/ch444.png";
import image44 from "../../assets/CandleHolders/ch4442.png";

import image51 from "../../assets/Lifestyle/Wooden/Candle/candle1.jpg";
import image52 from "../../assets/Lifestyle/Wooden/Candle/candle2.jpg";
import image53 from "../../assets/Lifestyle/Wooden/Candle/candle3.jpeg";
import image54 from "../../assets/Lifestyle/Wooden/Candle/candle4.jpg";
import image55 from "../../assets/CandleHolders/ch555.png";

import image61 from "../../assets/Lifestyle/Eris/eris1.jpg";
import image62 from "../../assets/Lifestyle/Eris/eris2.jpg";
import image63 from "../../assets/Lifestyle/Eris/eris3.jpg";
import image64 from "../../assets/Lifestyle/Eris/eris4.jpg";
import image65 from "../../assets/CandleHolders/ch666.png";

import image71 from "../../assets/Lifestyle/Psyche/psyche1.jpg";
import image72 from "../../assets/Lifestyle/Psyche/psyche2.jpg";
import image73 from "../../assets/Lifestyle/Psyche/psyche3.jpg";
import image74 from "../../assets/Lifestyle/Psyche/psyche4.jpeg";
import image75 from "../../assets/CandleHolders/ch777.png";

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
  "classical-starburst-lanterns": [image11, image12, image13, image14, image15],
  "starburst-lanterns": [image24, image22, image23, image21, image25],
  "solar-candle-holders": [image31, image32, image33, image34],
  "solar-candle-hurricanes": [image41, image42, image43, image44],
  "acacia-wood-candle-holders": [image51, image52, image53, image54, image55],
  "eris-marble-candle-holders": [image61, image62, image63, image64, image65],
  "psyche-candle-holders": [image71, image72, image73, image74, image75],
};

const products = [
  {
    id: "classical-starburst-lanterns",
    name: "THE CLASSICAL STARBURST LANTERNS",
    description: [
      "This exquisite lantern brings a touch of timeless elegance to any space with its luxurious gold finish & classical shape.",
      "Crafted from durable aluminum metal, it features a textured surface that gives it a raw and enduring appeal.",
      "The lantern’s classical shape radiates charm and grace, making it a standout piece in any room.",
      "At 21 inches tall and 12 inches wide, it’s perfectly sized to add a sophisticated glow to your living room, entryway, or garden. Whether you place it on a table, mantle, or hang it up, this lantern will elevate your decor with its vintage allure and warm ambiance.",
    ],
    price: 99.99, // Changed to number
  },
  {
    id: "starburst-lanterns",
    name: "STARBURST LANTERNS",
    description: [
      "A luxurious addition to elevate your home decor. With a stunning gold finish.",
      "These Lanterns are Sand Casted from solid Aluminium Metal, highlighting the natural, beautiful metal textures.",
      "heir classical shape radiates charm and grace, making them a perfect fit for any space.",
      "Standing at 25 inches for the large lantern and 20 inches for the small one.",
    ],
    price: 89.99, // Changed to number
  },
  {
    id: "solar-candle-holders",
    name: "SOLAR CANDLE HOLDERS",
    description: [
      "Crafted from high-quality aluminum and mouth-blown glass.",
      "Designed for candle lighting, these artistically charming pieces add a touch of grace to any space.",
      "Whether placed on a mantel or tabletop, they bring warmth and sophistication to your decor.",
      "Light your home with the graceful charm of our Solar Candle Holder collection and enjoy the enchanting ambiance they create.",
    ],
    price: 79.99, // Changed to number
  },
  {
    id: "solar-candle-hurricanes",
    name: "SOLAR CANDLE HURRICANES",
    description: [
      "These sleek exquisite candle hurricanes are crafted with hand-blown glass and sand-casted aluminum, ensuring a rich finish that exudes elegance and sophistication.",
      "They are perfect for placing in quiet corners to add a touch of light and warmth, or on a console or end table to create a cozy and inviting glow.",
      "Whether you’re looking to elevate your home decor or add a chic touch to your interior, these sleek S/2 𝐒𝐨𝐥𝐚𝐫 𝐂𝐚𝐧𝐝𝐥𝐞 𝐇𝐮𝐫𝐫𝐢𝐜𝐚𝐧𝐞𝐬 are the perfect addition.",
    ],
    price: 119.99, // Changed to number
  },
  {
    id: "acacia-wood-candle-holders",
    name: "ACACIA WOOD CANDLE HOLDERS",
    description: [
      "Crafted from sustainable, eco-friendly, and natural wood.",
      "These handmade pieces highlight exquisite Indian craftsmanship with a beautiful natural finish and unique wood grains.",
      "Elevate your home decor with these elegant and sustainable Candle Holders.",
      "Perfect to place on one of your consoles or on a side table.",
    ],
    price: 69.99, // Changed to number
  },
  {
    id: "eris-marble-candle-holders",
    name: "ERIS MARBLE CANDLE HOLDERS",
    description: [
      "These set of 2 candle holders hold 3” inch pillar candles and showcase beautiful, artistic craftsmanship.",
      "Sculpted from one of the rarest rich black marbles from 𝑹𝒂𝒋𝒂𝒔𝒕𝒉𝒂𝒏 and featuring metal holders from 𝑴𝒐𝒓𝒂𝒅𝒂𝒃𝒂𝒅.",
      "these elegant pieces are perfect for your console, coffee table, or TV cabinet.",
    ],
    price: 69.99, // Changed to number
  },
  {
    id: "psyche-candle-holders",
    name: "PSYCHE CANDLE HOLDERS",
    description: [
      "Crafted from recycled aluminum with an exclusive gold finish.",
      "These premium holders combine modern design with traditional Indian craftsmanship.",
      "These Set Of 2 Candle Holders are perfect for taper candles.",
      "They elevate your decor and dining experience",
      "Illuminate your home with luxury",
    ],
    price: 69.99, // Changed to number
  },
];

const CandleHolderProduct = () => {
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
export default CandleHolderProduct;