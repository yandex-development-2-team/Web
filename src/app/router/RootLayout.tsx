import { useNavigate, Outlet } from 'react-router';
import { setNavigate } from '@/services/navigation.service';
import { NotificationToaster } from '@/components/shell/Notification';


const RootLayout = () => {
  const navigateFn = useNavigate()
  setNavigate(navigateFn)

  return (
    <>
      <Outlet />
      <NotificationToaster />
    </>
  );
};

export default RootLayout;
