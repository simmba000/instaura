const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const RegisterModel = require("./models/registermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const Gallery = require("./models/Gallerymodel");
const fs = require("fs");
const authenticateToken = require("./authenticateToken");
const ServicesModel = require("./models/Servicesmodel");
const Bookings = require("./models/Bookingsmodel");
const Review = require("./models/Reviewmodel");
const CouponModel = require("./models/Couponmodel");
const Carousel = require("./models/Carouselmodel");
const nodemailer = require("nodemailer");
const session = require("express-session");
const OTPModel = require("./models/OTPmodel");
const bodyParser = require("body-parser");
const PromotionMailModel = require("./models/PromotionMailsModel");

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));
app.use("/carousels", express.static("carousels"));
app.use(
  session({
    secret: "jjdjjjsjjss",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 3600000,
    },
  })
);

mongoose.connect(
  "mongodb+srv://rituparnasharma11:instasalon11@atlascluster.d04svo2.mongodb.net/instaura",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to MongoDB");
});

db.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err);
});

app.post("/sendOTP", async (req, res) => {
  const { email } = req.body;

  try {
    // Check if an OTP already exists for the user's email
    let existingOTP = await OTPModel.findOne({ email });

    // Generate a new OTP
    const newOTP = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP

    // If an existing OTP is found, update it with the new OTP
    if (existingOTP) {
      existingOTP.otp = newOTP;
      await existingOTP.save();
    } else {
      // Create a new OTP entry
      await OTPModel.create({ email, otp: newOTP });
    }

    // Send OTP via email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ritupornosarmah11@gmail.com",
        pass: "bhdi qpsb itta pdxn",
      },
    });

    transporter.verify(function (error, success) {
      if (error) {
        console.error("SMTP connection error:", error);
      } else {
        console.log("SMTP connection successful", success);
      }
    });

    await transporter.sendMail({
      from: "ritupornosarmah11@gmail.com",
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${newOTP}`,
    });

    res.json({ status: "success" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ status: "error", message: "Failed to send OTP" });
  }
});

// Backend route to verify OTP
app.post("/verifyOTP", async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Retrieve OTP from the database based on the user's email
    const storedOTP = await OTPModel.findOne({ email });

    if (!storedOTP || storedOTP.otp !== otp) {
      return res.status(400).json({ status: "error", message: "Invalid OTP" });
    }

    // OTP verification successful, delete the OTP from the database
    await OTPModel.deleteOne({ email }); // Remove the OTP from the database

    res.json({ status: "success" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ status: "error", message: "Failed to verify OTP" });
  }
});

// Backend route to change password
app.post("/changePassword", async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // Check if email and newPassword are provided
    if (!email || !newPassword) {
      return res.status(400).json({
        status: "error",
        message: "Email and newPassword are required",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password in the database
    const user = await RegisterModel.findOneAndUpdate(
      { email: email },
      { password: hashedPassword }
    );

    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }
    res.json({ status: "success" });
  } catch (error) {
    console.error("Error changing password:", error);
    res
      .status(500)
      .json({ status: "error", message: "Failed to change password" });
  }
});

app.post("/sendBookingConfirmationEmail", async (req, res) => {
  const { customerEmail, bookingDetails } = req.body;
  const adminEmail = "ritusharmaassam1234@gmail.com";
  console.log("email body", req.body);

  try {
    // Send confirmation email to the customer
    await sendEmail(
      customerEmail,
      "Appointment Booking Confirmation",
      generateCustomerEmailContent(bookingDetails)
    );

    // Send notification email to the admin
    await sendEmail(
      adminEmail,
      "New Appointment Booking",
      generateAdminEmailContent(bookingDetails)
    );

    res.json({ status: "success" });
    console.log("mail sent", res);
  } catch (error) {
    console.error("Error sending booking confirmation email:", error);
    res
      .status(500)
      .json({
        status: "error",
        message: "Failed to send booking confirmation email",
      });
  }
});

// Function to send email using nodemailer
async function sendEmail(to, subject, content) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ritupornosarmah11@gmail.com",
      pass: "bhdi qpsb itta pdxn",
    },
  });

  await transporter.sendMail({
    from: "ritupornosarmah11@gmail.com",
    to,
    subject,
    html: content,
  });
}

function generateCustomerEmailContent(bookingDetails) {
  return `<p>Dear Customer,</p><p>Your appointment has been successfully booked. 
  Details: ${JSON.stringify(
    bookingDetails
  )}. Thankyou for your appointment. Hope to see you soon. 
  With Love, 
  Instaura Unisex Salon, Ghy </p>`;
}

function generateAdminEmailContent(bookingDetails) {
  return `<p>Hello Admin,</p><p>A new appointment has been booked. Details: ${JSON.stringify(
    bookingDetails
  )}</p>`;
}

app.post("/sendBookingCancellationEmail", async (req, res) => {
  const { customerEmail, bookingDetails } = req.body;
  const adminEmail = "ritusharmaassam1234@gmail.com";
  console.log("email body", req.body);

  try {
    // Send confirmation email to the customer
    await sendCancelEmail(
      customerEmail,
      "Appointment Booking Cancelled",
      generateCustomerCancelEmailContent(bookingDetails)
    );

    // Send notification email to the admin
    await sendCancelEmail(
      adminEmail,
      "Customer Cancelled Appointment",
      generateAdminCancelEmailContent(bookingDetails)
    );

    res.json({ status: "success" });
    console.log("mail sent", res);
  } catch (error) {
    console.error("Error sending booking cacellation email:", error);
    res
      .status(500)
      .json({
        status: "error",
        message: "Failed to send booking cacellation email",
      });
  }
});

// Function to send email using nodemailer
async function sendCancelEmail(to, subject, content) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ritupornosarmah11@gmail.com",
      pass: "bhdi qpsb itta pdxn",
    },
  });

  await transporter.sendMail({
    from: "ritupornosarmah11@gmail.com",
    to,
    subject,
    html: content,
  });
}

function generateCustomerCancelEmailContent(bookingDetails) {
  return `<p>Dear Customer,</p><p>Your appointment has been successfully cancelled. 
  Details: ${JSON.stringify(
    bookingDetails
  )}. Thankyou for your time. Hope to see you soon. 
  With Love, 
  Instaura Unisex Salon, Ghy </p>`;
}

function generateAdminCancelEmailContent(bookingDetails) {
  return `<p>Hello Admin,</p><p>An appointment has been cancelled. Details: ${JSON.stringify(
    bookingDetails
  )}</p>`;
}

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await RegisterModel.findOne({ email: email });
    if (user) {
      if (!user.isActive) {
        return res.json({ status: "Account Blocked. Please contact support." });
      }
      const bcryptData = bcrypt.compare(password, user.password);
      if (bcryptData) {
        // JWT token creation
        const token = jwt.sign({ id: user._id }, "jjdjjjsjjss", {
          expiresIn: "1h",
        });

        const data = {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          age: user.age,
          token: token,
          role: user.role,
        };

        res.json({ status: "Success", profile: data });
      } else {
        res.json({ status: "Incorrect Password" });
      }
    } else {
      res.json({ status: "No record found" });
    }
  } catch (error) {
    console.log(error);
    if (error.name === "TokenExpiredError") {
      res.status(401).json({ status: "Token expired. Please login again" }); // Send a specific message for token expiration
    } else {
      res.status(500).json({ status: "Internal Server Error" });
    }
  }
});

app.post("/register", (req, res) => {
  const { name, email, password, address, age, phone } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      RegisterModel.create({ name, email, address, age, phone, password: hash })
        .then((users) => res.json(users))
        .catch((err) => res.json(err));
    })
    .catch((err) => console.log(err.message));
});

app.get("/myaccount", authenticateToken, async (req, res) => {
  // Extract user email from JWT payload
  const userEmail = req.query.email;

  try {
    // Fetch user details from the database based on userEmail
    const user = await RegisterModel.findOne({ email: userEmail });

    if (user) {
      // Return the user details in the response
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        age: user.age,
        phone: user.phone,
        // Add other fields as needed
      });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to update user profile details
app.put("/myaccount", authenticateToken, async (req, res) => {
  const userEmail = req.user.email;
  const updatedUserData = req.body;

  try {
    // Find the user by email and update the details
    const updatedUser = await RegisterModel.findOneAndUpdate(
      { email: updatedUserData.email },
      updatedUserData,
      { new: true } // To return the updated document
    );

    if (updatedUser) {
      res.json({
        name: updatedUser.name,
        email: updatedUser.email,
        address: updatedUser.address,
        age: updatedUser.age,
        phone: updatedUser.phone,
      });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/getUsers", (req, res) => {
  RegisterModel.find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("image"), async (req, res) => {
  const image = {
    title: req.body.title,
    path: req.file.filename,
  };

  try {
    const result = await Gallery.create(image);
    res.json({ status: "Success", image: result });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/gallery", async (req, res) => {
  try {
    const images = await Gallery.find();
    res.json({ status: "Success", images });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/gallery/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedImage = await Gallery.findByIdAndDelete(id);

    if (!deletedImage) {
      return res.status(404).json({ error: "Image not found" });
    }

    // Delete the image file from the uploads folder
    const imagePath = `uploads/${deletedImage.path}`;
    fs.unlinkSync(imagePath);

    res.json({ status: "Success", message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
});

const storageCarousel = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "carousels/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const carousel = multer({ storage: storageCarousel });

app.post("/carousel", carousel.single("image"), async (req, res) => {
  const image = {
    title: req.body.title,
    path: req.file.filename,
  };

  try {
    const result = await Carousel.create(image);
    res.json({ status: "Success", image: result });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/carouselgallery", async (req, res) => {
  try {
    const images = await Carousel.find();
    res.json({ status: "Success", images });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/carouselgallery/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedImage = await Carousel.findByIdAndDelete(id);

    if (!deletedImage) {
      return res.status(404).json({ error: "Image not found" });
    }

    // Delete the image file from the uploads folder
    const imagePath = `carousels/${deletedImage.path}`;
    fs.unlinkSync(imagePath);

    res.json({ status: "Success", message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
});

app.post("/services", async (req, res) => {
  const { category, subCategory, service, price, estimatedTime } = req.body;
  try {
    const newService = await ServicesModel.create({
      category,
      subCategory,
      service,
      price,
      estimatedTime,
    });
    res.status(201).json(newService); // Assuming you want to return the newly created service
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/services", async (req, res) => {
  try {
    const services = await ServicesModel.find();
    res.json({ services });
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/services/:_id", async (req, res) => {
  const { _id } = req.params;
  const { category, subCategory, service, price, estimatedTime } = req.body;

  try {
    const updatedService = await ServicesModel.findByIdAndUpdate(
      _id,
      { category, subCategory, service, price, estimatedTime },
      { new: true }
    );

    if (updatedService) {
      res.json({ updatedService });
    } else {
      res.status(404).json({ error: "Service not found" });
    }
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/services/:_id", async (req, res) => {
  const { _id } = req.params;

  try {
    const deletedService = await ServicesModel.findByIdAndDelete(_id);

    if (deletedService) {
      res.json({ message: "Service deleted successfully" });
    } else {
      res.status(404).json({ error: "Service not found" });
    }
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/bookings", async (req, res) => {
  const {
    cust_id,
    gender,
    appointmentdate,
    services,
    categories,
    time,
    message,
    amount,
    paymentType,
    paymentStatus,
    serviceStatus,
  } = req.body;
  try {
    const newBooking = await Bookings.create({
      cust_id,
      gender,
      appointmentdate,
      services,
      categories,
      time,
      message,
      amount,
      paymentType,
      paymentStatus,
      serviceStatus,
    });
    res.status(201).json(newBooking); // Assuming you want to return the newly booked service
  } catch (error) {
    console.error("Error completing booking", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/bookings", async (req, res) => {
  try {
    const allBookings = await Bookings.find();
    res.json({ allBookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/mybookings", authenticateToken, (req, res) => {
  const userId = req.user.id;
  Bookings.find({ cust_id: userId }) // Ensure cust_id is the correct field
    .then((bookings) => {
      if (!bookings) {
        return res.status(404).json({ message: "No bookings found" });
      }
      res.json(bookings);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error fetching bookings", error: err });
    });
});

app.put("/mybookings/:bookingId/cancel", async (req, res) => {
  const { bookingId } = req.params;
  try {
    const updatedBooking = await Bookings.findByIdAndUpdate(
      bookingId,
      { serviceStatus: "Service Cancelled" },
      { new: true } // This option returns the modified document
    );

    if (!updatedBooking) {
      return res.status(404).send({ message: "Booking not found" });
    }

    res.send(updatedBooking);
  } catch (error) {
    console.error("Failed to cancel booking:", error);
    res.status(500).send({
      message: "Failed to cancel booking due to internal server error",
    });
  }
});

app.put("/bookings/:bookingId/update", async (req, res) => {
  const { bookingId } = req.params;
  const { paymentStatus, serviceStatus } = req.body;

  try {
    const updatedBooking = await Bookings.findByIdAndUpdate(
      bookingId,
      { paymentStatus, serviceStatus },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.json({ message: "Booking updated successfully", updatedBooking });
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/reviews", async (req, res) => {
  const { booking_id, cust_id, reviewText, reviewDate, rating } = req.body;
  try {
    const newReview = await Review.create({
      booking_id,
      cust_id,
      reviewText,
      reviewDate,
      rating,
    });
    res.status(201).json(newReview); // Assuming you want to return the newly booked service
  } catch (error) {
    console.error("Error posting review", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/reviews", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json({ reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET reviews for a specific booking
app.get("/reviews/:bookingId", async (req, res) => {
  const { bookingId } = req.params;

  try {
    // Fetch all reviews where the 'booking_id' matches 'bookingId'
    const reviews = await Review.find({ booking_id: bookingId });

    if (reviews.length === 0) {
      return res
        .status(404)
        .json({ message: "No reviews found for this booking" });
    }

    res.json({ reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Backend route to handle review update
app.put("/reviews/:bookingId", async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { reviewText, rating } = req.body;

    // Update the review in the database based on the booking ID
    const updatedReview = await Review.findOneAndUpdate(
      { booking_id: bookingId },
      { reviewText, rating },
      { new: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    res
      .status(200)
      .json({ message: "Review updated successfully", review: updatedReview });
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/reviewscarousel", async (req, res) => {
  try {
    const reviewscarousel = await Review.find()
      .populate({
        path: "cust_id",
        model: "users", // Assuming your user model name is "RegisterModel"
        select: "name address",
      })
      .populate({
        path: "booking_id",
        model: "Bookings", // Assuming your booking model name is "Bookings"
        // populate: {
        //   path: "services",
        //   model: "ServicesModel", // Assuming your service model name is "ServicesModel"
        //   select: "services price", // Adjust the fields as needed
        // },
        select: "services", // Select only services for the booking
      })
      .select("cust_id booking_id reviewText reviewDate rating");

    res.json({ reviewscarousel });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE route to delete a review by ID
app.delete("/reviews/:reviewId", async (req, res) => {
  const { reviewId } = req.params;

  try {
    // Find the review by ID and delete it
    const deletedReview = await Review.findByIdAndDelete(reviewId);

    if (!deletedReview) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/reviewsadmin", async (req, res) => {
  try {
    const reviewsadmin = await Review.find()
      .populate({
        path: "cust_id",
        model: "users",
        select: "name", // Select only the name field from RegisterModel
      })
      .populate({
        path: "booking_id",
        model: "Bookings",
        select: "services",
      })
      .select("cust_id booking_id reviewText reviewDate rating");

    res.json({ reviewsadmin });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/coupons", async (req, res) => {
  const { couponCode, couponDiscount, activeDate, expiryDate } = req.body;
  try {
    const newCoupon = await CouponModel.create({
      couponCode,
      couponDiscount,
      activeDate,
      expiryDate,
    });
    res.status(201).json(newCoupon);
  } catch (error) {
    console.error("Error adding coupon:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/couponsadmin", async (req, res) => {
  try {
    const allCoupons = await CouponModel.find();
    res.json(allCoupons);
  } catch (error) {
    console.error("Error fetching coupons:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/coupons", async (req, res) => {
  try {
    const { couponCode } = req.query;
    const coupon = await CouponModel.findOne({ couponCode });
    if (coupon) {
      res.json({ valid: true, coupon });
    } else {
      res.json({ valid: false });
    }
  } catch (error) {
    console.error("Error fetching coupons:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE route to delete a coupon by ID
app.delete("/coupons/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // Find the coupon by ID and delete it
    const deletedCoupon = await CouponModel.findByIdAndDelete(id);
    if (deletedCoupon) {
      res.status(200).json({ message: "Coupon deleted successfully" });
    } else {
      // If the coupon with the provided ID does not exist
      res.status(404).json({ error: "Coupon not found" });
    }
  } catch (error) {
    console.error("Error deleting coupon:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/deleteUser/:id", async (req, res) => {
  try {
    const deletedUser = await RegisterModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put("/blockUser/:id", async (req, res) => {
  try {
    const user = await RegisterModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.isActive = !user.isActive; // Toggle active status
    await user.save();
    res.json({ message: user.isActive ? "User unblocked" : "User blocked" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/promotionsubscribe", async (req, res) => {
  const { email, status } = req.body;
  try {
    const newPromotionMail = await PromotionMailModel.create({
      email,
      status,
    });
    res.status(201).json(newPromotionMail);
  } catch (error) {
    console.error("Error posting mail", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/sendPromotionalEmails", async (req, res) => {
  const { subject, htmlContent } = req.body;

  try {
    const subscribedEmails = await PromotionMailModel.find({
      status: "Subscribed",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ritupornosarmah11@gmail.com",
        pass: "bhdi qpsb itta pdxn",
      },
    });

    for (const emailObj of subscribedEmails) {
      const mailOptions = {
        from: "ritupornosarma11@gmail.com",
        to: emailObj.email,
        subject: subject,
        html: htmlContent,
      };

      await transporter.sendMail(mailOptions);
    }

    res.status(200).json({ message: "Promotional emails sent successfully" });
  } catch (error) {
    console.error("Error sending promotional emails:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/subscribedUsersCount", async (req, res) => {
  try {
    const count = await PromotionMailModel.countDocuments({
      status: "Subscribed",
    });
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error fetching subscribed users count:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/unsubscribePromotion", async (req, res) => {
  const { email } = req.body;

  try {
    const existingUser = await PromotionMailModel.findOne({ email });

    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "This email is already not subscribed" });
    }

    await PromotionMailModel.findOneAndDelete({ email });

    res.status(200).json({ message: "Email ID successfully unsubscribed !!" });
  } catch (error) {
    console.error("Error unsubscribing from promotional emails:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(8000, () => {
  console.log("Server is running");
});
