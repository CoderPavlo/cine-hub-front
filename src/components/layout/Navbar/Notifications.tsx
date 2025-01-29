import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Badge,
    ClickAwayListener,
    Divider,
    IconButton,
    List,
    ListItemButton,
    ListItemAvatar,
    ListItemText,
    ListItemSecondaryAction,
    Paper,
    Popper,
    Typography,
    useMediaQuery,
    alpha,
    SvgIconTypeMap
} from '@mui/material';

import { Autorenew, CloseOutlined, ConfirmationNumber, Movie, Notifications as NotificationsIcon} from '@mui/icons-material';
import MainCard from './MainCard.tsx';
import Transitions from './Transitions.tsx';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { useState } from 'react';

const avatarSX = {
    width: 36,
    height: 36,
    fontSize: '1rem'
};

const actionSX = {
    mt: '6px',
    ml: 1,
    top: 'auto',
    right: 'auto',
    alignSelf: 'flex-start',

    transform: 'none'
};

interface INotification {
    Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; },
    primary: string,
    secondary: string,
    time: string,
    color?: string,
    bgColor?: string,
}

const notifications: INotification[] = [
    {
        Icon: ConfirmationNumber,
        primary: 'Your booking was successful!',
        secondary: '2 min ago',
        time: '3:00 AM',
        color: 'success.main',
        bgColor: 'success.lighter'
    },
    {
        Icon: Autorenew,
        primary: 'Your refund request for The Terminator movie tickets has been successfully completed.',
        secondary: '7 hours ago',
        time: '2:45 PM',
        color: 'error.main',
        bgColor: 'error.lighter'
    },
    {
        Icon: Movie,
        primary: 'Reminder: Your Avatar 3D session is today at 7pm',
        secondary: '5 August',
        time: '6:00 PM',
        color: 'primary.main',
        bgColor: 'primary.lighter'
    },
]


export default function Notifications() {

    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [open, setOpen] = useState(false);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    return (
        <>
            <IconButton
                size="large"
                color="secondary"
                onClick={(e) => {
                    setOpen(value => !value);
                    setAnchorEl(e.currentTarget);
                }}
            >
                <Badge badgeContent={1} color="error">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <Popper
                style={{
                    left: undefined,
                    right: '50px',
                    top: '75px'
                }}
                open={open}
                anchorEl={anchorEl}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [matchesXs ? -5 : 0, 9]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions type="fade" in={open} {...TransitionProps}>
                        <ClickAwayListener onClickAway={() => setOpen(false)}>
                            <Paper
                                sx={{
                                    boxShadow: `0px 2px 8px ${alpha(theme.palette.grey[900], 0.15)}`,
                                    width: '100%',
                                    minWidth: 285,
                                    maxWidth: 420,
                                    [theme.breakpoints.down('md')]: {
                                        maxWidth: 285
                                    }
                                }}
                            >
                                <MainCard
                                    title="Notification"
                                    elevation={0}
                                    border={false}
                                    content={false}
                                    secondary={
                                        <IconButton size="small" onClick={handleToggle}>
                                            <CloseOutlined />
                                        </IconButton>
                                    }
                                >
                                    <List
                                        component="nav"
                                        sx={{
                                            p: 0,
                                            '& .MuiListItemButton-root': {
                                                py: 0.5,
                                                '& .MuiAvatar-root': avatarSX,
                                                '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
                                            }
                                        }}
                                    >
                                        {notifications.map((item, index) =>
                                            <>
                                                <ListItemButton key={index}>
                                                    <ListItemAvatar>
                                                        <Avatar
                                                            sx={{
                                                                color: item.color,
                                                                bgcolor: item.bgColor
                                                            }}
                                                        >
                                                            <item.Icon/>
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={
                                                            <Typography variant="subtitle2">
                                                                {item.primary}
                                                            </Typography>
                                                        }
                                                        secondary={item.secondary}
                                                    />
                                                    <ListItemSecondaryAction>
                                                        <Typography variant="caption" noWrap>
                                                            {item.time}
                                                        </Typography>
                                                    </ListItemSecondaryAction>
                                                </ListItemButton>
                                                <Divider />
                                            </>
                                        )}
                                        <ListItemButton sx={{ textAlign: 'center', py: `${6}px !important` }}>
                                            <ListItemText
                                                primary={
                                                    <Typography variant="subtitle1" color="primary">
                                                        View All
                                                    </Typography>
                                                }
                                            />
                                        </ListItemButton>
                                    </List>
                                </MainCard>
                            </Paper>
                        </ClickAwayListener>
                    </Transitions>
                )}
            </Popper>
        </>
    )
}