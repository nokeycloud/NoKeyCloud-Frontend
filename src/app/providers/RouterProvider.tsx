import { createBrowserRouter, RouterProvider } from 'react-router';
import { BaseLayout } from "../layouts/BaseLayout";
import { AuthLayout } from "../layouts/AuthLayout";
import { SidebarLayout } from "../layouts/SidebarLayout";
import { LoginPage, loginAction } from "@/pages/login";
import { RegisterPage, registerAction } from "@/pages/register";
import { DashboardPage } from "@/pages/dashboard";
import { ErrorPage } from "@/pages/error";
import { AdminPanelPage } from "@/pages/admin-panel";
import { TrashPage } from "@/pages/trash";
import { SharedPage } from "@/pages/shared";
import { FavoritesPage } from "@/pages/favorites";
import { SharedWithMePage } from "@/pages/shared-with-me";

const router = createBrowserRouter([
    {
        element: <BaseLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                element: <AuthLayout />,
                children: [
                    { path: "/login", element: <LoginPage />, action: loginAction },
                    { path: "/register", element: <RegisterPage />, action: registerAction },
                    { path: "/admin-panel", element: <AdminPanelPage /> },
                ],
            },
            {
                element: <SidebarLayout />,
                children: [
                    { path: "/", element: <DashboardPage /> },
                    { path: "/folder/:folderId", element: <DashboardPage /> },
                    { path: "/trash", element: <TrashPage /> },
                    { path: "/shared", element: <SharedPage /> },
                    { path: "/favorites", element: <FavoritesPage /> },
                    { path: "/shared-with-me", element: <SharedWithMePage /> },
                ],
            },
        ],
    },
]);

export function AppRouter() {
    return <RouterProvider router={router} />;
}