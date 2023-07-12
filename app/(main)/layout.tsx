'use client';
import Head from '@/app/head';
import useInstrucoesPadroes from '@/hooks/useInstrucoesPadroes';
import '@/styles/globals.scss';
import { CONST_MONTSERRAT } from '@/utils/fonts/fonts';
import 'nprogress/nprogress.css';
import { Toaster } from 'react-hot-toast';
import Styles from './styles/layout.module.scss';

interface iParametros {
    children: React.ReactNode;
}

export default function LayoutPublic({ children }: iParametros) {

    useInstrucoesPadroes();

    return (
        <html lang='pt-BR'>
            <Head />

            <body
                className={`${Styles.body} ${CONST_MONTSERRAT.className}`}
                suppressHydrationWarning={true}
            >
                <Toaster containerClassName='toaster' />

                <main className={Styles.main}>
                    {children}
                </main>
            </body>
        </html>
    )
}