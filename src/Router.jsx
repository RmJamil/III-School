import {createBrowserRouter} from "react-router";

import React from "react";
import ReactDOM from "react-dom/client";
import RootLayout from "./RootLayout";
import Home from "./Home";
import AuthLayout from "./AuthLayout";
import Register from "./Register";
import Login from "./Login";
import DashboardLayout from "./DashboardLayout";
import Users from "./Users";
import TeacherReq from "./TeacherReq";
import AllClasses from "./AllClasses";
import Profile from "./Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>,
    children:[
        {
            index:true,
            Component:Home
        }
    ]
  },
  {
    path:"/",
    element:<AuthLayout/>,
    children:[
      {
        path:"/register",
       element:<Register></Register>
      },
      {
        path:"/login",
        element:<Login></Login>
      }
    ]
  },
  {
    path:'/dashboard',
    element:<DashboardLayout/>,

    children:[
      {
        path:'users',
        element:<Users/>
      },
      {
        path:'teacher-request',
        element:<TeacherReq/>
      },
      {
        path:'all-classes',
        element:<AllClasses/>
      },
      {
        path:'profile',
        element:<Profile/>
      }
    ]
  }
]);

