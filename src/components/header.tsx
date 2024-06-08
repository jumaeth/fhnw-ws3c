import { Icons } from "@/components/icons.tsx";
import { useDeleteButton } from "@/hooks/delete-button-provider.tsx";
import Button from "@/components/button.tsx";
import BackButton from "@/components/back-button.tsx";
import Logo from "@/components/logo.tsx";
import { WinGrade } from "./win-grade";


export default function Header() {
  if (location.pathname === '/') {
    return (
      <header className="w-full flex flex-col gap-20 items-center p-6">
        <Logo />
        <WinGrade />
      </header>
    )
  }

  const { toggleDeleteButtons } = useDeleteButton();

  return (
    <header className="w-full py-6 flex items-start">
      <div className="w-1/3 flex justify-start">
        <BackButton onClick={() => window.history.back()} />
      </div>
      <div className="w-1/3 flex flex-col gap-20 items-center">
        <Logo />
        <WinGrade />
      </div>
      <div className="w-1/3 flex justify-end">
        <Button
          onClick={toggleDeleteButtons}
          icon={<Icons.settings2 color="#6b7280" className="w-6 h-6" />}
        >
        </Button>
      </div>
    </header>
  )
}