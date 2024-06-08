import Button from "@/components/button";
import { Grade } from "@/types/types";
import { useState } from "react";

interface Props {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    onSave: (grade: Grade) => void;
    gradeToSet: Grade;
}

export function GradeValueForm({ setShowModal, onSave, gradeToSet }: Props) {

    const [grade, setGrade] = useState("")

    function handleGradeChange(e: React.ChangeEvent<HTMLInputElement>) {
        setGrade(e.target.value);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        // Prevents from reloading the page, so the state is not deleted
        event.preventDefault();
        gradeToSet.grade = parseFloat(grade);
        onSave(gradeToSet);
        setShowModal(false);
        setGrade("");
    }
    return (
        <form className="text-left" onSubmit={handleSubmit}>

            <div className="mb-6">
                <label htmlFor="input" className="block mb-2 text-sm font-medium text-gray-900">
                    Note
                </label>
                <input
                    value={grade}
                    id="input"
                    name="input"
                    onChange={handleGradeChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Note"
                    required
                />
            </div>
            <div className="flex gap-4">
                <Button
                    onClick={() => setShowModal(false)}
                    text="Abbrechen"
                />
                <Button
                    submit={true}
                    text="Speichern"
                />
            </div>
        </form>
    )
}