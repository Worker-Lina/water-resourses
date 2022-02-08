import LoginForm from "./pages/loginPage/LoginForm";
import MainPage from "./pages/mainPage/MainPage";
import ItemPage from "./pages/itemPage/ItemPage";
import { LOGIN_ROUTE, MAINPAGE_ROUTE, OBJECT_ROUTE, REPORT_ROUTE } from "./utils/consts";
import ReportPage from "./pages/reportPage/ReportPage";

export const authRoutes = [
    {
      
    }
]

export const publicRoutes = [
    {
        path: MAINPAGE_ROUTE,
        Component: MainPage
    },
    {
        path: LOGIN_ROUTE,
        Component: LoginForm
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