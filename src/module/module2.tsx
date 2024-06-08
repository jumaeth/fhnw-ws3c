import { WinGrade } from "@/components/win-grade";
import { Education, Semester } from "@/types/types";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function Module() {
    const { educationId, semesterId, moduleId } = useParams();
    const [educations, setEducations] = useState<Education[]>(JSON.parse(localStorage.educations) || [])

    const [module, setModule] = useState(
        educations.find((education: Education) => education.name === educationId)
            ?.semesters.find((semester: Semester) => semester.name === semesterId)
            ?.modules.find((module) => module.name === moduleId)
    );
    if (module === undefined) {
        return null;
    }

    function calculateModuleAverage() {
        let sumOfGradeByWeigth = 0;
        let weightSum = 0;

        for (const grade of module!.grades) {
            sumOfGradeByWeigth += grade.grade * grade.weight;
            weightSum += Number(grade.weight);
        }

        return weightSum > 0 ? (sumOfGradeByWeigth / weightSum).toFixed(1) : 'N/A';
    }

    return (
        <div className="flex flex-col justify-center">

            <WinGrade />
            {module.grades.map((grade, index) => (
                <div key={index} className="shadow-lg rounded-3xl my-4 mx-10 p-6 flex justify-between">
                    <p>{grade.name}</p>
                    <p>{grade.grade}</p>
                    <p>{grade.weight}</p>
                </div>
            ))}
            <p>{calculateModuleAverage()}</p>
        </div>
    )
}