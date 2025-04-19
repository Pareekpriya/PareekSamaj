import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import source from "../assets/images/parasar.jpg";
import { 
  Box, 
  Container,
  Typography, 
  Button,
  Grid,
  Card,
  CardContent,
  useMediaQuery,
  useTheme,
  Link,
  Divider
} from '@mui/material';
import { 
  Celebration,
  ConnectWithoutContact,
  ArrowForward
} from '@mui/icons-material';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const globalStyles = `
  html {
    scroll-behavior: smooth;
  }
    body {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
`;


// Custom Color Palette
const colors = {
  primary: '#1565c0',  
  secondary: '#6a1b9a', 
  accent: '#ff8f00',   
  light: '#fafafa',    
  dark: '#37474f',     
  gradientStart: '#1976d2',
  gradientEnd: '#7b1fa2'
}

// Enhanced Styled Components
const HeroButton = styled(Button)(({ theme }) => ({
  padding: '14px 36px',
  borderRadius: '50px',
  fontWeight: 800,
  fontSize: '1.1rem',
  textTransform: 'none',
  transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
  boxShadow: `0 4px 20px rgba(106, 17, 203, 0.3)`,
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: `0 8px 30px rgba(106, 17, 203, 0.4)`,
  },
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: '20px',
  overflow: 'hidden',
  transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
  background: `linear-gradient(135deg, ${colors.light} 0%, #ffffff 100%)`,
  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
  border: 'none',
  '&:hover': {
    transform: 'translateY(-12px) scale(1.02)',
    boxShadow: `0 15px 35px rgba(106, 17, 203, 0.2)`,
  },
}));

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease:"easeOut" 
    }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      duration: 1,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

