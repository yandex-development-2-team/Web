import { Outlet } from 'react-router';
import { AppSidebar } from './components/shell/Sidebar';
import { SidebarInset, SidebarProvider } from './components/ui/Sidebar/Sidebar';

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
