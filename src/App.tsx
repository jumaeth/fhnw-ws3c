import { DeleteButtonProvider } from "@/hooks/delete-button-provider.tsx";
import Header from "@/components/header.tsx";
import { Footer } from "./components/footer";
import { WinGradeProvider } from "./hooks/win-grade-provider";

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <DeleteButtonProvider>
      <WinGradeProvider>
        <div className="flex flex-col h-screen">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </WinGradeProvider>
    </DeleteButtonProvider>
  )
}