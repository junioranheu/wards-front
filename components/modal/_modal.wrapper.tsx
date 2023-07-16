import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface iParametros {
    children: ReactNode;
    isOpen: boolean;
}

export default function ModalWrapper({ children, isOpen }: iParametros) {
    return isOpen ? createPortal(children, document.querySelector('#modalWrapper')!) : null;
}