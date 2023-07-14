import Router from 'next/router';
import { ReactNode, Ref } from 'react';

interface iParametros {
    texto: string;
    url: string | null;
    isNovaAba: boolean;
    handleFuncao: any | null;
    Svg: ReactNode | null;
    refBtn: Ref<any>;
    isEnabled: boolean;
}

export default function BotaoAlternativo({ texto, url, isNovaAba, handleFuncao, Svg, refBtn, isEnabled }: iParametros) {

    function handleAbrirUrl() {
        if (!url) {
            if (handleFuncao) {
                handleFuncao();
            }

            return false;
        }

        if (isNovaAba) {
            window.open(url, '_blank');
        } else {
            Router.push(url);
        }
    }

    return (
        <section>
            <input type='text' placeholder='junior@exemplo.com' />
            <button
                className='botao'
                onClick={() => handleAbrirUrl()}
                ref={refBtn}
                disabled={!isEnabled}
            >
                {Svg ? Svg : ''}{texto}
            </button>
        </section>
    )
}