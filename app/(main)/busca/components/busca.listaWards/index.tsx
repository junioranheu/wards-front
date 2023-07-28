import CONSTS_WARDS from '@/utils/api/consts/wards';
import { Fetch } from '@/utils/api/fetch';
import filtroPaginacaoInput from '@/utils/api/filters/paginacaoInput';
import CONSTS_EMOJIS from '@/utils/consts/emojis';
import CONSTS_SISTEMA from '@/utils/consts/sistema';
import CONSTS_TELAS from '@/utils/consts/telas';
import { Aviso } from '@/utils/functions/aviso';
import formatarData from '@/utils/functions/formatar.data';
import normalizarURL from '@/utils/functions/normalizar.URL';
import iWard from '@/utils/types/iWard';
import { useRouter } from 'next/navigation';
import nProgress from 'nprogress';
import { useEffect, useState } from 'react';
import Styles from './index.module.scss';

interface iParametros {
    hashtagBuscada: string | null;
}

export default function BuscaListaWards({ hashtagBuscada }: iParametros) {

    const router = useRouter();

    const [listaWards, setListaWards] = useState<iWard[]>([]);

    useEffect(() => {
        async function handleListarWards() {
            const resp = await Fetch.getApi(`${CONSTS_WARDS.listar}?${filtroPaginacaoInput(0, 50, false)}&keyword=${hashtagBuscada}`) as iWard[];
            // console.log(resp, resp.length);

            // @ts-ignore;
            if (resp?.mensagens || !resp) {
                Aviso.toast(`Nenhuma ward foi encontrada com o termo "${hashtagBuscada}"`, 7500, CONSTS_EMOJIS.ERRO, true);
                setListaWards([]);
                return false;
            }

            setListaWards(resp);
        }

        nProgress.start();
        const handleDelayDebounce = setTimeout(() => {
            nProgress.done();
            handleListarWards();
        }, 1750);

        setListaWards([]);

        return () => clearTimeout(handleDelayDebounce);
    }, [hashtagBuscada]);

    function handleRedirecionar(ward: iWard) {
        router.push(`${CONSTS_TELAS.WARD}/${ward.wardId}/${normalizarURL(ward.titulo)}`);
    }

    return (
        <div className={Styles.main}>
            {
                listaWards?.map((w: iWard, i: number) => (
                    <section className={`${Styles.card} ${CONSTS_SISTEMA.ANIMATE} animate__slow`} key={i}>
                        <span
                            className={Styles.titulo}
                            onClick={() => handleRedirecionar(w)}
                        >
                            {w.titulo}
                        </span>

                        <span className={Styles.infos}>{formatarData(w.dataMod ?? w.data, 2)} · ward #{w.wardId}</span>
                    </section>
                ))
            }
        </div>
    )
}