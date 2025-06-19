require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Booking = require("./models/Booking");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  });


app.get("/", (req, res) => {
  res.send("Event Management API is running!");
});


app.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});


app.get("/api/bookings/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (booking) res.json(booking);
    else res.status(404).json({ message: "Event not found" });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving event" });
  }
});

// Add new event
app.post("/api/bookings", async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json({ message: "Event created", event: newEvent });
  } catch (err) {
    res.status(500).json({ message: "Error creating event" });
  }
});

// Update event by ID
app.put("/api/bookings/:id", async (req, res) => {
  try {
    await Booking.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Event updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error updating event" });
  }
});

// Delete event by ID
app.delete("/api/bookings/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting event" });
  }
});


app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
