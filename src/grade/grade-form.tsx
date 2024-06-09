import React, { useState } from "react";
import { Grade } from "@/types/types.ts";
import Button from "@/components/button.tsx";

interface Props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  onSave: (grade: Grade) => void;
  blockedNames: string[];
}

export default function GradeForm({ setShowModal, onSave, blockedNames }: Props) {
  const [name, setName] = useState("")
  const [weight, setWeigth] = useState("")
  const [error, setError] = useState("")

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
    if (blockedNames.includes(e.target.value)) {
      setError("Name bereits vergeben")
    }
  }

  function handleWeigthChange(e: React.ChangeEvent<HTMLInputElement>) {
    setWeigth(e.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // Prevents from reloading the page, so the state is not deleted
    event.preventDefault();
    onSave({ name, grade: 0, weight: parseFloat(weight) } as Grade);
    setShowModal(false);
    setName("");
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
          placeholder="EN 1"
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
      <div className="mb-6">
        <label htmlFor="input" className="block mb-2 text-sm font-medium text-gray-900">
          Gewichtung in %
        </label>
        <input type="number"
          value={weight}
          id="input"
          name="input"
          onChange={handleWeigthChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="50"
          required
        />
      </div>
      <div className="flex gap-4">
        <Button
          onClick={() => setShowModal(false)}
          text="Abbrechen"
        />
        <Button
          disabled={error.length > 0}
          submit={true}
          text="Speichern"
        />
      </div>
    </form>
  )
}