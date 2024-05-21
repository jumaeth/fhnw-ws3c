import {useState} from "react";
import {Link, useParams} from "react-router-dom";
import {Icons} from "@/components/icons.tsx";
import Modal from "@/components/modal.tsx";
import SingleInputForm from "@/components/single-input-form.tsx";
import {Module} from "@/types/types.ts";
import Card from "@/components/card.tsx";

export default function ModulePage() {
  const [showModal, setShowModal] = useState(false);
  const {semesterId} = useParams();

  if (semesterId === undefined) {
    return null;
  }

  const semesters = JSON.parse(localStorage.semesters) || [];
  const semester = semesters.find((sem: any) => sem.name === semesterId);

  function addModule(moduleName: string) {
    if (semester) {
      const newModule = { name: moduleName, grades: [] };
      semester.modules.push(newModule);
      localStorage.semesters = JSON.stringify(semesters);
    } else {
      console.error('Semester not found');
    }
  }

  return (
    <>
      <h1>Module</h1>
      <div className="flex flex-col gap-2 mb-2">
        {semester.modules.map((module: Module, index: number) => (
          <Link to={`/semester/${semester.name}/module/${module.name}`} key={index}>
            <Card left={module.name} right={"⌀ " + calculateModuleAverage(module)}/>
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
            <h3 className="text-lg font-black text-gray-800 mb-6 dark:text-white">Neues Modul</h3>
            <SingleInputForm inputLabelName="Module" placeholder="MADA" setShowModal={setShowModal} onSave={moduleName => addModule(moduleName)}/>
          </div>
        </div>
      </Modal>
    </>
  )
}

export function calculateModuleAverage(module: Module) {
  let sumOfGradeByWeigth = 0;
  let weightSum = 0;

  for (const grade of module.grades) {
    sumOfGradeByWeigth += grade.grade * grade.weight;
    weightSum += Number(grade.weight);
  }

  return weightSum > 0 ? (sumOfGradeByWeigth / weightSum).toFixed(2) : 'N/A';
}