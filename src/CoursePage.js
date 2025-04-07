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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  TextField,
  Checkbox,
  Badge,
  Divider,
  styled
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Timeline as TimelineIcon,
  Book as BookIcon,
  Assignment as AssignmentIcon,
  CalendarToday as CalendarIcon,
  AttachMoney as MoneyIcon,
  Settings as SettingsIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  ExitToApp as LogoutIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Check as CheckIcon
} from '@mui/icons-material';
import ProfilePage from './ProfilePage';
import ActivityPage from './ActivityPage';
import TimeTablePage from './TimeTablePage';
import Whiteboard from "./Whiteboard";
import Dashboard from "./dashboard";
import SettingsPage from "./SettingsPage";


// Copy the SidebarItem styled component from Dashboard.js
const SidebarItem = styled(ListItem)(({ theme, selected }) => ({
  borderRadius: '8px',
  margin: '8px 0',
  backgroundColor: selected ? '#4e36e9' : 'transparent',
  color: selected ? 'white' : '#94a3b8',
  '&:hover': {
    backgroundColor: selected ? '#4e36e9' : '#f1f5f9',
  },
}));

const SearchInput = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 24,
  backgroundColor: '#f1f5f9',
  '&:hover': {
    backgroundColor: '#f8fafc',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#94a3b8',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
  },
}));

const CalendarDay = styled(Box)(({ theme, istoday, isselected }) => ({
  padding: theme.spacing(1),
  cursor: 'pointer',
  borderRadius: '5px',
  backgroundColor: isselected === 'true'
    ? '#007BFF'
    : istoday === 'true'
      ? '#1E2A78'
      : 'transparent',
  color: (istoday === 'true' || isselected === 'true') ? 'white' : 'inherit',
  '&:hover': {
    backgroundColor: (!istoday && !isselected) ? '#f1f5f9' : undefined,
  },
}));

