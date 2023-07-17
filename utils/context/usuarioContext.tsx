import iUsuarioContext from '@/utils/types/iUsuario.context';
import { Dispatch, SetStateAction, createContext, useState } from 'react';

interface iContext {
    isAuthContext: [isAuth: boolean, setIsAuth: Dispatch<SetStateAction<boolean>>];
}

const _item = '_auth';
export const UsuarioContext = createContext<iContext | null>(null);

export function UsuarioProvider(props: any) {
    const [isAuth, setIsAuth] = useState<boolean>(Auth?.get()?.isAuth ?? false);

    return (
        <UsuarioContext.Provider value={{ isAuthContext: [isAuth, setIsAuth] }}>
            {props.children}
        </UsuarioContext.Provider>
    );
}

export const Auth = {
    set(data: iUsuarioContext): void {
        const dadosUsuario = {
            nomeCompleto: data.nomeCompleto,
            email: data.email,
            foto: data.foto,
            isAuth: data.isAuth
        } as iUsuarioContext;

        const parsedData = JSON.stringify(dadosUsuario);
        localStorage.setItem(_item, parsedData);
    },

    get(): iUsuarioContext | null {
        if (typeof window !== 'undefined') {
            let data = localStorage.getItem(_item);

            if (!data) {
                return null;
            }

            const dataJson = JSON.parse(data);
            return dataJson;
        } else {
            return null;
        }
    },

    delete(): void {
        localStorage.removeItem(_item);
    }
}