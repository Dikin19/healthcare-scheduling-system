import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import PatientList from "./pages/PatientList.jsx";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { mockLink } from "./graphql/mockLink.js";
import { ApolloProvider } from "@apollo/client/react";
import PatientDetail from "./pages/patientDetail.jsx";


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
  }
])


const root = document.getElementById("root")
ReactDOM.createRoot(root).render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
);