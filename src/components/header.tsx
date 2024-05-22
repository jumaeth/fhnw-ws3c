import {Icons} from "@/components/icons.tsx";
import {useDeleteButton} from "@/hooks/delete-button-provider.tsx";
import Button from "@/components/button.tsx";

export default function Header() {
  const {toggleDeleteButtons} = useDeleteButton();

  return (
    <div className='flex shadow-md min-h-[50px] tracking-wide relative z-50 bg-white'>
      <div className='flex flex-wrap justify-end gap-5 w-full'>
        <Button
          onClick={toggleDeleteButtons}
          icon={<Icons.settings2 className="w-4 h-4"/>}
        >
        </Button>
      </div>
    </div>
  )
}