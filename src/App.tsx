import './App.css'
import {useState} from "react";
import {Semester} from "../types/types.ts";
import {Link} from "react-router-dom";
import Modal from "@/components/modal.tsx";
import { Icons } from '@/components/icons.tsx';
import SingleInputForm from "@/components/single-input-form.tsx";

export default function App() {
  localStorage.grade = JSON.stringify(4);
  localStorage.title = JSON.stringify("B.Sc. Informatik");
  const [grade, setGrade] = useState<number>(JSON.parse(localStorage.grade));
  const [title, setTitle] = useState<string>(JSON.parse(localStorage.title));
  const [semester, setSemester] = useState<Semester[]>(JSON.parse(localStorage.semester));
  const [showModal, setShowModal] = useState(false);

  function addSemester(text: string) {
    console.log(text)
    const names = [...semester, {name: text, modules: []}];
    setSemester(names)
    localStorage.semester = JSON.stringify(names);
    console.log(localStorage.semester)
  }

  return (
    <>
      <div>
        <h1>{grade} Gewinnt</h1>
        <h1>{title}</h1>
        <div className="flex flex-col gap-2 mb-2">
          {semester.map((sem, index) => (
            <Link to="/semester" key={index}>
              <button
                type="button"
              >{sem.name}</button>
            </Link>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setShowModal(true)}
        >
          <Icons.plus className="w-4 h-4"/>
        </button>
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <div className="text-center w-80 bg-gray-50 dark:bg-zinc-900">
            <div className="mx-auto my-4 w-64">
              <h3 className="text-lg font-black text-gray-800 mb-6 dark:text-white">Neues Semester</h3>
              <SingleInputForm inputLabelName="Semester" placeholder="HS25" setShowModal={setShowModal} onSave={text => addSemester(text)}/>
            </div>
          </div>
        </Modal>
      </div>
    </>
  )
}