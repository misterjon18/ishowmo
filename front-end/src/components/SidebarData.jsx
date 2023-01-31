import HomeIcon from "@mui/icons-material/Home";
import CollectionsIcon from "@mui/icons-material/Collections";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ReviewsIcon from "@mui/icons-material/Reviews";
// import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const SidebarData = [
  {
    title: "Home",
    icon: <HomeIcon />,
    link: "/dashboard",
  },
  { title: "Profile", icon: <AccountCircleIcon />, link: "/profile" },

  {
    title: "My Collection",
    icon: <CollectionsIcon />,
    link: "/collection",
  },
  {
    title: "Reviews",
    icon: <ReviewsIcon />,
    link: "/reviews",
  },
  {
    title: "Collectors",
    icon: <PeopleAltIcon />,
    link: "/users",
  },
];
