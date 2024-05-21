import React, {useState} from "react";
import {Grade} from "@/types/types.ts";

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
        <label htmlFor="input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Prüfungsname
        </label>
        <input type="text"
               value={name}
               id="input"
               name="input"
               onChange={handleNameChange}
               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white-500 dark:focus:border-white-500"
               placeholder="Prüfungsname"
               required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Note
        </label>
        <input type="number"
               value={grade}
               id="input"
               name="input"
               onChange={handleGradeChange}
               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white-500 dark:focus:border-white-500"
               placeholder="Note"
               required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Gewichtung
        </label>
        <input type="number"
               value={weight}
               id="input"
               name="input"
               onChange={handleWeigthChange}
               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white-500 dark:focus:border-white-500"
               placeholder="Gewichtung"
               required
        />
      </div>
      <div className="flex gap-4">
        <button onClick={() => setShowModal(false)}
                className="btn btn-danger w-full"
                type="button"
        >
          Abbrechen
        </button>
        <button className="btn btn-light w-full"
                type="submit"
        >
          Speichern
        </button>
      </div>
    </form>
  )
}