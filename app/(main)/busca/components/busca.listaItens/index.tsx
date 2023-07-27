import GifLoading from '@/components/gif.loading';
import removerHTML from '@/utils/functions/remover.HTML';
import { default as iBusca, default as iHashtagQtd } from '@/utils/types/iBusca';
import Styles from './index.module.scss';

interface iParametros {
    listaHashtags: iBusca[];
    hashtagBuscada: string | null;
}

export default function BuscaListaItens({ listaHashtags, hashtagBuscada }: iParametros) {

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