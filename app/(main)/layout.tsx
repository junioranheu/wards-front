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
import { CookieWidget } from 'react-cookie-gpdr';
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
        if (!getSessionStorage(CONSTS_SESSION_STORAGE.AVISO_API_FREE)) {
            Aviso.toast('A API está publicada na Azure com uma subscrição free, portanto a primeira requisição pode demorar uns instantes', 8500, CONSTS_EMOJIS.INFO, true);
            setSessionStorage(CONSTS_SESSION_STORAGE.AVISO_API_FREE, { isAvisoApiExibido: true });
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

            <CookieWidget
                location='right'
                color='var(--principal)'
                policyLink=''
                policyLinkText=''
                title={`${CONSTS_SISTEMA.NOME_SISTEMA} 🍪`}
                subtitle={CONSTS_SISTEMA.DESCRICAO_SISTEMA}
                text={`O ${CONSTS_SISTEMA.NOME_SISTEMA} usa cookies para oferecer uma experiência melhor. Ao continuar navegando, você concorda com o uso de cookies.`}
                cookieSecurity={true}
                hideOnScrollDown={false}
                rejectButtonText='Rejeitar'
                acceptButtonText='Aceitar'
                onAccept={() => null}
                onReject={() => null}
            />
        </html>
    )
}