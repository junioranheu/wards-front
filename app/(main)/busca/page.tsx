'use client';
import ImgEmojiMedicacao from '@/assets/images/outros/emoji-meditacao.webp';
import useTitulo from '@/hooks/useTitulo';
import CONSTS_WARDS_HASHTAGS from '@/utils/api/consts/wardsHashtags';
import { Fetch } from '@/utils/api/fetch';
import CONSTS_EMOJIS from '@/utils/consts/emojis';
import CONSTS_SISTEMA from '@/utils/consts/sistema';
import CONSTS_TELAS from '@/utils/consts/telas';
import { Aviso } from '@/utils/functions/aviso';
import iHashtagQtd from '@/utils/types/iBusca';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import BuscaInput from './components/busca.input';
import BuscaListaItens from './components/busca.listaItens';
import Styles from './index.module.scss';

export default function Page() {

    useTitulo('Busca', true);
    const router = useRouter();

    const [listaHashtags, setListaHashtags] = useState<iHashtagQtd[]>([]);
    const [hashtagBuscada, setHashtagBuscada] = useState<string>('');

    useEffect(() => {
        async function handleListarHashtagsQtd() {
            const resp = await Fetch.getApi(CONSTS_WARDS_HASHTAGS.listarHashtagQtd) as iHashtagQtd[];

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
        </section>
    )
}