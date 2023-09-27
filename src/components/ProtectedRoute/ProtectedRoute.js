import React from 'react';
import { Navigate } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';

function ProtectedRoute({ element: Element, isTokenChecked, isLoggedIn, ...rest }) {
    if (!isTokenChecked) return <Preloader />;
    return isLoggedIn ? <Element {...rest} /> : <Navigate to="/" />;
}

export default ProtectedRoute;
