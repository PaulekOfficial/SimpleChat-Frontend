import React, { ReactElement } from 'react';

interface GuestRouteProps {
    element: ReactElement;
}

const GuestRoute: React.FC<GuestRouteProps> = ({ element }) => {
    return <>{element}</>;
};

export default GuestRoute;
