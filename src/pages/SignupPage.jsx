import * as React from 'react';
import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  TextField, 
  Button, 
  Divider, 
  IconButton, 
  InputAdornment, 
  Zoom,
  Container,
  useMediaQuery,
  ThemeProvider,
  createTheme,
  CssBaseline
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff,
  Email,
  Google,
  AccountCircle,
  Close
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { googleSignup, signupWithEmail } from '../redux/actions/authAction';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#4ecdc4',
    },
    secondary: {
      main: '#ff6b6b',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
  },
});

const AuthCard = styled(Card)(({ theme }) => ({
  maxWidth: 450,
  width: '100%',
  borderRadius: 24,
  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
  overflow: 'visible',
  background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
  position: 'relative',
  marginTop: theme.spacing(8),
  marginBottom: theme.spacing(4),
  '&:before': {
    content: '""',
    position: 'absolute',
    top: -3,
    left: -3,
    right: -3,
    bottom: -3,
    background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45aaf2)',
    borderRadius: 27,
    zIndex: -1,
    opacity: 0.7,
    transition: 'all 0.3s ease',
  },
  '&:hover:before': {
    opacity: 0.9,
    transform: 'scale(1.01)',
  },
}));

const AuthButton = styled(Button)(({ theme }) => ({
  borderRadius: 14,
  padding: '14px 28px',
  fontWeight: 600,
  letterSpacing: 0.8,
  textTransform: 'none',
  transition: 'all 0.3s ease',
  boxShadow: 'none',
  fontSize: '0.95rem',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: theme.shadows[4],
  },
}));

const PrimaryAuthButton = styled(AuthButton)(({ theme }) => ({
  background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
  color: 'white',
  fontSize: '1rem',
  padding: '16px 32px',
  '&:hover': {
    background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
    transform: 'translateY(-3px) scale(1.02)',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
  },
  '&:disabled': {
    background: theme.palette.grey[300],
    color: theme.palette.grey[500],
  },
}));

const GoogleButton = styled(AuthButton)(({ theme }) => ({
  background: '#ffffff',
  color: '#5f6368',
  border: '1px solid #dadce0',
  padding: '14px 24px',
  '&:hover': {
    background: '#f8f9fa',
    borderColor: '#d2e3fc',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    '& .google-icon': {
      transform: 'scale(1.1)',
    },
    '& .google-text': {
      color: theme.palette.primary.main,
    },
  },
  transition: 'all 0.3s ease, box-shadow 0.2s ease',
}));

const HighlightText = styled('span')(({ theme }) => ({
  fontWeight: 700,
  background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
}));

const SignupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const location = useLocation();

  // const from = location.state?.from  || '/';

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const EmailLoading = useSelector((state) => state.emailLoading);
  const GoogleLoading = useSelector((state) => state.googleLoading);
  const error = useSelector((state)=>state.error);
  
  const [errorMessage,setErrorMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.email==""||formData.password==""){
      setErrorMessage("Both Email and password are required!");
    };

    dispatch(signupWithEmail(formData.email, formData.password,navigate));
  };

  const handleGoogleSignup = () => {
    dispatch(googleSignup(()=>navigate(-1)));
  };

  // const handleLoginInstead = () => {
  //   navigate('/login', {
  //     state: {from},  
  //       replace: true
  //   });
  // };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          backgroundImage: 'url(/path-to-your-bg-pattern.svg)', // Add a subtle pattern
          backgroundSize: 'cover',
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: 3,
            overflow: 'auto',
          }}
        >
          <Container maxWidth="sm" sx={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            py: 4
          }}>
            <Zoom in={true} timeout={500}>
              <AuthCard>
                <CardContent sx={{ p: { xs: 3, sm: 4 }, position:'relative' }}>
                  <IconButton
                   aria-label='close'
                   onClick={()=>navigate('/')}
                   sx={{
                    position: 'absolute',
                    right: 16,
                    top: 16,
                    color: 'text.secondary',
                    '&:hover': {
                    color: 'error.main',
                    transform: 'rotate(90deg)',
                    transition: 'all 0.3s ease'
                    }
                   }}
                  >
                  <Close fontSize="medium" />
                  </IconButton>
                  <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <motion.div
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, type: 'spring' }}
                    >
                      <AccountCircle sx={{ 
                        fontSize: 72, 
                        color: 'primary.main',
                        background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                        borderRadius: '50%',
                        p: 1.5,
                        boxShadow: 4,
                      }} />
                    </motion.div>
                    <Typography variant="h3" component="h1" sx={{ 
                      mt: 2, 
                      fontWeight: 800,
                      background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontSize: { xs: '1.8rem', sm: '2.2rem' },
                    }}>
                      Join Our Community
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ 
                      mt: 1.5,
                      fontSize: { xs: '0.9rem', sm: '1rem' }
                    }}>
                      Become part of <HighlightText>Pareek Samaj Hyderabad</HighlightText> family
                    </Typography>
                  </Box>
                  
                  <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      placeholder={isSmallScreen ? 'Email' : 'Enter your email address'}
                      variant="outlined"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      sx={{ mb: 2.5 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email color="action" />
                          </InputAdornment>
                        ),
                      }}
                      required
                    />
                    <TextField
                      fullWidth
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      variant="outlined"
                      name="password"
                      placeholder={isSmallScreen ? 'Password' : 'Enter your secure password'}
                      value={formData.password}
                      onChange={handleChange}
                      sx={{ mb: 3 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={togglePasswordVisibility}
                              edge="start"
                              sx={{ mr: 0 }}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      required
                    />
                    
                    {errorMessage && (
                      <Typography color="error" sx={{ 
                        mb: 2, 
                        textAlign: 'center',
                        fontSize: '0.9rem'
                      }}>
                        {errorMessage}
                      </Typography>
                    )}
                                                            
                    <PrimaryAuthButton
                      fullWidth
                      variant="contained"
                      onClick={handleSubmit}
                      size="large"
                      disabled={EmailLoading}
                      sx={{ mb: 2 }}
                    >
                      {EmailLoading ? 'Creating Account...' : 'Get Started'}
                    </PrimaryAuthButton>
                  </Box>

                  <Box sx={{ my: 3.5 }}>
                    <Divider sx={{ 
                      '&::before, &::after': { 
                        borderColor: 'divider',
                        borderWidth: 1
                      } 
                    }}>
                      <Typography variant="body2" color="text.secondary" sx={{ px: 2 }}>
                        OR CONTINUE WITH
                      </Typography>
                    </Divider>
                  </Box>

                  <GoogleButton
                    fullWidth
                    variant="outlined"
                    onClick={handleGoogleSignup}
                    startIcon={<Google className="google-icon" />}
                    size="large"
                    disabled={GoogleLoading}
                  >
                    <span className="google-text">
                      {GoogleLoading ? 'Signing up...' : 'Google Sign Up'}
                    </span>
                  </GoogleButton>

                  <Box sx={{ textAlign: 'center', mt: 3.5 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.95rem' }}>
                      Already have an account?{' '}
                      <Button 
                        component={Link}
                        to='/login'
                        variant="text" 
                        size="small"
                        sx={{ 
                          textTransform: 'none',
                          color: 'primary.main',
                          fontWeight: 600,
                          fontSize: '0.95rem',
                          '&:hover': {
                            textDecoration: 'underline',
                            backgroundColor: 'transparent'
                          }
                        }}
                      >
                        Sign in here
                      </Button>
                    </Typography>
                  </Box>
                </CardContent>
              </AuthCard>
            </Zoom>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default SignupPage;