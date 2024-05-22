import Modal from "@/components/modal.tsx";
import GradeForm from "@/grade/grade-form.tsx";
import {useState} from "react";
import {useParams} from "react-router-dom";
import {Grade, Module, Semester} from "@/types/types.ts";
import {Icons} from "@/components/icons.tsx";
import Card from "@/components/card.tsx";
import {useDeleteButton} from "@/hooks/delete-button-provider.tsx";

export default function GradePage() {
  const [showModal, setShowModal] = useState(false);
  const [semesters, setSemesters] = useState<Semester[]>(JSON.parse(localStorage.semesters) || [])
  const {semesterId, moduleId} = useParams();
  const {showDeleteButtons} = useDeleteButton();

  const semester = semesters.find((sem: Semester) => sem.name === semesterId);
  const module = semester?.modules.find((mod: Module) => mod.name === moduleId);

  if (semesterId === undefined || moduleId === undefined || !semester || !module) {
    return null;
  }

  function addGrade(grade: Grade) {
    const semesters = JSON.parse(localStorage.semesters) || [];
    if (semester) {
      const module = semester.modules.find((mod: any) => mod.name === moduleId);
      if (module) {
        if (module.grades.find((existingGrade: Grade) => existingGrade.name === grade.name)) {
          console.error("Grade already exists");
          return;
        }
        module.grades.push(grade);
        localStorage.semesters = JSON.stringify(semesters);
      } else {
        console.error('Module not found');
      }
    } else {
      console.error('Semester not found');
    }
  }

  function deleteGrade(grade: Grade) {
    if (semester) {
      if (module) {
        module.grades = module.grades.filter((grd: Grade) => grd.name !== grade.name);
        const updatedSemesters = semesters.map((sem: Semester) => sem.name === semester.name ? semester : sem);
        setSemesters(updatedSemesters);
        localStorage.semesters = JSON.stringify(updatedSemesters);
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
          <div key={index} className="flex gap-2">
            <Card
              key={index}
              left={grade.name}
              addonRight={"gew. " + grade.weight}
              right={grade.grade.toString()}
            />
            {showDeleteButtons && (
              <button
                className="bg-gray-50 dark:bg-zinc-800 shadow-lg rounded-lg"
                onClick={() => deleteGrade(grade)}
              >
                <Icons.trash className="w-4 h-4"/>
              </button>
            )}
          </div>
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
            <GradeForm setShowModal={setShowModal} onSave={grade => addGrade(grade)}/>
          </div>
        </div>
      </Modal>
    </>
  )
}