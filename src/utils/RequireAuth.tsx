import type {JSX} from "react";

import { Navigate, useLocation } from 'react-router-dom';

import {useAuth} from "../contexts/AuthContext";



export default function RequireAuth({ children }: { children: JSX.Element }) {
    const { isLoggedIn, isInitializing } = useAuth();
    const location = useLocation();

    if (isInitializing) {
        return null; // o un <LoadingScreen /> si quieres
    }

    if (!isLoggedIn) {
        return <Navigate to="/sign-in" state={{ from: location }} replace />;
    }

    return children;
}
