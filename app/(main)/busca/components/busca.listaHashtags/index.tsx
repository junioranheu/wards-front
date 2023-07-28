import GifLoading from '@/components/gif.loading';
import CONSTS_WARDS_HASHTAGS from '@/utils/api/consts/wardsHashtags';
import { Fetch } from '@/utils/api/fetch';
import CONSTS_EMOJIS from '@/utils/consts/emojis';
import CONSTS_TELAS from '@/utils/consts/telas';
import { Aviso } from '@/utils/functions/aviso';
import removerHTML from '@/utils/functions/remover.HTML';
import { default as iBusca, default as iHashtagQtd } from '@/utils/types/iBusca';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Styles from './index.module.scss';

interface iParametros {
    hashtagBuscada: string | null;
}

export default function BuscaListaHashtags({ hashtagBuscada }: iParametros) {

    const router = useRouter();

    const [listaHashtags, setListaHashtags] = useState<iHashtagQtd[]>([]);

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

    function handleClick(item: iHashtagQtd) {
        alert(item.tag);
    }

    return (
        <div className={Styles.main}>
            {
                listaHashtags && listaHashtags?.length > 0 ? (
                    listaHashtags?.filter(x => x.tag.toLowerCase().includes(hashtagBuscada?.toLocaleLowerCase() ?? '')).map((item: iBusca, i: number) => (
                        <div
                            key={i}
                            className={Styles.topico}
                            onClick={() => handleClick(item)}
                        >
                            <div className={Styles.titulo} title={removerHTML(item?.tag)} dangerouslySetInnerHTML={{ __html: item?.tag }} />
                            <span className={Styles.subtitulo}>{item?.quantidade} {(item?.quantidade === 1 ? 'ward' : 'wards')}</span>
                        </div>
                    ))
                ) : (
                    <div>
                        <GifLoading />
                    </div>
                )
            }
        </div>
    )
}