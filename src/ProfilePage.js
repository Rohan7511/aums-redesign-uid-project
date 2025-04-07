import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Grid, 
  Avatar, 
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ProfileTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 8,
    backgroundColor: '#f8fafc',
  },
}));

const ProfileButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#4e36e9',
  color: 'white',
  borderRadius: 10,
  textTransform: 'none',
  padding: '10px 20px',
  '&:hover': {
    backgroundColor: '#3a29b0',
  },
}));

const ProfilePage = ({ onBack }) => {
  const [profileImage, setProfileImage] = useState('/path-to-default-profile.jpg');
  const [formData, setFormData] = useState({
    name: 'Osama Bin Laden',
    email: 'Osama@example.com',
    phone: '+91 9876543210',
    degree: 'B.Tech Computer Science'
  });
  const [projects, setProjects] = useState([
    'Project A',
    'Project B'
  ]);
  const [newProject, setNewProject] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('Semester 1');

  const handleProfileImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleAddProject = () => {
    if (newProject.trim() === '') {
      alert('Please enter a project name before adding.');
      return;
    }
    setProjects([...projects, newProject]);
    setNewProject('');
  };

  const handleRemoveProject = (index) => {
    const updatedProjects = [...projects];
    updatedProjects.splice(index, 1);
    setProjects(updatedProjects);
  };

  const handleSemesterChange = (event) => {
    setSelectedSemester(event.target.value);
  };

  const handleSaveProfile = () => {
    // Here you would typically save the profile data to a backend
    alert('Profile saved successfully!');
  };

  return (
    <Box sx={{ 
      flexGrow: 1, 
      overflow: 'auto', 
      p: 3, 
      backgroundColor: '#f8fafc', 
      minHeight: '100vh' 
    }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <IconButton 
          onClick={onBack} 
          sx={{ 
            mr: 2, 
            backgroundColor: 'white',
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)'
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1e293b' }}>My Profile</Typography>
      </Box>

      {/* Profile Content */}
      <Grid container spacing={3}>
        {/* Profile Section */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 4, height: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <input
                accept="image/*"
                id="profile-image-input"
                type="file"
                onChange={handleProfileImageChange}
                style={{ display: 'none' }}
              />
              <label htmlFor="profile-image-input">
                <Avatar
                  src={profileImage}
                  sx={{ 
                    width: 150, 
                    height: 150, 
                    mb: 2,
                    cursor: 'pointer',
                    border: '3px solid #e2e8f0'
                  }}
                />
              </label>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                {formData.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                CB.SC.U4CSE24xxx
              </Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <ProfileTextField
                    id="name"
                    label="Name"
                    variant="outlined"
                    fullWidth
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ProfileTextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ProfileTextField
                    id="phone"
                    label="Phone"
                    variant="outlined"
                    fullWidth
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ProfileTextField
                    id="degree"
                    label="Degree"
                    variant="outlined"
                    fullWidth
                    value={formData.degree}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Last Login:</strong> March 21, 2025
                </Typography>
                <ProfileButton onClick={handleSaveProfile}>
                  Save
                </ProfileButton>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Grades and Projects Section */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            {/* Grades Card */}
            <Grid item xs={12}>
              <Paper sx={{ p: 3, borderRadius: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>Grades</Typography>
                
                <Grid container spacing={3} sx={{ mb: 3 }}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ 
                      p: 3, 
                      borderRadius: 4, 
                      bgcolor: '#f1f5f9',
                      textAlign: 'center'
                    }}>
                      <Typography variant="body2" color="text.secondary">Current CGPA</Typography>
                      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#4e36e9' }}>8.5</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ 
                      p: 3, 
                      borderRadius: 4, 
                      bgcolor: '#f1f5f9',
                      textAlign: 'center'
                    }}>
                      <Typography variant="body2" color="text.secondary">Current SGPA</Typography>
                      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#4e36e9' }}>8.7</Typography>
                    </Box>
                  </Grid>
                </Grid>
                
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel id="semester-select-label">View SGPA</InputLabel>
                    <Select
                      labelId="semester-select-label"
                      id="semester-select"
                      value={selectedSemester}
                      label="View SGPA"
                      onChange={handleSemesterChange}
                      sx={{ borderRadius: 2 }}
                    >
                      <MenuItem value="Semester 1">Semester 1</MenuItem>
                      <MenuItem value="Semester 2">Semester 2</MenuItem>
                    </Select>
                  </FormControl>
                  
                  <ProfileButton>
                    Calculate CGPA
                  </ProfileButton>
                </Box>
              </Paper>
            </Grid>
            
            {/* Projects Card */}
            <Grid item xs={12}>
              <Paper sx={{ p: 3, borderRadius: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>Projects</Typography>
                
                <List>
                  {projects.map((project, index) => (
                    <ListItem
                      key={index}
                      secondaryAction={
                        <IconButton edge="end" onClick={() => handleRemoveProject(index)}>
                          <DeleteIcon />
                        </IconButton>
                      }
                      sx={{ 
                        bgcolor: '#f1f5f9', 
                        borderRadius: 2, 
                        mb: 1,
                        '&:last-child': { mb: 0 }
                      }}
                    >
                      <Typography variant="body1">{project}</Typography>
                    </ListItem>
                  ))}
                </List>
                
                <Box sx={{ display: 'flex', mt: 3, gap: 2 }}>
                  <ProfileTextField
                    value={newProject}
                    onChange={(e) => setNewProject(e.target.value)}
                    placeholder="Enter project name"
                    fullWidth
                  />
                  <ProfileButton onClick={handleAddProject}>
                    Add Project
                  </ProfileButton>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;