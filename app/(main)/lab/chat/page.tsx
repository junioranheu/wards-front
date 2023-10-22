'use client';
import useUsuarioContext from '@/hooks/context/useUsuarioContext';
import useTitulo from '@/hooks/useTitulo';
import CONSTS_USUARIO_ROLES from '@/utils/consts/usuario.roles';
import verificarAcesso from '@/utils/functions/verificar.acesso';
import { useEffect } from 'react';
import Styles from './chat.module.scss';

export default function Page() {

    useTitulo('Lab // Chat', true);
    const [isAuth, setIsAuth] = useUsuarioContext();

    useEffect(() => {
        verificarAcesso([CONSTS_USUARIO_ROLES.ADMINISTRADOR_ID]);
    }, [isAuth]);

    return (
        <section className={Styles.main}>
            <div className={Styles.titulo}>
                <span>Chat</span>
            </div>
        </section>
    )
}