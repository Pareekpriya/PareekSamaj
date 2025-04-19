import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { keyframes } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../redux/actions/authAction';

// Import icons for navigation items
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import GroupIcon from '@mui/icons-material/Group';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import StarIcon from '@mui/icons-material/Star';

// Animation for gradient background
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.primary.dark})`,
  backgroundSize: '300% 300%',
  animation: `${gradientAnimation} 8s ease infinite`,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
  },
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '50px',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(1),
  width: '100%',
  transition: 'all 0.3s ease',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const NavIconButton = styled(IconButton)(({ theme }) => ({
  margin: theme.spacing(0, 0.5),
  color: theme.palette.common.white,
  position: 'relative',
  '& .MuiSvgIcon-root': {
    fontSize: '1.8rem', // Larger icons
    transition: 'all 0.3s ease',
  },
  '&:hover .MuiSvgIcon-root': {
    transform: 'scale(1.1)',
  },
  '& .nav-text': {
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: theme.palette.primary.dark,
    color: 'white',
    padding: theme.spacing(0.5, 1),
    borderRadius: theme.shape.borderRadius,
    fontSize: '0.75rem',
    opacity: 0,
    visibility: 'hidden',
    transition: 'all 0.3s ease',
    whiteSpace: 'nowrap',
    zIndex: 1,
  },
  '&:hover': {
    '& .nav-text': {
      opacity: 1,
      visibility: 'visible',
      top: 'calc(100% + 5px)',
    },
  },
}));

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state)=>state.user);

  const pages = [
    { name: 'Home', icon: <HomeIcon />, path: '/' },
    { name: 'All Members', icon: <PeopleIcon />, path:'/' },
    { name: 'Life time Members', icon: <StarIcon />, path:'/' },
    { name: 'Committee Members', icon: <GroupIcon />, path:'/' },
    { name: 'Add New Member', icon: <PersonAddIcon />, path:'/newmember' },
  ];
  
  const mobilePages = [...pages, { name: 'Contact', icon: <ContactMailIcon /> }];
  
  const settings = [user?'Logout':'Login','Profile'];
  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSettingClick = (setting) =>{
    handleCloseUserMenu();
    switch(setting){
      case 'Login':
        navigate('/login');
        break;
      case 'Logout':
        confirm("Are you really want to logout?");
        dispatch(logOut(navigate));
        break;  
      default:
         break;        
    }
  };

  const handlePageClick = (page) => {
    handleCloseNavMenu();
    navigate(page.path);
  };

  return (
    <AppBarStyled position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', py: 1 }}>
          {/* Desktop Logo */}
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 800,
              whiteSpace: 'nowrap',
              overflow: 'visible',
              color: 'white',
              textShadow: `
                1px 1px 0 #aaa,
                2px 2px 0 #999,
                3px 3px 0 #888,
                4px 4px 0 #777
                `,
              transform: 'skew(-5deg)',
              '&:hover': {
                textShadow: `
                  1px 1px 0 #aaa,
                  2px 2px 0 #999,
                  3px 3px 0 #888,
                  4px 4px 0 #666,
                  0 0 10px rgba(255,255,255,0.8)
                `,
              },
              transition: 'text-shadow 0.3s ease',
              flexShrink: 0,
           }}
          >
            Pareek Samaj Hyderabad
          </Typography>

          {/* Mobile Menu */}
          <Box sx={{ 
            display: { xs: 'flex', md: 'none' },
            alignItems: 'center',
            flexGrow: 1,
            justifyContent: 'space-between',
            width: '100%',
          }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{ 
                p: 1,
                '&:hover': {
                  transform: 'rotate(90deg)',
                  transition: 'transform 0.3s ease',
                }
              }}
            >
              <MenuIcon fontSize="large" />
            </IconButton>
            
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              maxWidth: 'calc(100% - 60px)',
            }}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  lineHeight: 1,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                }}
              >
                Pareek Samaj
              </Typography>
              <Typography
                variant="subtitle2"
                noWrap
                component="div"
                sx={{
                  fontWeight: 700,
                  fontSize: 'rem',
                  lineHeight: 1.2,
                  textShadow: '1px 1px 1px rgba(0,0,0,0.2)',
                }}
              >
                Hyderabad
              </Typography>
            </Box>
          </Box>

          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{ 
              display: { xs: 'block', md: 'none' },
              '& .MuiPaper-root': {
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(10px)',
              }
            }}
          >
            {mobilePages.map((page) => (
              <MenuItem 
                key={page.name} 
                onClick={() => handlePageClick(page)}
                sx={{
                  '&:hover': {
                    background: 'linear-gradient(to right, #ff758c, #ff7eb3)',
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {page.icon}
                  <Typography 
                    textAlign="center"
                    sx={{
                      fontWeight: 600,
                      width: '100%',
                    }}
                  >
                    {page.name}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </Menu>

          {/* Desktop Menu Items */}
          <Box sx={{ 
            display: { xs: 'none', md: 'flex' },
            justifyContent: 'center',
            flexGrow: 1,
            ml: 2,
          }}>
            {pages.map((page) => (
              <NavIconButton
                key={page.name}
                onClick={() => handlePageClick(page)}
                aria-label={page.name}
              >
                {page.icon}
                <span className="nav-text">{page.name}</span>
              </NavIconButton>
            ))}
          </Box>
          
          {/* Right Section */}
          <Box sx={{ 
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 1, sm: 2 },
            ml: { xs: 0, sm: 2 },
          }}>
            <Search sx={{ width: { xs: '120px', sm: '180px', md: '220px' } }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            
            {/* Account Icon */}
            <Tooltip title="Account">
              <IconButton 
                onClick={handleOpenUserMenu} 
                color="inherit"
                sx={{ 
                  p: 1,
                  '& .MuiSvgIcon-root': {
                    fontSize: { xs: '1.8rem', sm: '2.2rem' },
                    transition: 'all 0.3s ease',
                  },
                  '&:hover': {
                    transform: 'scale(1.1)',
                    '& .MuiSvgIcon-root': {
                      filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.8))',
                    }
                  }
                }}
              >
                <AccountCircle />
              </IconButton>
            </Tooltip>
            
            <Menu
              sx={{ 
                mt: '45px',
                '& .MuiPaper-root': {
                  background: 'rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 5px 20px rgba(0,0,0,0.2)',
                }
              }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem 
                  key={setting} 
                  onClick={() => handleSettingClick(setting)}
                  sx={{
                    '&:hover': {
                      background: 'linear-gradient(to right, #ff758c, #ff7eb3)',
                      color: 'white',
                    }
                  }}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBarStyled>
  );
}

export default Navbar;