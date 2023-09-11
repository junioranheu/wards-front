import removerHTML from '@/utils/functions/remover.HTML';
import setArrayAgrupar from '@/utils/functions/set.array.agrupar';
import iWard from '@/utils/types/iWard';
import { Fragment, useEffect, useState } from 'react';
import Styles from './busca.listaHashtags.module.scss';

interface iParametros {
    termoBuscado: string | null;
    listaWards: iWard[];
}

export default function BuscaListaHashtags({ termoBuscado, listaWards }: iParametros) {

    const [listaAgrupadaHashtags, setAgrupadaListaHashtags] = useState<[string, number][]>([]);

    useEffect(() => {
        function handleAgruparListaHashtags() {
            setAgrupadaListaHashtags([]);
            const listaHashtagsInterna: string[] = [];

            listaWards?.forEach((ward: iWard) => {
                if (ward.listaHashtags) {
                    listaHashtagsInterna.push(...ward.listaHashtags);
                }
            });

            if (!listaHashtagsInterna.length) {
                return false;
            }

            setAgrupadaListaHashtags(setArrayAgrupar(listaHashtagsInterna).slice(0, 6));
        }

        handleAgruparListaHashtags();
    }, [termoBuscado, listaWards]);

    return (
        <Fragment>
            {
                listaAgrupadaHashtags && listaAgrupadaHashtags?.length > 0 && (
                    <div className={Styles.main}>
                        {
                            listaAgrupadaHashtags?.map((item: [string, number], i: number) => (
                                <div key={i} className={Styles.topico}>
                                    <div className={Styles.titulo} title={removerHTML(item?.[0])} dangerouslySetInnerHTML={{ __html: item?.[0] }} />
                                    <span className={Styles.subtitulo}>{item?.[1]} {(item?.[1] === 1 ? 'ward' : 'wards')}</span>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </Fragment>
    )
}