const floatAnimation = {
  float: {
    y: [-10, 10],
    transition: {
      y: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  }
};


const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });
  const [heroLoaded, setHeroLoaded] = useState(false);
  const location = useLocation();
  const user = useSelector((state) => state?.user || null);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = globalStyles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // const handleAddMemberClick = () => {
  //   if (!user) {
  //     alert('You need to signup first!');
  //     navigate('/signup', { 
  //       state: { 
  //         from: '/newmember', 
  //         immediateFrom: location.pathname 
  //       },
  //       replace: true 
  //     });
  //   } else {
  //     navigate('/newmember');
  //   }
  // };

  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      overflowX: 'hidden', 
      background: `linear-gradient(135deg, ${colors.light} 0%, #ffffff 100%)`,
      position: 'relative',
      transform: 'translate3d(0,0,0)',
      backfaceVisibility: 'hidden',
      perspective: '1000px',
    }}>

    {/* Floating Background Elements */}
    <AnimatePresence>
      {!isSmallScreen && [...Array(3)].map((_, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0.05, 0.1, 0.05], 
        y: [0, 100, 0],
        x: Math.random() * 50 - 25 
      }}
      transition={{
        duration: 30 + Math.random() * 20, 
        repeat: Infinity,
        ease: "linear"
      }}
      style={{
        position: 'fixed', 
        width: `${Math.random() * 50 + 30}px`, 
        height: `${Math.random() * 50 + 30}px`,
        background: `radial-gradient(circle, rgba(21, 101, 192, 0.3) 0%, transparent 70%)`, // More transparent
        borderRadius: '50%',
        zIndex: 0,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        willChange: 'transform, opacity' 
      }}
    />
  ))}
  </AnimatePresence>

      {/* Hero Section */}
      <Box 
        sx={{ 
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: colors.light,
          pt: isSmallScreen ? 10 : 6,
          pb: isSmallScreen ? 8 : 0,
          pl: isSmallScreen ? 0 : 8,
          willChange: 'transform, opacity'
        }}
      >
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={7} sx={{ 
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <motion.div
                initial="hidden"
                animate={heroLoaded ? "visible" : "hidden"}
                variants={containerVariants}
                style={{ maxWidth: '700px' }}
              >
                <motion.div variants={itemVariants}>
                  <Typography 
                    variant="h1" 
                    component="h1"
                    sx={{ 
                      fontWeight: 900,
                      fontSize: isSmallScreen ? '2.8rem' : '4rem',
                      lineHeight: 1.2,
                      mb: 3,
                      pt:2,
                      color: colors.dark,
                     '& .highlight': {
                      background: `linear-gradient(135deg, ${colors.gradientStart} 0%, ${colors.gradientEnd} 100%)`,
                      WebkitBackgroundClip: 'text', 
                      WebkitBackgroundClip: 'text',
                     WebkitTextFillColor: 'transparent',
                     display: 'inline',
                     padding: '0 3px',
                     borderRadius: '4px',
                     transition: 'all 0.3s ease',
                   '&:hover:': {
                    transform: 'translateY(-2px)',
                    textShadow: `0 0 15px rgba(142, 36, 170, 0.4)`                  }
                 }
                }}
                >
                Welcome to <span className="highlight">Pareek Samaj Hyderabad</span>
                  </Typography>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Typography 
                    variant="h5" 
                    component="p"
                    sx={{ 
                      mb: 4,
                      color: colors.dark,
                      fontSize: isSmallScreen ? '1.2rem' : '1.4rem',
                      lineHeight: 1.6,
                      maxWidth: '600px'
                    }}
                  >
                    A vibrant community preserving our rich heritage while building a brighter future together through unity, culture, and shared values.
                  </Typography>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                    <HeroButton 
                      variant="contained" 
                      size="large"
                      onClick={()=>navigate('/newmember')}
                      endIcon={<ArrowForward />}
                      sx={{
                        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                        color: 'white',
                        minWidth: '220px'
                      }}
                    >
                      Join Us
                    </HeroButton>
                    <HeroButton 
                      variant="outlined" 
                      size="large"
                      // onClick={() => user ? navigate('/members') : alert("Please login first!")}
                      sx={{
                        border: '3px solid',
                        borderColor: colors.primary,
                        color: colors.primary,
                        minWidth: '220px',
                        '&:hover': {
                          background: 'rgba(106, 17, 203, 0.05)',
                          borderWidth: '3px'
                        }
                      }}
                    >
                      Meet Our Community
                    </HeroButton>
                  </Box>
                </motion.div>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} md={5} sx={{ 
              display: 'flex',
              justifyContent: isSmallScreen ? 'center' : 'flex-end',
              alignItems: 'center',
              height: '100%'
            }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ 
                  duration: 1, 
                  delay: 0.3,
                  type: 'spring',
                  stiffness: 100
                }}
                onAnimationComplete={() => setHeroLoaded(true)}
                style={{ 
                  position: 'relative',
                  width: '100%',
                  maxWidth: '450px'
                }}
              >
                <motion.div
                  variants={floatAnimation}
                  animate="float"
                  style={{ width: '100%', height: '100%' }}
                >
                  <Box
                    sx={{
                      borderRadius: '24px',
                      overflow: 'hidden',
                      boxShadow: '0 30px 60px rgba(0,0,0,0.15)',
                      position: 'relative',
                      aspectRatio: '1/1',
                      bgcolor: 'grey.100',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        background: `linear-gradient(135deg, rgba(106, 17, 203, 0.2) 0%, rgba(37, 117, 252, 0.2) 100%)`,
                        zIndex: 1,
                        borderRadius: '24px'
                      }
                    }}
                  >
                    <motion.img 
                      src={source} 
                      alt="Pareek Samaj Hyderabad"
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        position: 'relative'
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    />
                  </Box>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                  style={{
                    position: 'absolute',
                    top: '-50px',
                    right: isSmallScreen ? '0' : '-50px',
                    width: '250px',
                    height: '250px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${colors.primary}, transparent 70%)`,
                    zIndex: 0
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box 
        ref={ref}
        sx={{ 
          py: 8,
          position: 'relative',
          overflow: 'hidden',
          background: 'transparent',
          willChange: 'transform, opacity'
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <Typography 
                variant="h2" 
                align="center"
                sx={{ 
                  fontWeight: 900,
                  mb: 2,
                  fontSize: isSmallScreen ? '2.5rem' : '3.5rem',
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block',
                  width: '100%'
                }}
              >
                Our Community Offerings
              </Typography>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Typography 
                variant="h5" 
                align="center"
                sx={{ 
                  mb: 6,
                  color: colors.dark,
                  maxWidth: '700px',
                  mx: 'auto',
                  fontSize: isSmallScreen ? '1.2rem' : '1.4rem'
                }}
              >
                We provide a platform to celebrate our traditions, connect with fellow members, and contribute to our collective growth.
              </Typography>
            </motion.div>
          </motion.div>

          <Grid container spacing={6} justifyContent="center">
            {[
              {
                icon: <Celebration sx={{ fontSize: 70, color: colors.primary }} />,
                title: "Cultural Events",
                description: "Vibrant celebrations of our rich heritage through festivals, performances, and traditional ceremonies."
              },
              {
                icon: <ConnectWithoutContact sx={{ fontSize: 70, color: colors.primary }} />,
                title: "Community Gatherings",
                description: "Regular meetups and social events to strengthen bonds and foster meaningful relationships."
              }
            ].map((feature, index) => (
              <Grid item xs={12} sm={6} lg={6} key={index} sx={{ 
                display: 'flex',
                minHeight: '100%',
                [theme.breakpoints.up('lg')]: {
                  maxWidth: '500px', 
                  flexGrow: 0, 
                }
              }}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -15 }}
                  style={{ width: '100%', display: 'flex', flexDirection: 'column', height: '100%' }}
                >
                  <FeatureCard>
                    <CardContent sx={{ 
                      p: 5, 
                      textAlign: 'center', 
                      height: '100%', 
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}>
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ marginBottom: '2rem' }}
                      >
                        {feature.icon}
                      </motion.div>
                      <Typography 
                        variant="h4" 
                        component="h3"
                        sx={{ 
                          fontWeight: 800,
                          mb: 2,
                          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          fontSize: '1.8rem'
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography sx={{ 
                        color: colors.dark,
                        fontSize: '1.2rem',
                        flexGrow: 1,
                        opacity: 0.9
                      }}>
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </FeatureCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

{/* CTA Section */}
<Box 
  sx={{ 
    py: 8,
    mx: 2,
    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
    color: 'white',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '40px',
    willChange: 'transform',
    boxShadow: '0 -5px 30px rgba(0,0,0,0.1)',
    [theme.breakpoints.up('lg')]: {
      mx:10, 
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '5px',
    }
  }}
>
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 0.2 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'radial-gradient(circle at center, rgba(255,255,255,0.3), transparent 70%)',
    }}
  />
  <motion.div
    initial="hidden"
    whileInView="visible"
    variants={containerVariants}
    viewport={{ once: true }}
    style={{ position: 'relative', zIndex: 1 }}
  >
    <Container maxWidth="md" sx={{ textAlign: 'center' }}>
      <motion.div variants={itemVariants}>
        <Typography 
          variant="h2" 
          sx={{ 
            fontWeight: 900,
            mb: 3,
            fontSize: isSmallScreen ? '2.5rem' : '3.5rem',
            textShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}
        >
          Join Our Vibrant Community
        </Typography>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Typography 
          variant="h5" 
          sx={{ 
            mb: 6,
            opacity: 0.9,
            fontSize: isSmallScreen ? '1.2rem' : '1.4rem'
          }}
        >
          Become part of our growing family and help preserve our heritage while creating lasting connections.
        </Typography>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <HeroButton 
            variant="contained" 
            size="large"
            onClick={()=>navigate('/newmember')}
            endIcon={
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity
                }}
              >
                <ArrowForward />
              </motion.div>
            }
            sx={{
              background: 'white',
              color: colors.primary,
              fontWeight: 800,
              '&:hover': {
                background: 'rgba(255,255,255,0.95)'
              }
            }}
          >
            Join Now
          </HeroButton>
        </motion.div>
      </motion.div>
    </Container>
  </motion.div>
</Box>
    
      {/* Footer Section */}
      <Box component="footer" sx={{ 
        py: 2,
        px: 2,
        mt: 'auto',
        bottom:0,
        position: 'relative',
        overflow: 'hidden',
        zIndex: 1,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
        }
      }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          style={{
            position: 'sticky',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `radial-gradient(circle at center, ${colors.primary}, transparent 70%)`,
          }}
        />
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="space-between" alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Typography variant="body1" align={isSmallScreen ? 'center' : 'left'} sx={{ fontWeight: 500 }}>
                  © {new Date().getFullYear()} Pareek Samaj Hyderabad. All rights reserved.
                </Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Typography variant="body1" align={isSmallScreen ? 'center' : 'right'} sx={{ fontWeight: 500,ml:2 }}>
                 Designed and Developed by <Link href="#" color="inherit" underline="hover" sx={{ fontWeight: 700 }}>Priya Pareek</Link>
                </Typography>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;