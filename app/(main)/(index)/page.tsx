'use client';
import StylesLayout from '@/app/(main)/layout.module.scss';
import useTitulo from '@/hooks/useTitulo';
import CONSTS_SISTEMA from '@/utils/consts/sistema';
import { lazy } from 'react';
const Intro = lazy(() => import('./components/intro'));
const Wards = lazy(() => import('./components/wards'));
const Final = lazy(() => import('./components/final'));

export default function Page() {

    useTitulo(`${CONSTS_SISTEMA.NOME_SISTEMA} • ${CONSTS_SISTEMA.DESCRICAO_SISTEMA}`, false);

    return (
        <section className={StylesLayout.session}>
            <Intro />
            <Wards />
            <Final />
        </section>
    )
}