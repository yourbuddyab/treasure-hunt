import ReactDOM from 'react-dom/client'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Create from './components/Create';
import Result from './components/Result';
import React from 'react';
import Main from './components/Layout/Main';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Main/>}>
      <Route path='/' element={<Create />} />
      <Route path='/result/:code' name="room_selection" element={<Result  />} />
    </Route>
  )
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
