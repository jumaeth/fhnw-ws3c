import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ModulePage from "@/module/module.tsx";
import GradePage from "@/grade/grade.tsx";
import SemesterPage from "@/semester/semester.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App children={<SemesterPage/>}/>
    ),
  },
  {
    path: "/semester/:semesterId",
    element: (
      <App children={<ModulePage/>}/>
    ),
  },
  {
    path: "/semester/:semesterId/module/:moduleId",
    element: (
      <App children={<GradePage/>}/>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}/>
)
