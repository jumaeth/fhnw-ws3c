import {useState} from "react";
import {Link, useParams} from "react-router-dom";
import {Icons} from "@/components/icons.tsx";
import Modal from "@/components/modal.tsx";
import SingleInputForm from "@/components/single-input-form.tsx";
import {Module, Semester} from "@/types/types.ts";
import Card from "@/components/card.tsx";
import {useDeleteButton} from "@/hooks/delete-button-provider.tsx";
import Button from "@/components/button.tsx";

export default function ModulePage() {
  const [showModal, setShowModal] = useState(false);
  const [semesters, setSemesters] = useState<Semester[]>(JSON.parse(localStorage.semesters) || [])
  const {semesterId} = useParams();
  const {showDeleteButtons} = useDeleteButton();

  const semester = semesters.find((sem: Semester) => sem.name === semesterId);

  if (semesterId === undefined || !semester) {
    return null;
  }

  function addModule(moduleName: string) {
    if (semester) {
      if (semester.modules.find((module: Module) => module.name === moduleName)) {
        console.error("Module already exists");
        return;
      }
      const newModule = {name: moduleName, grades: []};
      semester.modules.push(newModule);
      localStorage.semesters = JSON.stringify(semesters);
    } else {
      console.error('Semester not found');
    }
  }

  function deleteModule(module: Module) {
    if (semester) {
      semester.modules = semester.modules.filter((mod: Module) => mod.name !== module.name);
      const updatedSemesters = semesters.map((sem: Semester) => sem.name === semester.name ? semester : sem);
      setSemesters(updatedSemesters);
      localStorage.semesters = JSON.stringify(updatedSemesters);
    } else {
      console.error('Semester not found');
    }
  }

  return (
    <>
      <h1>Module</h1>
      <div className="flex flex-col gap-2 mb-2">
        {semester.modules.map((module: Module, index: number) => (
          <div key={index} className="flex gap-2">
            <Link to={`/semester/${semester.name}/module/${module.name}`}>
              <Card left={module.name} right={"⌀ " + calculateModuleAverage(module)}/>
            </Link>
            {showDeleteButtons && (
              <Button
                onClick={() => deleteModule(module)}
                icon={<Icons.trash className="w-4 h-4"/>}
              />
            )}
          </div>
        ))}
      </div>
      <Button
        onClick={() => setShowModal(true)}
        icon={<Icons.plus className="w-4 h-4"/>}
      />
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <div className="text-center w-80 bg-gray-50">
          <div className="mx-auto my-4 w-64">
            <h3 className="text-lg font-black text-gray-800 mb-6">Neues Modul</h3>
            <SingleInputForm inputLabelName="Module" placeholder="MADA" setShowModal={setShowModal}
                             onSave={moduleName => addModule(moduleName)}/>
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