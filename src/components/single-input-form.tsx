import React, { useState } from "react";
import Button from "@/components/button.tsx";

interface Props {
  inputLabelName: string;
  placeholder?: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  onSave: (text: string) => void;
  blockedValues?: string[];
}

export default function SingleInputForm({ inputLabelName, placeholder, setShowModal, onSave, blockedValues }: Props) {

  const [input, setInput] = useState("")
  const [error, setError] = useState("")

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
    if (blockedValues && blockedValues.includes(e.target.value)) {
      setError("Name bereits vergeben")
    }
  }
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // Prevents from reloading the page, so the state is not deleted
    event.preventDefault();
    onSave(input);
    setShowModal(false);
    setInput("");
  }

  return (
    <form className="text-left" onSubmit={handleSubmit}>
      <div className="mb-6">
        <label htmlFor="input" className="block mb-2 text-sm font-medium text-gray-900">
          {inputLabelName}
        </label>
        <input type="text"
          value={input}
          id="input"
          name="input"
          onChange={handleInputChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder={placeholder}
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
      <div className="flex gap-4">
        <Button
          onClick={() => setShowModal(false)}
          text="Abbrechen"
        />
        <Button
          disabled={error.length > 0}
          text="Speichern"
          submit={true}
        />
      </div>
    </form>
  )
}