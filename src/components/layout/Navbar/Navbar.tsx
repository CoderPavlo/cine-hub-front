import { Menu, Slideshow } from "@mui/icons-material";
import { AppBar, Toolbar, Typography, Button, Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, ButtonBase, useTheme } from "@mui/material";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { role } from "../../../App";
import Notifications from "./Notifications";
import Profile from "./Profile";
import { useActiveRoute } from "../../../hooks/useActiveRoute";


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
export default function Navbar() {
  const pages = role === 'admin' ? adminPages : userPages;
  const location = useLocation();
  const navigate = useNavigate();
  const hideNavbarRoutes = ["/login"];
  if (hideNavbarRoutes.includes(location.pathname)) {
    return null;
  }
  const isLogged = true;
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
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', maxWidth: "lg", mx: 'auto', width: '100%' }}>
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
          <Box display='flex' flexDirection='row'>
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, mr: 3 }} alignItems='center'>
              {pages.map((item) => (
                <Button key={item.title} sx={{ color: isActive(item.link) ? 'text.primary': 'text.secondary' }} onClick={() => navigate(item.link)}>
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
