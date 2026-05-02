import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";

import AccountMenu from "../AccountMenu/AccountMenu";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import AppsIcon from "@mui/icons-material/Apps";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import ViewAgendaOutlinedIcon from "@mui/icons-material/ViewAgendaOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { GlobalContext } from "../GlobalProvider";

export default function Header({ toggle }) {
  const { isGrid, setGrid } = useContext(GlobalContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // ✅ Title logic
  const getTitle = () => {
    if (location.pathname === "/") {
      return "FundooNotes";
    }

    const parts = location.pathname.split("/").filter(Boolean);
    const last = parts[parts.length - 1];
    return last.charAt(0).toUpperCase() + last.slice(1);
  };

  const title = getTitle(); // ✅ compute once

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: "#fff",
        color: "#5f6368",
        boxShadow: "none",
        borderBottom: "1px solid #dadce0",
        zIndex: 1201,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* 🔵 LEFT */}
        <Box sx={{ display: "flex", alignItems: "center", width: 240 }}>
          <Tooltip title="Menu">
            <IconButton sx={{mr:3,width:48,height:48}} onClick={toggle}>
              <MenuIcon />
            </IconButton>
          </Tooltip>

          <Box sx={{ display: "flex", alignItems: "center", ml: 1 }}>
            {title === "FundooNotes" && (
              <img
                src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
                alt="keep"
                width="40"
                height="40"
              />
            )}

            <Typography
              sx={{
                ml: title === "FundooNotes" ? 1 : 0,
                fontSize: 22,
              }}
            >
              {title}
            </Typography>
          </Box>
        </Box>

        {/* 🟡 CENTER (SEARCH) */}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "flex-start",
            pl: 6,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "#f1f3f4",
              px: 2,
              height: 46,
              borderRadius: 2,
              width: "100%",
              maxWidth: 720,
            }}
          >
            <SearchIcon sx={{ mr: 1 }} />
            <InputBase placeholder="Search" sx={{ width: "100%" }} />
          </Box>
        </Box>

        {/* 🟢 RIGHT */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            width: 240,
          }}
        >
          <Tooltip title="Refresh">
            <IconButton>
              <RefreshIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title={isGrid ? "List view" : "Grid view"}>
            <IconButton onClick={() => setGrid((prev) => !prev)}>
              {isGrid ? <ViewAgendaOutlinedIcon /> : <GridViewOutlinedIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Settings">
            <IconButton sx={{ mr: 5 }}>
              <SettingsOutlinedIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Apps">
            <IconButton>
              <AppsIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Account">
            <IconButton onClick={handleOpen}>
              <AccountCircle />
            </IconButton>
          </Tooltip>

          <AccountMenu anchorEl={anchorEl} onClose={handleClose} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
