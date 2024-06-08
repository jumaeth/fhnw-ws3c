import { useState } from "react";
import { useParams } from "react-router-dom";
import { Icons } from "@/components/icons.tsx";
import Modal from "@/components/modal.tsx";
import SingleInputForm from "@/components/single-input-form.tsx";
import { Education, Module, Semester } from "@/types/types.ts";
import { Card } from "@/components/card";
import { Subtitle } from "@/components/subtitle";
import { AddButton } from "@/components/add-button";
import { setAverage } from "@/components/footer";
import { calculateSemesterAverage } from "@/semester/semester";

export default function ModulePage() {
  const { educationId, semesterId } = useParams();
  const [educations] = useState<Education[]>(JSON.parse(localStorage.educations) || [])
  const [education] = educations.filter((education: Education) => education.name === educationId);
  const [semester] = education?.semesters.filter((sem: Semester) => sem.name === semesterId);
  const [modules, setModules] = useState(semester?.modules)

  const [showModal, setShowModal] = useState(false);

  setAverage(calculateSemesterAverage(semester));

  function addModule(moduleName: string) {
    if (semester.modules.find((module: Module) => module.name === moduleName)) {
      console.error("Module already exists");
      return;
    }
    const newModules = [...modules, { name: moduleName, grades: [] }];
    setModules(newModules);
    semester.modules = newModules;
    localStorage.educations = JSON.stringify(educations);
  }

  function deleteModule(module: Module) {
    const newModules = semester.modules.filter((mod: Module) => mod.name !== module.name);
    setModules(newModules);
    semester.modules = newModules;
    localStorage.educations = JSON.stringify(educations);
  }

  return (
    <>
      <div className="flex flex-col items-center gap-2 mb-2 mt-4">

        <Subtitle>{semester.name}</Subtitle>

        {modules.map((module: Module, index: number) => (

          <Card toDelete={() => deleteModule(module)} key={index} url={`/education/${education.name}/semester/${semester.name}/module/${module.name}`}>
            <p>{module.name}</p>
            <div className="flex gap-6">
              <span className="flex items-center gap-2 "><Icons.average color="#6b7280" className="w-4 h-4" />{calculateModuleAverage(module)}</span>
            </div>
          </Card>
        ))}
        <AddButton onClick={() => setShowModal(true)} />
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <div className="text-center w-80 bg-gray-50">
          <div className="mx-auto my-4 w-64">
            <h3 className="text-lg font-black text-gray-800 mb-6">Neues Modul</h3>
            <SingleInputForm inputLabelName="Module" placeholder="MADA" setShowModal={setShowModal}
              onSave={moduleName => addModule(moduleName)} />
          </div>
        </div>
      </Modal>
    </>
  )
}

export function calculateModuleAverage(module: Module): number {
  let sumOfGradeByWeigth = 0;
  let weightSum = 0;

  for (const grade of module.grades) {
    if (grade.grade === 0) {
      continue;
    }
    sumOfGradeByWeigth += grade.grade * grade.weight;
    weightSum += Number(grade.weight);
  }
  return weightSum > 0 ? (sumOfGradeByWeigth / weightSum) : 0;
}