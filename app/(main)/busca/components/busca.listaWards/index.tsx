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
import iWard from '@/utils/types/iWard';
import { useRouter } from 'next/navigation';
import nProgress from 'nprogress';
import { Fragment, lazy, useEffect, useState } from 'react';
import Styles from './index.module.scss';
const BotaoScrolltop = lazy(() => import('@/components/botao.scrollTop'));

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
                            <span>{removerHTML(w.conteudo)}</span>
                            <span>{formatarData(w.dataMod ?? w.data, 2)} · ward #{w.wardId}</span>
                        </div>
                    </section>
                ))
            }

            {
                listaWards?.length ? (
                    <div className={Styles.botaoScrollTop}>
                        <BotaoScrolltop
                            isExibirTexto={false}
                        />
                    </div>
                ) : (
                    <Fragment></Fragment>
                )
            }
        </div>
    )
}