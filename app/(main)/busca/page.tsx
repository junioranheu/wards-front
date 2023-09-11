'use client';
import ImgEmojiMedicacao from '@/assets/images/outros/emoji-meditacao.webp';
import useTitulo from '@/hooks/useTitulo';
import useWindowSize from '@/hooks/useWindowSize';
import CONSTS_SISTEMA from '@/utils/consts/sistema';
import iWard from '@/utils/types/iWard';
import Image from 'next/image';
import { Fragment, lazy, useEffect, useState } from 'react';
import Styles from './busca.module.scss';
const BuscaInput = lazy(() => import('./components/busca.input'));
const BuscaListaHashtags = lazy(() => import('./components/busca.listaHashtags'));
const BuscaListaWards = lazy(() => import('./components/busca.listaWards'));
const GifLoading = lazy(() => import('@/components/gif.loading'));
const BotaoScrolltop = lazy(() => import('@/components/botao.scrollTop'));

export default function Page() {

    useTitulo('Busca', true);

    const windowSize = useWindowSize();
    const mediaQueryLimite = 1025;

    const [termoBuscado, setTermoBuscado] = useState<string>('');
    const [listaWards, setListaWards] = useState<iWard[]>([]);

    const [isExibirElemento, setIsExibirElemento] = useState<boolean>(false);

    useEffect(() => {
        const handleDelayDebounce = setTimeout(() => {
            setIsExibirElemento(true);
        }, 2500);

        setIsExibirElemento(false);

        return () => clearTimeout(handleDelayDebounce);
    }, [termoBuscado]);

    return (
        <section className={Styles.main}>
            <div className={Styles.divTitulo}>
                <span>Era essa ward<br />que você queria?</span>

                <div className={CONSTS_SISTEMA.ANIMATE_INFINITO}>
                    <Image src={ImgEmojiMedicacao} alt='' />
                </div>
            </div>

            <BuscaInput
                termoBuscado={termoBuscado}
                setTermoBuscado={setTermoBuscado}
            />

            {
                windowSize.width >= mediaQueryLimite && (
                    <BuscaListaHashtags
                        termoBuscado={termoBuscado}
                        listaWards={listaWards}
                    />
                )
            }

            <BuscaListaWards
                termoBuscado={termoBuscado}
                listaWards={listaWards}
                setListaWards={setListaWards}
            />

            {
                listaWards?.length ? (
                    <div className={Styles.centralizarElemento}>
                        <BotaoScrolltop
                            isExibirTexto={false}
                            marginTop={0}
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