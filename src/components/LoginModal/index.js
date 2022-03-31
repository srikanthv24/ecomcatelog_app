import React, { useEffect, useState } from "react";
import Login from "./../../scenes/Login";
import Register from "./../../scenes/Register";
import ForgotPassword from "../../scenes/ForgotPassword";
import "./styles.css";
import { Tab, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {clearAuthError} from '../../store/actions/auth';

const LoginModal = () => {
  const dispatch = useDispatch();
  const { isRegistered } = useSelector((state) => state.auth);
  const [isExistingUser, setExistingUser] = useState("register");

  useEffect(() => {
    if (isRegistered) {
      setExistingUser("login");
    } else {
      setExistingUser("register");
    }
  }, [isRegistered]);

  useEffect(() => {
    dispatch(clearAuthError());
  }, [isExistingUser])

  const changeLoginModal = (type) => {
    setExistingUser(type);
  }
  

  return (
    isExistingUser === 'login' ?
    <Register handleModalType={changeLoginModal} />
    :
    isExistingUser === 'register' ?
      <Login handleModalType={changeLoginModal} />
      :
      <ForgotPassword handleModalType={changeLoginModal} />
  );
};

export default LoginModal;
