import removerHTML from '@/utils/functions/remover.HTML';
import iBusca from '@/utils/types/iBusca';
import Styles from './index.module.scss';

interface iParametros {
    listaHashtags: iBusca[];
    hashtag: string | null;
}

export default function BuscaListaItens({ listaHashtags, hashtag }: iParametros) {

    function handleClick(item: iBusca) {
        alert(item.hashtag);
    }

    return (
        <div className={Styles.main}>
            {
                listaHashtags && listaHashtags?.length > 0 ? (
                    listaHashtags?.filter(x => x.hashtag.toLowerCase().includes(hashtag?.toLocaleLowerCase() ?? '')).map((item: iBusca, i: number) => (
                        <div
                            key={i}
                            className={Styles.topico}
                            onClick={() => handleClick(item)}
                        >
                            <div className={Styles.titulo} title={removerHTML(item?.hashtag)} dangerouslySetInnerHTML={{ __html: item?.hashtag }} />
                            <span className={Styles.subtitulo}>{item?.qtdWards} {(item?.qtdWards === 1 ? 'ward' : 'wards')}</span>
                        </div>
                    ))
                ) : (
                    <div>
                        <span>Eita... pra onde foram as wards?</span>
                    </div>
                )
            }
        </div>
    )
}