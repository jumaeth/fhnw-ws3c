import Modal from "@/components/modal.tsx";
import GradeForm from "@/grade/grade-form.tsx";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Education, Grade, Module, Semester } from "@/types/types.ts";
import { GeneratedGradeCard } from "./generated-grade-card";
import { Subtitle } from "@/components/subtitle";
import { setAverage } from "@/components/footer";
import { calculateModuleAverage } from "@/module/module";
import { AddButton } from "@/components/add-button";
import { Card } from "@/components/card";
import { Icons } from "@/components/icons";

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
      <div className="flex flex-col items-center justify-center gap-4 mb-2 mt-4">
        <Subtitle>{module.name}</Subtitle>

        {grades.filter((grade: Grade) => grade.grade !== 0).map((grade: Grade, index: number) => (
          <Card key={index} toDelete={() => deleteGrade(grade)}>
            <p>{grade.name}</p>
            <div className="flex gap-6">
              <span className="flex items-center gap-2 "><Icons.weight color="#6b7280" className="w-4 h-4" />{grade.weight} %</span>
              <span className="font-semibold text-gray-800 text-2xl">{grade.grade}</span>
            </div>
          </Card>
        ))}

        {grades.filter((grade: Grade) => grade.grade === 0).map((grade: Grade, index: number) => (
          <GeneratedGradeCard key={index} grade={grade} module={module} setGrade={setGradeGrade} deleteGrade={deleteGrade} />
        ))}
        <AddButton onClick={() => setShowModal(true)} text="Note hinzufügen" />
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <div className="text-center w-80 bg-gray-50">
          <div className="mx-auto my-4 w-64">
            <h3 className="text-lg font-black text-gray-800 mb-6">Neue Note</h3>
            <GradeForm blockedNames={grades.map((g: Grade) => g.name)} setShowModal={setShowModal} onSave={grade => addGrade(grade)} />
          </div>
        </div>
      </Modal>
    </>
  )
}