import MainPage from "./pages/mainPage/MainPage";
import ItemPage from "./pages/itemPage/ItemPage";
import { CREATE_OBJECT_ROUTE, MAINPAGE_ROUTE, OBJECTS_ROUTE, OBJECT_ROUTE, REPORT_ROUTE, SETTINGS_ROUTE, USERS_ROUTE, USER_CREATE_ROUTE } from "./utils/consts";
import ReportPage from "./pages/reportPage/ReportPage";
import SettingsPage from "./pages/settingsPage/SettingsPage";
import UsersPage from "./pages/usersPage/UsersPage";
import UserCreatePage from "./pages/userCreatePage/UserCreatePage";
import ObjectsPage from "./pages/objectsPage/ObjectsPage";
import CreateObject from "./pages/createObject/CreateObject";

export const authRoutes = [
    {
        path: SETTINGS_ROUTE,
        Component: SettingsPage
    },
    {
        path: USERS_ROUTE,
        Component: UsersPage
    },
    {
        path: USER_CREATE_ROUTE,
        Component: UserCreatePage
    },
    {
        path: OBJECTS_ROUTE,
        Component: ObjectsPage
    },
    {
        path: CREATE_OBJECT_ROUTE,
        Component: CreateObject
    },
    {
        path: CREATE_OBJECT_ROUTE+'/:id',
        Component: CreateObject
    }
]

export const publicRoutes = [
    {
        path: MAINPAGE_ROUTE,
        Component: MainPage
    },
    {
        path: OBJECT_ROUTE + '/:id',
        Component: ItemPage
    },
    {
        path: REPORT_ROUTE,
        Component: ReportPage
    }
    
]