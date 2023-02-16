import HomeIcon from "@mui/icons-material/Home";
import CollectionsIcon from "@mui/icons-material/Collections";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ReviewsIcon from "@mui/icons-material/Reviews";

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
    link: "me/collections",
  },

  {
    title: "Collectors",
    icon: <PeopleAltIcon />,
    link: "/users",
  },
];
