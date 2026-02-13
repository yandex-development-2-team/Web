import { Outlet } from 'react-router';
import { AppSidebar, SidebarInset } from './components/shell/Sidebar';
import { SidebarProvider } from './app/providers/Sidebar';
function App() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}

export default App;
