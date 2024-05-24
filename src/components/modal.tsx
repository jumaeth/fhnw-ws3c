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
      <div
        onClick={onClose}
        className={`fixed inset-0 flex justify-center items-center transition-colors ${open ? "visisble bg-black/20" : "invisible"}`}
      >
        {/* Modal */}
        <div
          onClick={e => e.stopPropagation()}
          className={`bg-gray-50 rounded-xl shadow-6 transition-all ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}
        >
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="p-2"
            >
              <Icons.x color="#6b7280" className="w-4 h-4"/>
            </button>
          </div>
          {children}
        </div>
      </div>
    </>
  )
}