'use client';
import ImgPadrao from '@/assets/images/outros/coding.webp';
import CONSTS_WARDS from '@/utils/api/consts/wards';
import { Fetch } from '@/utils/api/fetch';
import filtroPaginacaoInput from '@/utils/api/filters/paginacaoInput';
import CONSTS_EMOJIS from '@/utils/consts/emojis';
import CONSTS_SISTEMA from '@/utils/consts/sistema';
import CONSTS_TELAS from '@/utils/consts/telas';
import { Aviso } from '@/utils/functions/aviso';
import formatarData from '@/utils/functions/formatar.data';
import normalizarURL from '@/utils/functions/normalizar.URL';
import normalizarBlobParaImagemBase64 from '@/utils/functions/normalizar.blobParaImagemBase64';
import iWard from '@/utils/types/iWard';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Fragment, lazy, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Styles from './index.module.scss';
const GifLoading = lazy(() => import('@/components/gif.loading'));
const BotaoScrolltop = lazy(() => import('@/components/botao.scrollTop'));

export default function Wards() {

    const router = useRouter();

    const [listaWards, setListaWards] = useState<iWard[]>([]);
    const [indexBuscaAtual, setIndexBuscaAtual] = useState<number>(0);
    const [hasMore, setHasMore] = useState<boolean>(true);

    async function handleListarWards() {
        const qtdRegistrosPorRequest = 3;
        const resp = await Fetch.getApi(`${CONSTS_WARDS.listar}?${filtroPaginacaoInput(indexBuscaAtual, qtdRegistrosPorRequest, false)}`) as iWard[];

        if (!resp) {
            Aviso.toast('Nenhuma ward foi encontrada no momento. Tente novamente mais tarde!', 7500, CONSTS_EMOJIS.ERRO, true);
            router.push(CONSTS_TELAS.ERRO);
            return false;
        }

        // @ts-ignore;
        if (resp?.mensagens) {
            setHasMore(false);
            return false;
        }

        setListaWards((x) => [...x as iWard[], ...resp]);
        setIndexBuscaAtual((x) => x + 1);
    }

    function handleRedirecionar(ward: iWard) {
        router.push(`${CONSTS_TELAS.WARD}/${ward.wardId}/${normalizarURL(ward.titulo)}`);
    }

    return (
        <Fragment>
            <InfiniteScroll
                dataLength={listaWards?.length ?? 0}
                next={handleListarWards}
                hasMore={hasMore}
                loader={<GifLoading />}
                endMessage={null}
                className={Styles.infiniteScroll}
            >
                {
                    listaWards?.map((w: iWard, i: number) => (
                        <section className={`${Styles.card} ${CONSTS_SISTEMA.ANIMATE} animate__slow`} key={i}>
                            <div className={Styles.esquerda}>
                                <span
                                    className={Styles.titulo}
                                    onClick={() => handleRedirecionar(w)}
                                >
                                    {w.titulo}
                                </span>

                                <span className={Styles.infos}>{formatarData(w.dataMod ?? w.data, 2)} · ward #{w.wardId}</span>
                            </div>

                            <div
                                className={Styles.direita}
                                onClick={() => handleRedirecionar(w)}
                            >
                                <Image
                                    width={0}
                                    height={0}
                                    src={w.imagemPrincipalBlob ? normalizarBlobParaImagemBase64(w.imagemPrincipalBlob) : ImgPadrao}
                                    alt=''
                                />
                            </div>
                        </section>
                    ))
                }
            </InfiniteScroll>

            {
                !hasMore && <BotaoScrolltop isExibirTexto={true} marginTop={5} />
            }
        </Fragment>
    )
}