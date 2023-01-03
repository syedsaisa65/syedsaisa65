import React from 'react';
import AppBar from '@mui/material/AppBar';
import { Box, IconButton, Drawer, Divider, ListItemIcon } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import { Link, useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import UserMenu from 'components/UserMenu/UserMenu';
import MenuIcon from '@mui/icons-material/Menu';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import useStyle from './style';
import { CustomContainer } from 'components/index';
import MobileMenu from 'components/UserMenu/MobileMenu';
import { MobileNav } from './MenusList';
import { useLogout } from 'hooks/Logout/Logout';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTranslation } from 'react-i18next';

const drawerWidth = 240;

const Header = () => {
  const classes = useStyle();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const logOut = useLogout();
  const { t } = useTranslation();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <List>
        {MobileNav?.map((item) => (
          <ListItem key={item?.id} disablePadding>
            <ListItemButton onClick={() => handleNavigate(item?.path)}>
              <ListItemIcon className={classes.SidebarIcon}>{item?.Icon}</ListItemIcon>
              <ListItemText primary={t(item?.label)} />
            </ListItemButton>
          </ListItem>
        ))}

        {/* user Logout  */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => logOut()}>
            <ListItemIcon className={classes.SidebarIcon}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={t('logout')} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" className={classes.headerAppBar}>
        <CustomContainer>
          <Toolbar disableGutters>
            <Box className={classes.headerLeft}>
              <Link to="/dashboard" className={`${classes.headerLogo}`}>
                Bargaining
              </Link>
              <Box className={`${classes.tableBtn}`}>
                <Link to="/dashboard">
                  <label className="pointer text_upperCase">{'Table'}</label>
                </Link>
              </Box>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                <Box className="d_flex d_flex_align">
                  <UserMenu />
                </Box>
              </Box>
              <IconButton
                size="large"
                color="inherit"
                sx={{ display: { sm: 'none' } }}
                className={classes.MenubarIcon}
                onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </CustomContainer>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}>
          <MobileMenu />
          <Divider />
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default Header;
