import {Icons} from "@/components/icons.tsx";
import {useDeleteButton} from "@/hooks/delete-button-provider.tsx";
import Button from "@/components/button.tsx";
import BackButton from "@/components/back-button.tsx";

export default function Header() {
  const {toggleDeleteButtons} = useDeleteButton();

  return (
    <div className='flex shadow-md min-h-[50px] tracking-wide relative z-50 bg-white'>
      <div className='flex flex-wrap justify-between gap-5 w-full'>
        <BackButton onClick={() => window.history.back()}/>
        <Button
          onClick={toggleDeleteButtons}
          icon={<Icons.settings2 className="w-4 h-4"/>}
        >
        </Button>
      </div>
    </div>
  )
}