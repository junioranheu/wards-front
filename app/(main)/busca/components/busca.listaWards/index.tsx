import CONSTS_WARDS from '@/utils/api/consts/wards';
import { Fetch } from '@/utils/api/fetch';
import filtroPaginacaoInput from '@/utils/api/filters/paginacaoInput';
import CONSTS_EMOJIS from '@/utils/consts/emojis';
import CONSTS_SISTEMA from '@/utils/consts/sistema';
import CONSTS_TELAS from '@/utils/consts/telas';
import { Aviso } from '@/utils/functions/aviso';
import formatarData from '@/utils/functions/formatar.data';
import normalizarURL from '@/utils/functions/normalizar.URL';
import removerHTML from '@/utils/functions/remover.HTML';
import setSliceString from '@/utils/functions/set.sliceString';
import iWard from '@/utils/types/iWard';
import { useRouter } from 'next/navigation';
import nProgress from 'nprogress';
import { Dispatch, SetStateAction, useEffect } from 'react';
import Styles from './busca.listaWards.module.scss';

interface iParametros {
    termoBuscado: string | null;
    listaWards: iWard[];
    setListaWards: Dispatch<SetStateAction<iWard[]>>;
}

export default function BuscaListaWards({ termoBuscado, listaWards, setListaWards }: iParametros) {

    const router = useRouter();

    useEffect(() => {
        async function handleListarWards() {
            const resp = await Fetch.get(`${CONSTS_WARDS.listar}?${filtroPaginacaoInput(0, 50, false)}&keyword=${termoBuscado}`) as iWard[];
            // console.log(resp, resp.length);

            // @ts-ignore;
            if (resp?.mensagens || !resp) {
                Aviso.toast(`Nenhuma ward foi encontrada com o termo "${termoBuscado}"`, 7500, CONSTS_EMOJIS.ERRO, true);
                setListaWards([]);
                return false;
            }

            setListaWards(resp);
        }

        nProgress.start();
        const handleDelayDebounce = setTimeout(() => {
            nProgress.done();
            handleListarWards();
        }, 1000);

        setListaWards([]);

        return () => clearTimeout(handleDelayDebounce);
    }, [termoBuscado, setListaWards]);

    function handleRedirecionar(ward: iWard) {
        router.push(`${CONSTS_TELAS.WARD}/${ward.wardId}/${normalizarURL(ward.titulo)}`);
    }

    return (
        <div className={Styles.main}>
            {
                listaWards?.map((w: iWard, i: number) => (
                    <section
                        className={`${Styles.ward}
                        ${CONSTS_SISTEMA.ANIMATE} animate__slow`}
                        onClick={() => handleRedirecionar(w)}
                        key={i}
                    >
                        <span className={Styles.titulo}>
                            {w.titulo}
                        </span>

                        <div className={Styles.infos}>
                            <span>{setSliceString(removerHTML(w.conteudo), 300, true)}</span>
                            <span>{formatarData(w.dataMod ?? w.data, 2)} · ward #{w.wardId}</span>
                        </div>
                    </section>
                ))
            }
        </div>
    )
}