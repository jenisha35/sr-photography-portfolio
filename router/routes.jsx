import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../components/Home";
import Gallery from "../components/Gallery";
import Services from "../components/Services";
import ClientTestimonials from "../components/ClientTestimonials";
import Contact from "../components/Contact";
import PageNotFound from "../components/PageNotFound";
import Login from "../components/admin/login";
import AdminDashboard from "../components/admin/AdminDashboard";
import Pagenf from "../components/Pagenf";

let MyRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/gallery",
        element: <Gallery />
      },
      {
        path: "/services",
        element: <Services />
      },
      {
        path: "/client-testimonials",
        element: <ClientTestimonials />
      },
      {
        path: "/contact",
        element: <Contact />
      }
    ]
  },
  {
    path: "/admin-login", 
    element: <Login />
  },
  {
    path: "/admin", 
    element: <AdminDashboard />
  },
  {
    path: "*",
    element: <Pagenf/>
  }
]);

export default MyRoutes;
