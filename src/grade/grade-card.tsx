import Button from "@/components/button";
import { Icons } from "@/components/icons";
import { useDeleteButton } from "@/hooks/delete-button-provider";
import { Grade } from "@/types/types";

interface GradeCardProps {
    grade: Grade;
    deleteGrade: (grade: Grade) => void;
}

export function GradeCard({ grade, deleteGrade }: GradeCardProps) {

    const { showDeleteButtons } = useDeleteButton();

    return (
        <div className="flex gap-2">
            <div className={`bg-white w-64 flex flex-row items-center justify-between text-gray-500 gap-4 shadow-lg rounded-lg py-4 px-6`}>
                <p className="text-xl">{grade.name}</p>
                <div className="flex gap-6">
                    <div className="flex items-center gap-2 "><Icons.weight color="#6b7280" className="w-4 h-4" />{grade.weight} %</div>
                    <span className="font-semibold text-gray-800 text-2xl">{grade.grade}</span>
                </div>
            </div>
            {showDeleteButtons && (
                <Button
                    onClick={() => deleteGrade(grade)}
                    icon={<Icons.trash color="#6b7280" className="w-4 h-4" />}
                />
            )}
        </div>
    )
}