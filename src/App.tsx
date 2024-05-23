import {DeleteButtonProvider} from "@/hooks/delete-button-provider.tsx";
import Header from "@/components/header.tsx";
import Footer from "@/components/footer.tsx";

export default function App({children}: { children: React.ReactNode }) {
  return (
    <DeleteButtonProvider children={
      <>
        <div className="flex flex-col h-screen">
          <header className="w-full text-center p-4">
            <Header/>
          </header>
          <div className="flex h-screen justify-center items-center">
            <main className="">
              <div className="">
                {children}
              </div>
            </main>
          </div>
          <footer className="w-full rounded-t-3xl border-2 shadow-[rgba(0,0,15,0.5)_0px_0px_10px_0px] bg-white text-center p-4">
            <Footer/>
          </footer>
        </div>
      </>
    }>
    </DeleteButtonProvider>
  )
}