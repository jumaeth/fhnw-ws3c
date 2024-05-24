import {useState} from "react";
import {Education, Semester} from "@/types/types.ts";
import {Icons} from "@/components/icons.tsx";
import Modal from "@/components/modal.tsx";
import SingleInputForm from "@/components/single-input-form.tsx";
import {Link, useParams} from "react-router-dom";
import Card from "@/components/card.tsx";
import {calculateModuleAverage} from "@/module/module.tsx";
import {useDeleteButton} from "@/hooks/delete-button-provider.tsx";
import Button from "@/components/button.tsx";

export default function SemesterPage() {
  const [educations, setEducations] = useState<Education[]>(JSON.parse(localStorage.educations))
  const [showModal, setShowModal] = useState(false);
  const {educationId} = useParams();
  const {showDeleteButtons} = useDeleteButton();

  const education = educations.find((education: Education) => education.name === educationId);

  if (educationId === undefined || !education) {
    return null;
  }

  function addSemester(name: string) {
    if (education) {
      if (education.semesters.find((semester: Semester) => semester.name === name)) {
        console.error("Semester already exists");
        return;
      }
      const newSemester = {name, modules: []};
      education.semesters.push(newSemester);
      localStorage.educations = JSON.stringify(educations);
    }
  }

  function deleteSemester(input: Semester) {
    if (education) {
      education.semesters = education.semesters.filter((semester: Semester) => semester.name !== input.name);
      const updatedEducations = educations.map((education: Education) => education.name === educationId ? education : education);
      setEducations(updatedEducations);
      localStorage.educations = JSON.stringify(updatedEducations);
    }
  }

  return (
    <>
      <h1>Semester</h1>
      <div className="flex flex-col gap-2 mb-2">
        {education.semesters.map((semester, index) => (
          <div key={index} className="flex gap-2">
            <Link to={`/education/${education.name}/semester/${semester.name}`}>
              <Card left={semester.name} right={"⌀ " + calculateSemesterAverage(semester)}/>
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

export function calculateSemesterAverage(semester: Semester) {
  let sumOfModuleAverages = 0;

  for (const module of semester.modules) {
    const moduleAverage = calculateModuleAverage(module);
    sumOfModuleAverages += Number(moduleAverage);
  }

  return semester.modules.length > 0 ? (sumOfModuleAverages / semester.modules.length).toFixed(1) : 'N/A';
}