'use client';
import Head from '@/app/head';
import Navbar from '@/components/navbar';
import useInstrucoesPadroes from '@/hooks/useInstrucoesPadroes';
import '@/styles/globals.scss';
import { CONST_MANROPE } from '@/utils/fonts/fonts';
import 'nprogress/nprogress.css';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import Styles from './layout.module.scss';

interface iParametros {
    children: ReactNode;
}

export default function LayoutPublic({ children }: iParametros) {

    useInstrucoesPadroes();

    return (
        <html lang='pt-BR'>
            <Head />

            <body
                className={`${Styles.body} ${CONST_MANROPE.className}`}
                suppressHydrationWarning={true}
            >
                <Toaster containerClassName='toaster' />

                <Navbar />

                <main className={Styles.main}>
                    {children}
                </main>
            </body>
        </html>
    )
}