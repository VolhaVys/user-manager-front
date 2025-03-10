import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { MenuItem } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { SIGN_IN_ROUTE, USER_MANAGEMENT_ROUTE, USER_PAGE_ROUTE } from '../../constant/routs';
import { getToken, getUserData } from '../../redux/selectors/selector';
import { logoutAction } from '../../redux/actionCreators/actions';

const RenderUser = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onLogout = () => {
    dispatch(logoutAction());
    history.go(1);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onProfile = () => {
    history.push(USER_PAGE_ROUTE);
  };

  const login = () => {
    history.push(SIGN_IN_ROUTE);
  };

  const onUserManagement = () => {
    history.push(USER_MANAGEMENT_ROUTE);
  };

  const token = useSelector(getToken);
  const user = useSelector(getUserData);

  if (token) {
    return (
      <Toolbar>
        <Typography gutterBottom variant="body1">{user?.firstName}</Typography>
        <IconButton
          aria-controls="menu-appbar"
          aria-haspopup="true"
          aria-label="account of current user"
          color="inherit"
          onClick={handleMenu}
        >
          <AccountCircle />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          id="menu-appbar"
          keepMounted
          onClose={handleClose}
          open={!!anchorEl}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={onProfile}>Профиль</MenuItem>
          {user?.role === 'admin' && <MenuItem onClick={onUserManagement}>Управление пользователями</MenuItem>}
          <MenuItem onClick={onLogout}>Выйти</MenuItem>
        </Menu>
      </Toolbar>
    );
  }

  return <Button color="secondary" onClick={login}>Войти</Button>;
};

export default RenderUser;
