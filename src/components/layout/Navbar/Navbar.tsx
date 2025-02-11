import { LocationOn, Menu, Slideshow } from "@mui/icons-material";
import { AppBar, Toolbar, Typography, Button, Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, ButtonBase, useTheme, Autocomplete, TextField, InputAdornment } from "@mui/material";
import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Notifications from "./Notifications";
import Profile from "./Profile";
import { useActiveRoute } from "../../../hooks/useActiveRoute";
import { useAppSelector } from "../../../hooks/storeHooks";
import { Cinema } from "../../../models/tables";


const drawerWidth = 280;
const userPages = [
  { link: '/home', title: 'Home' },
  { link: '/schedule', title: 'Schedule' },
  { link: '/search', title: 'Search' },
];
const adminPages = [
  { link: '/home', title: 'Home' },
  { link: '/admin-panel', title: 'Admin panel' },
  { link: '/statistics', title: 'Statistics' },
]
const data: Cinema[] = [
  { id: '1', location: 'Kyiv, Ocean Plaza' },
];
export default function Navbar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const cinema = useMemo(() => {
    let value = data.find(item => item.id === searchParams.get('cinema'));
    if (!value) {
      value = data[0];
      setSearchParams({ cinema: value.id });
    }
    return value;
  }, [searchParams, data]);
  const { isLogged } = useAppSelector((state) => state.authReducer);
  const role = 'User';
  const pages = role === 'Admin' ? adminPages : role === 'User' ? userPages : [];
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const logo = (
    <ButtonBase
      disableRipple
      component={Link}
      to='/'
    >
      <Slideshow fontSize="large" />
      <Typography variant='h4' color='text' ml="4px">
        CinemaHub
      </Typography>

    </ButtonBase>
  );
  const theme = useTheme();
  const { isActive } = useActiveRoute();
  return (
    <>
      <AppBar component="nav" color="primary" sx={{ background: theme.palette.primary.main }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 1, display: { sm: 'none' }, color: theme.palette.text.primary }}
          >
            <Menu />
          </IconButton>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {logo}
          </Box>
          <Box display='flex' flexDirection='row' alignItems='center'>
            <LocationOn fontSize="medium" />
            <Autocomplete
              value={cinema}
              onChange={(event, newValue) => {
                if (newValue)
                  setSearchParams({ cinema: newValue.id });
              }}
              options={data}
              getOptionLabel={(option) => option.location}
              renderInput={(params) => <TextField {...params}
                size="medium"
                sx={{
                  width: '200px'
                }}

                variant="standard"

              />}
              noOptionsText='There are no cinema'
              isOptionEqualToValue={(option, value) => option.id === value.id}
              sx={{ ml: 1 }}
            />
          </Box>
          <Box display='flex' flexDirection='row'>
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, mr: 3 }} alignItems='center'>
              {pages.map((item) => (
                <Button key={item.title} sx={{ color: isActive(item.link) ? 'text.primary' : 'text.secondary' }} onClick={() => navigate(item.link)}>
                  {item.title}
                </Button>
              ))}
            </Box>
            {isLogged && <Notifications />}
            <Profile />
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Box marginBlock={2}>
              {logo}
            </Box>
            <Divider />
            <List>
              {pages.map((item) => (
                <ListItem key={item.title} disablePadding>
                  <ListItemButton sx={{ textAlign: 'center' }} onClick={() => navigate(item.link)}>
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </nav>
    </>
  );
}
