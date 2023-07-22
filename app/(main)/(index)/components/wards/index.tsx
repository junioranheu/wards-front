import ImgRohee from '@/assets/images/outros/jinmiran.webp';
import CONSTS_WARDS from '@/utils/api/consts/wards';
import { Fetch } from '@/utils/api/fetch';
import filtroPaginacaoInput from '@/utils/api/filters/PaginacaoInput';
import CONSTS_EMOJIS from '@/utils/consts/emojis';
import { Aviso } from '@/utils/functions/aviso';
import iWard from '@/utils/types/iWard';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Styles from './index.module.scss';

export default function Wards() {

    const [listaWards, setListaWards] = useState<iWard[]>();

    useEffect(() => {
        async function handleListarWards() {
            const resp = await Fetch.getApi(`${CONSTS_WARDS.listar}?${filtroPaginacaoInput(0, 1, false)}`) as iWard[];

            if (resp[0]?.mensagens || !resp) {
                Aviso.toast(resp[0].mensagens![0], 5500, CONSTS_EMOJIS.ERRO, true);
                return false;
            }

            setListaWards(resp);
        }

        handleListarWards();
    }, []);

    return (
        <section className={Styles.wards}>
            {
                listaWards?.map((w: iWard, i: number) => (
                    <div className={Styles.card} key={i}>
                        <div className={Styles.esquerda}>
                            <span className={Styles.titulo}>{w.titulo}</span>
                            <span className={Styles.infos}>{w.data.toString()} · #{w.wardId}</span>
                        </div>

                        <div className={Styles.direita}>
                            <Image src={ImgRohee} alt='' />
                        </div>
                    </div>
                ))
            }
        </section>
    )
}