import { useState } from "react";
import { Education, Semester } from "@/types/types.ts";
import Modal from "@/components/modal.tsx";
import SingleInputForm from "@/components/single-input-form.tsx";
import { useParams } from "react-router-dom";
import { calculateModuleAverage } from "@/module/module.tsx";
import { setAverage } from "@/components/footer";
import { SemesterCard } from "./semester-card";
import { Subtitle } from "@/components/subtitle";
import { AddButton } from "@/components/add-button";

export default function SemesterPage() {
  const { educationId } = useParams();

  const [educations] = useState<Education[]>(JSON.parse(localStorage.educations))
  const [education] = educations.filter((education: Education) => education.name === educationId);
  const [semesters, setSemesters] = useState(education?.semesters);

  const [showModal, setShowModal] = useState(false);

  setAverage(calculateEducationAverage(education));

  function addSemester(name: string) {
    if (semesters.find((semester: Semester) => semester.name === name)) {
      console.error("Semester already exists");
      return;
    }
    const newSemesters = [...semesters, { name, modules: [] }];
    setSemesters(newSemesters);
    education.semesters = newSemesters;
    localStorage.educations = JSON.stringify(educations);
  }

  function deleteSemester(input: Semester) {
    const newSemesters = semesters.filter((semester: Semester) => semester.name !== input.name);
    setSemesters(newSemesters);
    education.semesters = newSemesters;
    localStorage.educations = JSON.stringify(educations);
  }

  return (
    <>
      <div className="flex flex-col items-center gap-4 mb-2 mt-4">
        <Subtitle>{education.name}</Subtitle>

        {education.semesters.map((semester, index) => (
          <SemesterCard key={index} semester={semester} deleteSemester={deleteSemester} />
        ))}

        <AddButton onClick={() => setShowModal(true)} />
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <div className="text-center w-80 bg-gray-50">
          <div className="mx-auto my-4 w-64">
            <h3 className="text-lg font-black text-gray-800 mb-6">Neues Semester</h3>
            <SingleInputForm inputLabelName="Semester" placeholder="HS25" setShowModal={setShowModal}
              onSave={text => addSemester(text)} blockedValues={semesters.map((s: Semester) => s.name)} />
          </div>
        </div>
      </Modal>
    </>
  )
}

function calculateEducationAverage(education: Education): number {
  let sumOfSemesterAverages = 0;
  let semesterCount = 0;

  for (const semester of education.semesters) {
    const semesterAverage = calculateSemesterAverage(semester);
    if (semesterAverage === 0) {
      continue;
    }
    sumOfSemesterAverages += Number(semesterAverage);
    semesterCount++;
  }
  return education.semesters.length > 0 ? (sumOfSemesterAverages / semesterCount) : 0;
}

export function calculateSemesterAverage(semester: Semester): number {
  if (!semester.modules.length) {
    return 0;
  }
  let sumOfModuleAverages = 0;
  let moduleCount = 0;

  for (const module of semester.modules) {
    const moduleAverage = calculateModuleAverage(module);
    if (moduleAverage === 0) {
      continue;
    }
    sumOfModuleAverages += Number(moduleAverage);
    moduleCount++;
  }

  return semester.modules.length > 0 ? (sumOfModuleAverages / semester.modules.length) : 0;
}