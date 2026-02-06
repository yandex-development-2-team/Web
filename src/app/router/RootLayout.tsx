import { Outlet } from 'react-router';
import { NotificationToaster } from '@/components/common';

const RootLayout = () => {
  return (
    <>
      <Outlet />
      <NotificationToaster />
    </>
  )
};

export default RootLayout;
