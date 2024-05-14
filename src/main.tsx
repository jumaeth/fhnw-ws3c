import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {Grade} from "./grade/Grade.tsx";
import {Module} from "./module/Module.tsx";
import {Semester} from "./semester/Semester.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App/>
    ),
  },
  {
    path: "semester",
    element: (
      <Semester/>
    ),
  },
  {
    path: "module",
    element: (
      <Module/>
    ),
  },
  {
    path: "grade",
    element: (
      <Grade/>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
