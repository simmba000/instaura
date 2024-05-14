import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import PlusOneIcon from "@mui/icons-material/PlusOne";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SettingsIcon from "@mui/icons-material/Settings";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ReviewsIcon from "@mui/icons-material/Reviews";
import DiscountIcon from "@mui/icons-material/Discount";
import ForwardToInboxTwoToneIcon from "@mui/icons-material/ForwardToInboxTwoTone";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
const navItem = [
  {
    link: "/admindashboard",
    label: " Dashboard",
    icon: <DashboardIcon style={{ marginRight: "10px" }} />,
  },
  {
    link: "/viewcust",
    label: " View Users",
    icon: <GroupIcon style={{ marginRight: "10px" }} />,
  },
  {
    link: "/adminaddservices",
    label: " Add Services",
    icon: <PlusOneIcon style={{ marginRight: "10px" }} />,
  },
  {
    link: "/adminviewservices",
    label: " View Services",
    icon: <StorefrontIcon style={{ marginRight: "10px" }} />,
  },
  {
    link: "/upload",
    label: " Gallery",
    icon: <AddAPhotoIcon style={{ marginRight: "10px" }} />,
  },
  {
    link: "/adminbookings",
    label: " Your Bookings",
    icon: <FavoriteIcon style={{ marginRight: "10px" }} />,
  },
  {
    link: "/admincustreviews",
    label: " Customer Reviews",
    icon: <ReviewsIcon style={{ marginRight: "10px" }} />,
  },
  {
    link: "/adminaddcarousel",
    label: " Carousel Image",
    icon: <ViewCarouselIcon style={{ marginRight: "10px" }} />,
  },
  {
    link: "/admincoupons",
    label: " Coupons",
    icon: <DiscountIcon style={{ marginRight: "10px" }} />,
  },
  {
    link: "/adminpromotionmail",
    label: " Promotional Emails",
    icon: <ForwardToInboxTwoToneIcon style={{ marginRight: "10px" }} />,
  },
  {
    link: "/adminsettings",
    label: " Settings",
    icon: <SettingsIcon style={{ marginRight: "10px" }} />,
  },
];

export default navItem;
