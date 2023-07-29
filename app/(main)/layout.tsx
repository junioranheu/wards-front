'use client';
import Head from '@/app/head';
import useInstrucoesPadroes from '@/hooks/useInstrucoesPadroes';
import '@/styles/globals.scss';
import CONSTS_EMOJIS from '@/utils/consts/emojis';
import CONSTS_SESSION_STORAGE from '@/utils/consts/sessionStorage';
import CONSTS_SISTEMA from '@/utils/consts/sistema';
import { UsuarioProvider } from '@/utils/context/usuarioContext';
import { CONST_MANROPE } from '@/utils/fonts/fonts';
import { Aviso } from '@/utils/functions/aviso';
import { getSessionStorage, setSessionStorage } from '@/utils/session/sessionStorage';
import 'animate.css/animate.min.css';
import 'nprogress/nprogress.css';
import { ReactNode, lazy, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Styles from './layout.module.scss';
const Navbar = lazy(() => import('@/components/navbar'));
const Footer = lazy(() => import('@/components/footer'));

interface iParametros {
    children: ReactNode;
}

export default function LayoutPublic({ children }: iParametros) {

    useInstrucoesPadroes();

    useEffect(() => {
        if (!getSessionStorage(CONSTS_SESSION_STORAGE.AVISO_API)) {
            Aviso.toast('A API está publicada na Azure com uma subscrição free, portanto a primeira requisição pode demorar uns instantes', 7500, CONSTS_EMOJIS.INFO, true);
            setSessionStorage('session_storage_aviso_api', { isAvisoApiExibido: true });
        }
    }, []);

    return (
        <html lang='pt-BR'>
            <Head />

            <UsuarioProvider>
                <body
                    className={`${Styles.body} ${CONST_MANROPE.className} ${CONSTS_SISTEMA.ANIMATE}`}
                    suppressHydrationWarning={true}
                >
                    <Toaster containerClassName='toaster' />

                    <Navbar />

                    <main className={Styles.main}>
                        {children}
                    </main>

                    <Footer />

                    <div id='modalWrapper'></div>
                </body>
            </UsuarioProvider>
        </html>
    )
}