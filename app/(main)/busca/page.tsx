'use client';
import useTitulo from '@/hooks/useTitulo';
import Styles from './index.module.scss';

export default function Page() {

    useTitulo('Busca', true);

    return (
        <section className={Styles.main}>
            <div className={Styles.titulo}>
                <span>Buscar</span>
            </div>
        </section>
    )
}