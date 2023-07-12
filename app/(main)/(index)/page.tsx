'use client';
import CONSTS_SISTEMA from '@/utils/consts/outros/sistema';
import { lazy } from 'react';
const Intro = lazy(() => import('./components/intro'));

export default function Page() {
    return (
        <section className={CONSTS_SISTEMA.ANIMATE}>
            <Intro />
        </section>
    )
}