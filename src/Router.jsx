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
import TeacherForm from "./TeacherForm";
import PendingTeachers from "./PendingTeacher";
import AddClass from "./AddClass";
import MyClasses from "./MyClasses";
import UpdateClass from "./UpdateClass";

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
        path:'pending-teachers',
        element:<PendingTeachers/>
      },
      {
        path:'all-classes',
        element:<AllClasses/>
      },
      {
        path:'profile',
        element:<Profile/>
      },
      {
        path:'teacherform',
        element:<TeacherForm/>

      },
      {
        path:'addclass',
        element:<AddClass/>
      },
      {
        path:'my-classes',
        element:<MyClasses/>,
      },
      {
        path:'updateclass/:classid',
        element:<UpdateClass/>,
        loader: async ({ params }) => {
    const res = await fetch(`http://localhost:3000/updateclasses/${params.classid}`);
    return res.json(); 
      }
    }
   
    ]
  }
]);

