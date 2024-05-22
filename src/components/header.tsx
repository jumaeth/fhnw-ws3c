import {Icons} from "@/components/icons.tsx";
import {useDeleteButton} from "@/hooks/delete-button-provider.tsx";

export default function Header() {
  const {toggleDeleteButtons} = useDeleteButton();

  return (
    <header className='flex shadow-md min-h-[50px] tracking-wide relative z-50 bg-white'>
      <div className='flex flex-wrap justify-end gap-5 w-full'>
        <button
          onClick={toggleDeleteButtons}
          className="btn btn-light"
          type="button"
        >
          <Icons.settings2 className="w-4 h-4"/>
        </button>
      </div>
    </header>
  )
}