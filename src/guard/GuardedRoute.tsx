import React, { ReactElement, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import AuthorizationService from '../service/AuthorizationService';
import { Backdrop } from "@mui/material";
import ReactLoading from 'react-loading';

interface GuardedRouteProps {
    element: ReactElement;
}

const GuardedRoute: React.FC<GuardedRouteProps> = ({ element }) => {
    const [authenticated, setAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuthentication = async () => {
            const authenticated = await AuthorizationService.isAuthenticated();
            setAuthenticated(authenticated);
        };

        checkAuthentication().then();
    }, []);

    if (authenticated === null) {
        return (
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
                <ReactLoading type={"bars"} color={"white"} height={'10%'} width={'10%'} />
            </Backdrop>
        );
    }

    return authenticated ? <>{element}</> : <Navigate to="/login" replace />;
};

export default GuardedRoute;
