import { Icons } from "@/components/icons.tsx"

interface ModalProps {
  open: boolean
  onClose: () => void
  children: any
}

export default function Modal({open, onClose, children}: ModalProps) {
  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} className={`
      fixed inset-0 flex justify-center items-center transition-colors
      ${open ? "visisble bg-black/20" : "invisible"}
      `
      }>
        {/* Modal */}
        <div onClick={e => e.stopPropagation()} className={`
        bg-white rounded-xl shadow-6 transition-all dark:bg-zinc-900
        ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
      `
        }>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white dark:bg-zinc-900 hover:text-gray-500">
            <Icons.x className="w-4 h-4"/>
          </button>
          {children}
        </div>
      </div>
    </>
  )
}