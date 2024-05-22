import React, {useState} from "react";
import {Grade} from "@/types/types.ts";
import Button from "@/components/button.tsx";

interface Props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  onSave: (grade: Grade) => void;
}

export default function GradeForm({setShowModal, onSave}: Props) {
  const [name, setName] = useState("")
  const [grade, setGrade] = useState("")
  const [weight, setWeigth] = useState("")

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handleGradeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setGrade(e.target.value);
  }

  function handleWeigthChange(e: React.ChangeEvent<HTMLInputElement>) {
    setWeigth(e.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // Prevents from reloading the page, so the state is not deleted
    event.preventDefault();
    onSave({name, grade: parseFloat(grade), weight: parseFloat(weight)} as Grade);
    setShowModal(false);
    setName("");
    setGrade("");
    setWeigth("");
  }

  return (
    <form className="text-left" onSubmit={handleSubmit}>
      <div className="mb-6">
        <label htmlFor="input" className="block mb-2 text-sm font-medium text-gray-900">
          Prüfungsname
        </label>
        <input type="text"
               value={name}
               id="input"
               name="input"
               onChange={handleNameChange}
               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
               placeholder="Prüfungsname"
               required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="input" className="block mb-2 text-sm font-medium text-gray-900">
          Note
        </label>
        <input type="number"
               value={grade}
               id="input"
               name="input"
               onChange={handleGradeChange}
               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
               placeholder="Note"
               required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="input" className="block mb-2 text-sm font-medium text-gray-900">
          Gewichtung
        </label>
        <input type="number"
               value={weight}
               id="input"
               name="input"
               onChange={handleWeigthChange}
               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
               placeholder="Gewichtung"
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