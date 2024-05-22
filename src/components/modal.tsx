import { Icons } from "@/components/icons.tsx"
import Button from "@/components/button.tsx";

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
        bg-white rounded-xl shadow-6 transition-all
        ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
      `
        }>
          <Button
            onClick={onClose}
            icon={<Icons.x className="w-4 h-4"/>}
          />
          {children}
        </div>
      </div>
    </>
  )
}