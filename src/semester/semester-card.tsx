import { Card } from "@/components/card";
import { Icons } from "@/components/icons";
import { Semester } from "@/types/types";
import { useParams } from "react-router-dom";
import { calculateSemesterAverage } from "./semester";

export function SemesterCard({ semester, deleteSemester }: { semester: Semester, deleteSemester: (semester: Semester) => void }) {

    const { educationId } = useParams();

    const avg = calculateSemesterAverage(semester) || 0;

    return (
        <Card
            url={`/education/${educationId}/semester/${semester.name}`}
            toDelete={() => deleteSemester(semester)}>
            <p>{semester.name}</p>
            <div className="flex gap-6">
                <span className="flex items-center gap-2 "><Icons.average color="#6b7280" className="w-4 h-4" />{avg}</span>
            </div>
        </Card>
    )
}