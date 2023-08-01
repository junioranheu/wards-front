'use client';
import useUsuarioContext from '@/hooks/context/useUsuarioContext';
import useTitulo from '@/hooks/useTitulo';
import verificarAcesso from '@/utils/functions/verificar.acesso';
import { useEffect } from 'react';
import Styles from './index.module.scss';

export default function Page() {

    useTitulo('Criar nova ward', true);

    const [isAuth, setIsAuth] = useUsuarioContext();

    useEffect(() => {
        verificarAcesso([1]);
    }, [isAuth]);

    return (
        <section className={Styles.main}>
            <div className={Styles.titulo}>
                <span>Criar nova ward</span>
            </div>
        </section>
    )
}