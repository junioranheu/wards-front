import ImgPadrao from '@/assets/images/outros/coding.webp';
import ImgLoading from '@/assets/images/outros/loading.webp';
import CONSTS_WARDS from '@/utils/api/consts/wards';
import { Fetch } from '@/utils/api/fetch';
import filtroPaginacaoInput from '@/utils/api/filters/paginacaoInput';
import CONSTS_SISTEMA from '@/utils/consts/sistema';
import formatarData from '@/utils/functions/formatar.data';
import normalizarBlobParaImagemBase64 from '@/utils/functions/normalizar.blobParaImagemBase64';
import iWard from '@/utils/types/iWard';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Styles from './index.module.scss';

export default function Wards() {

    const [listaWards, setListaWards] = useState<iWard[]>([]);
    const [indexBuscaAtual, setIndexBuscaAtual] = useState<number>(0);
    const [hasMore, setHasMore] = useState<boolean>(true);

    async function handleListarWards() {
        const qtdRegistrosPorRequest = 2;
        const resp = await Fetch.getApi(`${CONSTS_WARDS.listar}?${filtroPaginacaoInput(indexBuscaAtual, qtdRegistrosPorRequest, false)}`) as iWard[];

        // @ts-ignore;
        if (resp.mensagens || !resp) {
            setHasMore(false);
            return false;
        }

        setListaWards((x) => [...x as iWard[], ...resp]);
        setIndexBuscaAtual((x) => x + 1);
    }

    useEffect(() => {
        handleListarWards();
    }, []);

    return (
        <InfiniteScroll
            dataLength={listaWards?.length ?? 0}
            next={handleListarWards}
            hasMore={hasMore}
            loader={<Image src={ImgLoading} width={64} height={64} alt='' />}
            endMessage={null}
            className={Styles.infiniteScroll}
        >
            {
                listaWards?.map((w: iWard, i: number) => (
                    <div className={`${Styles.card} ${CONSTS_SISTEMA.ANIMATE} animate__slow`} key={i}>
                        <div className={Styles.esquerda}>
                            <span className={Styles.titulo}>{w.titulo}</span>
                            <span className={Styles.infos}>{formatarData(w.dataMod ?? w.data, 2)} · ward #{w.wardId}</span>
                        </div>

                        <div className={Styles.direita}>
                            <Image width={0} height={0} src={w.imagemPrincipalBlob ? normalizarBlobParaImagemBase64(w.imagemPrincipalBlob) : ImgPadrao} alt='' />
                        </div>
                    </div>
                ))
            }
        </InfiniteScroll>
    )
}