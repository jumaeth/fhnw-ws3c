import {DeleteButtonProvider} from "@/hooks/delete-button-provider.tsx";
import Header from "@/components/header.tsx";
import Footer from "@/components/footer.tsx";

export default function App({children}: { children: React.ReactNode }) {
  return (
    <DeleteButtonProvider children={
      <>
        <div className="flex flex-col h-screen">
          <header className="w-full text-center border-b border-grey p-4">
            <Header/>
          </header>
          <div className="flex h-screen justify-center items-center">
            <main className="">
              <div className="">
                {children}
              </div>
            </main>
          </div>
          <footer className="w-full text-center border-t border-grey p-4">
            <Footer/>
          </footer>
        </div>
      </>
    }>
    </DeleteButtonProvider>
  )
}