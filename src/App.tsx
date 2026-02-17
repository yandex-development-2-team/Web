import { Outlet } from 'react-router';
import { SidebarProvider } from './app/providers/Sidebar';
import { AppSidebar } from './components/shell/Sidebar';
import { SidebarInset } from '@/components/shell/Sidebar/Sidebar';

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
