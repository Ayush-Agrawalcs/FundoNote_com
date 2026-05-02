import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../Services//axiosServices";

export default function Otp() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ email passed from signup page
  const email = location.state?.email;

  // 🔥 VERIFY OTP
  const handleVerify = async () => {
    if (!otp) {
      setError("OTP is required");
      return;
    }

    try {
      await api.post("/auth/verify-otp", null, {
        params: { email, otp },
      });

      alert("Email verified successfully ✅");

      navigate("/login"); // go to login
    } catch (err) {
      console.error(err);
      setError("Invalid or expired OTP ❌");
    }
  };

  // 🔥 RESEND OTP
  const handleResend = async () => {
    try {
      await api.post("/auth/send-otp", null, {
        params: { email },
      });

      alert("OTP resent successfully ✅");
    } catch (err) {
      console.error(err);
      setError("Failed to resend OTP");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f8f9fa",
      }}
    >
      <Card sx={{ width: 400, p: 2 }}>
        <CardContent>
          {/* Title */}
          <Typography variant="h5" mb={2}>
            Verify Email
          </Typography>

          {/* Email info */}
          <Typography variant="body2" mb={2}>
            Enter OTP sent to <b>{email}</b>
          </Typography>

          {/* OTP Input */}
          <TextField
            label="Enter OTP"
            fullWidth
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            error={!!error}
            helperText={error}
            inputProps={{ maxLength: 6 }} // ✅ limit to 6 digits
          />

          {/* Verify Button */}
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleVerify}
          >
            Verify OTP
          </Button>

          {/* Resend Button */}
          <Button
            fullWidth
            sx={{ mt: 1 }}
            onClick={handleResend}
          >
            Resend OTP
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}