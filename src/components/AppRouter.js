import React from 'react'
import { Navigate , Route, Routes } from 'react-router-dom'
import { publicRoutes } from '../routes';
import { MAINPAGE_ROUTE } from '../utils/consts';


const AppRouter = () => {
    return (
        <Routes>
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component></Component>} exact/>
            )}
            <Route
                path="*"
                exact
                element={<Navigate to={MAINPAGE_ROUTE} />}
            />
        </Routes>
    );
};

export default AppRouter
