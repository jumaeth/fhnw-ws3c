import {Icons} from "@/components/icons.tsx";
import {useDeleteButton} from "@/hooks/delete-button-provider.tsx";
import Button from "@/components/button.tsx";
import BackButton from "@/components/back-button.tsx";
import Logo from "@/components/logo.tsx";

export default function Header() {
  const {toggleDeleteButtons} = useDeleteButton();

  return (
    <div className='flex min-h-[40px] tracking-wide relative z-50 bg-white'>
      <div className='flex gap-5 w-full'>
        <div className="w-1/3 flex justify-start">
          <BackButton onClick={() => window.history.back()}/>
        </div>
        <div className="w-1/3">
          <Logo/>
        </div>
        <div className="w-1/3 flex justify-end">
          <Button
            onClick={toggleDeleteButtons}
            icon={<Icons.settings2 className="w-4 h-4"/>}
          >
          </Button>
        </div>
      </div>
    </div>
  )
}