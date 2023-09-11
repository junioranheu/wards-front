import { useRouter } from 'next/navigation';
import { Dispatch, KeyboardEvent, Ref, SetStateAction } from 'react';
import Styles from './botao.alternativo.module.scss';

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

    const router = useRouter();

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
            router.push(url);
        }
    }

    function handleKeyPress(event: KeyboardEvent<HTMLInputElement>) {
        if (handleFuncao) {
            if (event.key === 'Enter') {
                handleFuncao();
            }
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
                onKeyDown={(e) => handleKeyPress(e)}
            />

            <button
                className='botao'
                onClick={() => handleClick()}
                ref={refBtn}
                disabled={false}
            >
                {placeholderBotao}
            </button>
        </section>
    )
}