import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import BookDetail from './components/BookDetails/Bookdetail.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/auth/Login.jsx";
import Register from './components/auth/Register.jsx'

const router = createBrowserRouter([

  {
    path: "/",
    element: <App />
  },
  {
    path: "/book/:id",
    element: <BookDetail />
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)



