import express from "express";
import {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  getAddressesByUserId,
  saveAddress,
  savingNameAndEmailAfterSignInViaPhone,
  getUserbyemail,
  exportObjectIdviafId,
  NumberExistorNot,
  savinguseraftergmail,
} from "../controllers/userController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import User from "../models/user.js";

const router = express.Router();
// verification
// Public routes
router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/", savinguseraftergmail);

// Protected routes
router.post("/logout", authenticate, logoutCurrentUser);
router.get("/", authenticate, authorizeAdmin, getAllUsers); // Only admin can get all users
router.get("/profile", authenticate, getCurrentUserProfile);
router.post("/profile", authenticate, updateCurrentUserProfile);
router.post("/viaphone", savingNameAndEmailAfterSignInViaPhone);
router.get("/email/:email", getUserbyemail);
router.get("/objectIdexport", exportObjectIdviafId);
router.get("/addresses/:userId", authenticate, getAddressesByUserId);
router.get("/phone/:phoneNumber", NumberExistorNot);
router.post("/save-address", saveAddress);
router.put("/address/:id", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const addressIndex = user.addresses.findIndex(
      (address) => address._id.toString() === req.params.id
    );

    if (addressIndex === -1) {
      return res.status(404).json({ message: "Address not found" });
    }

    user.addresses[addressIndex] = {
      ...user.addresses[addressIndex]._doc,
      ...req.body,
    };
    await user.save();

    res.json({ message: "Address updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating address" });
  }
});

// Delete Address
router.delete("/address/:id", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.addresses = user.addresses.filter(
      (address) => address._id.toString() !== req.params.id
    );

    await user.save();
    res.json({ message: "Address removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting address" });
  }
});

router.delete("/delete-address/:id", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.addresses = user.addresses.filter(
      (address) => address._id.toString() !== req.params.id
    );

    await user.save();
    res.json({ message: "Address removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting address" });
  }
});

// Get user details and addresses
router.get("/user-details/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findOne({ _id: userId }).populate("addresses"); // Assuming addresses are in the user schema
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching user details" });
  }
});

router.get("/:userId/addresses", authenticate, async (req, res) => {
  const { userId } = req.params;

  // Check if the requesting user ID matches the authenticated user's ID
  if (userId !== req.user._id.toString()) {
    return res.status(403).json({ message: "Unauthorized access." });
  }

  try {
    const user = await User.findById(userId).select("addresses"); // Adjust the field name if necessary

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json(user.addresses); // Return the addresses
  } catch (error) {
    console.error("Error fetching addresses:", error);
    return res
      .status(500)
      .json({ message: "Server error, please try again later." });
  }
});

export default router;
