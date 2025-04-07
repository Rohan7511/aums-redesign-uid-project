import React, { useState, useRef, useEffect } from 'react';
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
    Button,
    Menu,
    MenuItem,
    Tooltip,
    Select,
    FormControl,
    Tab,
    Tabs,
    Slider
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
    Home as HomeIcon,
    Add as AddIcon,
    FormatBold as BoldIcon,
    FormatItalic as ItalicIcon,
    FormatUnderlined as UnderlinedIcon,
    FormatAlignLeft as AlignLeftIcon,
    FormatAlignCenter as AlignCenterIcon,
    FormatAlignRight as AlignRightIcon,
    FormatAlignJustify as AlignJustifyIcon,
    KeyboardVoice as VoiceIcon,
    ArrowDropDown as ArrowDropDownIcon,
    TextFormat as TextFormatIcon,
    Undo as UndoIcon,
    Redo as RedoIcon,
    FormatListBulleted as BulletedListIcon,
    FormatListNumbered as NumberedListIcon,
    FormatColorText as ColorTextIcon,
    BorderColor as BorderColorIcon,
    ZoomIn as ZoomInIcon,
    ZoomOut as ZoomOutIcon,
    InsertLink as InsertLinkIcon,
    InsertPhoto as InsertPhotoIcon,
    InsertComment as InsertCommentIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import ProfilePage from './ProfilePage';
import CoursePage from './CoursePage';
import ActivityPage from './ActivityPage';
import TimeTablePage from './TimeTablePage';
import Dashboard from "./dashboard"


// Sidebar item styling from the original dashboard
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

// Whiteboard specific styled components
const MenuTab = styled(Button)(({ theme, selected }) => ({
    textTransform: 'none',
    minWidth: 'unset',
    padding: '6px 12px',
    borderRadius: 0,
    borderBottom: selected ? '2px solid #4e36e9' : '2px solid transparent',
    color: selected ? '#1e293b' : '#64748b',
    '&:hover': {
        backgroundColor: 'transparent',
        color: '#1e293b',
    },
}));

const ToolbarButton = styled(Button)(({ theme }) => ({
    minWidth: 'unset',
    padding: '4px 8px',
    borderRadius: '4px',
    color: '#64748b',
    '&:hover': {
        backgroundColor: '#f1f5f9',
    },
}));

const FormatToolbarButton = styled(IconButton)(({ theme }) => ({
    padding: '6px',
    color: '#64748b',
    borderRadius: '4px',
}));

const WhiteboardContainer = styled(Paper)(({ theme }) => ({
    backgroundColor: 'white',
    borderRadius: '8px',
    height: '100%',
    overflow: 'hidden',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
}));

const WhiteboardCanvas = styled(Box)(({ theme }) => ({
    height: 'calc(100% - 30px)', // Subtract the status bar height
    width: '100%',
    backgroundColor: 'white',
    position: 'relative',
    overflow: 'hidden'
}));

const StatusBar = styled(Box)(({ theme }) => ({
    height: '30px',
    backgroundColor: '#f8f9fa',
    borderTop: '1px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    padding: '0 12px',
    justifyContent: 'space-between',
    color: '#64748b',
    fontSize: '12px',
}));

const RecentFileCard = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px',
    borderBottom: '1px solid #f1f5f9',
    '&:hover': {
        backgroundColor: '#f8fafc',
    },
}));

