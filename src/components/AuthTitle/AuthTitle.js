import React from 'react';
import './AuthTitle.css';

const AuthTitle = ({ title, isProfile = false }) => {
    const classTitle = `auth__title${isProfile ? ' auth__title_type_protfile' : ''}`;
    return <h1 className={classTitle}>{title}</h1>;
};
export default AuthTitle;
