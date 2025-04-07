import React, { useState } from 'react';
import {
    Box,
    Typography,
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
    CircularProgress,
    Button,
    FormControl,
    Select,
    MenuItem,
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
    KeyboardArrowRight as ArrowRightIcon
} from '@mui/icons-material';
import ProfilePage from './ProfilePage';
import CoursePage from './CoursePage';
import ActivityPage from './ActivityPage';
import Whiteboard from "./Whiteboard";
import Dashboard from "./dashboard"

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

const StyledSelect = styled(Select)(({ theme }) => ({
    width: '100%',
    height: 40,
    borderRadius: 6,
    backgroundColor: 'white',
    color: '#1E2A78',
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#D3D3D3',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#4e36e9',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#4e36e9',
    },
}));

const ContentBox = styled(Paper)(({ theme }) => ({
    width: '100%',
    height: 350,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginTop: theme.spacing(2),
    border: '1px solid #D3D3D3',
}));

const TimeTablePage = () => {
    const [selectedItem, setSelectedItem] = useState('TimeTable');
    const [semester, setSemester] = useState('');
    const [branch, setBranch] = useState('');
    const [section, setSection] = useState('');
    const [timetableImage, setTimetableImage] = useState(null);
    const [showProfile, setShowProfile] = useState(false);
    const [showCourses, setShowCourses] = useState(false);
    const [showActivity, setShowActivity] = useState(false);
    const [showTimeTable, setShowTimeTable] = useState(false);
    const [showWhiteboard, setShowWhiteboard] = useState(false);
    const [showDashboard, setShowDashboard] = useState(false);


    const handleTimetableDisplay = () => {
        if (semester && branch && section) {
            const imagePath = `C:/Rohan/aums-electron/public/timetables/cse/sem2/a.png`;
            setTimetableImage(imagePath);
        }
    };


    const handleProfileClick = () => {
        setShowProfile(true);
    };

    const handleBackFromProfile = () => {
        setShowProfile(false);
    };

    const handleBoardClick = () => {
        setSelectedItem('Whiteboard');
        setShowWhiteboard(true);
    };

    const handleDashClick = () => {
        setSelectedItem('Dashboard')
        setShowDashboard(true);
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

    if (showActivity) {
        return <ActivityPage onBack={handleBackFromActivity} />;
    }

    if (showTimeTable) {
        return <TimeTablePage onBack={handleBackFromTime} />;
    }

    if (showDashboard){
        return <Dashboard onBack={handleDashClick} />;
      }

    const handleSemesterChange = (event) => {
        setSemester(event.target.value);
        setTimeout(() => {
            if (event.target.value && branch && section) {
                handleTimetableDisplay();
            }
        }, 0);
    };

    const handleBranchChange = (event) => {
        setBranch(event.target.value);
        setTimeout(() => {
            if (semester && event.target.value && section) {
                handleTimetableDisplay();
            }
        }, 0);
    };

    const handleSectionChange = (event) => {
        setSection(event.target.value);
        setTimeout(() => {
            if (semester && branch && event.target.value) {
                handleTimetableDisplay();
            }
        }, 0);
    };

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
                        <Typography variant="body1" color="text.secondary">Hi User,</Typography>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1e293b' }}>Time Table</Typography>
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

                {/* Timetable content */}
                <Paper sx={{ p: 3, borderRadius: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, color: '#1E2A78' }}>
                        View Your Time Table
                    </Typography>

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#1E2A78', mb: 1 }}>
                                    Choose the Semester
                                </Typography>
                                <FormControl fullWidth>
                                    <StyledSelect
                                        value={semester}
                                        onChange={handleSemesterChange}
                                        displayEmpty
                                    >
                                        <MenuItem value="">Select</MenuItem>
                                        <MenuItem value="sem1">Semester 1</MenuItem>
                                        <MenuItem value="sem2">Semester 2</MenuItem>
                                        <MenuItem value="sem3">Semester 3</MenuItem>
                                        <MenuItem value="sem4">Semester 4</MenuItem>
                                        <MenuItem value="sem5">Semester 5</MenuItem>
                                        <MenuItem value="sem6">Semester 6</MenuItem>
                                        <MenuItem value="sem7">Semester 7</MenuItem>
                                        <MenuItem value="sem8">Semester 8</MenuItem>
                                    </StyledSelect>
                                </FormControl>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#1E2A78', mb: 1 }}>
                                    Choose your Branch
                                </Typography>
                                <FormControl fullWidth>
                                    <StyledSelect
                                        value={branch}
                                        onChange={handleBranchChange}
                                        displayEmpty
                                    >
                                        <MenuItem value="">Select</MenuItem>
                                        <MenuItem value="cse">CSE</MenuItem>
                                        <MenuItem value="ece">ECE</MenuItem>
                                        <MenuItem value="eee">EEE</MenuItem>
                                        <MenuItem value="mech">Mechanical</MenuItem>
                                        <MenuItem value="civil">Civil</MenuItem>
                                        <MenuItem value="chem">Chemical</MenuItem>
                                    </StyledSelect>
                                </FormControl>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#1E2A78', mb: 1 }}>
                                    Choose your Section
                                </Typography>
                                <FormControl fullWidth>
                                    <StyledSelect
                                        value={section}
                                        onChange={handleSectionChange}
                                        displayEmpty
                                    >
                                        <MenuItem value="">Select</MenuItem>
                                        <MenuItem value="a">Section A</MenuItem>
                                        <MenuItem value="b">Section B</MenuItem>
                                        <MenuItem value="c">Section C</MenuItem>
                                        <MenuItem value="d">Section D</MenuItem>
                                    </StyledSelect>
                                </FormControl>
                            </Box>
                        </Grid>
                    </Grid>

                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleTimetableDisplay}
                            disabled={!semester || !branch || !section}
                            sx={{
                                bgcolor: '#4e36e9',
                                '&:hover': {
                                    bgcolor: '#3a2ab8',
                                }
                            }}
                        >
                            Show Timetable
                        </Button>
                    </Box>

                    <ContentBox>
                        {timetableImage ? (
                            <img
                                src={timetableImage}
                                alt="Timetable"
                                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                            />
                        ) : (
                            <Typography variant="body1" color="text.secondary">
                                Please select semester, branch, and section to view your timetable
                            </Typography>
                        )}
                    </ContentBox>

                    
                </Paper>
            </Box>
        </Box>
        
    );
};

export default TimeTablePage;
