'use client';
import StylesLayout from '@/app/(main)/layout.module.scss';
import useTitulo from '@/hooks/useTitulo';

export default function Ward({ params }: { params: { id: string, titulo: string } }) {

    useTitulo(params.titulo, true);

    return (
        <section className={StylesLayout.session}>
            <h1>{params.id} {params.titulo}</h1>
        </section>
    )
}