import IconeLupa from '@/components/icones/lupa';
import { Dispatch } from 'react';
import Styles from './index.module.scss';

interface iParametros {
    termoBuscado: string | null;
    setTermoBuscado: Dispatch<string>;
}

export default function BuscaInput({ termoBuscado, setTermoBuscado }: iParametros) {
    return (
        <div className={Styles.main}>
            <input
                className={Styles.input}
                type='text'
                placeholder='Procure por um termo como "dotnet" ou "react", por exemplo'
                onChange={(e) => setTermoBuscado(e.target.value)}
                value={termoBuscado ?? ''}
            />

            <div className={Styles.lupa}>
                <IconeLupa escala={1} url={null} isNovaAba={false} handleFuncao={() => null} placeholder={null} />
            </div>
        </div>
    )
}