import './App.css'
import {useState} from "react";
import {Semester} from "../types/types.ts";
import {Link} from "react-router-dom";
import Modal from "@/components/modal.tsx";

export default function App() {
  localStorage.grade = JSON.stringify(4);
  localStorage.title = JSON.stringify("B.Sc. Informatik");
  localStorage.semester = JSON.stringify([]);
  const [grade, setGrade] = useState<number>(JSON.parse(localStorage.grade));
  const [title, setTitle] = useState<string>(JSON.parse(localStorage.title));
  const [semester, setSemester] = useState<Semester[]>(JSON.parse(localStorage.semester));
  const [showModal, setShowModal] = useState(false);

  function addSemester() {
    const names = [...semester, {name: "Neues Semester", modules: []}];
    setSemester(names)
    localStorage.semester = JSON.stringify(names);
    console.log(localStorage.semester)
  }

  return (
    <>
      <div>
        <h1>{grade} Gewinnt</h1>
        <h1>{title}</h1>
        <div>
          {semester.map((sem, index) => (
            <Link to="/semester">
              <button type="button" key={index}>{sem.name}</button>
            </Link>
          ))}
        </div>
        <button type="button" onClick={addSemester}>+</button>
        <button
          className=""
          type="button"
          onClick={() => setShowModal(true)}
        >
          Open regular modal
        </button>
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <div className="text-center w-56">
            <h3>Modal</h3>
            <p>Modal</p>
          </div>
        </Modal>
      </div>
    </>
  )
}