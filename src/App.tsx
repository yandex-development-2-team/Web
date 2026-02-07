import { AppSidebar } from "./components/shell/Sidebar";
import { SidebarInset, SidebarProvider } from "./components/ui/Sidebar/Sidebar";

function App() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header>fdf</header>
        <main>В разработке...</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default App;
