import Razorpay from "razorpay";
import axios from "axios";
import fetch from "node-fetch";
import Cart from "../models/Cart.js";
import Order from "../models/orderDetails.js";
import User from "../models/user.js";

// Initialize Razorpay instance with your credentials
const razorpay = new Razorpay({
  key_id: "rzp_test_CYxrsd4LgcyNmb",
  key_secret: "8WKW25kWMqAcofp1GgeOOudw",
});

// Shiprocket credentials and API URL
const SHIPROCKET_API_URL = "https://apiv2.shiprocket.in/v1/external";
const SHIPROCKET_EMAIL = "202252316@iiitvadodara.ac.in";
const SHIPROCKET_PASSWORD = "Devprabha@8962";

// Function to authenticate with Shiprocket
const getShiprocketToken = async () => {
  try {
    const response = await fetch(`${SHIPROCKET_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: SHIPROCKET_EMAIL,
        password: SHIPROCKET_PASSWORD,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Shiprocket authentication successful:", data);
      return data.token;
    } else {
      console.error("Shiprocket Authentication Failed:", data);
      throw new Error(data.message || "Failed to authenticate with Shiprocket");
    }
  } catch (error) {
    console.error("Error authenticating with Shiprocket:", error);
    throw error;
  }
};

// Function to fetch valid pickup locations from Shiprocket
// Function to fetch valid pickup locations from Shiprocket
// Function to authenticate with Shiprocket using the Manage User account
const getManageUserToken = async () => {
  try {
    const response = await fetch(`${SHIPROCKET_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "gauravshukla.6265@gmail.com", // Manage User email
        password: "Devprabha@8962", // Manage User password
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Manage User authentication successful:", data);
      return data.token;
    } else {
      console.error("Manage User Authentication Failed:", data);
      throw new Error(
        data.message || "Failed to authenticate with Shiprocket Manage User"
      );
    }
  } catch (error) {
    console.error("Error authenticating with Shiprocket Manage User:", error);
    throw error;
  }
};

// Function to get pickup locations using the Manage User token
const getPickupLocations = async (token) => {
  try {
    const response = await fetch(
      `${SHIPROCKET_API_URL}/settings/company/pickup`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    console.log(
      "Shiprocket Pickup Locations Full Response:",
      JSON.stringify(data, null, 2)
    );

    if (
      response.ok &&
      data.data &&
      data.data.shipping_address &&
      data.data.shipping_address.length > 0
    ) {
      const validLocations = data.data.shipping_address.filter(
        (loc) => loc.status === 2 // Adjust the filter as per Shiprocket's documentation
      );

      if (validLocations.length > 0) {
        console.log("Valid pickup locations found:", validLocations);
        return validLocations[0].id;
      } else {
        console.error("No active and verified pickup locations found.");
        throw new Error("No active and verified pickup locations found.");
      }
    } else {
      console.error("No pickup locations found in response:", data);
      throw new Error(
        "No valid pickup locations found. Please add or verify one in the Shiprocket dashboard."
      );
    }
  } catch (error) {
    console.error("Error fetching pickup locations:", error);
    throw error;
  }
};

// Function to create an order in Shiprocket
const createShiprocketOrder = async (order, token, pickupLocationId) => {
  try {
    const requestPayload = {
      order_id: `order_${order._id.toString()}`,
      order_date: new Date().toISOString(),
      pickup_location: pickupLocationId.toString, // Ensure this is a string
      billing_customer_name: "gaurav",
      billing_last_name: "",
      billing_address: order.address.line1,
      billing_address_2: order.address.line2 || "",
      billing_city: order.address.city,
      billing_pincode: order.address.postalCode,
      billing_state: order.address.state,
      billing_country: order.address.country || "India",
      billing_email: order.userId.email,
      billing_phone: "6265118331",
      shipping_is_billing: true,
      order_items: order.products.map((product) => ({
        name: product.name,
        sku: product.productId || "default-sku",
        units: product.quantity,
        selling_price: product.price,
        discount: 0,
        tax: 0,
        hsn: 441122,
      })),
      payment_method: "Prepaid",
      shipping_charges: 0,
      giftwrap_charges: 0,
      transaction_charges: 0,
      total_discount: 0,
      sub_total: order.totalAmount,
      length: 10,
      breadth: 15,
      height: 20,
      weight: 2.5,
    };

    const response = await fetch(`${SHIPROCKET_API_URL}/orders/create/adhoc`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestPayload),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Order created in Shiprocket:", data);
      return data;
    } else {
      console.error("Failed to create order in Shiprocket:", data);
      throw new Error(data.message || "Failed to create order in Shiprocket");
    }
  } catch (error) {
    console.error("Error creating order in Shiprocket:", error);
    throw error;
  }
};
const createOrder = async (req, res) => {
  const { userId, address, items, paymentId, amount } = req.body;

  console.log("Received request body:", req.body); // Log the entire request body

  try {
    // Fetch the cart for the user
    const cart = await Cart.findOne({ userId });
    console.log("Fetched cart:", cart); // Log cart details

    if (!cart || cart.products.length === 0) {
      return res.status(404).json({ message: "Cart is empty or not found" });
    }

    const user = await User.findById(userId);
    console.log("Fetched user:", user); // Log user details

    if (!user || !user.addresses || user.addresses.length === 0) {
      return res.status(400).json({ message: "No address found for the user" });
    }

    const defaultAddress =
      address || user.addresses.find((addr) => addr.isDefault);
    console.log("Using address:", defaultAddress); // Log the address being used

    if (!defaultAddress) {
      return res.status(400).json({ message: "Default address not found" });
    }

    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    console.log("Calculated total amount:", totalAmount); // Log total amount

    const options = {
      amount: totalAmount * 100,
      currency: "INR",
      receipt: `receipt_order_${new Date().getTime()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);
    console.log("Created Razorpay order:", razorpayOrder); // Log Razorpay order details

    const products = items.map((item) => ({
      productId: item.productId,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      image: item.image,
    }));

    const newOrder = new Order({
      userId,
      products,
      totalAmount,
      address: {
        line1: defaultAddress.addressLine1,
        line2: defaultAddress.addressLine2 || "",
        city: defaultAddress.city,
        state: defaultAddress.state,
        postalCode: defaultAddress.pincode,
        country: defaultAddress.country || "India",
      },
      paymentStatus: "Pending",
      orderStatus: "Processing",
      transactionId: paymentId,
    });

    await newOrder.save();
    console.log("Saved new order:", newOrder); // Log new order details

    const shiprocketToken = await getShiprocketToken();
    console.log("Shiprocket token obtained:", shiprocketToken); // Log Shiprocket token

    const pickupLocationId = await getPickupLocations(shiprocketToken);
    console.log("Pickup location ID:", pickupLocationId); // Log pickup location ID

    const shiprocketOrder = await createShiprocketOrder(
      newOrder,
      shiprocketToken,
      pickupLocationId
    );
    console.log("Created Shiprocket order:", shiprocketOrder); // Log Shiprocket order details

    newOrder.shiprocketOrderId = shiprocketOrder.order_id;
    await newOrder.save();

    res
      .status(201)
      .json({ order: newOrder, razorpayOrderId: razorpayOrder.id });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ message: `Failed to save order: ${error.message}` });
  }
};

const getOrder = async (req, res) => {
  try {
    const { userId } = req.params; // This should be the MongoDB user _id
    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found for this user" });
    }
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params; // Extract orderId from the params

    // Find the order by its ID
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error("Error fetching order details:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};

const cancelOrder = async (req, res) => {
  const { orderId } = req.params;
  console.log(`Received request to cancel order with ID: ${orderId}`);

  try {
    // Fetch the order by ID
    const order = await Order.findById(orderId);
    console.log(`Fetched order from database: ${JSON.stringify(order)}`);

    if (!order) {
      console.log("Order not found in the database");
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if the order is already canceled
    if (order.orderStatus === "Canceled") {
      console.log("Order is already canceled");
      return res.status(400).json({ message: "Order is already canceled" });
    }

    // Check if Shiprocket Order ID is available
    if (!order.shiprocketOrderId) {
      console.log("Shiprocket Order ID is missing");
      return res
        .status(400)
        .json({ message: "Shiprocket Order ID is missing" });
    }

    // Get the Shiprocket authentication token
    const shiprocketToken = await getShiprocketToken();
    console.log(`Fetched Shiprocket token: ${shiprocketToken}`);

    // Cancel the order on Shiprocket
    const shiprocketResponse = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/orders/cancel", // Shiprocket cancel API endpoint
      {
        ids: [order.shiprocketOrderId], // Pass the order ID in an array
      },
      {
        headers: {
          Authorization: `Bearer ${shiprocketToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(
      `Shiprocket API response: ${JSON.stringify(shiprocketResponse.data)}`
    );

    // Check Shiprocket response status
    if (
      shiprocketResponse.status !== 200 ||
      shiprocketResponse.data.status_code !== 200
    ) {
      console.log("Failed to cancel the order on Shiprocket");
      return res
        .status(500)
        .json({ message: "Failed to cancel the order on Shiprocket" });
    }

    // Update the order status in your database
    order.orderStatus = "Canceled";
    await order.save();
    console.log("Order status updated in database");

    res.status(200).json({ message: "Order has been canceled successfully" });
  } catch (error) {
    console.error("Error canceling the order:", error);
    if (error.response) {
      console.error(
        `Shiprocket API error response: ${JSON.stringify(error.response.data)}`
      );
    }
    res.status(500).json({ message: "Error canceling the order" });
  }
};

const TrackOrder = async (req, res) => {
  const { orderId } = req.params;
  try {
    const shiprocketToken = await getShiprocketToken();
    const response = await axios.get(
      "https://apiv2.shiprocket.in/v1/external/courier/track",
      {
        params: {
          order_id: orderId,
        },
        headers: {
          Authorization: `Bearer ${shiprocketToken}`,
          "Content-Type": "application/json", // Replace with your Shiprocket API token
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching tracking information:", error);
    res.status(500).json({ error: "Failed to fetch tracking information" });
  }
};

const changeShippingAddress = async (req, res) => {
  const { orderId } = req.params; // MongoDB Order ID
  const { newAddress } = req.body;
  const shiprocketToken = await getShiprocketToken(); // Ensure you have the Shiprocket token in your .env file

  try {
    // Find the order by ID
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update the order's address in MongoDB
    order.address = newAddress;
    await order.save();

    // Prepare data for Shiprocket API
    const shiprocketPayload = {
      order_id: order.shiprocketOrderId, // Ensure this is the correct Shiprocket order ID
      shipping_customer_name: "gaurav shukla", // Modify to fetch actual customer name if available
      shipping_phone: "6265118331", // Add logic to fetch actual phone number if needed
      shipping_address: newAddress.line1,
      shipping_address_2: newAddress.line2 || "",
      shipping_city: newAddress.city,
      shipping_state: newAddress.state,
      shipping_country: newAddress.country,
      shipping_pincode: newAddress.postalCode,
    };

    // Make the API request to update the address in Shiprocket
    const response = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/orders/address/update",
      shiprocketPayload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${shiprocketToken}`,
        },
      }
    );

    // Check if the Shiprocket update was successful
    if (response.status === 200) {
      res.json({
        message: "Address updated successfully in Shiprocket and MongoDB.",
      });
    } else {
      res.status(500).json({
        message:
          "Address updated in MongoDB, but failed to update in Shiprocket.",
      });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to update the address.", error: error.message });
  }
};

const DownloadInvoice = async (req, res) => {
  const { orderId } = req.params;

  try {
    // Retrieve token from request headers
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Retrieve the Shiprocket token (ensure this function works correctly)
    const ShiprocketToken = await getShiprocketToken();

    // Fetch order details from your database
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const { shiprocketOrderId } = order;

    // Make request to Shiprocket API
    const response = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/orders/print/invoice",
      { ids: [shiprocketOrderId] },
      {
        headers: {
          Authorization: `Bearer ${ShiprocketToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const { is_invoice_created, invoice_url, not_created } = response.data;

    if (is_invoice_created && invoice_url) {
      return res.json({ is_invoice_created, invoice_url });
    } else {
      return res.status(400).json({
        is_invoice_created: false,
        invoice_url: null,
        not_created,
      });
    }
  } catch (error) {
    console.error("Error generating invoice:", error.message);
    res
      .status(500)
      .json({ message: "Error generating invoice", error: error.message });
  }
};

const ReturnOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    console.log(`Fetching order details for orderId: ${orderId}`);

    // Step 1: Fetch order details from your database
    const order = await Order.findById(orderId);
    if (!order) {
      console.log(`Order not found for orderId: ${orderId}`);
      return res.status(404).json({ message: "Order not found." });
    }

    const { shiprocketOrderId } = order;
    console.log(`Order found. Shiprocket Order ID: ${shiprocketOrderId}`);

    // Step 2: Get order details from Shiprocket
    const ShiprocketToken = await getShiprocketToken();
    console.log(
      `Shiprocket Token retrieved: ${ShiprocketToken ? "Yes" : "No"}`
    );

    try {
      // Log the request details
      console.log(
        `Making GET request to Shiprocket API for order ID: ${shiprocketOrderId}`
      );

      const productResponse = await axios.get(
        `https://apiv2.shiprocket.in/v1/external/orders/show/${shiprocketOrderId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ShiprocketToken}`,
          },
        }
      );

      // Log the response data
      console.log("Shiprocket order response:", productResponse.data);

      if (!productResponse.data) {
        throw new Error("No data received from Shiprocket API.");
      }

      // Extract necessary data from Shiprocket response
      const ShiprocketOrder = productResponse.data;
      const shiprocketOrder = ShiprocketOrder.data;

      // Step 1: Extract and format the order_date
      let orderDate;
      if (
        ShiprocketOrder &&
        ShiprocketOrder.data &&
        ShiprocketOrder.data.order_date
      ) {
        try {
          // Parse date from format '21 Sep 2022' to 'YYYY-MM-DD'
          const [day, monthName, year] =
            ShiprocketOrder.data.order_date.split(" ");

          // List of month names to numbers
          const monthNames = {
            Jan: "01",
            Feb: "02",
            Mar: "03",
            Apr: "04",
            May: "05",
            Jun: "06",
            Jul: "07",
            Aug: "08",
            Sep: "09",
            Oct: "10",
            Nov: "11",
            Dec: "12",
          };

          const month = monthNames[monthName];

          if (!month) {
            throw new Error("Invalid month name.");
          }

          orderDate = `${year}-${month}-${day.padStart(2, "0")}`;
        } catch (dateError) {
          console.error("Error parsing order_date:", dateError.message);
          return res
            .status(400)
            .json({ message: "Invalid order date format." });
        }
      } else {
        console.error(
          "Order date not provided or Shiprocket response is missing order_date."
        );
        return res.status(400).json({ message: "Order date not provided." });
      }

      console.log("Formatted order date:", orderDate);

      console.log("Extracted Shiprocket order details:", {
        orderDate,
        shiprocketOrderId: shiprocketOrder.id,
        channel_id: shiprocketOrder.channel_id,
        customer_name: shiprocketOrder.customer_name,
        customer_address: shiprocketOrder.customer_address,
        // Add more fields as needed
      });

      // Construct the payload for creating a return order
      const returnPayload = {
        order_id: shiprocketOrder.id,
        order_date: orderDate, // Use formatted date
        channel_id: shiprocketOrder.channel_id,
        pickup_customer_name: "gaurav",
        pickup_last_name: "", // Shiprocket response doesn't provide this
        company_name: "gaurav shukla", // Add your company name here
        pickup_address: shiprocketOrder.customer_address || "",
        pickup_address_2: shiprocketOrder.customer_address_2 || "",
        pickup_city: shiprocketOrder.customer_city || "",
        pickup_state: shiprocketOrder.customer_state || "",
        pickup_country: shiprocketOrder.customer_country || "",
        pickup_pincode: shiprocketOrder.customer_pincode || "",
        pickup_email: "shuklag868@gmail.com",
        pickup_phone: shiprocketOrder.customer_phone || "",
        pickup_isd_code: "91", // Assuming ISD code for India
        shipping_customer_name: "gaurav shukla" || "",
        shipping_last_name: "", // Shiprocket response doesn't provide this
        shipping_address: "swagat afford S103 sargasan" || "",
        shipping_address_2: shiprocketOrder.customer_address_2 || "",
        shipping_city: "gandhinagar gujrat" || "",
        shipping_state: "gujrat" || "",
        shipping_country: "india" || "",
        shipping_pincode: "382421" || "",
        shipping_email: "shuklag868@gmail.com",
        shipping_isd_code: "91", // Assuming ISD code for India
        shipping_phone: shiprocketOrder.customer_phone || "",
        order_items: shiprocketOrder.products.map((product) => ({
          sku: product.sku,
          name: product.name,
          units: product.quantity,
          selling_price: product.selling_price,
          discount: product.discount || 0,
          qc_enable: product.qc_enable || false, // Assuming QC enable flag
          hsn: product.hsn || "", // Add HSN code if available
          brand: product.brand || "",
          qc_size: product.qc_size || "",
          qc_prodcut_image:
            "https://assets.vogue.in/photos/5d7224d50ce95e0008696c55/2:3/w_2240,c_limit/Joker.", // Assuming QC size
        })),
        return_reason: req.body.reason || "No reason provided", // Add return reason from request body
        payment_method: shiprocketOrder.payment_method, // Ensure this is either "COD" or "Prepaid"
        total_discount: shiprocketOrder.discount || 0,
        sub_total: shiprocketOrder.net_total,
        length: shiprocketOrder.shipments.length || 10, // Adjust based on actual dimensions
        breadth: shiprocketOrder.shipments.breadth || 10, // Adjust based on actual dimensions
        height: shiprocketOrder.shipments.height || 10, // Adjust based on actual dimensions
        weight: shiprocketOrder.shipments.weight || 1, // Adjust based on actual weight
      };

      console.log("Return payload constructed:", returnPayload);

      // Step 4: Send the return request to Shiprocket API
      const apiUrl =
        "https://apiv2.shiprocket.in/v1/external/orders/create/return";
      console.log(`Sending return request to Shiprocket API: ${apiUrl}`);

      const response = await axios.post(apiUrl, returnPayload, {
        headers: {
          Authorization: `Bearer ${ShiprocketToken}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Shiprocket return response:", response.data);

      if (response.data && response.data.status_code === 200) {
        res.status(200).json({
          message: "Return order created successfully.",
          data: response.data,
        });
      } else {
        console.log("Failed to create return order:", response.data);
        res.status(400).json({
          message: "Failed to create return order.",
          error: response.data,
        });
      }
    } catch (apiError) {
      console.error("Error in GET request to Shiprocket:", {
        message: apiError.message,
        response: apiError.response
          ? apiError.response.data
          : "No response data",
        config: apiError.config,
        request: apiError.request,
      });
      res.status(500).json({
        message: "Failed to fetch order details from Shiprocket.",
        error: apiError.message,
      });
    }
  } catch (error) {
    console.error("Error creating return order:", {
      message: error.message,
      response: error.response ? error.response.data : "No response data",
      config: error.config,
      request: error.request,
    });
    res.status(500).json({
      message: "Internal Server Error. Failed to create return order.",
      error: error.message,
    });
  }
};

export {
  createOrder,
  getOrder,
  getOrderById,
  cancelOrder,
  TrackOrder,
  changeShippingAddress,
  ReturnOrder,
  DownloadInvoice,
};
