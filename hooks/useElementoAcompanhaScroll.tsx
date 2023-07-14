import { RefObject, useEffect } from 'react';
import useWindowSize from './useWindowSize';

export default function useElementoAcompanhaScroll(refDivPai: RefObject<HTMLDivElement>, refDivScrollavel: RefObject<HTMLDivElement>, mediaQueryLimite: number = 1025) {

    const windowSize = useWindowSize();

    useEffect(() => {
        function handleScroll() {
            if (refDivScrollavel?.current && refDivPai?.current) {
                if (windowSize.width > mediaQueryLimite) {
                    const refDivPaiCurrent = refDivPai.current;
                    const refDivScrollavelCurrent = refDivScrollavel.current;

                    const { offsetTop, clientHeight } = refDivPai.current;
                    const tamanhoDivMain = offsetTop + clientHeight;

                    const porcentagemTamanhoDivTextoDescontadoComBaseNaDivMain = (refDivScrollavelCurrent.getBoundingClientRect().height / tamanhoDivMain) * 100;
                    const porcenatemTamanhoOffsetTopDivMain = (offsetTop / refDivPaiCurrent.getBoundingClientRect().height) * 100;

                    const maxPorcentagem = 100 - (porcentagemTamanhoDivTextoDescontadoComBaseNaDivMain + porcenatemTamanhoOffsetTopDivMain);
                    const porcentagemScrollada = (window.scrollY / tamanhoDivMain) * 100;

                    if (porcentagemScrollada <= maxPorcentagem) {
                        refDivScrollavelCurrent.style.top = `${window.scrollY}px`;
                    }
                }
            }
        }

        if (refDivScrollavel?.current) {
            if (windowSize.width <= mediaQueryLimite) {
                refDivScrollavel.current.style.top = '0px';
            }
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [windowSize]);

}