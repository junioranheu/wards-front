import IconeLupa from '@/components/icones/lupa';
import { Dispatch } from 'react';
import Styles from './index.module.scss';

interface iParametros {
    hashtag: string | null;
    setHashtag: Dispatch<string>;
}

export default function BuscaInput({ hashtag, setHashtag }: iParametros) {
    return (
        <div className={Styles.main}>
            <input
                className={Styles.input}
                type='text'
                placeholder='Procure por uma hashtag como "xxx" ou "yyyy", por exemplo'
                onChange={(e) => setHashtag(e.target.value)}
                value={hashtag ?? ''}
            />

            <div className={Styles.lupa}>
                <IconeLupa escala={1} url={null} isNovaAba={false} handleFuncao={() => null} placeholder={hashtag && `Buscar por ${hashtag}`} />
            </div>
        </div>
    )
}