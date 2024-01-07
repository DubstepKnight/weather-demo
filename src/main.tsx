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

import { getUser } from './lib/requests/get_user.ts';
import './index.scss'
import IndexPage from './pages/index-page/IndexPage.tsx';
import User from './types/user.type.ts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <IndexPage />,
    errorElement: <ErrorPage />,
    loader: async (): Promise<User | null>  => {
      const user = await getUser();
      if (!user) {
        redirect('/login');
        return null;
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
