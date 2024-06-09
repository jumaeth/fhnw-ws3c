import { Icons } from "@/components/icons.tsx"
import Button from "./button";

export function AddButton({ onClick, text }: { onClick: () => void, text?: string }) {

    return (
        <Button
            onClick={() => onClick()}
            icon={<Icons.plus color="#6b7280" className="w-6 h-6" />}
            text={text}
        />
    )
}