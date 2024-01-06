import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner'
import ErrorPage from './pages/error-page/ErrorPage.tsx';
import LoginPage from './pages/login-page/LoginPage.tsx';
import RootLayout from './RootLayout.tsx';

import { getUser } from './lib/requests/get_user.ts';
import './index.scss'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: async () => {
      const user = await getUser();
      if (!user) {
        return redirect("/login");
      }
      return user;
    }
  },
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>,
)
