import IconeLupa from '@/components/icones/lupa';
import { Dispatch } from 'react';
import Styles from './index.module.scss';

interface iParametros {
    hashtagBuscada: string | null;
    setHashtagBuscada: Dispatch<string>;
}

export default function BuscaInput({ hashtagBuscada, setHashtagBuscada }: iParametros) {
    return (
        <div className={Styles.main}>
            <input
                className={Styles.input}
                type='text'
                placeholder='Procure por uma hashtag como "#dotnet" ou "#react", por exemplo'
                onChange={(e) => setHashtagBuscada(e.target.value)}
                value={hashtagBuscada ?? ''}
            />

            <div className={Styles.lupa}>
                <IconeLupa escala={1} url={null} isNovaAba={false} handleFuncao={() => null} placeholder={hashtagBuscada && `Buscar por ${hashtagBuscada}`} />
            </div>
        </div>
    )
}