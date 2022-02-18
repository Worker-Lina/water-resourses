import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { Navigate , Route, Routes } from 'react-router-dom'
import { Context } from '..';
import { authRoutes, publicRoutes } from '../routes';
import { MAINPAGE_ROUTE } from '../utils/consts';


const AppRouter = observer(() => {
    const {user} = useContext(Context)

    console.log(user.isAuth)
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component></Component>} exact/>
            )}
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
});

export default AppRouter
