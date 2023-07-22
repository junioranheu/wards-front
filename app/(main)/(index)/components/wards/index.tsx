import ImgRohee from '@/assets/images/outros/jinmiran.webp';
import CONSTS_WARDS from '@/utils/api/consts/wards';
import { Fetch } from '@/utils/api/fetch';
import filtroPaginacaoInput from '@/utils/api/filters/paginacaoInput';
import CONSTS_EMOJIS from '@/utils/consts/emojis';
import CONSTS_SISTEMA from '@/utils/consts/sistema';
import { Aviso } from '@/utils/functions/aviso';
import iWard from '@/utils/types/iWard';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Styles from './index.module.scss';

export default function Wards() {

    const [listaWards, setListaWards] = useState<iWard[]>([]);
    const [page, setPage] = useState<number>(0);

    async function handleListarWards() {
        try {
            const resp = await Fetch.getApi(`${CONSTS_WARDS.listar}?${filtroPaginacaoInput(page, 1, false)}`) as iWard[];

            if (resp[0]?.mensagens || !resp) {
                Aviso.toast(resp[0].mensagens![0], 5500, CONSTS_EMOJIS.ERRO, true);
                return false;
            }

            setListaWards((prevData) => [...prevData as iWard[], ...resp]);
            setPage((prevPage) => prevPage + 1);
        } catch (error: unknown) {
            console.error('Erro ao buscar dados:', error);
            alert('Erro ao buscar dados');
        }
    }

    useEffect(() => {
        handleListarWards();
    }, []);

    return (
        <InfiniteScroll
            dataLength={listaWards?.length ?? 0}
            next={handleListarWards}
            hasMore={true}
            loader={<p>Carregando...</p>}
            endMessage={<p>Você chegou ao fim e, por enquanto, não há mais posts para serem exibidos</p>}
            className={Styles.infiniteScroll}
        >
            {
                listaWards?.map((w: iWard, i: number) => (
                    <div className={`${Styles.card} ${CONSTS_SISTEMA.ANIMATE} animate__slow`} key={i}>
                        <div className={Styles.esquerda}>
                            <span className={Styles.titulo}>{w.titulo} · #{w.wardId}</span>
                            <span className={Styles.infos}>{w.data.toString()} · #{w.wardId}</span>
                        </div>

                        <div className={Styles.direita}>
                            <Image src={ImgRohee} alt='' />
                        </div>
                    </div>
                ))
            }
        </InfiniteScroll>
    )
}