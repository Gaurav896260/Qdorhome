import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import AOS from "aos";
import { toast, ToastContainer } from "react-toastify";
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import {
  FaTruck,
  FaMoneyBillAlt,
  FaUndo,
  FaBusinessTime,
  FaChevronDown,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { productImages, products } from "./sideProductData.js";

const SideTableProducts = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo);

  const [activeProduct, setActiveProduct] = useState(
    () => products.find((product) => product.id === productId) || products[0]
  );
  const [activeImg, setActiveImage] = useState(
    productImages[activeProduct.id] ? productImages[activeProduct.id][0] : ""
  );
  const [amount, setAmount] = useState(1);
  const [showDescription, setShowDescription] = useState(false);
  const [showDimensions, setShowDimensions] = useState(false);
  const [showCareInstructions, setShowCareInstructions] = useState(false);
  const [showShipping, setShowShipping] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  useEffect(() => {
    if (productImages[activeProduct.id]) {
      setActiveImage(productImages[activeProduct.id][0]);
    }
  }, [activeProduct]);

  const fetchUserData = async () => {
    console.log(userInfo);
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/objectIdexport?fbUserId=${userInfo.fbUserId}`, // Assuming this retrieves MongoDB user
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json(); // This should return MongoDB user data
      return data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Error fetching user data: " + error.message);
      return null;
    }
  };

  const handleAddToCart = async () => {
    console.log(userInfo);
    const token = userInfo?.token;

    if (!token) {
      toast.error("Authentication token is missing.");
      return;
    }

    // Fetch MongoDB user data
    const userData = await fetchUserData();
    if (!userData || !userData._id) {
      toast.error("Failed to fetch user information.");
      return;
    }

    const mongoUserId = userData._id; // Use MongoDB _id

    try {
      const response = await fetch("http://localhost:3000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: mongoUserId, // MongoDB user ID
          productId: activeProduct.id,
          name: activeProduct.name,
          price: Number(activeProduct.price),
          image: activeProduct.imageUrl,
          quantity: amount,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add to cart");
      }

      toast.success("Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  const handleBuyNow = async () => {
    const userId = userInfo?._id;

    if (!userId) {
      console.error("User ID is missing");
      alert("Please log in to purchase items.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({
          userId,
          productId: activeProduct.id,
          name: activeProduct.name,
          price: Number(activeProduct.price),
          image: activeProduct.imageUrl,
          quantity: amount,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Checkout successful:", data);
      alert("Proceeding to checkout!");
      navigate("/checkout");
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Failed to proceed with the purchase. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <ToastContainer /> {/* ToastContainer to display notifications */}
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

            <button
              onClick={handleAddToCart}
              className="bg-black text-white font-semibold py-2 px-6 lg:py-3 lg:px-10 rounded-xl"
            >
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
              <ul className="text-gray-600 text-sm lg:text-lg list-disc list-inside">
                {activeProduct.description.map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>
            </CollapsibleSection>

            <CollapsibleSection
              title="Dimensions"
              isOpen={showDimensions}
              toggle={() => setShowDimensions((prev) => !prev)}
            >
              <p className="text-gray-600 text-sm lg:text-lg">
                {activeProduct.dimensions}
              </p>
            </CollapsibleSection>

            <CollapsibleSection
              title="Care Instructions"
              isOpen={showCareInstructions}
              toggle={() => setShowCareInstructions((prev) => !prev)}
            >
              <p className="text-gray-600 text-sm lg:text-lg">
                {activeProduct.care}
              </p>
            </CollapsibleSection>

            <CollapsibleSection
              title="Shipping and Returns"
              isOpen={showShipping}
              toggle={() => setShowShipping((prev) => !prev)}
            >
              <p className="text-gray-600 text-sm lg:text-lg">
                {activeProduct.shipping}
              </p>
            </CollapsibleSection>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const IconFeature = ({ icon, text }) => (
  <div className="flex flex-col items-center text-gray-700 text-sm lg:text-lg">
    <span className="text-2xl lg:text-4xl">{icon}</span>
    <p>{text}</p>
  </div>
);

const CollapsibleSection = ({ title, isOpen, toggle, children }) => (
  <div className="mb-4">
    <div
      className="flex justify-between items-center bg-gray-200 py-2 px-4 rounded-lg cursor-pointer"
      onClick={toggle}
    >
      <h3 className="text-gray-800 font-bold text-lg lg:text-xl">{title}</h3>
      <FaChevronDown
        className={`transform ${isOpen ? "rotate-180" : ""} text-gray-800`}
      />
    </div>
    {isOpen && <div className="mt-2 px-4">{children}</div>}
  </div>
);

export default SideTableProducts;
