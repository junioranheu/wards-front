'use client';
import Head from '@/app/head';
import useInstrucoesPadroes from '@/hooks/useInstrucoesPadroes';
import '@/styles/globals.scss';
import { UsuarioProvider } from '@/utils/context/usuarioContext';
import { CONST_MANROPE } from '@/utils/fonts/fonts';
import 'animate.css/animate.min.css';
import 'nprogress/nprogress.css';
import { ReactNode, lazy } from 'react';
import { Toaster } from 'react-hot-toast';
import Styles from './layout.module.scss';
const Navbar = lazy(() => import('@/components/navbar'));

interface iParametros {
    children: ReactNode;
}

export default function LayoutPublic({ children }: iParametros) {

    useInstrucoesPadroes();

    return (
        <html lang='pt-BR'>
            <Head />

            <UsuarioProvider>
                <body
                    className={`${Styles.body} ${CONST_MANROPE.className}`}
                    suppressHydrationWarning={true}
                >
                    <Toaster containerClassName='toaster' />

                    <Navbar />

                    <main className={Styles.main}>
                        {children}
                    </main>

                    <div id='modalWrapper'></div>
                </body>
            </UsuarioProvider>
        </html>
    )
}