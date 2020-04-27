import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToAppRounded';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { AuthContext } from '../contexts/AuthContext';
import NavigationComponent from './NavigationComponent';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    minHeight: 36,
  },
  title: {
    flexGrow: 1,
  },
  currentUser: {
    fontSize: '0.9rem',
  },
});

function HeaderComponent({ history }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { currentUser, signOutUser } = useContext(AuthContext);
  const handleClickLogin = () => {
    history.push('/login');
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleHomeClick = () => {
    history.push('/inicio');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickLogout = () => {
    signOutUser();
    handleClose();
  };

  return (
    <div className={classes.root}>
      <AppBar position="sticky" variant="outlined">
        <Toolbar className={classes.toolbar} variant="dense">
          <div className={classes.title}>
            <Button color="inherit" onClick={handleHomeClick}>
              Inicio
            </Button>
          </div>
          {!currentUser && (
            <Button disableElevation color="inherit" onClick={handleClickLogin}>
              Login
            </Button>
          )}
          {currentUser && <Typography className={classes.currentUser}>{currentUser.email}</Typography>}
          {currentUser && (
            <div>
              <IconButton aria-controls="simple-menu" aria-haspopup="true" color="inherit" onClick={handleClick}>
                <AccountCircle />
              </IconButton>
              <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem>Perfil</MenuItem>
                <MenuItem>Mi cuenta</MenuItem>
                <MenuItem onClick={handleClickLogout}>
                  <ListItemIcon>
                    <ExitToAppIcon fontSize="small" />
                  </ListItemIcon>
                  Salir
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
        <NavigationComponent />
      </AppBar>
    </div>
  );
}

export default withRouter(HeaderComponent);
