import Modal from "@/components/modal.tsx";
import GradeForm from "@/grade/grade-form.tsx";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Education, Grade, Module, Semester } from "@/types/types.ts";
import { GradeCard } from "./grade-card";
import { GeneratedGradeCard } from "./generated-grade-card";
import { Subtitle } from "@/components/subtitle";
import { setAverage } from "@/components/footer";
import { calculateModuleAverage } from "@/module/module";
import { AddButton } from "@/components/add-button";

export default function GradePage() {

  const { educationId, semesterId, moduleId } = useParams();
  const [educations, setEducations] = useState<Education[]>(JSON.parse(localStorage.educations) || [])
  const [education] = educations.filter((education: Education) => education.name === educationId);
  const [semester] = education?.semesters.filter((sem: Semester) => sem.name === semesterId);
  const [module] = semester?.modules.filter((mod: Module) => mod.name === moduleId);
  const [grades, setGrades] = useState(module?.grades)
  const [showModal, setShowModal] = useState(false);

  setAverage(calculateModuleAverage(module));

  function addGrade(grade: Grade) {
    if (module) {
      if (module.grades.find((existingGrade: Grade) => existingGrade.name === grade.name)) {
        console.error("Grade already exists");
        return;
      }
      grade.grade = 0;
      module.grades.push(grade);
      setEducations(educations)
      localStorage.educations = JSON.stringify(educations);
    }
  }

  function setGradeGrade(newGrade: Grade) {
    if (module) {
      const newGrades = grades.map((grade: Grade) => {
        if (grade.name === newGrade.name) {
          grade.grade = newGrade.grade;
          return grade;
        }
        return grade;
      })
      setGrades(newGrades);
      localStorage.educations = JSON.stringify(educations);
    }
  }

  function deleteGrade(grade: Grade) {
    const newGrades = grades.filter((grd: Grade) => grd.name !== grade.name);
    setGrades(newGrades);
    module.grades = newGrades;
    localStorage.educations = JSON.stringify(educations);
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 mb-2 mt-4">
        <Subtitle>{module.name}</Subtitle>

        {grades.filter((grade: Grade) => grade.grade !== 0).map((grade: Grade, index: number) => (
          <GradeCard key={index} grade={grade} deleteGrade={deleteGrade} />
        ))}

        {grades.filter((grade: Grade) => grade.grade === 0).map((grade: Grade, index: number) => (
          <GeneratedGradeCard key={index} grade={grade} module={module} setGrade={setGradeGrade} deleteGrade={deleteGrade} />
        ))}
        <AddButton onClick={() => setShowModal(true)} />
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <div className="text-center w-80 bg-gray-50">
          <div className="mx-auto my-4 w-64">
            <h3 className="text-lg font-black text-gray-800 mb-6">Neue Note</h3>
            <GradeForm setShowModal={setShowModal} onSave={grade => addGrade(grade)} />
          </div>
        </div>
      </Modal>
    </>
  )
}