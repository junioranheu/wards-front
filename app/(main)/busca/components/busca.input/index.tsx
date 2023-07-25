import LupaAlt from '@/components/icones/lupa.alt';
import { Dispatch } from 'react';
import Styles from '../../index.module.scss';

interface iParametros {
    hashtag: string | null;
    setHashtag: Dispatch<string>;
}

export default function BuscaInput({ hashtag, setHashtag }: iParametros) {
    return (
        <div className={Styles.divPesquisa}>
            <input
                className={Styles.inputPesquisaNavbar}
                type='text'
                placeholder='Procure por uma hashtag como "xxx" ou "yyyy", por exemplo'
                onChange={(e) => setHashtag(e.target.value)}
                value={hashtag ?? ''}
            />

            <div className={Styles.lupa}>
                <LupaAlt width={20} url={null} title={null} isCorPrincipal={true} />
            </div>
        </div>
    )
}