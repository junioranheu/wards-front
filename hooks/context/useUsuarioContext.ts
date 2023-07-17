import { UsuarioContext } from '@/utils/context/usuarioContext';
import { Dispatch, SetStateAction, useContext } from 'react';

export default function useUsuarioContext(): [boolean, Dispatch<SetStateAction<boolean>>] {

    const usuarioContext = useContext(UsuarioContext);
    const [isAuth, setIsAuth] = [usuarioContext?.isAuthContext[0], usuarioContext?.isAuthContext[1]] as [boolean, Dispatch<SetStateAction<boolean>>];

    return [isAuth, setIsAuth];

}