import React, { useEffect, useState } from 'react';
import { useNavigate,useLocation, Navigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Grid,
  Paper,
  Avatar,
  IconButton,
  Divider,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip
} from '@mui/material';
import {
  AddCircleOutline,
  DeleteOutline,
  CloudUpload,
  Person,
  Phone,
  Email,
  Home,
  FamilyRestroom
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { useRef } from 'react';

// Custom styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '16px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
  background: 'white',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: '120px',
  height: '120px',
  margin: '0 auto',
  border: `4px solid ${theme.palette.primary.main}`,
}));

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const NewMember = () => {
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(null);
  const [familyMembers, setFamilyMembers] = useState([{ name: '', relation: '' }]);

  const user = useSelector((state)=>state.user)
  const location = useLocation();

  // Main form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    email: '',
    address: '',
    image: null
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFamilyMemberChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMembers = [...familyMembers];
    updatedMembers[index] = { ...updatedMembers[index], [name]: value };
    setFamilyMembers(updatedMembers);
  };

  const addFamilyMember = () => {
    setFamilyMembers([...familyMembers, { name: '', relation: '' }]);
  };

  const removeFamilyMember = (index) => {
    if (familyMembers.length > 1) {
      const updatedMembers = [...familyMembers];
      updatedMembers.splice(index, 1);
      setFamilyMembers(updatedMembers);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const memberData = {
      ...formData,
      familyMembers: familyMembers.filter(member => member.name && member.relation)
    };
    console.log('Submitted Data:', memberData);
    navigate('/members'); 
  };

  const relations = [
    'Spouse',
    'Child',
    'Parent',
    'Sibling',
    'Grandparent',
    'Grandchild',
    'Uncle/Aunt',
    'Nephew/Niece',
    'Cousin',
    'Other'
  ];

  const hasRedirected = useRef(false);

  useEffect(()=>{
    if(!user && !hasRedirected.current){
        hasRedirected.current = true;
        alert('You need to signup first!')
        navigate('/signup',{state:{from:location},replace:true});
      }
   },[user,navigate,location]);
 
  return (
    <>
    {user && 
    <Container maxWidth="md" sx={{ pt: 12, pb:2 }}>
      <Typography variant="h3" gutterBottom sx={{ 
        fontWeight: 700, 
        color: 'primary.main',
        mb: 4,
        textAlign: 'center'
      }}>
        Add yourself in great Cummunity of Pareek Samaj Hyderabad
      </Typography>

      <StyledPaper elevation={3}>
        <form onSubmit={handleSubmit}>
          {/* Profile Image Upload */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
            <StyledAvatar src={previewImage}>
              {!previewImage && <Person sx={{ fontSize: 60 }} />}
            </StyledAvatar>
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUpload />}
              sx={{ mt: 2 }}
            >
              Upload Photo
              <VisuallyHiddenInput 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
              />
            </Button>
            {previewImage && (
              <Chip
                label="Change Photo"
                onClick={() => document.querySelector('input[type="file"]').click()}
                sx={{ mt: 1 }}
              />
            )}
          </Box>

          {/* Personal Details */}
          <Typography variant="h5" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Person color="primary" /> Personal Information
          </Typography>
          
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Contact Number"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                required
                type="tel"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                multiline
                rows={3}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Home color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          {/* Family Members */}
          <Divider sx={{ my: 4 }} />
          
          <Typography variant="h5" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
            <FamilyRestroom color="primary" /> Family Members
          </Typography>

          {familyMembers.map((member, index) => (
            <Grid container spacing={2} key={index} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={5}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={member.name}
                  onChange={(e) => handleFamilyMemberChange(index, e)}
                  required={index === 0}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <FormControl fullWidth>
                  <InputLabel>Relation</InputLabel>
                  <Select
                    name="relation"
                    value={member.relation}
                    label="Relation"
                    onChange={(e) => handleFamilyMemberChange(index, e)}
                    required={index === 0}
                  >
                    {relations.map((relation) => (
                      <MenuItem key={relation} value={relation}>{relation}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={2} sx={{ display: 'flex', alignItems: 'center' }}>
                {familyMembers.length > 1 && (
                  <IconButton 
                    color="error" 
                    onClick={() => removeFamilyMember(index)}
                    sx={{ ml: 'auto' }}
                  >
                    <DeleteOutline />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          ))}

          <Button
            variant="outlined"
            startIcon={<AddCircleOutline />}
            onClick={addFamilyMember}
            sx={{ mb: 4 }}
          >
            Add Family Member
          </Button>

          {/* Form Actions */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate('/')}
              sx={{ px: 4 }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ px: 4 }}
            >
              Save Member
            </Button>
          </Box>
        </form>
      </StyledPaper>
    </Container>
}
      </>  
  );
};

export default NewMember;