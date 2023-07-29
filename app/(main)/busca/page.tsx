'use client';
import ImgEmojiMedicacao from '@/assets/images/outros/emoji-meditacao.webp';
import useTitulo from '@/hooks/useTitulo';
import CONSTS_SISTEMA from '@/utils/consts/sistema';
import iWard from '@/utils/types/iWard';
import Image from 'next/image';
import { Fragment, lazy, useEffect, useState } from 'react';
import Styles from './index.module.scss';
const BuscaInput = lazy(() => import('./components/busca.input'));
const BuscaListaHashtags = lazy(() => import('./components/busca.listaHashtags'));
const BuscaListaWards = lazy(() => import('./components/busca.listaWards'));
const GifLoading = lazy(() => import('@/components/gif.loading'));
const BotaoScrolltop = lazy(() => import('@/components/botao.scrollTop'));

export default function Page() {

    useTitulo('Busca', true);

    const [hashtagBuscada, setHashtagBuscada] = useState<string>('');
    const [listaWards, setListaWards] = useState<iWard[]>([]);

    const [isExibirElemento, setIsExibirElemento] = useState<boolean>(false);

    useEffect(() => {
        const handleDelayDebounce = setTimeout(() => {
            setIsExibirElemento(true);
        }, 2500);

        setIsExibirElemento(false);

        return () => clearTimeout(handleDelayDebounce);
    }, [hashtagBuscada]);

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
                listaWards={listaWards}
            />

            <BuscaListaWards
                hashtagBuscada={hashtagBuscada}
                listaWards={listaWards}
                setListaWards={setListaWards}
            />

            {
                listaWards?.length ? (
                    <div className={Styles.centralizarElemento}>
                        <BotaoScrolltop
                            isExibirTexto={false}
                        />
                    </div>
                ) : (
                    <div className={Styles.centralizarElemento}>
                        {
                            isExibirElemento ? (
                                <Fragment>
                                    <span>Nenhuma ward foi encontrada 🥺</span>
                                </Fragment>
                            ) : (
                                <GifLoading />
                            )
                        }
                    </div>
                )
            }
        </section>
    )
}