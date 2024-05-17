import React, {useState} from "react";

interface Props {
  inputLabelName: string;
  placeholder?: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  onSave: (text: string) => void;
}

export default function SingleInputForm({inputLabelName, placeholder, setShowModal, onSave}: Props) {
  const [input, setInput] = useState("")
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
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
        <label htmlFor="input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {inputLabelName}
        </label>
        <input type="text"
               value={input}
               id="input"
               name="input"
               onChange={handleInputChange}
               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white-500 dark:focus:border-white-500"
               placeholder={placeholder}
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