import Router from 'next/router';
import { Dispatch, Ref, SetStateAction } from 'react';
import Styles from './index.module.scss';

interface iParametros {
    valorInput: string;
    setValorInput: Dispatch<SetStateAction<string>>;
    placeholderInput: string;
    placeholderBotao: string;
    url: string | null;
    isNovaAba: boolean;
    handleFuncao: any | null;
    refBtn: Ref<any>;
    isEnabled: boolean;
}

export default function BotaoAlternativo({ valorInput, setValorInput, placeholderInput, placeholderBotao, url, isNovaAba, handleFuncao, refBtn, isEnabled }: iParametros) {

    function handleClick() {
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
            <input
                type='email'
                placeholder={placeholderInput}
                disabled={!isEnabled}
                value={valorInput}
                onChange={(e) => setValorInput(e.target.value)}
            />

            <button
                className='botao'
                onClick={() => handleClick()}
                ref={refBtn}
                disabled={!isEnabled}
            >
                {placeholderBotao}
            </button>
        </section>
    )
}