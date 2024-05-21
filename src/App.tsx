import './App.css'
import SemesterPage from "@/semester/semester.tsx";

export default function App() {
  localStorage.grade = JSON.stringify(4);
  localStorage.title = JSON.stringify("B.Sc. Informatik");
  // const [grade, setGrade] = useState<number>(JSON.parse(localStorage.grade));
  // const [title, setTitle] = useState<string>(JSON.parse(localStorage.title));
  return (
    <>
      <div>
        {/*<h1>{grade} Gewinnt</h1>*/}
        {/*<h1>{title}</h1>*/}
        <SemesterPage/>
      </div>
    </>
  )
}