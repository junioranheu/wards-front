import { UsuarioContext } from '@/utils/context/usuarioContext';
import { Dispatch, SetStateAction, useContext } from 'react';

export default function useUsuarioContext(): [boolean, Dispatch<SetStateAction<boolean>>] {
    const context = useContext(UsuarioContext);
    const [isAuth, setIsAuth] = [context?.isAuthContext[0], context?.isAuthContext[1]] as [boolean, Dispatch<SetStateAction<boolean>>];

    return [isAuth, setIsAuth];
}
