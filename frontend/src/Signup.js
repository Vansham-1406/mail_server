import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import VerifiedIcon from '@mui/icons-material/Verified';

const Signup = () => {
  const theme = createTheme();

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    mobileNum: "",
    OTP: "",
    username: "",
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="First Name"
                    onChange={(e) => {
                      setValues({ ...values, firstName: e.target.value });
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Last Name"
                    autoComplete="family-name"
                    onChange={(e) => {
                      setValues({ ...values, lastName: e.target.value });
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    fullWidth
                    label="Mobile Number"
                    id="outlined-start-adornment"
                    name="mobile"
                    autoComplete="mobile"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">+91</InputAdornment>
                      ),
                    }}
                    onChange={(e) => {
                      setValues({ ...values, mobileNum: e.target.value });
                    }}
                  />
                </Grid>
                <Button
                color="secondary"
                variant="contained"
                sx={{ mt: 3, mb: 2,ml:2 }}
                sm={4}
                onClick={() => {
                  console.log("values", values);
                }}
              >
                Send OTP
              </Button>
                <Grid item xs={6} sm={6}>
                  <TextField
                    fullWidth
                    label="OTP"
                    autoComplete="otp"
                    onChange={(e) => {
                      setValues({ ...values, OTP: e.target.value });
                    }}
                  />
                </Grid>

                {/* <div class="alert alert-success mt-3 ms-5" role="alert" style={{paddingTop:"-10px"}}>
                    Verified!<VerifiedIcon sx={{ml:1 }}/>
                </div> */}
                <Grid item xs={12}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={values.showPassword ? "text" : "password"}
                      value={values.password}
                      onChange={(e) => {
                        setValues({ ...values, password: e.target.value });
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="username"
                    label="Username"
                    type="text"
                    id="username"
                    autoComplete="username"
                    onChange={(e) => {
                      setValues({ ...values, username: e.target.value });
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => {
                  console.log("values", values);
                }}
              >
                Submit
              </Button>
              <div className="d-flex justify-content-between mb-5">
                <div>
                  <a href="/">Forgot Password?</a>
                </div>
                <div>
                  <a href="/">Sign In?</a>
                </div>
              </div>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default Signup;
