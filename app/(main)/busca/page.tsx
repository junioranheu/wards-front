'use client';
import ImgEmojiMedicacao from '@/assets/images/outros/emoji-meditacao.webp';
import useTitulo from '@/hooks/useTitulo';
import CONSTS_SISTEMA from '@/utils/consts/sistema';
import Image from 'next/image';
import { lazy, useState } from 'react';
import Styles from './index.module.scss';
const BuscaInput = lazy(() => import('./components/busca.input'));
const BuscaListaHashtags = lazy(() => import('./components/busca.listaHashtags'));
const BuscaListaWards = lazy(() => import('./components/busca.listaWards'));

export default function Page() {

    useTitulo('Busca', true);

    const [hashtagBuscada, setHashtagBuscada] = useState<string>('');

    return (
        <section className={Styles.main}>
            <div className={Styles.divTitulo}>
                <span>Era essa ward<br />que você queria?</span>

                <div className={CONSTS_SISTEMA.ANIMATE_INFINITO}>
                    <Image src={ImgEmojiMedicacao} alt='' />
                </div>
            </div>

            <BuscaInput
                hashtagBuscada={hashtagBuscada}
                setHashtagBuscada={setHashtagBuscada}
            />

            <BuscaListaHashtags
                hashtagBuscada={hashtagBuscada}
            />

            <BuscaListaWards
                hashtagBuscada={hashtagBuscada}
            />
        </section>
    )
}