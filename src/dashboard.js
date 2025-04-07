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
  CircularProgress,
  Button,
  Card,
  CardContent,
  Stack,
  Modal,
  Backdrop,
  Fade
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
  KeyboardArrowDown as ArrowDownIcon,
  KeyboardArrowRight as ArrowRightIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ProfilePage from './ProfilePage';
import CoursePage from './CoursePage';
import ActivityPage from './ActivityPage';
import TimeTablePage from './TimeTablePage';
import { Menu, MenuItem } from "@mui/material";
import Whiteboard from "./Whiteboard"
import SettingsPage from "./SettingsPage"
import { Check as CheckIcon } from '@mui/icons-material';



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

// Modal style
const ModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: '80%', md: '60%' },
  maxHeight: '80vh',
  bgcolor: 'background.paper',
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
  overflowY: 'auto'
};

// Sample data for charts
const performanceData = [
  { name: '23MAT116', yourMarks: 30, classAvg: 38 },
  { name: '23MAT117', yourMarks: 35, classAvg: 40 },
  { name: '23CSE111', yourMarks: 32, classAvg: 30 },
  { name: '23PHY115', yourMarks: 35, classAvg: 30 },
  { name: '23CSE113', yourMarks: 25, classAvg: 42 },
  { name: '23MEE115', yourMarks: 38, classAvg: 43 },
  { name: '22ADM111', yourMarks: 40, classAvg: 33 },
];

const assignmentsData = [
  { id: 1, course: '23CSE111', title: 'Polymorphism', time: 'Today, 15:36', status: 'pending' },
  { id: 2, course: '23CSE113', title: 'Javascript', time: 'Today, 08:49', status: 'due' },
  { id: 3, course: '22ADM111', title: 'Sloka Reciting', time: 'Yesterday, 14:36', status: 'done' },
];

// Extended assignments data for modal
const extendedAssignmentsData = [
  { id: 1, course: '23CSE111', title: 'Polymorphism', time: 'Today, 15:36', status: 'pending' },
  { id: 2, course: '23CSE113', title: 'Javascript', time: 'Today, 08:49', status: 'due' },
  { id: 3, course: '22ADM111', title: 'Sloka Reciting', time: 'Yesterday, 14:36', status: 'done' },
  { id: 4, course: '23MAT116', title: 'Calculus Assignment', time: 'Yesterday, 10:15', status: 'pending' },
  { id: 5, course: '23MAT117', title: 'Linear Algebra', time: '2 days ago, 17:20', status: 'done' },
  { id: 6, course: '23PHY115', title: 'Lab Report', time: '3 days ago, 09:30', status: 'due' },
  { id: 7, course: '23CSE113', title: 'Database Design', time: '3 days ago, 14:45', status: 'pending' },
  { id: 8, course: '23CSE111', title: 'Object Oriented Programming', time: '4 days ago, 11:30', status: 'done' },
  { id: 9, course: '23PHY115', title: 'Physics Problem Set', time: '5 days ago, 16:20', status: 'done' },
];

const tasksData = [
  { id: 1, title: '23CSE113 - Online Quiz', timeStart: '01:00 PM', timeEnd: '02:00 PM' },
  { id: 2, title: '23CSE111 - Lab Evaluation', timeStart: '02:00 PM', timeEnd: '03:00 PM' },
  { id: 3, title: '23PHY115 - Class Test', timeStart: '03:00 PM', timeEnd: '04:00 PM' },
];

// Extended tasks data for modal
const extendedTasksData = [
  { id: 1, title: '23CSE113 - Online Quiz', timeStart: '01:00 PM', timeEnd: '02:00 PM', date: 'Today' },
  { id: 2, title: '23CSE111 - Lab Evaluation', timeStart: '02:00 PM', timeEnd: '03:00 PM', date: 'Today' },
  { id: 3, title: '23PHY115 - Class Test', timeStart: '03:00 PM', timeEnd: '04:00 PM', date: 'Today' },
  { id: 4, title: '23MAT116 - Tutorial', timeStart: '10:00 AM', timeEnd: '11:30 AM', date: 'Tomorrow' },
  { id: 5, title: '23MAT117 - Midterm Exam', timeStart: '09:00 AM', timeEnd: '12:00 PM', date: 'Mar 2' },
  { id: 6, title: '23CSE113 - Project Submission', timeStart: '11:59 PM', timeEnd: '11:59 PM', date: 'Mar 3' },
  { id: 7, title: '22ADM111 - Group Discussion', timeStart: '02:00 PM', timeEnd: '04:00 PM', date: 'Mar 5' },
  { id: 8, title: '23PHY115 - Lab Experiment', timeStart: '01:30 PM', timeEnd: '04:30 PM', date: 'Mar 7' },
  { id: 9, title: '23CSE111 - Guest Lecture', timeStart: '11:00 AM', timeEnd: '12:30 PM', date: 'Mar 10' },
];

