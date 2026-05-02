import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";

import EditIcon from "@mui/icons-material/Edit";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { useNavigate, useLocation } from "react-router-dom";

const HEADER_HEIGHT = 64;
const ACTIVE_COLOR = "#f1f3f4"; // Google grey

export default function Sidebar({ open }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: "Notes", icon: <LightbulbOutlinedIcon />, path: "/" },
    { text: "Reminders", icon: <NotificationsNoneOutlinedIcon />, path: "/reminders" },
    { text: "Edit", icon: <EditIcon />, path: "/edit" },
    { text: "Archive", icon: <ArchiveOutlinedIcon />, path: "/archive" },
    { text: "Trash", icon: <DeleteOutlineOutlinedIcon />, path: "/trash" },
  ];

  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        sx: {
          top: HEADER_HEIGHT,
          height: `calc(100% - ${HEADER_HEIGHT}px)`,
          width: open ? 260 : 70,
          transition: "width 0.3s ease",
          overflowX: "hidden",
          borderRight: "none",
          boxShadow: "none",
        },
      }}
    >
      <Box sx={{ height:"100%",display:'flex',flexDirection:'column',alignItems:'flex-start',pt:1 }}>
        <List>
          {menuItems.map((item) => {
            const isSelected = location.pathname === item.path;

            return (
              <ListItemButton
                key={item.text}
                selected={isSelected}
                onClick={() => navigate(item.path)}
                sx={{
                  mx: 1,
                  my: 0.5,
                  display: "flex",
                  justifyContent: open ? "flex-start" : "center",

                  // 🔹 OPEN drawer style
                  borderRadius: open ? "0 25px 25px 0" : "50%",

                  // 🔹 HOVER
                  "&:hover": {
                    backgroundColor: ACTIVE_COLOR,
                  },

                  // 🔹 SELECTED
                  "&.Mui-selected": {
                    backgroundColor: "#feefc3"
,

                    // 👇 CLOSED drawer → circular highlight
                    ...( !open && {
                      width: 48,
                      height: 48,
                      mx: "auto",
                      borderRadius: "50%",
                    }),
                  },

                  // 🔹 SELECTED + HOVER
                  "&.Mui-selected:hover": {
                    backgroundColor: "#feefc3",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: "center",
                    mr: open ? 2 : 0,
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                {/* 👇 TEXT SIRF OPEN HONE PAR */}
                {open && <ListItemText primary={item.text} />}
              </ListItemButton>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
}
