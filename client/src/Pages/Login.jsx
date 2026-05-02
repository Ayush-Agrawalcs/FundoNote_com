import { useState, useRef } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {Box,Card,CardContent,TextField, Typography, Button, Link, IconButton, InputAdornment,} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { login } from "../Routes/AuthRoute";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const [errors, setErrors] = useState({});

  const navigate=useNavigate()

  const handleSubmit = async() => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    let newErrors = {};



    if(!email) newErrors.email="email required";
    if(!password) newErrors.password="password is required"

     if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

   if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email)) {
      newErrors.email = "*Enter a valid gmail address";
    }

    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try{
      const user=await login(
        email,
        password,
      )
      console.log("[[[[[[[[[[[[",user)
      localStorage.setItem("userId",user.id)
      navigate('/')
    }catch(error){
      setErrors({ general: "**invalid email or password" });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f8f9fa",
      }}
    >
      <Card sx={{ width: 420, p: 2 }}>
        <CardContent>

          {/* Logo */}
          <Typography
            variant="h5"
            fontWeight={600}
            color="#1a73e8"
            mb={1}
          >
            Fundoo
          </Typography>

          {/* Heading */}
          <Typography variant="h4" fontWeight={500} mb={1}>
            Sign in
          </Typography>

          <Typography variant="body1" color="text.secondary" mb={3}>
            to continue to Fundoo
          </Typography>

          {/* Email */}
          <TextField
            label="Email or phone"
            fullWidth
            sx={{ mb: 2 }}
            inputRef={emailRef}
            error={!!errors.email}
            helperText={errors.email}
          />

         

          {/* Password */}
          <TextField
            label="Enter your password"
            type={showPassword ? "text" : "password"}
            fullWidth
            sx={{ mt: 3 }}
            inputRef={passwordRef}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

         

          {/* Info */}
          <Typography variant="body2" color="text.secondary" mt={4}>
            Not your computer? Use Guest mode to sign in privately.
          </Typography>

          
          {/* Actions */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 4,
            }}
          >
            <Link component={RouterLink} to="/signup" underline="none" fontWeight={500}>
              Create account
            </Link>

            <Button
              variant="contained"
              sx={{
                bgcolor: "#1a73e8",
                textTransform: "none",
                px: 4,
              }}
              onClick={handleSubmit}
            >
              Next
            </Button>
          </Box>

        </CardContent>
      </Card>
    </Box>
  );
}
