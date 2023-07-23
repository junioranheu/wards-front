'use client';
import useTitulo from '@/hooks/useTitulo';
import Styles from './index.module.scss';

export default function Page() {

    useTitulo('Sobre', true);

    return (
        <section className={Styles.main}>
            <h1>Sobre</h1>
        </section>
    )
}