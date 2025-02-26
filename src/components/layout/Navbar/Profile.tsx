import {
    Avatar, Box, ButtonBase, CardContent, IconButton, Paper, Popper, Stack, Tab, Tabs,
    ClickAwayListener, Typography, alpha,
    Button,
} from '@mui/material'
import Grid from '@mui/material/Grid2';
import { useTheme } from '@mui/material/styles';
import Transitions from './Transitions';
import MainCard from './MainCard';

import { Login, Logout, Person, Settings } from '@mui/icons-material';
import ProfileTab from './ProfileTab.tsx';
import SettingsTab from './SettingsTab.tsx';
import { ReactNode, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/storeHooks.ts';
import { useNavigate } from 'react-router-dom';
import { clearTokens } from '../../../store/slices/auth.ts';
import serverAPI from '../../../store/api/server.ts';

interface ITabPanelProps {
    children: ReactNode,
    index: number,
    value: number,
};


function TabPanel({ children, value, index, ...other }: ITabPanelProps) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`profile-tabpanel-${index}`} aria-labelledby={`profile-tab-${index}`} {...other}>
            {value === index && children}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `profile-tab-${index}`,
        'aria-controls': `profile-tabpanel-${index}`
    };
}

export default function Profile() {
    const [open, setOpen] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const theme = useTheme();
    const { role, isLogged } = useAppSelector((state) => state.authReducer);
    const [value, setValue] = useState<number>(isLogged ? 0 : 1);
    const dispatch=useAppDispatch();
    const navigate = useNavigate();
    const {data} = serverAPI.useFetchUserQuery();
    return (
        <>
            <ButtonBase onClick={(e) => {
                setOpen((value) => !value);
                setAnchorEl(e.currentTarget);
            }} sx={{ ml: 1, borderRadius: '100px' }}>
                <Avatar src="" alt="avatar" />
            </ButtonBase>

            <Popper
                style={{
                    left: undefined,
                    right: '25px',
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
                                offset: [0, 9]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions type="fade" in={open} {...TransitionProps}>
                        {open && (

                            <ClickAwayListener onClickAway={() => setOpen(false)}>
                                <Paper
                                    sx={{
                                        boxShadow: `0px 2px 8px ${alpha(theme.palette.grey[900], 0.15)}`,
                                        width: 350,
                                    }}
                                >
                                    <MainCard elevation={0} border={false} content={false}>
                                        <CardContent sx={{ px: 2.5, pt: 3 }}>
                                            {isLogged ?
                                                <Grid container justifyContent="space-between" alignItems="center">
                                                    <Grid>
                                                        <Stack direction="row" spacing={1.25} alignItems="center">
                                                            <Avatar sx={{ width: 32, height: 32 }}>
                                                                {data?.name[0]}
                                                            </Avatar>
                                                            <Stack>
                                                                <Typography variant="h6">{`${data?.name} ${data?.surname}`}</Typography>
                                                                <Typography variant="body2" color="textSecondary">
                                                                    {data?.email}
                                                                </Typography>
                                                            </Stack>
                                                        </Stack>
                                                    </Grid>
                                                    <Grid>
                                                        <IconButton size="large" color="secondary" onClick={()=>{
                                                            dispatch(clearTokens());
                                                            navigate('/');
                                                        }}>
                                                            <Logout />
                                                        </IconButton>
                                                    </Grid>
                                                </Grid> :
                                                <Button variant="outlined" startIcon={<Login />} fullWidth onClick={()=>navigate('/login')}>
                                                Log in
                                              </Button>
                                        
                                        }

                                        </CardContent>
                                        {open && (
                                            <>
                                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                    <Tabs variant="fullWidth" value={value} onChange={(e, value) => setValue(value)} aria-label="profile tabs">
                                                        <Tab
                                                            sx={{
                                                                display: 'flex',
                                                                flexDirection: 'row',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                textTransform: 'capitalize'
                                                            }}
                                                            icon={<Person style={{ marginBottom: 0, marginRight: '10px' }} />}
                                                            label="Profile"
                                                            {...a11yProps(0)}
                                                            disabled={!isLogged}
                                                        />
                                                        <Tab
                                                            sx={{
                                                                display: 'flex',
                                                                flexDirection: 'row',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                textTransform: 'capitalize'
                                                            }}
                                                            icon={<Settings style={{ marginBottom: 0, marginRight: '10px' }} />}
                                                            label="Setting"
                                                            {...a11yProps(1)}
                                                        />
                                                    </Tabs>
                                                </Box>
                                                <TabPanel value={value} index={0}>
                                                    <ProfileTab />
                                                </TabPanel>
                                                <TabPanel value={value} index={1}>
                                                    <SettingsTab />
                                                </TabPanel>
                                            </>
                                        )}
                                    </MainCard>
                                </Paper>
                            </ClickAwayListener>
                        )}
                    </Transitions>
                )}
            </Popper>
        </>
    )
}