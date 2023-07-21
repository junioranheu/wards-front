import CONSTS_WARDS from '@/utils/api/consts/wards';
import { Fetch } from '@/utils/api/fetch';
import CONSTS_EMOJIS from '@/utils/consts/emojis';
import { Aviso } from '@/utils/functions/aviso';
import iWard from '@/utils/types/iWard';
import { useEffect, useState } from 'react';
import Styles from './index.module.scss';

export default function Wards() {

    const [listaWards, setListaWards] = useState<iWard[]>();

    useEffect(() => {
        async function handleListarWards() {
            const resp = await Fetch.getApi(CONSTS_WARDS.listar) as iWard[];

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
                    <h1 key={i}>
                        {w.titulo}
                    </h1>
                ))
            }
        </section>
    )
}