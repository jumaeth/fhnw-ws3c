import Modal from "@/components/modal.tsx";
import GradeForm from "@/grade/grade-form.tsx";
import {useState} from "react";
import {useParams} from "react-router-dom";
import {Grade} from "@/types/types.ts";
import {Icons} from "@/components/icons.tsx";
import Card from "@/components/card.tsx";

export default function GradePage() {
  const [showModal, setShowModal] = useState(false);
  const {semesterId, moduleId} = useParams();

  const semesters = JSON.parse(localStorage.semesters) || [];
  const semester = semesters.find((sem: any) => sem.name === semesterId);
  const module = semester?.modules.find((mod: any) => mod.name === moduleId);

  if (semesterId === undefined || moduleId === undefined) {
    return null;
  }

  function addGrade(semesterName: string, moduleName: string, grade: Grade) {
    const semesters = JSON.parse(localStorage.semesters) || [];
    const semester = semesters.find((sem: any) => sem.name === semesterName);
    if (semester) {
      const module = semester.modules.find((mod: any) => mod.name === moduleName);
      if (module) {
        module.grades.push(grade);
        localStorage.semesters = JSON.stringify(semesters);
      } else {
        console.error('Module not found');
      }
    } else {
      console.error('Semester not found');
    }
  }

  return (
    <>
      <h1>Noten</h1>
      <div className="flex flex-col gap-2 mb-2">
        {module.grades.map((grade: Grade, index: number) => (
          <Card
            key={index}
            left={grade.name}
            addonRight={"gew. " + grade.weight}
            right={grade.grade.toString()}
          />
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
            <h3 className="text-lg font-black text-gray-800 mb-6 dark:text-white">Neue Note</h3>
            <GradeForm setShowModal={setShowModal} onSave={grade => addGrade(semesterId, moduleId, grade)}/>
          </div>
        </div>
      </Modal>
    </>
  )
}