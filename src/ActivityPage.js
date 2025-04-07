import React, { useState } from 'react';
import {
    Box,
    Typography,
    Container,
    Paper,
    Grid,
    Button,
    Avatar,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    IconButton,
    Badge,
    InputBase
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
    KeyboardArrowRight as ArrowRightIcon,
    Book as BookMenuIcon,
    Event as EventIcon,
    School as SchoolIcon,
    GroupWork as GroupWorkIcon,
    Camera as CameraIcon,
    KeyboardArrowDown as ArrowDownIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import ProfilePage from './ProfilePage';
import CoursePage from './CoursePage';
import TimeTablePage from './TimeTablePage';
import Whiteboard from "./Whiteboard";
import Dashboard from "./dashboard"



// Reuse the SidebarItem styling from Dashboard
const SidebarItem = styled(ListItem)(({ theme, selected }) => ({
    borderRadius: '8px',
    margin: '8px 0',
    backgroundColor: selected ? '#4e36e9' : 'transparent',
    color: selected ? 'white' : '#94a3b8',
    '&:hover': {
        backgroundColor: selected ? '#4e36e9' : '#f1f5f9',
    },
}));

// Reuse the SearchInput styling from Dashboard
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

const ActivityCard = styled(Paper)(({ theme }) => ({
    borderRadius: 16,
    padding: theme.spacing(3),
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
}));

const ActivityItem = styled(ListItem)(({ theme }) => ({
    paddingLeft: 0,
    paddingRight: 0,
    borderBottom: `1px solid ${theme.palette.divider}`,
    position: 'relative',
    '&:before': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 4,
        backgroundColor: '#4e36e9',
        borderRadius: 2,
    },
    '&:last-child': {
        borderBottom: 'none'
    },
    paddingLeft: theme.spacing(3),
}));

