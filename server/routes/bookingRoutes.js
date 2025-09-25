import express from "express";
import { protect } from "../middleware/auth.js";
import { chackAvailabilityOfCar, changeBookingStatus, createBooking, getOwnerBookings, getUserBookings } from "../controllers/bookingController.js";



const bookingRouter = express.Router();

bookingRouter.post("/check-availability", chackAvailabilityOfCar);
bookingRouter.post("/create", protect, createBooking);
bookingRouter.get("/user", protect, getUserBookings);
bookingRouter.get("/owner", protect, getOwnerBookings);
bookingRouter.get("/change-status", protect, changeBookingStatus);


export default bookingRouter;