'use client';
import Head from '@/app/head';
import useCheckServidorAzure from '@/hooks/useCheckServidorAzure';
import useInstrucoesPadroes from '@/hooks/useInstrucoesPadroes';
import '@/styles/globals.scss';
import CONSTS_SISTEMA from '@/utils/consts/sistema';
import { UsuarioProvider } from '@/utils/context/usuarioContext';
import { CONST_MANROPE } from '@/utils/fonts/fonts';
import 'animate.css/animate.min.css';
import 'nprogress/nprogress.css';
import { ReactNode, lazy } from 'react';
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
    useCheckServidorAzure();

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

                    <section className={CONST_MANROPE.className} >
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
                    </section>
                </body>
            </UsuarioProvider>
        </html>
    )
}