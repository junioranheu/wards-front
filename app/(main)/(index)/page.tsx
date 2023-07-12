'use client';
import StylesLayout from '@/app/(main)/styles/layout.module.scss';
import { lazy } from 'react';
const Intro = lazy(() => import('./components/intro'));

export default function Page() {
    return (
        <section className={StylesLayout.session} >
            <Intro />
        </section>
    )
}