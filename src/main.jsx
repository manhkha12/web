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
import Admin from './components/AdminPage/Product.jsx'
import AdminContent from './components/AdminPage/AdminContent.jsx'

import Books from './components/AdminPage/Books.jsx'

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
  {
    path: "/admin",
    element: <Admin />, // Admin là layout chính
    children:[
      { path: "", element: <Books /> }, // Mặc định hiển thị danh sách sách
      { path: "/admin/add_book", element: <AdminContent /> },
      {path :"/admin/edit/:id",element :<AdminContent/>}
    ]
    
  },
  
  
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)



