import { Outlet } from 'react-router';
import { AppSidebar, SidebarInset } from './components/shell/Sidebar';
import { SidebarProvider } from './app/providers/Sidebar';
import HomeIcon2 from '@/assets/icons/home.svg?react';
function App() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <HomeIcon2 className='h-15 w-15'/>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}

export default App;
