'use client';
import StylesLayout from '@/app/(main)/layout.module.scss';
import useTitulo from '@/hooks/useTitulo';

export default function Page() {

    useTitulo('Sobre', true);

    return (
        <section className={StylesLayout.session}>
            <h1>Sobre</h1>
        </section>
    )
}