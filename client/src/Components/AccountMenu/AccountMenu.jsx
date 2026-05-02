import React, { useEffect, useState } from "react";
import {
  Popover,
  Box,
  Typography,
  Avatar,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import api from "../../Services/axiosServices";

const AccountMenu = ({ anchorEl, onClose }) => {
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const userId = localStorage.getItem("userId");


  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      try {
        const res = await api.get(`/users/${userId}`);
        setUser(res.data);
      } catch (err) {
        console.error("Failed to load user");
      }
    };

    fetchUser();
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    onClose();
    navigate("/login", { replace: true });
  };

  const handleSignup=()=>{
    localStorage.removeItem("userId");
    onClose()
    navigate("/signup",{replace:true});
  }

  
  if (!user) return null;

  const fullName = `${user.firstName} ${user.lastName}`;
  const firstName = user.firstName;
  const email = user.email;
  const initial = firstName?.charAt(0)?.toUpperCase();

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      PaperProps={{
        sx: {
          width: 420,
          borderRadius: 4,
          p: 2,
          bgcolor: "#e6f7ff",
        },
      }}
    >
      
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton size="small" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Avatar
          sx={{
            width: 80,
            height: 80,
            fontSize: 36,
            bgcolor: "#e87a1a",
          }}
        >
          {initial}
        </Avatar>
      </Box>

      {/* Greeting */}
      <Typography align="center" variant="h6" sx={{ mt: 1, fontWeight: 500 }}>
        Hi, {firstName}!
      </Typography>

      {/* Email */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button
          variant="none"
          sx={{
            bgcolor: "white",
            borderRadius: 5,
            textTransform: "none",
            px: 3,
          }}
        >
          {email}
        </Button>
      </Box>

      {/* Actions */}
      <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
        <Button
          fullWidth
          variant="none"
          startIcon={<AddIcon />}
          sx={{
            height: 52,
            bgcolor: "white",
            borderRadius: "999px 16px 16px 999px",
            textTransform: "none",
            fontWeight: 500,
          }}
          onClick={handleSignup}
        >
          Add account
        </Button>

        <Button
          fullWidth
          variant="none"
          startIcon={<LogoutIcon />}
          sx={{
            height: 52,
            bgcolor: "white",
            borderRadius: "16px 999px 999px 16px",
            textTransform: "none",
            fontWeight: 500,
          }}
          onClick={handleLogout}
        >
          Sign out
        </Button>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography align="center" variant="caption" color="text.secondary">
        Privacy Policy • Terms of Service
      </Typography>
    </Popover>
  );
};

export default AccountMenu;
