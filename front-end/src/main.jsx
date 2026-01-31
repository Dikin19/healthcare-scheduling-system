import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing/react";
import "./index.css";
import PatientList from "./pages/PatientList.jsx";
import { mocks } from "./graphql/mocks.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PatientList />
  }
])


const root = document.getElementById("root")
ReactDOM.createRoot(root).render(
  <MockedProvider mocks={mocks} addTypename={false}>
    <RouterProvider router={router} />
  </MockedProvider>
);