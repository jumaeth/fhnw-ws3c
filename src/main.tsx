import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ModulePage from "@/module/module.tsx";
import GradePage from "@/grade/grade.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App/>
    ),
  },
  {
    path: "/semester/:semesterId",
    element: (
      <ModulePage/>
    ),
  },
  {
    path: "/semester/:semesterId/module/:moduleId",
    element: (
      <GradePage/>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
