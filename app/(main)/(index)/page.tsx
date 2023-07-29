'use client';
import StylesLayout from '@/app/(main)/layout.module.scss';
import useTitulo from '@/hooks/useTitulo';
import CONSTS_SESSION_STORAGE from '@/utils/consts/sessionStorage';
import CONSTS_SISTEMA from '@/utils/consts/sistema';
import gerarNumeroAleatorio from '@/utils/functions/gerar.numeroAleatorio';
import { getSessionStorage, setSessionStorage } from '@/utils/session/sessionStorage';
import { Fragment, lazy, useEffect, useState } from 'react';
import Splash from './components/splash';
const Intro = lazy(() => import('./components/intro'));
const Wards = lazy(() => import('./components/wards'));

export default function Page() {

    useTitulo(`${CONSTS_SISTEMA.NOME_SISTEMA} • Tipo um Stack Overflow`, false);

    const [isSplash, setIsSplash] = useState<boolean>(true);

    useEffect(() => {
        if (getSessionStorage(CONSTS_SESSION_STORAGE.SPLASH)) {
            setIsSplash(false);
        } else {
            setSessionStorage(CONSTS_SESSION_STORAGE.SPLASH, { isSplashExibido: true });
        }

        const handleDelayDebounce = setTimeout(() => {
            setIsSplash(false);
            // }, process.env.NODE_ENV === 'production' ? gerarNumeroAleatorio(1750, 2500) : 0);
        }, gerarNumeroAleatorio(1750, 2500));

        return () => clearTimeout(handleDelayDebounce);
    }, []);

    return (
        <Fragment>
            <Splash isSplash={isSplash} />

            <section className={StylesLayout.session}>
                <Intro />
                <Wards />
            </section>
        </Fragment>
    )
}