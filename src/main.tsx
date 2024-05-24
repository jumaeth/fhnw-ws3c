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
import EducationPage from "@/education/education.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App children={<EducationPage/>}/>
    ),
  },
  {
    path: "/education:educationId",
    element: (
      <App children={<SemesterPage/>}/>
    ),
  },
  {
    path: "/education:educationId/semester/:semesterId",
    element: (
      <App children={<ModulePage/>}/>
    ),
  },
  {
    path: "/education:educationId/semester/:semesterId/module/:moduleId",
    element: (
      <App children={<GradePage/>}/>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}/>
)
