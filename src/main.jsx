import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import Header from './components/custom/Header.jsx'
import { Toaster } from './components/ui/sonner.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Viewtrip from './view-trip/[tripId]/index.jsx'
import MyTrips from './my-trips/index.jsx'
import Blog from './my-blog/index.jsx'
import BlogContents from './my-blog/blogs/blogContents.jsx'
import CommentSection from './Comments/index.jsx'
import TravelPlansPage from './TravelPlansPage/index.jsx'
import TravelPlanDetail from './TravelPlansPage/TravelPlanDetail/index.jsx'
const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
  {
    path:'/create-trip',
    element:<CreateTrip/>
  },
  {
    path:'/view-trip/:tripId',
    element:<Viewtrip/>
  },
  {
    path:'/my-trips',
    element:<MyTrips/>
  },
  {
    path:'/my-blog',
    element:<Blog/>
  },
  {
    path: '/blogs/:id',
    element:<BlogContents />
    
  },
  {
    path: '/comments',
    element:<CommentSection/>
    
  },
  {
    path: '/travel-plans',
    element:<TravelPlansPage/>
    
  },
  {
    path: '/plan/:id',
    element:<TravelPlanDetail/>
    
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Header/>
      <Toaster  />
      <RouterProvider router={router} >
        </RouterProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