const Whiteboard = () => {
    const [selectedItem, setSelectedItem] = useState('Whiteboard');
    const [selectedTab, setSelectedTab] = useState('Home');
    const [fontSize, setFontSize] = useState('12');
    const [zoom, setZoom] = useState(100);
    const [showFormatMenu, setShowFormatMenu] = useState(false);
    const formatMenuRef = useRef(null);
    const [showDashboard, setShowDashboard] = useState(false);



    // Canvas state
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [drawingTool, setDrawingTool] = useState('pen'); // pen, eraser, text
    const [drawingColor, setDrawingColor] = useState('#000000');
    const [lineWidth, setLineWidth] = useState(2);
    const [drawingHistory, setDrawingHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);

    // Text tool state
    const [textInputs, setTextInputs] = useState([]);
    const [activeTextInput, setActiveTextInput] = useState(null);
    const [wordCount, setWordCount] = useState(0);

    const [showProfile, setShowProfile] = useState(false);
    const [showCourses, setShowCourses] = useState(false);
    const [showActivity, setShowActivity] = useState(false);
    const [showTimeTable, setShowTimeTable] = useState(false);
    const [showWhiteboard, setShowWhiteboard] = useState(false);
    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        // Set canvas size to match container
        const resizeCanvas = () => {
            const container = canvas.parentElement;
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;

            // Redraw canvas content if history exists
            if (drawingHistory.length > 0 && historyIndex >= 0) {
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                const img = new Image();
                img.onload = () => {
                    ctx.drawImage(img, 0, 0);
                };
                img.src = drawingHistory[historyIndex];
            }
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [drawingHistory, historyIndex]);




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

    if (showDashboard) {
        return <Dashboard onBack={handleBackFromDash} />;
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

    // Whiteboard menu tabs
    const menuTabs = ['Home', 'Insert', 'Draw', 'Layout', 'References', 'Mailings', 'Review', 'View'];

    // Drawing tools
    const drawingTools = [
        { name: 'Pen', value: 'pen', icon: <BorderColorIcon /> },
        { name: 'Eraser', value: 'eraser', icon: <BorderColorIcon /> },
        { name: 'Text', value: 'text', icon: <TextFormatIcon /> }
    ];

    // Initialize canvas context


    // Save canvas state to history
    const saveCanvasState = () => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const imageData = canvas.toDataURL();

        // Remove any states after current index
        const newHistory = drawingHistory.slice(0, historyIndex + 1);
        newHistory.push(imageData);

        setDrawingHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
    };

    // Undo action
    const handleUndo = () => {
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);

            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.onload = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);
            };
            img.src = drawingHistory[newIndex];
        }
    };

    // Redo action
    const handleRedo = () => {
        if (historyIndex < drawingHistory.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);

            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.onload = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);
            };
            img.src = drawingHistory[newIndex];
        }
    };

    // Mouse event handlers for drawing
    const startDrawing = (e) => {
        if (drawingTool === 'text') {
            handleTextTool(e);
            return;
        }

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) / (zoom / 100);
        const y = (e.clientY - rect.top) / (zoom / 100);

        ctx.beginPath();
        ctx.moveTo(x, y);

        // Set drawing styles
        if (drawingTool === 'pen') {
            ctx.strokeStyle = drawingColor;
            ctx.lineWidth = lineWidth;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
        } else if (drawingTool === 'eraser') {
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = lineWidth * 2;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
        }

        setIsDrawing(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) / (zoom / 100);
        const y = (e.clientY - rect.top) / (zoom / 100);

        ctx.lineTo(x, y);
        ctx.stroke();
    };

    const stopDrawing = () => {
        if (isDrawing) {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            ctx.closePath();
            setIsDrawing(false);

            // Save the canvas state to history
            saveCanvasState();
        }
    };

    // Text tool handler
    const handleTextTool = (e) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) / (zoom / 100);
        const y = (e.clientY - rect.top) / (zoom / 100);

        // Create a new text input
        const newInput = {
            id: Date.now(),
            x,
            y,
            text: '',
            fontSize: parseInt(fontSize),
            color: drawingColor,
            active: true
        };

        setTextInputs([...textInputs, newInput]);
        setActiveTextInput(newInput.id);
    };

    // Handle text input change
    const handleTextChange = (id, value) => {
        const updatedInputs = textInputs.map(input =>
            input.id === id ? { ...input, text: value } : input
        );
        setTextInputs(updatedInputs);

        // Update word count
        const totalText = updatedInputs.map(input => input.text).join(' ');
        const words = totalText.trim().split(/\s+/).filter(word => word !== '');
        setWordCount(words.length);
    };

    // Handle text input blur - render text to canvas
    const handleTextBlur = (id) => {
        const textInput = textInputs.find(input => input.id === id);
        if (!textInput || !textInput.text.trim()) {
            // Remove empty text inputs
            setTextInputs(textInputs.filter(input => input.id !== id));
            return;
        }

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        ctx.font = `${textInput.fontSize}px Arial`;
        ctx.fillStyle = textInput.color;
        ctx.fillText(textInput.text, textInput.x, textInput.y);

        // Remove the text input element once rendered
        setTextInputs(textInputs.filter(input => input.id !== id));
        setActiveTextInput(null);

        // Save the canvas state
        saveCanvasState();
    };

    // Clear canvas
    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        setTextInputs([]);
        setWordCount(0);
        saveCanvasState();
    };

    // Change drawing tool
    const handleDrawingToolChange = (tool) => {
        setDrawingTool(tool);
    };

    // Change drawing color
    const handleColorChange = (color) => {
        setDrawingColor(color);
    };

    // Change line width
    const handleLineWidthChange = (event, newValue) => {
        setLineWidth(newValue);
    };

    // Handle menu tab selection
    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    // Handle font size change
    const handleFontSizeChange = (event) => {
        setFontSize(event.target.value);
    };

    // Handle zoom change
    const handleZoomChange = (event, newValue) => {
        setZoom(newValue);
    };

    // Toggle format menu
    const toggleFormatMenu = () => {
        setShowFormatMenu(!showFormatMenu);
    };

    // Handle sidebar navigation
    const handleNavigation = (item) => {
        setSelectedItem(item);
    };

    return (
        <Box sx={{ display: 'flex', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
            {/* Sidebar */}
            <Box
                sx={{
                    width: 240,
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 2,
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
            >
                {/* Logo */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <Avatar sx={{ bgcolor: '#4e36e9', width: 40, height: 40, borderRadius: '12px' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>A</Typography>
                    </Avatar>
                    <Box sx={{ ml: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#4e36e9', lineHeight: 1.2 }}>AMRITA</Typography>
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
            <Box sx={{ flexGrow: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                {/* Header */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 2,
                    backgroundColor: 'white',
                    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)'
                }}>
                    <Box>
                        <Typography variant="body2" color="text.secondary">Hi User,</Typography>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1e293b' }}>Welcome to Whiteboard!</Typography>
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
                            alt="User"
                            src="/path-to-avatar.jpg"
                            sx={{
                                ml: 2,
                                width: 36,
                                height: 36,
                                border: '2px solid #e2e8f0',
                                cursor: 'pointer'
                            }}
                        />
                    </Box>
                </Box>

                {/* Whiteboard content */}
                <Box sx={{ flexGrow: 1, p: 3, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
                    <WhiteboardContainer sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        {/* Whiteboard tabs and toolbars */}
                        <Box sx={{ borderBottom: '1px solid #e2e8f0' }}>
                            {/* Menu tabs */}
                            <Box sx={{ display: 'flex', alignItems: 'center', px: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                                    {menuTabs.map((tab) => (
                                        <MenuTab
                                            key={tab}
                                            selected={selectedTab === tab}
                                            onClick={() => handleTabChange(tab)}
                                        >
                                            {tab}
                                        </MenuTab>
                                    ))}
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <IconButton size="small" sx={{ ml: 1 }}>
                                        <InsertCommentIcon fontSize="small" />
                                    </IconButton>
                                    <Typography variant="body2" sx={{ ml: 0.5, color: '#64748b' }}>Comments</Typography>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        endIcon={<ArrowDropDownIcon />}
                                        sx={{
                                            ml: 2,
                                            backgroundColor: '#4e36e9',
                                            textTransform: 'none',
                                            borderRadius: '4px',
                                            '&:hover': {
                                                backgroundColor: '#3925c4'
                                            }
                                        }}
                                    >
                                        Share
                                    </Button>
                                </Box>
                            </Box>

                            {/* Formatting toolbar */}
                            <Box sx={{ display: 'flex', alignItems: 'center', p: 1, borderTop: '1px solid #f1f5f9' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', borderRight: '1px solid #f1f5f9', pr: 1 }}>
                                    {drawingTools.map((tool) => (
                                        <Button
                                            key={tool.value}
                                            size="small"
                                            sx={{
                                                mr: 1,
                                                border: '1px solid #e2e8f0',
                                                borderRadius: '4px',
                                                textTransform: 'none',
                                                color: drawingTool === tool.value ? '#4e36e9' : '#64748b',
                                                backgroundColor: drawingTool === tool.value ? '#f0f4ff' : 'transparent'
                                            }}
                                            startIcon={tool.icon}
                                            onClick={() => handleDrawingToolChange(tool.value)}
                                        >
                                            {tool.name}
                                        </Button>
                                    ))}
                                    <IconButton
                                        size="small"
                                        onClick={handleUndo}
                                        disabled={historyIndex <= 0}
                                        sx={{ mx: 0.5 }}
                                    >
                                        <UndoIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={handleRedo}
                                        disabled={historyIndex >= drawingHistory.length - 1}
                                        sx={{ mx: 0.5 }}
                                    >
                                        <RedoIcon fontSize="small" />
                                    </IconButton>
                                    <Button
                                        size="small"
                                        sx={{ ml: 1, textTransform: 'none', color: '#64748b' }}
                                        onClick={clearCanvas}
                                    >
                                        Clear
                                    </Button>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', px: 1 }}>
                                    <Select
                                        value={fontSize}
                                        onChange={handleFontSizeChange}
                                        size="small"
                                        sx={{
                                            height: '28px',
                                            mr: 1,
                                            fontSize: '0.75rem',
                                            '& .MuiSelect-select': {
                                                py: 0.5
                                            }
                                        }}
                                    >
                                        <MenuItem value="8">8</MenuItem>
                                        <MenuItem value="10">10</MenuItem>
                                        <MenuItem value="12">12</MenuItem>
                                        <MenuItem value="14">14</MenuItem>
                                        <MenuItem value="16">16</MenuItem>
                                        <MenuItem value="18">18</MenuItem>
                                    </Select>

                                    <Box sx={{ display: 'flex', borderRight: '1px solid #f1f5f9', pr: 1 }}>
                                        <FormatToolbarButton size="small">
                                            <BoldIcon fontSize="small" />
                                        </FormatToolbarButton>
                                        <FormatToolbarButton size="small">
                                            <ItalicIcon fontSize="small" />
                                        </FormatToolbarButton>
                                        <FormatToolbarButton size="small">
                                            <UnderlinedIcon fontSize="small" />
                                        </FormatToolbarButton>
                                    </Box>

                                    <Box sx={{ display: 'flex', px: 1 }}>
                                        <input
                                            type="color"
                                            value={drawingColor}
                                            onChange={(e) => handleColorChange(e.target.value)}
                                            style={{
                                                width: '24px',
                                                height: '24px',
                                                padding: 0,
                                                border: '1px solid #e2e8f0',
                                                borderRadius: '4px',
                                                cursor: 'pointer'
                                            }}
                                        />
                                        <Typography variant="caption" sx={{ ml: 1, mr: 2, alignSelf: 'center' }}>
                                            Line Width:
                                        </Typography>
                                        <Slider
                                            value={lineWidth}
                                            onChange={handleLineWidthChange}
                                            min={1}
                                            max={20}
                                            size="small"
                                            sx={{ width: 100 }}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>

                        {/* Whiteboard canvas */}
                        <WhiteboardCanvas
                            sx={{
                                transform: `scale(${zoom / 100})`,
                                transformOrigin: 'top left',
                                position: 'relative'
                            }}
                        >
                            <canvas
                                ref={canvasRef}
                                onMouseDown={startDrawing}
                                onMouseMove={draw}
                                onMouseUp={stopDrawing}
                                onMouseLeave={stopDrawing}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    cursor: drawingTool === 'text' ? 'text' : 'crosshair'
                                }}
                            />

                            {/* Text inputs */}
                            {textInputs.map((input) => (
                                <div
                                    key={input.id}
                                    style={{
                                        position: 'absolute',
                                        left: input.x,
                                        top: input.y - (input.fontSize || 12),
                                        zIndex: 10
                                    }}
                                >
                                    <textarea
                                        autoFocus={input.id === activeTextInput}
                                        value={input.text}
                                        onChange={(e) => handleTextChange(input.id, e.target.value)}
                                        onBlur={() => handleTextBlur(input.id)}
                                        style={{
                                            backgroundColor: 'transparent',
                                            border: '1px dashed #4e36e9',
                                            fontSize: `${input.fontSize || 12}px`,
                                            color: input.color,
                                            resize: 'both',
                                            overflow: 'hidden',
                                            minWidth: '100px',
                                            minHeight: '30px',
                                            padding: '4px',
                                            fontFamily: 'Arial'
                                        }}
                                    />
                                </div>
                            ))}
                        </WhiteboardCanvas>

                        {/* Status bar */}
                        <StatusBar>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="caption" sx={{ mr: 2 }}>
                                    {wordCount} words
                                </Typography>
                                <Typography variant="caption">
                                    {zoom}%
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton size="small" onClick={() => setZoom(Math.max(25, zoom - 25))}>
                                    <ZoomOutIcon fontSize="small" />
                                </IconButton>
                                <Slider
                                    value={zoom}
                                    onChange={handleZoomChange}
                                    min={25}
                                    max={200}
                                    step={25}
                                    size="small"
                                    sx={{ width: 100, mx: 1 }}
                                />
                                <IconButton size="small" onClick={() => setZoom(Math.min(200, zoom + 25))}>
                                    <ZoomInIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        </StatusBar>
                    </WhiteboardContainer>

                    {/* Recent files section */}
                    <Box sx={{ mt: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1e293b' }}>Recent Files</Typography>
                            <Button
                                variant="text"
                                size="small"
                                sx={{ color: '#4e36e9', textTransform: 'none' }}
                            >
                                View All
                            </Button>
                        </Box>

                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <Paper sx={{ overflow: 'hidden', borderRadius: '8px' }}>
                                    <RecentFileCard>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Avatar sx={{ bgcolor: '#e0e7ff', color: '#4e36e9', width: 40, height: 40 }}>
                                                <AssignmentIcon />
                                            </Avatar>
                                            <Box sx={{ ml: 2 }}>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 'medium', color: '#1e293b' }}>
                                                    Project Presentation
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    Edited 2 hours ago
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <IconButton size="small">
                                            <ArrowDropDownIcon />
                                        </IconButton>
                                    </RecentFileCard>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Paper sx={{ overflow: 'hidden', borderRadius: '8px' }}>
                                    <RecentFileCard>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Avatar sx={{ bgcolor: '#dcfce7', color: '#16a34a', width: 40, height: 40 }}>
                                                <AssignmentIcon />
                                            </Avatar>
                                            <Box sx={{ ml: 2 }}>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 'medium', color: '#1e293b' }}>
                                                    Course Notes
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    Edited yesterday
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <IconButton size="small">
                                            <ArrowDropDownIcon />
                                        </IconButton>
                                    </RecentFileCard>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Paper sx={{ overflow: 'hidden', borderRadius: '8px' }}>
                                    <RecentFileCard>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Avatar sx={{ bgcolor: '#fee2e2', color: '#ef4444', width: 40, height: 40 }}>
                                                <AssignmentIcon />
                                            </Avatar>
                                            <Box sx={{ ml: 2 }}>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 'medium', color: '#1e293b' }}>
                                                    Research Mindmap
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    Edited 3 days ago
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <IconButton size="small">
                                            <ArrowDropDownIcon />
                                        </IconButton>
                                    </RecentFileCard>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Whiteboard;