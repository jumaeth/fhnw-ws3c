import './App.css'
import {DeleteButtonProvider} from "@/hooks/delete-button-provider.tsx";
import Header from "@/components/header.tsx";

export default function App({children}: { children: React.ReactNode }) {
  return (
    <DeleteButtonProvider children={
      <>
        <div className="flex flex-col h-screen overflow-hidden">
          <Header/>
          <main>
            {children}
          </main>
        </div>
      </>
    }>
    </DeleteButtonProvider>
  )
}