'use client';
import ImgEmojiMedicacao from '@/assets/images/outros/emoji-meditacao.webp';
import useTitulo from '@/hooks/useTitulo';
import CONSTS_WARDS from '@/utils/api/consts/wards';
import CONSTS_WARDS_HASHTAGS from '@/utils/api/consts/wardsHashtags';
import { Fetch } from '@/utils/api/fetch';
import filtroPaginacaoInput from '@/utils/api/filters/paginacaoInput';
import CONSTS_EMOJIS from '@/utils/consts/emojis';
import CONSTS_SISTEMA from '@/utils/consts/sistema';
import CONSTS_TELAS from '@/utils/consts/telas';
import { Aviso } from '@/utils/functions/aviso';
import formatarData from '@/utils/functions/formatar.data';
import normalizarURL from '@/utils/functions/normalizar.URL';
import iHashtagQtd from '@/utils/types/iBusca';
import iWard from '@/utils/types/iWard';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import nProgress from 'nprogress';
import { useEffect, useState } from 'react';
import BuscaInput from './components/busca.input';
import BuscaListaItens from './components/busca.listaItens';
import Styles from './index.module.scss';

export default function Page() {

    useTitulo('Busca', true);
    const router = useRouter();

    const [hashtagBuscada, setHashtagBuscada] = useState<string>('');
    const [listaHashtags, setListaHashtags] = useState<iHashtagQtd[]>([]);
    const [listaWards, setListaWards] = useState<iWard[]>([]);

    useEffect(() => {
        async function handleListarHashtagsQtd() {
            const resp = await Fetch.getApi(`${CONSTS_WARDS_HASHTAGS.listarHashtagQtd}?max=6`) as iHashtagQtd[];

            // @ts-ignore;
            if (resp?.mensagens || !resp) {
                Aviso.toast('Nenhuma hashtag foi encontrada no momento. Tente novamente mais tarde!', 7500, CONSTS_EMOJIS.ERRO, true);
                router.push(CONSTS_TELAS.ERRO);
                return false;
            }

            // console.log(resp);
            setListaHashtags(resp);
        }

        handleListarHashtagsQtd();
    }, [router]);

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
        }, 2000);

        setListaWards([]);

        return () => clearTimeout(handleDelayDebounce);
    }, [hashtagBuscada]);

    function handleRedirecionar(ward: iWard) {
        router.push(`${CONSTS_TELAS.WARD}/${ward.wardId}/${normalizarURL(ward.titulo)}`);
    }

    if (!listaHashtags) {
        return false;
    }

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

            <BuscaListaItens
                listaHashtags={listaHashtags}
                hashtagBuscada={hashtagBuscada}
            />

            <div>
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
        </section>
    )
}