const CoursePage = ({ onBack }) => {
  const [selectedItem, setSelectedItem] = useState('Courses'); // Default selected item is Courses
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [newEventDate, setNewEventDate] = useState('');
  const [newEventText, setNewEventText] = useState('');
  const [semester, setSemester] = useState('');
  const [course, setCourse] = useState('');
  const [contentType, setContentType] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [showCourses, setShowCourses] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [showTimeTable, setShowTimeTable] = useState(false);
  const [showWhiteboard, setShowWhiteboard] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleBackFromSettings = () => {
    setShowSettings(false);
  };
  const handleSettingsClick = () => {
    setSelectedItem('Settings');
    setShowSettings(true);
  };

  const handleProfileClick = () => {
    setShowProfile(true);
  };

  const handleDashClick = () => {
    setSelectedItem('Dashboard')
    setShowDashboard(true);
  };

  const handleBackFromProfile = () => {
    setShowProfile(false);
  };

  const handleBoardClick = () => {
    setSelectedItem('Whiteboard');
    setShowWhiteboard(true);
  };

  const handleCoursesClick = () => {
    setSelectedItem('Courses');
    setShowCourses(true);
  };

  const handleActivityClick = () => {
    setSelectedItem('Activity');
    setShowActivity(true);
  };

  const handleTimeClick = () => {
    setSelectedItem('TimeTablePage');
    setShowTimeTable(true);
  };

  // Add this new handler function
  const handleBackFromCourses = () => {
    setShowCourses(false);
  };

  const handleBackFromActivity = () => {
    setShowActivity(false);
  };

  const handleBackFromTime = () => {
    setShowTimeTable(false);
  };

  const handleBackFromBoard = () => {
    setShowWhiteboard(false);
  };

  const handleBackFromDash = () => {
    setShowDashboard(false);
  };

  if (showProfile) {
    return <ProfilePage onBack={handleBackFromProfile} />;
  }

  if (showWhiteboard) {
    return <Whiteboard onBack={handleBackFromBoard} />;
  }

  if (showCourses) {
    return <CoursePage onBack={handleBackFromCourses} />;
  }

  if (showSettings) {
    return <SettingsPage onBack={handleBackFromSettings}/>;
  }

  if (showActivity) {
    return <ActivityPage onBack={handleBackFromActivity} />;
  }

  if (showTimeTable) {
    return <TimeTablePage onBack={handleBackFromTime} />;
  }

  if (showDashboard) {
    return <Dashboard onBack={handleBackFromDash} />;
  }

  // Calendar functions
  const renderCalendar = () => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];

    // Empty cells for days before the first of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<Box key={`empty-${i}`}></Box>);
    }

    // Cells for days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isToday = isCurrentDay(day);
      const isSelected = selectedDay === dateStr;

      days.push(
        <CalendarDay
          key={day}
          istoday={isToday.toString()}
          isselected={isSelected.toString()}
          onClick={() => showEvents(dateStr)}
        >
          {day}
        </CalendarDay>
      );
    }

    return {
      monthYear: `${monthNames[month]} ${year}`,
      days: days
    };
  };

  const isCurrentDay = (day) => {
    const today = new Date();
    return (
      currentDate.getFullYear() === today.getFullYear() &&
      currentDate.getMonth() === today.getMonth() &&
      day === today.getDate()
    );
  };

  const showEvents = (date) => {
    setSelectedDay(date);
  };

  const prevMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };

  const nextMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  const addEvent = () => {
    if (!newEventDate || !newEventText) return;

    setEvents(prev => {
      const updatedEvents = { ...prev };
      if (!updatedEvents[newEventDate]) {
        updatedEvents[newEventDate] = [];
      }
      updatedEvents[newEventDate].push({
        text: newEventText,
        completed: false
      });
      return updatedEvents;
    });

    setNewEventText('');
    setSelectedDay(newEventDate);
  };

  const toggleEventCompletion = (date, index) => {
    setEvents(prev => {
      const updatedEvents = { ...prev };
      if (updatedEvents[date] && updatedEvents[date][index]) {
        updatedEvents[date][index].completed = !updatedEvents[date][index].completed;
      }
      return updatedEvents;
    });
  };

  const calendar = renderCalendar();

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 280,
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
          p: 2,
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        }}
      >
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Avatar sx={{ bgcolor: '#4e36e9', width: 50, height: 50, borderRadius: '12px' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'white' }}>A</Typography>
          </Avatar>
          <Box sx={{ ml: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#4e36e9', lineHeight: 1.2 }}>AMRITA</Typography>
            <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.7rem' }}>University Management System</Typography>
          </Box>
        </Box>

        {/* Navigation items */}
        <List sx={{ px: 1 }}>
          <SidebarItem
            button
            selected={selectedItem === 'Dashboard'}
            onClick={handleDashClick}
          >
            <ListItemIcon sx={{ color: selectedItem === 'Dashboard' ? 'white' : '#94a3b8', minWidth: 40 }}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </SidebarItem>

          <SidebarItem
            button
            selected={selectedItem === 'Activity'}
            onClick={handleActivityClick}
          >
            <ListItemIcon sx={{ color: selectedItem === 'Activity' ? 'white' : '#94a3b8', minWidth: 40 }}>
              <TimelineIcon />
            </ListItemIcon>
            <ListItemText primary="Activity" />
          </SidebarItem>

          <SidebarItem
            button
            selected={selectedItem === 'Courses'}
            onClick={handleCoursesClick} // Changed from setSelectedItem('Courses')
          >
            <ListItemIcon sx={{ color: selectedItem === 'Courses' ? 'white' : '#94a3b8', minWidth: 40 }}>
              <BookIcon />
            </ListItemIcon>
            <ListItemText primary="Courses" />
          </SidebarItem>

          <SidebarItem
            button
            selected={selectedItem === 'Whiteboard'}
            onClick={handleBoardClick}
          >
            <ListItemIcon sx={{ color: selectedItem === 'Whiteboard' ? 'white' : '#94a3b8', minWidth: 40 }}>
              <CalendarIcon />
            </ListItemIcon>
            <ListItemText primary="Whiteboard" />
          </SidebarItem>

          <SidebarItem
            button
            selected={selectedItem === 'TimeTable'}
            onClick={handleTimeClick}
          >
            <ListItemIcon sx={{ color: selectedItem === 'TimeTable' ? 'white' : '#94a3b8', minWidth: 40 }}>
              <MoneyIcon />
            </ListItemIcon>
            <ListItemText primary="TimeTable" />
          </SidebarItem>

          <SidebarItem
            button
            selected={selectedItem === 'Settings'}
            onClick={handleSettingsClick}
          >
            <ListItemIcon sx={{ color: selectedItem === 'Settings' ? 'white' : '#94a3b8', minWidth: 40 }}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </SidebarItem>
        </List>

        <Box sx={{ mt: 'auto', mb: 2 }}>
          <SidebarItem button>
            <ListItemIcon sx={{ color: '#94a3b8', minWidth: 40 }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </SidebarItem>
        </Box>
      </Box>

      {/* Main content */}
      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 3 }}>
        {/* Header/Top Bar */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="body1" color="text.secondary">Hi User,</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1e293b' }}>Your Courses</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SearchInput>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search"
                inputProps={{ 'aria-label': 'search' }}
              />
            </SearchInput>

            <IconButton sx={{ backgroundColor: 'white', ml: 1, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
              <SettingsIcon sx={{ color: '#64748b' }} />
            </IconButton>

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
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: '0 0 0 2px #4e36e9'
                }
              }}
              onClick={handleProfileClick}
            />
          </Box>
        </Box>

        {/* Course content */}
        <Grid container spacing={3}>
          {/* Main Content Area */}
          <Grid item xs={12} lg={8}>
            <Paper sx={{
              p: 3,
              borderRadius: 4,
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
              backgroundColor: 'white'
            }}>
              {/* Course Selection */}
              <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="semester-label">Choose the Semester</InputLabel>
                    <Select
                      labelId="semester-label"
                      id="semester"
                      value={semester}
                      onChange={(e) => setSemester(e.target.value)}
                      label="Choose the Semester"
                      sx={{ height: '56px', borderRadius: '6px' }}
                    >
                      <MenuItem value="">Select</MenuItem>
                      <MenuItem value="Semester 1">Semester 1</MenuItem>
                      <MenuItem value="Semester 2">Semester 2</MenuItem>
                      <MenuItem value="Semester 3">Semester 3</MenuItem>
                      <MenuItem value="Semester 4">Semester 4</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={4}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="course-label">Choose the Course</InputLabel>
                    <Select
                      labelId="course-label"
                      id="course"
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                      label="Choose the Course"
                      sx={{ height: '56px', borderRadius: '6px' }}
                    >
                      <MenuItem value="">Select</MenuItem>
                      <MenuItem value="23MAT116">23MAT116</MenuItem>
                      <MenuItem value="23MAT117">23MAT117</MenuItem>
                      <MenuItem value="23CSE111">23CSE111</MenuItem>
                      <MenuItem value="23PHY115">23PHY115</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={4}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="content-label">Choose</InputLabel>
                    <Select
                      labelId="content-label"
                      id="choose"
                      value={contentType}
                      onChange={(e) => setContentType(e.target.value)}
                      label="Choose"
                      sx={{ height: '56px', borderRadius: '6px' }}
                    >
                      <MenuItem value="">Select</MenuItem>
                      <MenuItem value="Resources">Resources</MenuItem>
                      <MenuItem value="Tests & Quizzes">Tests & Quizzes</MenuItem>
                      <MenuItem value="Assignments">Assignments</MenuItem>
                      <MenuItem value="Announcements">Announcements</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              {/* Content Box */}
              <Paper
                sx={{
                  width: '100%',
                  height: '350px',
                  borderRadius: 2,
                  border: '1px solid #D3D3D3',
                  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                  p: 2
                }}
              >
                <Typography variant="h6" sx={{ color: '#1E2A78', mb: 1 }}>
                  {contentType ? `${course || 'Course'} - ${contentType}` : 'Select options above to view content'}
                </Typography>

                {/* This is where course-specific content would be rendered */}
                {(!semester || !course || !contentType) && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80%' }}>
                    <Typography color="text.secondary">
                      Please select semester, course, and content type to view materials
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Paper>
          </Grid>

          {/* Calendar Sidebar */}
          <Grid item xs={12} lg={4}>
            <Paper sx={{
              p: 3,
              borderRadius: 4,
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
              backgroundColor: 'white',
              display: 'flex',
              flexDirection: 'column',
            }}>
              {/* Calendar Header */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <IconButton onClick={prevMonth}>
                  <ArrowBackIcon />
                </IconButton>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1E2A78' }}>
                  {calendar.monthYear}
                </Typography>
                <IconButton onClick={nextMonth}>
                  <ArrowForwardIcon />
                </IconButton>
              </Box>

              {/* Calendar Grid */}
              <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                textAlign: 'center',
                mb: 2
              }}>
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                  <Typography key={index} sx={{ fontWeight: 'bold', p: 1 }}>
                    {day}
                  </Typography>
                ))}
                {calendar.days}
              </Box>

              {/* Events List */}
              <Typography variant="h6" sx={{ mb: 1, color: '#1E2A78' }}>
                {selectedDay ? `Events for ${new Date(selectedDay).toLocaleDateString()}` : 'Events'}
              </Typography>

              <List sx={{ mb: 2, maxHeight: '150px', overflow: 'auto' }}>
                {selectedDay && events[selectedDay] && events[selectedDay].length > 0 ? (
                  events[selectedDay].map((event, index) => (
                    <ListItem
                      key={index}
                      secondaryAction={
                        <Checkbox
                          edge="end"
                          onChange={() => toggleEventCompletion(selectedDay, index)}
                          checked={event.completed}
                          icon={<CheckIcon />}
                          checkedIcon={<CheckIcon />}
                        />
                      }
                      sx={{
                        textDecoration: event.completed ? 'line-through' : 'none',
                        color: event.completed ? 'gray' : 'inherit',
                        borderBottom: '1px solid #D3D3D3'
                      }}
                    >
                      <ListItemText primary={event.text} />
                    </ListItem>
                  ))
                ) : (
                  <ListItem>
                    <ListItemText
                      primary={selectedDay ? "No events scheduled." : "Select a date to view events"}
                      primaryTypographics={{ color: 'text.secondary' }}
                    />
                  </ListItem>
                )}
              </List>

              {/* Add Event Form */}
              <Box sx={{ mt: 'auto' }}>
                <TextField
                  fullWidth
                  size="small"
                  type="date"
                  value={newEventDate}
                  onChange={(e) => setNewEventDate(e.target.value)}
                  sx={{ mb: 2 }}
                />

                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter event"
                  value={newEventText}
                  onChange={(e) => setNewEventText(e.target.value)}
                  sx={{ mb: 2 }}
                />

                <Button
                  fullWidth
                  variant="contained"
                  onClick={addEvent}
                  sx={{
                    backgroundColor: '#1E2A78',
                    '&:hover': {
                      backgroundColor: '#151e54',
                    }
                  }}
                >
                  Add Event
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CoursePage;