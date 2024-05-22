import {useState} from "react";
import {Semester} from "@/types/types.ts";
import {Icons} from "@/components/icons.tsx";
import Modal from "@/components/modal.tsx";
import SingleInputForm from "@/components/single-input-form.tsx";
import {Link} from "react-router-dom";
import Card from "@/components/card.tsx";
import {calculateModuleAverage} from "@/module/module.tsx";
import {useDeleteButton} from "@/hooks/delete-button-provider.tsx";
import Button from "@/components/button.tsx";

export default function SemesterPage() {
  if (!localStorage.semesters) {
    localStorage.semesters = JSON.stringify([]);
  }
  const [semester, setSemester] = useState<Semester[]>(JSON.parse(localStorage.semesters))
  const [showModal, setShowModal] = useState(false);
  const {showDeleteButtons} = useDeleteButton();

  function addSemester(name: string) {
    if (semester.find((semester: Semester) => semester.name === name)) {
      console.error("Semester already exists");
      return;
    }
    const semesters = JSON.parse(localStorage.semesters) || [];
    const newSemester = {name, modules: []};
    semesters.push(newSemester);
    setSemester(semesters)
    localStorage.semesters = JSON.stringify(semesters);
  }

  function calculateAverageGrade(semester: Semester) {
    let sumOfModuleAverages = 0;

    for (const module of semester.modules) {
      const moduleAverage = calculateModuleAverage(module);
      sumOfModuleAverages += Number(moduleAverage);
    }

    return semester.modules.length > 0 ? (sumOfModuleAverages / semester.modules.length).toFixed(2) : 'N/A';
  }

  function deleteSemester(input: Semester) {
    const semesters = JSON.parse(localStorage.semesters) || [];
    const updatedSemesters = semesters.filter((semester: Semester) => semester.name !== input.name);
    setSemester(updatedSemesters);
    localStorage.semesters = JSON.stringify(updatedSemesters);
  }

  return (
    <>
      <h1>Semester</h1>
      <div className="flex flex-col gap-2 mb-2">
        {semester.map((semester, index) => (
          <div key={index} className="flex gap-2">
            <Link to={`/semester/${semester.name}`}>
              <Card left={semester.name} right={"⌀ " + calculateAverageGrade(semester)}/>
            </Link>
            {showDeleteButtons && (
              <Button
                onClick={() => deleteSemester(semester)}
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
            <h3 className="text-lg font-black text-gray-800 mb-6">Neues Semester</h3>
            <SingleInputForm inputLabelName="Semester" placeholder="HS25" setShowModal={setShowModal}
                             onSave={text => addSemester(text)}/>
          </div>
        </div>
      </Modal>
    </>
  )
}