const Dashboard = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState("Choose course");
  const [attendance, setAttendance] = useState(0);
  
  // State for modals
  const [assignmentsModalOpen, setAssignmentsModalOpen] = useState(false);
  const [tasksModalOpen, setTasksModalOpen] = useState(false);

  const attendanceData = {
    "23MAT116": 85.5,
    "23MAT117": 72.3,
    "23CSE113": 90.1,
    "23CSE111": 78.4,
    "23PHY115": 65.0,
    "23MEE115": 88.2,
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (course) => {
    if (course) {
      setSelectedCourse(course);
      setAttendance(attendanceData[course] || 0);
    }
    setAnchorEl(null);
  };

  const [selectedItem, setSelectedItem] = useState('Dashboard');
  const [showProfile, setShowProfile] = useState(false);
  const [showCourses, setShowCourses] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [showTimeTable, setShowTimeTable] = useState(false);
  const [showWhiteboard, setShowWhiteboard] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Modal handlers
  const handleOpenAssignmentsModal = () => setAssignmentsModalOpen(true);
  const handleCloseAssignmentsModal = () => setAssignmentsModalOpen(false);
  const handleOpenTasksModal = () => setTasksModalOpen(true);
  const handleCloseTasksModal = () => setTasksModalOpen(false);

  const handleProfileClick = () => {
    setShowProfile(true);
  };

  const handleBackFromProfile = () => {
    setShowProfile(false);
  };

  const handleBackFromSettings = () => {
    setShowSettings(false);
  };

  const handleBoardClick = () => {
    setSelectedItem('Whiteboard');
    setShowWhiteboard(true);
  };

  const handleSettingsClick = () => {
    setSelectedItem('Settings');
    setShowSettings(true);
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

  if (showProfile) {
    return <ProfilePage onBack={handleBackFromProfile} />;
  }

  if (showSettings) {
    return <SettingsPage onBack={handleBackFromSettings}/>;
  }
  
  if (showWhiteboard) {
    return <Whiteboard onBack={handleBackFromBoard} />;
  }

  if (showCourses) {
    return <CoursePage onBack={handleBackFromCourses} />;
  }

  if (showActivity) {
    return <ActivityPage onBack={handleBackFromActivity} />;
  }

  if (showTimeTable) {
    return <TimeTablePage onBack={handleBackFromTime} />;
  }

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
            onClick={() => setSelectedItem('Dashboard')}
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
            onClick={handleCoursesClick}
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
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="body1" color="text.secondary">Hi User,</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1e293b' }}>Welcome to AUMS!</Typography>
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

            {/* Make avatar clickable to navigate to profile page */}
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

        {/* Dashboard content */}
        <Grid container spacing={3}>
          {/* Performance insights */}
          <Grid item xs={12} lg={8}>
            <Paper sx={{ p: 3, borderRadius: 4, mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Performance Insights</Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={performanceData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    barSize={20}
                    barGap={8}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="yourMarks" name="Your Marks" fill="#4e36e9" radius={[10, 10, 0, 0]} />
                    <Bar dataKey="classAvg" name="Class Avg" fill="#06b6d4" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Paper>

            <Grid container spacing={3}>
              {/* Attendance */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, borderRadius: 4 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Attendance</Typography>
                    <Button
                      variant="outlined"
                      endIcon={<ArrowDownIcon />}
                      sx={{
                        borderRadius: "20px",
                        textTransform: "none",
                        color: "#64748b",
                        borderColor: "#e2e8f0"
                      }}
                      onClick={handleClick}
                    >
                      {selectedCourse}
                    </Button>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => handleClose()}>
                      {["23MAT116", "23MAT117", "23CSE113", "23CSE111", "23PHY115", "23MEE115"].map((course) => (
                        <MenuItem key={course} onClick={() => handleClose(course)}>
                          {course}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>

                  <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', my: 4 }}>
                    <CircularProgress
                      variant="determinate"
                      value={attendance}
                      size={160}
                      thickness={5}
                      sx={{
                        color: '#4e36e9',
                        '& .MuiCircularProgress-circle': {
                          strokeLinecap: 'round',
                        }
                      }}
                    />
                    
                    <Box
                      sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column'
                      }}
                    >
                      <Typography variant="caption" sx={{ color: '#64748b' }}>Total</Typography>
                      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{attendance.toFixed(2)}%</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#4e36e9', mr: 1 }}></Box>
                      <Typography variant="body2" color="text.secondary">Present</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#e9d5ff', mr: 1 }}></Box>
                      <Typography variant="body2" color="text.secondary">Absent</Typography>
                    </Box>
                    <IconButton>
                      <ArrowRightIcon />
                    </IconButton>
                  </Box>
                </Paper>
              </Grid>

              {/* Assignments */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, borderRadius: 4, height: '100%' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Assignments</Typography>
                  </Box>

                  <Stack spacing={2}>
                    {assignmentsData.map((assignment) => (
                      <Box
                        key={assignment.id}
                        sx={{
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <Avatar
                          sx={{
                            bgcolor:
                              assignment.status === 'pending' ? '#fef3c7' :
                                assignment.status === 'due' ? '#fee2e2' : '#d1fae5',
                            color:
                              assignment.status === 'pending' ? '#f59e0b' :
                                assignment.status === 'due' ? '#ef4444' : '#10b981',
                            mr: 2
                          }}
                        >
                          {assignment.status === 'pending' && <TimelineIcon />}
                          {assignment.status === 'due' && <AssignmentIcon />}
                          {assignment.status === 'done' && <CheckIcon />}
                        </Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            {assignment.course} - {assignment.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {assignment.time}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            px: 2,
                            py: 0.5,
                            borderRadius: '20px',
                            bgcolor:
                              assignment.status === 'pending' ? '#fef3c7' :
                                assignment.status === 'due' ? '#fee2e2' : '#d1fae5',
                            color:
                              assignment.status === 'pending' ? '#f59e0b' :
                                assignment.status === 'due' ? '#ef4444' : '#10b981',
                            fontSize: '0.75rem',
                            fontWeight: 'bold'
                          }}
                        >
                          {assignment.status === 'pending' && 'Pending'}
                          {assignment.status === 'due' && 'Due'}
                          {assignment.status === 'done' && 'Done'}
                        </Box>
                      </Box>
                    ))}
                  </Stack>

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button
                      endIcon={<ArrowRightIcon />}
                      sx={{
                        color: '#4e36e9',
                        textTransform: 'none',
                        fontWeight: 'bold'
                      }}
                      onClick={handleOpenAssignmentsModal}
                    >
                      View all
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          {/* Profile and tasks */}
          <Grid item xs={12} lg={4}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 4,
                mb: 3,
                display: 'flex',
                flexDirection: 'column', alignItems: 'center'
              }}>
              <Avatar
                alt="AUMS"
                src="/path-to-avatar.jpg"
                sx={{ width: 100, height: 100, mb: 2 }}
              />
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 0.5 }}>AUMS</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>CB.SC.U4CSE24xxx</Typography>

              <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid item xs={4} sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">Semester</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>2</Typography>
                </Grid>
                <Grid item xs={4} sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">CGPA</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>9.1</Typography>
                </Grid>
                <Grid item xs={4} sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">Rank</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>4</Typography>
                </Grid>
              </Grid>
            </Paper>

            <Paper sx={{ p: 3, borderRadius: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>28 Feb</Typography>
              </Box>

              <Stack spacing={3}>
                {tasksData.map((task) => (
                  <Box
                    key={task.id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Box sx={{ width: 4, height: 36, backgroundColor: '#4e36e9', borderRadius: 4, mr: 2 }}></Box>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {task.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {task.timeStart} - {task.timeEnd}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  endIcon={<ArrowRightIcon />}
                  sx={{
                    color: '#4e36e9',
                    textTransform: 'none',
                    fontWeight: 'bold'
                  }}
                  onClick={handleOpenTasksModal}
                >
                  View all Tasks
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Assignments Modal */}
      <Modal
        open={assignmentsModalOpen}
        onClose={handleCloseAssignmentsModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          sx: { backdropFilter: 'blur(3px)' }
        }}
      >
        <Fade in={assignmentsModalOpen}>
          <Box sx={ModalStyle}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>All Assignments</Typography>
              <IconButton onClick={handleCloseAssignmentsModal} size="small" sx={{ bgcolor: '#f1f5f9' }}>
                <CloseIcon />
              </IconButton>
            </Box>
            
            <Divider sx={{ mb: 2 }} />
            
            <Stack spacing={2}>
              {extendedAssignmentsData.map((assignment) => (
                <Box
                  key={assignment.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 2,
                    borderRadius: 2,
                    bgcolor: '#f8fafc',
                    '&:hover': { bgcolor: '#f1f5f9' }
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor:
                        assignment.status === 'pending' ? '#fef3c7' :
                          assignment.status === 'due' ? '#fee2e2' : '#d1fae5',
                      color:
                        assignment.status === 'pending' ? '#f59e0b' :
                          assignment.status === 'due' ? '#ef4444' : '#10b981',
                      mr: 2
                    }}
                  >
                    {assignment.status === 'pending' && <TimelineIcon />}
                    {assignment.status === 'due' && <AssignmentIcon />}
                    {assignment.status === 'done' && <CheckIcon />}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {assignment.course} - {assignment.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {assignment.time}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      px: 2,
                      py: 0.5,
                      borderRadius: '20px',
                      bgcolor:
                        assignment.status === 'pending' ? '#fef3c7' :
                          assignment.status === 'due' ? '#fee2e2' : '#d1fae5',
                      color:
                        assignment.status === 'pending' ? '#f59e0b' :
                          assignment.status === 'due' ? '#ef4444' : '#10b981',
                      fontSize: '0.75rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {assignment.status === 'pending' && 'Pending'}
                    {assignment.status === 'due' && 'Due'}
                    {assignment.status === 'done' && 'Done'}
                  </Box>
                </Box>
              ))}
            </Stack>
          </Box>
        </Fade>
      </Modal>

      {/* Tasks Modal */}
      <Modal
        open={tasksModalOpen}
        onClose={handleCloseTasksModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          sx: { backdropFilter: 'blur(3px)' }
        }}
      >
        <Fade in={tasksModalOpen}>
          <Box sx={ModalStyle}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>All Tasks</Typography>
              <IconButton onClick={handleCloseTasksModal} size="small" sx={{ bgcolor: '#f1f5f9' }}>
                <CloseIcon />
              </IconButton>
            </Box>
            
            <Divider sx={{ mb: 2 }} />
            
            {/* Group tasks by date */}
            {Array.from(new Set(extendedTasksData.map(task => task.date))).map(date => (
              <Box key={date} sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>{date}</Typography>
                <Stack spacing={2}>
                  {extendedTasksData
                    .filter(task => task.date === date)
                    .map((task) => (
                      <Box
                        key={task.id}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          p: 2,
                          borderRadius: 2,
                          bgcolor: '#f8fafc',
                          '&:hover': { bgcolor: '#f1f5f9' }
                        }}
                      >
                        <Box sx={{ width: 4, height: 50, backgroundColor: '#4e36e9', borderRadius: 4, mr: 2 }}></Box>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            {task.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {task.timeStart} - {task.timeEnd}
                          </Typography>
                        </Box>
                        <Button
                          variant="outlined"
                          size="small"
                          sx={{
                            borderRadius: 2,
                            borderColor: '#e2e8f0',
                            color: '#64748b',
                            textTransform: 'none'
                          }}
                        >
                          Details
                        </Button>
                      </Box>
                    ))}
                </Stack>
              </Box>
            ))}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default Dashboard;