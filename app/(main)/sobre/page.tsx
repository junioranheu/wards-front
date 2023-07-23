'use client';
import useTitulo from '@/hooks/useTitulo';
import CONSTS_SISTEMA from '@/utils/consts/sistema';
import { lazy } from 'react';
import Styles from './index.module.scss';
const VideoSource = lazy(() => import('@/components/video.source'));

export default function Page() {

    useTitulo('Sobre', true);

    return (
        <section className={Styles.main}>
            <div className={Styles.titulo}>
                <span>Sobre @junioranheu e o projeto <span className='cor-principal'>{CONSTS_SISTEMA.NOME_SISTEMA}</span></span>
            </div>

            <div className={Styles.visual}>
                <VideoSource video='gongos' />
            </div>

            <div className={Styles.sobre}>
                <span>TEXTO</span>
            </div>
        </section>
    )
}