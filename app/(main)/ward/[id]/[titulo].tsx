'use client';
import StylesLayout from '@/app/(main)/layout.module.scss';
import useTitulo from '@/hooks/useTitulo';

export default function Ward() {

    useTitulo('Ward', true);

    return (
        <section className={StylesLayout.session}>
            <h1>xxx</h1>
        </section>
    )
}