const ActivityPage = ({ onBack }) => {
    const [selectedItem, setSelectedItem] = useState('Activity');
    const [showProfile, setShowProfile] = useState(false);
    const [showCourses, setShowCourses] = useState(false);
    const [showActivity, setShowActivity] = useState(false);
    const [showTimeTable, setShowTimeTable] = useState(false);
    const [showWhiteboard, setShowWhiteboard] = useState(false);
    const [showDashboard, setShowDashboard] = useState(false);





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

    if (showProfile) {
        return <ProfilePage onBack={handleBackFromProfile} />;
    }

    if (showWhiteboard) {
        return <Whiteboard onBack={handleBackFromBoard} />;
    }

    if (showCourses) {
        return <CoursePage onBack={handleBackFromCourses} />;
    }

    if (showDashboard) {
        return <Dashboard/>;
    }

    if (showActivity) {
        return <ActivityPage onBack={handleBackFromActivity} />;
    }

    if (showTimeTable) {
        return <TimeTablePage onBack={handleBackFromTime} />;
    }

    const attendanceSummary = [
        { course: '23CSE113', lastAttended: '05/05/2025' },
        { course: '23CSE111', lastAttended: '04/05/2025' },
        { course: '23PHY115', lastAttended: '03/05/2025' },
        { course: '23MAT117', lastAttended: '02/05/2025' },
        { course: '24MAT116', lastAttended: '01/05/2025' }
    ];

    const libraryLog = [
        { book: 'Quantum Computing', status: 'Borrowed' },
        { book: 'Discrete Mathematics - Rosen', status: 'Renewed' },
        { book: 'Introduction to JAVA - Mcgraw', status: 'Returned' }
    ];

    const eventsParticipated = [
        { name: 'Anokha - CFT', date: '20/03/2025 09:00 PM' },
        { name: 'Anokha - Treasure Hunt', date: '19/03/2025 08:30 PM' },
        { name: 'Hackathon 2025', date: '15/03/2025 09:00 PM' }
    ];

    const workshopsAttended = [
        { name: 'Kubernetes', date: '10/03/2025 05:00 PM' },
        { name: 'Machine Learning', date: '05/03/2025 04:00 PM' },
        { name: 'Introduction to Artificial Intelligence', date: '01/03/2025 14:30 PM' }
    ];

    const clubsJoined = [
        { name: 'Intel IoT Club', joinedDate: '15/01/2025' },
        { name: 'Webdev Learning @ IIC', joinedDate: '07/02/2025' },
        { name: 'AI/ML Learning @ IIC', joinedDate: '05/02/2025' }
    ];


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
                        onClick={() => setSelectedItem('Settings')}
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
                        <Typography variant="body1" color="text.secondary">Hi Osama,</Typography>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1e293b' }}>Welcome to Your Activity!</Typography>
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
                            alt="Osama Bin Laden"
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

                {/* Existing Activity Page Content */}
                <Grid container spacing={3}>
                    {/* Attendance Summary */}
                    <Grid item xs={12} md={4}>
                        <ActivityCard>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                                Attendance Summary
                            </Typography>
                            <List>
                                {attendanceSummary.map((item, index) => (
                                    <ActivityItem key={index}>
                                        <ListItemText
                                            primary={item.course}
                                            secondary={`Last attended on ${item.lastAttended}`}
                                        />
                                    </ActivityItem>
                                ))}
                            </List>
                            <Button
                                endIcon={<ArrowRightIcon />}
                                sx={{
                                    color: '#4e36e9',
                                    textTransform: 'none',
                                    alignSelf: 'flex-end',
                                    mt: 'auto'
                                }}
                            >
                                View full Summary
                            </Button>
                        </ActivityCard>
                    </Grid>

                    {/* Library Log */}
                    <Grid item xs={12} md={4}>
                        <ActivityCard>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                                Library Log
                            </Typography>
                            <List>
                                {libraryLog.map((item, index) => (
                                    <ActivityItem key={index}>
                                        <ListItemIcon>
                                            <BookIcon color="primary" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={item.book}
                                            secondary={item.status}
                                        />
                                    </ActivityItem>
                                ))}
                            </List>
                            <Button
                                endIcon={<ArrowRightIcon />}
                                sx={{
                                    color: '#4e36e9',
                                    textTransform: 'none',
                                    alignSelf: 'flex-end',
                                    mt: 'auto'
                                }}
                            >
                                View all Books
                            </Button>
                        </ActivityCard>
                    </Grid>

                    {/* Events Participated */}
                    <Grid item xs={12} md={4}>
                        <ActivityCard>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                                Events Participated
                            </Typography>
                            <List>
                                {eventsParticipated.map((event, index) => (
                                    <ActivityItem key={index}>
                                        <ListItemIcon>
                                            <EventIcon color="primary" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={event.name}
                                            secondary={event.date}
                                        />
                                    </ActivityItem>
                                ))}
                            </List>
                            <Button
                                endIcon={<ArrowRightIcon />}
                                sx={{
                                    color: '#4e36e9',
                                    textTransform: 'none',
                                    alignSelf: 'flex-end',
                                    mt: 'auto'
                                }}
                            >
                                View all Events
                            </Button>
                        </ActivityCard>
                    </Grid>

                    {/* Workshops Attended */}
                    <Grid item xs={12} md={4}>
                        <ActivityCard>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                                Workshops Attended
                            </Typography>
                            <List>
                                {workshopsAttended.map((workshop, index) => (
                                    <ActivityItem key={index}>
                                        <ListItemIcon>
                                            <SchoolIcon color="primary" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={workshop.name}
                                            secondary={workshop.date}
                                        />
                                    </ActivityItem>
                                ))}
                            </List>
                            <Button
                                endIcon={<ArrowRightIcon />}
                                sx={{
                                    color: '#4e36e9',
                                    textTransform: 'none',
                                    alignSelf: 'flex-end',
                                    mt: 'auto'
                                }}
                            >
                                View all Workshops
                            </Button>
                        </ActivityCard>
                    </Grid>

                    {/* Clubs Joined */}
                    <Grid item xs={12} md={4}>
                        <ActivityCard>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                                Clubs Joined
                            </Typography>
                            <List>
                                {clubsJoined.map((club, index) => (
                                    <ActivityItem key={index}>
                                        <ListItemIcon>
                                            <GroupWorkIcon color="primary" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={club.name}
                                            secondary={`Joined on ${club.joinedDate}`}
                                        />
                                    </ActivityItem>
                                ))}
                            </List>
                            <Button
                                endIcon={<ArrowRightIcon />}
                                sx={{
                                    color: '#4e36e9',
                                    textTransform: 'none',
                                    alignSelf: 'flex-end',
                                    mt: 'auto'
                                }}
                            >
                                View all Clubs
                            </Button>
                        </ActivityCard>
                    </Grid>

                    {/* Memories & Moments */}
                    <Grid item xs={12} md={4}>
                        <ActivityCard>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                                Memories & Moments
                            </Typography>
                            <Box
                                sx={{
                                    position: 'relative',
                                    height: 250,
                                    borderRadius: 4,
                                    overflow: 'hidden'
                                }}
                            >
                                <img
                                    src="/path-to-group-photo.jpg"
                                    alt="Group Photo"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                                <Button
                                    startIcon={<CameraIcon />}
                                    sx={{
                                        position: 'absolute',
                                        bottom: 10,
                                        right: 10,
                                        backgroundColor: 'rgba(78, 54, 233, 0.8)',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: 'rgba(78, 54, 233, 1)'
                                        }
                                    }}
                                >
                                    View gallery
                                </Button>
                            </Box>
                        </ActivityCard>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default ActivityPage;