'use client';
import StylesLayout from '@/app/(main)/layout.module.scss';
import useTitulo from '@/hooks/useTitulo';
import CONSTS_SISTEMA from '@/utils/consts/sistema';
import { lazy } from 'react';
const Intro = lazy(() => import('./components/intro'));

export default function Page() {

    useTitulo(CONSTS_SISTEMA.NOME_SISTEMA, false);

    return (
        <section className={StylesLayout.session}>
            <Intro />

            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
            <h1>a</h1><br />
        </section>
    )
}