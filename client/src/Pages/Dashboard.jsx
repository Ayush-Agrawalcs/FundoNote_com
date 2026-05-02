import React, { useState } from "react";
import Header from "../Components/Header/Header";
import Sidebar from "../Components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const Dashboard = () => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <Header toggle={toggle} />

      {/* 🔥 Layout container */}
      <Box
        sx={{
          display: "flex",
          marginTop: "64px", // header height
          width: "100%",
        }}
      >
        {/* SIDEBAR */}
        <Box
          sx={{
            width: open ? 280 : 72,
            transition: "width 0.3s ease",
            flexShrink: 0,
          }}
        >
          <Sidebar open={open} onClose={() => setOpen(false)} />
        </Box>

        {/* MAIN CONTENT */}
        <Box
          sx={{
            flexGrow: 1,
            padding: 2,
            transition: "all 0.3s ease",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
