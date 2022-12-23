import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import SidebarLayout from '../layouts/SidebarLayout';
import * as pages from '../Pages/';
import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SidebarLayout />,
    children: [
      { index: true, element: <pages.Dashboard /> },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <pages.Profile />
          </PrivateRoute>
        ),
      },
      {
        path: 'bookshelves',
        element: <Outlet />,
        children: [
          { index: true, element: <pages.Bookshelves /> },
          { path: ':bookshelfId', element: <pages.Bookshelf /> },
        ],
      },
    ],
  },
]);

export default router;
