import { useRef, useState } from "react";

export function Input({ initialValue, label, name }: { initialValue: string, label?: string | React.ReactNode, name?: string }) {

    const [value, setValue] = useState(initialValue);
    const inputRef = useRef<HTMLInputElement>(null);

    function updateValue(e: React.FocusEvent<HTMLInputElement>) {
        setValue(e.target.value);
    }

    function edit() {
        setTimeout(() => inputRef.current?.focus(), 0);
    }

    return (
        <div onClick={edit} className="flex gap-2 items-center">
            {label && <label htmlFor={name}>{label}</label>}
            {!isEdit && <span className="text-2xl px-2">{value}</span>}
            <input
                key={name}
                id={name}
                ref={inputRef}
                className="w-10 bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-4"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={updateValue}
            />
        </div>
    )
}