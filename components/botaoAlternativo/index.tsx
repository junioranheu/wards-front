import Router from 'next/router';
import { Ref } from 'react';
import Styles from './index.module.scss';

interface iParametros {
    placeholderInput: string;
    placeholderBotao: string;
    url: string | null;
    isNovaAba: boolean;
    handleFuncao: any | null;
    refBtn: Ref<any>;
    isEnabled: boolean;
}

export default function BotaoAlternativo({ placeholderInput, placeholderBotao, url, isNovaAba, handleFuncao, refBtn, isEnabled }: iParametros) {

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
        <section className={Styles.form}>
            <input type='email' placeholder={placeholderInput} />

            <button
                className='botao'
                onClick={() => handleAbrirUrl()}
                ref={refBtn}
                disabled={!isEnabled}
            >
                {placeholderBotao}
            </button>
        </section>
    )
}