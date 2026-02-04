import { createPortal } from 'react-dom';

interface PortalProps extends React.PropsWithChildren {
  element?: HTMLElement;
}

export function Portal({ children, element = document.body }: PortalProps) {
  return createPortal(children, element);
}
