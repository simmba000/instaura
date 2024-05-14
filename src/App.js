import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { GlobalStyle } from "./GlobalStyle";
import { ThemeProvider } from "styled-components";
import Services from "./pages/Services";
import Bridal from "./pages/Bridal";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Custappointment from "./pages/Custappointment";
import Home from "./pages/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "bootstrap/dist/css/bootstrap.min.css";
import Admindashboard from "./admin/admindashboard";
import { AuthProvider } from "./contexts/AuthContext";
import Kids from "./services/Kids";
import Location from "./pages/Location";
import MyAccount from "./components/MyAccount";
import Viewcust from "./admin/viewcust";
import Adminlayout from "./admin/adminlayout";
import ImageUpload from "./admin/adminaddphoto";
import Adminaddservices from "./admin/adminaddservices";
import Adminviewservices from "./admin/adminviewservices";
import Gallery from "./pages/Gallery";
import HomepageGallery from "./components/HomepageGallery";
import Gents from "./services/Gents";
import Ladies from "./services/Ladies";
import QuoteDisplay from "./components/Quotes";
import PaymentMethod from "./components/paymentMethodCust";
import Adminbookings from "./admin/adminbookings";
import Adminsettings from "./admin/adminsettings";
import { SelectedServicesProvider } from "./contexts/SelectedServicesContext";
import BookingConfirmation from "./components/BookingConfirmation";
import CustBookings from "./components/CustBookings";
import ReviewsCarousel from "./components/ReviewsCarousel";
import Admincustreviews from "./admin/admincustreviews";
import Admincoupons from "./admin/admincoupons";
import ResetPassword from "./functionalities/ResetPassword";
import Adminpromotionmail from "./admin/adminpromotionmail";
import CustPromotionUnsubscribe from "./pages/CustPromotionUnsubscribe";
import Adminaddcarousel from "./admin/adminaddcarousel";
import HomeCarousel from "./components/homecarousel";

const App = () => {
  const theme = {
    colors: {
      heading: "rgb(24 24 29)",
      text: "#e62e00",
      white: "#fff",
      black: " #ff1a1a",
      helper: "#e62e00",

      bg: "#000000",
      footer_bg: "#000000",
      btn: "rgb(230 46 0)",
      border: "rgba(98, 84, 243, 0.5)",
      hr: "#ff0000",
      gradient:
        "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
      shadow:
        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
      shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    media: {
      mobile: "768px",
      tab: "998px",
    },
  };
  return (
    <ThemeProvider theme={theme}>
      {
        <AuthProvider>
          <Router>
            <SelectedServicesProvider>
              <GlobalStyle />

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/bridal" element={<Bridal />} />
                {/* <Route path="/gallery" element={<Gallery/>}/> */}
                <Route path="/shop" element={<Shop />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Signup />} />
                <Route path="/resetpassword" element={<ResetPassword />} />
                {/* <Route path='/admindashboard' element={<Admindashboard/>}/>
          <Route path='/viewcust' element={<Viewcust/>}/> */}
                <Route path="/custappointment" element={<Custappointment />} />
                <Route
                  path="/bookingconfirmation"
                  element={<BookingConfirmation />}
                />
                <Route path="/custbookings" element={<CustBookings />} />
                <Route path="/ladies" element={<Ladies />} />
                <Route path="/gents" element={<Gents />} />
                <Route path="/kids" element={<Kids />} />
                <Route path="/unsubscribepromotion" element={<CustPromotionUnsubscribe />} />
                <Route path="/location" element={<Location />} />
                <Route path="/myaccount" element={<MyAccount />} />
                <Route  element={<Adminlayout />}>
                  <Route
                    path="/adminlayout"
                    element={<Navigate to="/admindashboard" replace />}
                  />
                  <Route path="/admindashboard" element={<Admindashboard />} />
                  <Route path="/viewcust" element={<Viewcust />} />
                  {/* <Route path="/adminaddcust" element={<Adminaddcust />} /> */}
                  <Route path="/upload" element={<ImageUpload />} />
                  <Route
                    path="/adminaddservices"
                    element={<Adminaddservices />}
                  />
                   <Route
                    path="/admincustreviews"
                    element={<Admincustreviews />}
                  />
                  <Route
                    path="/adminviewservices"
                    element={<Adminviewservices />}
                  />
                  <Route
                    path="/admincoupons"
                    element={<Admincoupons />}
                  />
                  <Route
                    path="/adminaddcarousel"
                    element={<Adminaddcarousel />}
                  />
                  <Route
                    path="/adminpromotionmail"
                    element={<Adminpromotionmail />}
                  />
                  <Route path="/adminbookings" element={<Adminbookings />} />
                  <Route path="/adminsettings" element={<Adminsettings />} />
                </Route>
                <Route path="/paymentmethodcust" element={<PaymentMethod />} />

                <Route path="/quotes" element={<QuoteDisplay />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/reviewscarousel" element={<ReviewsCarousel />} />
                <Route path="/homepagegallery" element={<HomepageGallery />} />
                <Route path="/homecarousel" element={<HomeCarousel />} />
              </Routes>
            </SelectedServicesProvider>
          </Router>
        </AuthProvider>
      }
    </ThemeProvider>
  );
};

export default App;
