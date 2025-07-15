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
import ApprovedClasses from "./ApprovedClasses";
import Progress from "./Progress";
import ClassDetails from "./ClassDetails";
import Payment from "./Payment";
import DownloadPaymentDetails from "./DownloadPaymentDetails";
import Enrolled from "./Enrolled";
import MyEnrolledClassDetails from "./MyEnrolledClassDetails";
import MyProfile from "./MyProfile";
import UseAxiosSecure from "./useAxiosSecure";
import Forbidden from "./Forbidden";

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
        element:<AllClasses/>,
            loader: async () => {
      const res = await fetch('http://localhost:3000/classCount');
    return res.json(); 
    },
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
    },
    {
      path:'approvedclasses',
      element:<ApprovedClasses/>
    },
    {
      path:'progress/:id',
      element:<Progress/>,
      loader: async ({ params }) => {
    const res = await fetch(`http://localhost:3000/updateclasses/${params.id}`);
    return res.json(); 
      }
    },
    {
      path:'classdetails/:classid',
      element:<ClassDetails/>,
      loader: async ({ params }) => {
    const res = await fetch(`http://localhost:3000/updateclasses/${params.classid}`);
    return res.json(); 
      }

    },
    {
      path:'payment/:id',
      element:<Payment/>
    },
    {
      path:'download/:transactionId',
      element:<DownloadPaymentDetails/>
    },
    {
      path:'enrolled-classes',
      element:<Enrolled/>
    },
    {
      path:'payments/myenrolled/:id',
      element:<MyEnrolledClassDetails/>,
      loader: async ({ params }) => {
    const res = await fetch(`http://localhost:3000/updateclasses/${params.id}`);
    return res.json(); 
      }
    },
    {
      path:'profile',
      element:<MyProfile/>
    }
   
    ]
  },
  {
    path:'forbidden',
    element:<Forbidden/>
  }
]);

