import { Router } from "express";
import {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
  checkLimit,
} from "../controllers/booking.controller";

const router = Router();

router.get("/bookings", getBookings);

router.get("/bookings/:id", getBooking);
router.post("/bookings", createBooking);
router.put("/bookings/:id", updateBooking);
router.delete("/bookings/:id", deleteBooking);
router.post("/bookingPost", checkLimit);
export default router;