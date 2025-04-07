import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  Avatar,
  IconButton,
  InputBase,
  Badge,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Switch,
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  AccountCircle as AccountIcon,
  Notifications as NotificationsIcon,
  Lock as LockIcon,
  Palette as PaletteIcon,
  Language as LanguageIcon,
  Devices as DevicesIcon,
  Help as HelpIcon,
  Save as SaveIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const SettingsSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 16,
  marginBottom: theme.spacing(3),
}));

const SettingItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2, 0),
  borderBottom: '1px solid #f1f5f9',
  '&:last-child': {
    borderBottom: 'none',
  }
}));

const SettingsPage = ({ onBack }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [language, setLanguage] = useState('english');
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: 'AUMS',
    lastName: 'redesign',
    email: 'aums@gmail.com',
    phone: '+91 9876543210',
    rollNumber: 'CB.SC.U4CSE24xxx',
    department: 'Computer Science and Engineering'
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Here you would typically save the data to a backend
  };

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      {/* Main content */}
      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton 
              onClick={onBack} 
              sx={{ mr: 2, backgroundColor: 'white', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1e293b' }}>Settings</Typography>
              <Typography variant="body1" color="text.secondary">Manage your account preferences</Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton sx={{ backgroundColor: 'white', ml: 1, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
              <Badge badgeContent={2} color="error">
                <NotificationsIcon sx={{ color: '#64748b' }} />
              </Badge>
            </IconButton>

            <Avatar
              alt="AUMS"
              src="/path-to-avatar.jpg"
              sx={{
                ml: 2,
                width: 42,
                height: 42,
                border: '2px solid #e2e8f0',
              }}
            />
          </Box>
        </Box>

        {/* Settings content */}
        <Grid container spacing={3}>
          {/* Left column - Profile */}
          <Grid item xs={12} md={5} lg={4}>
            <SettingsSection>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                <Avatar
                  alt="AUMS"
                  src="/path-to-avatar.jpg"
                  sx={{ width: 120, height: 120, mb: 2, border: '4px solid #e2e8f0' }}
                />
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  {formData.firstName} {formData.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {formData.rollNumber}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formData.department}
                </Typography>
              </Box>
              
              <Button 
                variant="contained" 
                fullWidth 
                sx={{ 
                  backgroundColor: '#4e36e9',
                  borderRadius: '8px',
                  textTransform: 'none',
                  py: 1.5,
                  '&:hover': {
                    backgroundColor: '#3c2bb3',
                  }
                }}
              >
                Change Profile Picture
              </Button>
              
              <Divider sx={{ my: 3 }} />
              
              <List sx={{ p: 0 }}>
                <ListItem button sx={{ borderRadius: '8px', mb: 1, '&:hover': { backgroundColor: '#f1f5f9' } }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <HelpIcon sx={{ color: '#64748b' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Help & Support" 
                    primaryTypographyProps={{ fontWeight: 'medium' }}
                  />
                </ListItem>
                
                <ListItem button sx={{ borderRadius: '8px', '&:hover': { backgroundColor: '#f1f5f9' } }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <LockIcon sx={{ color: '#64748b' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Privacy Policy" 
                    primaryTypographyProps={{ fontWeight: 'medium' }}
                  />
                </ListItem>
              </List>
            </SettingsSection>
          </Grid>

          {/* Right column - Settings */}
          <Grid item xs={12} md={7} lg={8}>
            {/* Account Information */}
            <SettingsSection>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccountIcon sx={{ color: '#4e36e9', mr: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Account Information
                  </Typography>
                </Box>
                <IconButton 
                  onClick={() => setIsEditing(!isEditing)}
                  sx={{ 
                    backgroundColor: isEditing ? '#4e36e9' : '#f1f5f9',
                    color: isEditing ? 'white' : '#64748b',
                    '&:hover': {
                      backgroundColor: isEditing ? '#3c2bb3' : '#e2e8f0',
                    }
                  }}
                >
                  {isEditing ? <SaveIcon onClick={handleSaveProfile} /> : <EditIcon />}
                </IconButton>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleFormChange}
                    disabled={!isEditing}
                    variant="outlined"
                    sx={{ mb: 3 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleFormChange}
                    disabled={!isEditing}
                    variant="outlined"
                    sx={{ mb: 3 }}
                  />
                </Grid>
              </Grid>

              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                disabled={!isEditing}
                variant="outlined"
                sx={{ mb: 3 }}
              />

              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
                disabled={!isEditing}
                variant="outlined"
                sx={{ mb: 3 }}
              />

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Roll Number"
                    name="rollNumber"
                    value={formData.rollNumber}
                    disabled={true} // Always disabled as it shouldn't be editable
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Department"
                    name="department"
                    value={formData.department}
                    disabled={true} // Always disabled as it shouldn't be editable
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </SettingsSection>

            {/* Notification Preferences */}
            <SettingsSection>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <NotificationsIcon sx={{ color: '#4e36e9', mr: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Notification Preferences
                </Typography>
              </Box>

              <SettingItem>
                <Typography variant="body1">Email Notifications</Typography>
                <Switch
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  color="primary"
                  sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#4e36e9' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#4e36e9' } }}
                />
              </SettingItem>

              <SettingItem>
                <Typography variant="body1">Push Notifications</Typography>
                <Switch
                  checked={pushNotifications}
                  onChange={(e) => setPushNotifications(e.target.checked)}
                  color="primary"
                  sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#4e36e9' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#4e36e9' } }}
                />
              </SettingItem>

              <SettingItem>
                <Typography variant="body1">SMS Notifications</Typography>
                <Switch
                  checked={smsNotifications}
                  onChange={(e) => setSmsNotifications(e.target.checked)}
                  color="primary"
                  sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#4e36e9' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#4e36e9' } }}
                />
              </SettingItem>
            </SettingsSection>

            {/* Appearance & Language */}
            <SettingsSection>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <PaletteIcon sx={{ color: '#4e36e9', mr: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Appearance & Language
                </Typography>
              </Box>

              <SettingItem>
                <Typography variant="body1">Dark Mode</Typography>
                <Switch
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                  color="primary"
                  sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#4e36e9' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#4e36e9' } }}
                />
              </SettingItem>

              <SettingItem sx={{ borderBottom: 'none' }}>
                <Typography variant="body1">Language</Typography>
                <FormControl sx={{ minWidth: 150 }}>
                  <Select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    displayEmpty
                    sx={{ 
                      height: 40, 
                      borderRadius: 2,
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#e2e8f0',
                      }
                    }}
                  >
                    <MenuItem value="english">English</MenuItem>
                    <MenuItem value="hindi">Hindi</MenuItem>
                    <MenuItem value="tamil">Tamil</MenuItem>
                    <MenuItem value="malayalam">Malayalam</MenuItem>
                  </Select>
                </FormControl>
              </SettingItem>
            </SettingsSection>

            {/* Security Settings */}
            <SettingsSection>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <LockIcon sx={{ color: '#4e36e9', mr: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Security Settings
                </Typography>
              </Box>

              <Button 
                variant="outlined" 
                sx={{ 
                  borderColor: '#4e36e9',
                  color: '#4e36e9',
                  borderRadius: '8px',
                  textTransform: 'none',
                  mr: 2,
                  '&:hover': {
                    borderColor: '#3c2bb3',
                    backgroundColor: 'rgba(78, 54, 233, 0.04)',
                  }
                }}
              >
                Change Password
              </Button>

              <Button 
                variant="outlined" 
                sx={{ 
                  borderColor: '#4e36e9',
                  color: '#4e36e9',
                  borderRadius: '8px',
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: '#3c2bb3',
                    backgroundColor: 'rgba(78, 54, 233, 0.04)',
                  }
                }}
              >
                Enable Two-Factor Authentication
              </Button>
            </SettingsSection>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SettingsPage;