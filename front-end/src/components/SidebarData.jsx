import HomeIcon from "@mui/icons-material/Home";
import CollectionsIcon from "@mui/icons-material/Collections";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ReviewsIcon from "@mui/icons-material/Reviews";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";

export const SidebarData = [
  {
    title: "Home",
    icon: <HomeIcon />,
    link: "/home",
  },
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    link: "/dashboard",
  },
  {
    title: "Collection",
    icon: <CollectionsIcon />,
    link: "/collection",
  },
  {
    title: "Reviews",
    icon: <ReviewsIcon />,
    link: "/reviews",
  },
  {
    title: "Users",
    icon: <PeopleAltIcon />,
    link: "/users",
  },
];
