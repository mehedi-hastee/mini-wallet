import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { AuthRouteWrapperProps } from "./types";
import { AuthContext } from "@contexts/AuthContext/AuthContext";
import { ROUTES } from "@constants/routes.constants";

const AuthRouteWrapper: React.FC<AuthRouteWrapperProps> = ({ element }) => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  if (!authContext) {
    throw new Error('AuthContext is undefined. Make sure you are within an AuthProvider.');
  }

  const { user } = authContext;

  useEffect(() => {
    if (!user) {
      navigate(ROUTES.LOGIN, { replace: true });
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return <>{element}</>;
};

export default AuthRouteWrapper;