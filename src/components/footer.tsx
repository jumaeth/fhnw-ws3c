import {useEffect, useState} from "react";
import {Semester} from "@/types/types.ts";
import {calculateSemesterAverage} from "@/semester/semester.tsx";
import {calculateModuleAverage} from "@/module/module.tsx";

export default function Footer() {
  if (location.pathname === "/") {
    return (<p className="text-gray-500">4 Gewinnt © {new Date().getFullYear().toString()}</p>)
  }

  const [averages, setAverages] = useState<number[]>([]);

  useEffect(() => {
    const semesters: Semester[] = JSON.parse(localStorage.semesters);

    if (location.pathname.includes('/education')) {
      const averages = semesters.map(semester => parseFloat(calculateSemesterAverage(semester)));
      setAverages(averages);
    }
    if (location.pathname.includes('/education') && location.pathname.includes('/semester')) {
      const semester = semesters.find(semester => semester.name === location.pathname.split('/')[2]);
      if (!semester) return;
      const averages = semester?.modules.map(module => parseFloat(calculateModuleAverage(module)));
      setAverages(averages);
    }
    if (location.pathname.includes('/education') && location.pathname.includes('/semester') && location.pathname.includes('/module')) {
      const semester = semesters.find(semester => semester.name === location.pathname.split('/')[2]);
      if (!semester) return;
      const module = semester.modules.find(module => module.name === location.pathname.split('/')[4]);
      if (!module) return;
      const averages = module.grades.map(grade => grade.grade);
      setAverages(averages);
    }
  }, [location]);

  function calculateAverageGrade(grades: number[]) {
    if (!grades.length) return 0;
    const sum = grades.reduce((a, b) => a + b, 0);
    return parseFloat((sum / grades.length).toFixed(1));
  }

  const average = calculateAverageGrade(averages);

  const getColor = average < 4 ? average < 3.75 ? "text-red-500" : "text-orange-500" : "text-green-500";

  return (
    <div className="flex justify-center items-center h-12">
      <p className="text-2xl">{"tot. ⌀ "}</p><p className={`ml-2 text-2xl ${getColor}`}>{average.toFixed(1)}</p>
    </div>
  )
}