import { useRouter } from 'next/navigation';
import { ReactNode, Ref } from 'react';

interface iParametros {
    texto: string;
    url: string | null;
    isNovaAba: boolean;
    handleFuncao: any | null;
    Svg: ReactNode | null;
    refBtn: Ref<any>;
    isEnabled: boolean;
    isPequeno: boolean;
}

export default function Botao({ texto, url, isNovaAba, handleFuncao, Svg, refBtn, isEnabled, isPequeno }: iParametros) {

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

    return (
        <button
            className={`botao ${isPequeno ? 'btnPequeno' : ''}`}
            onClick={() => handleClick()}
            ref={refBtn}
            disabled={!isEnabled}
        >
            {Svg ? Svg : ''}{texto}
        </button>
    )
}