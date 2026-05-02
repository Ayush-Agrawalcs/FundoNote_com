import React, { useRef, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import shield from "../assets/shield.jpeg";
import { signup } from "../Routes/AuthRoute";

const Signup = () => {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const firstName = firstNameRef.current.value.trim();
    const lastName = lastNameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    let newErrors = {};

    if (!firstName) newErrors.firstName = "*first Name is required";
    if (!email) newErrors.email = "*email is required";
    if (!password) newErrors.password = "*password is required";
    if (!confirmPassword)
      newErrors.confirmPassword = "*confirm password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    newErrors = {};

    if (!/^[A-Za-z]{2,}$/.test(firstName))
      newErrors.firstName = "*enter a valid first name";

    if (!/^[A-Za-z]{2,}$/.test(lastName))
      newErrors.lastName = "*enter a valid last name";

    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email)) {
      newErrors.email = "*not a valid gmail address";
    }

    if (password.length < 8)
      newErrors.password = "*eassword must be at least 8 characters";

    if (password !== confirmPassword)
      newErrors.confirmPassword = "*passwords do not match";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      await signup({
        firstName,
        lastName,
        email,
        password,
        service: "advance",
      });
      navigate("/login");
    } catch (err) {
      console.log(err)
      if (err.message === "EMAIL_EXISTS") {
        setErrors({ email: "Email already registered" });
      } else {
        alert("Signup failed");
      }
    } finally {
      setLoading(false);
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
      <Card sx={{ width: 900, height: 500, p: 2 }}>
        <CardContent>
          <Box sx={{ display: "flex" }}>
            {/* LEFT – 60% */}
            <Box sx={{ flex: 4, pr: 4 }}>
              <Typography variant="h5" fontWeight={600} color="#1a73e8">
                Fundoo
              </Typography>

              <Typography variant="h4" mb={3}>
                Create your Fundoo Account
              </Typography>

              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <TextField
                  label="First name"
                  fullWidth
                  inputRef={firstNameRef}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                />
                <TextField
                  label="Last name"
                  fullWidth
                  inputRef={lastNameRef}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                />
              </Box>

              <TextField
                label="Email address"
                fullWidth
                sx={{ mb: 2 }}
                inputRef={emailRef}
                error={!!errors.email}
                helperText={errors.email}
              />

              {/* PASSWORD & CONFIRM PASSWORD SAME LINE */}
              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <TextField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  inputRef={passwordRef}
                  error={!!errors.password}
                  helperText={errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  fullWidth
                  inputRef={confirmPasswordRef}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Typography variant="body2" color="text.secondary">
                Use 8 or more characters with a mix of letters, numbers &
                symbols
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 4,
                }}
              >
                <Link component={RouterLink} to="/login" underline="none">
                  Sign in instead
                </Link>

                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "Signing up..." : "Next"}
                </Button>
              </Box>
            </Box>

            {/* RIGHT – 40% */}
            <Box
              sx={{
                flex: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={shield}
                alt="Security"
                style={{ width: "80%", maxWidth: 300 }}
              />
              <Typography align="center" mt={2}>
                One account. All of Fundoo working for you.
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Signup;
