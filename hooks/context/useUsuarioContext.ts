import { UsuarioContext } from '@/utils/context/usuarioContext';
import { Dispatch, SetStateAction, useContext, useEffect } from 'react';

export default function useUsuarioContext(): [boolean, Dispatch<SetStateAction<boolean>>] {

    const usuarioContext = useContext(UsuarioContext);

    let isAuth: boolean = false;
    let setIsAuth: Dispatch<SetStateAction<boolean>> = (v: SetStateAction<boolean>) => { };

    useEffect(() => {
        isAuth = usuarioContext?.isAuthContext[0] as boolean;
        setIsAuth = usuarioContext?.isAuthContext[1] as Dispatch<SetStateAction<boolean>>;
    }, [usuarioContext]);

    return [isAuth, setIsAuth];

}