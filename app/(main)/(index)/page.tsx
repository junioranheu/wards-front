'use client';
import StylesLayout from '@/app/(main)/layout.module.scss';
import useTitulo from '@/hooks/useTitulo';
import CONSTS_AUXILIARES from '@/utils/api/consts/auxiliares';
import { Fetch } from '@/utils/api/fetch';
import filtroPaginacaoInput from '@/utils/api/filters/paginacaoInput';
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
        async function handleTesteAtivarAPI() {
            await Fetch.getApi(`${CONSTS_AUXILIARES.listarEstado}?${filtroPaginacaoInput(0, 1, false)}`) as unknown;
        }

        function handleSplash() {
            if (getSessionStorage(CONSTS_SESSION_STORAGE.SPLASH)) {
                setIsSplash(false);
                return false;
            }

            handleTesteAtivarAPI();
            setSessionStorage(CONSTS_SESSION_STORAGE.SPLASH, { isSplashExibido: true });

            const handleDelayDebounce = setTimeout(() => {
                setIsSplash(false);
            }, gerarNumeroAleatorio(2250, 3000));

            return () => clearTimeout(handleDelayDebounce);
        }

        handleSplash();
    }, []);

    return (
        <Fragment>
            {
                isSplash && <Splash />
            }

            <section className={StylesLayout.session}>
                <Intro />
                <Wards />
            </section>
        </Fragment>
    )
}