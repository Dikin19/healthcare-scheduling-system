import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import PatientList from "./pages/PatientList.jsx";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { mockLink } from "./graphql/mockLink.js";
import { ApolloProvider } from "@apollo/client/react";
import PatientDetail from "./pages/patientDetail.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Calendar from "./pages/Calendar.jsx"
import WorkFlowBuilder from "./pages/workFlowBuilder.jsx";


const client = new ApolloClient({
  link: mockLink,
  cache: new InMemoryCache()
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <PatientList />
  },
  {
    path: "/patient/:id",
    element: <PatientDetail />
  },
  {
    path: "/calendar",
    element: <Calendar />
  },
  {
    path: "/work-flow-builder",
    element: <WorkFlowBuilder />
  }

])


const root = document.getElementById("root")
ReactDOM.createRoot(root).render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"

    />
  </ApolloProvider>
);