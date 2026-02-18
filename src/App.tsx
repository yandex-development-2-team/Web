import { Outlet } from 'react-router';
import { SidebarProvider } from './app/providers/Sidebar';
import { AppSidebar, SidebarInset } from './components/shell/Sidebar';

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
