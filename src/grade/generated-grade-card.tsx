import Modal from "@/components/modal";
import { Grade, Module } from "@/types/types";
import { useState } from "react";
import Button from "@/components/button";
import { Icons } from "@/components/icons";
import { calculateModuleAverage } from "@/module/module";
import { useDeleteButton } from "@/hooks/delete-button-provider";
import { useWinGrade } from "@/hooks/win-grade-provider";
import SingleInputForm from "@/components/single-input-form";

interface GeneratedGradeCardProps {
    grade: Grade;
    module: Module;
    deleteGrade: (grade: Grade) => void;
    setGrade: (grade: Grade) => void;
}

export function GeneratedGradeCard({ grade, module, deleteGrade, setGrade }: GeneratedGradeCardProps) {

    const [showModal, setShowModal] = useState(false);
    const { showDeleteButtons } = useDeleteButton();

    const { winGrade } = useWinGrade();


    function calcNeededGrade(): string {
        const average = calculateModuleAverage(module);
        if (average === 0) {
            return winGrade.toFixed(2);
        }
        let totalWeightedGrades = 0;
        let totalWeights = 0;

        for (const grade of module.grades) {
            if (grade.grade === 0) continue;
            totalWeightedGrades += grade.grade * grade.weight;
            totalWeights += grade.weight;
            console.log(grade.weight);
        }
        totalWeights += grade.weight;
        const neededGrade = (winGrade * totalWeights - totalWeightedGrades) / grade.weight;
        return neededGrade.toFixed(2);
    }

    return (
        <>
            <div className="mt-8 flex flex-row gap-2">
                <div onClick={() => setShowModal(true)} className={`hover:cursor-pointer border-dashed border-2 border-sky-500 bg-sky-100 w-64 flex flex-row items-center justify-between text-gray-500 gap-4 rounded-lg py-4 px-6`}>
                    <p className="text-xl">{grade.name}</p>
                    <div className="flex gap-6">
                        <div className="flex items-center gap-2 "><Icons.weight color="#6b7280" className="w-4 h-4" />{grade.weight} %</div>
                        <span className="font-semibold text-gray-800 text-2xl">{calcNeededGrade()}</span>
                    </div>

                </div>
                <span className="relative -z-2 -ml-4 -mt-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                </span>
                {showDeleteButtons && (
                    <Button
                        onClick={() => deleteGrade(grade)}
                        icon={<Icons.trash color="#6b7280" className="w-6 h-6" />}
                    />
                )}
            </div>
            <Modal open={showModal} onClose={() => setShowModal(false)}>
                <div className="text-center w-80 bg-gray-50">
                    <div className="mx-auto my-4 w-64">
                        <h3 className="text-lg font-black text-gray-800 mb-6">Note setzten</h3>
                        <SingleInputForm inputLabelName="Note" placeholder="4.0" setShowModal={setShowModal}
                            onSave={value => setGrade({ name: grade.name, grade: parseFloat(value), weight: grade.weight })} />
                    </div>
                </div>
            </Modal>
        </>
    )
}