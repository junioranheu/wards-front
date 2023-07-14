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

                    // Obter o height da div pai;
                    const { offsetTop, clientHeight } = refDivPaiCurrent;
                    const tamanhoDivPai = offsetTop + clientHeight;

                    // Obter porcentagem a ser descontada com base no tamanho da refDivScrollavel (para que ela não exceda o limite da refDivPai);
                    const porcentagemTamanhoDivTextoDescontadoComBaseNaDivMain = (refDivScrollavelCurrent.getBoundingClientRect().height / tamanhoDivPai) * 100;

                    // Obter porcentagem a ser descontada com base no tamanho do espaço acima da refDivPaiCurrent (para evitar que elementos, como um navbar, atrapalhe no processo);
                    const porcentagemTamanhoOffsetTopDivMain = (offsetTop / refDivPaiCurrent.getBoundingClientRect().height) * 100;

                    // Calcular o limite máximo que a refDivScrollavel pode chegar no scroll;
                    const maxPorcentagem = 100 - (porcentagemTamanhoDivTextoDescontadoComBaseNaDivMain + porcentagemTamanhoOffsetTopDivMain);

                    // Porcentam da refDivPai scrollada atualmente;
                    const porcentagemScrollada = (window.scrollY / tamanhoDivPai) * 100;

                    // Enquanto possível, scrolle a refDivScrollavel;
                    if (porcentagemScrollada <= maxPorcentagem) {
                        refDivScrollavelCurrent.style.top = `${window.scrollY}px`;
                    }
                }
            }
        }

        if (refDivScrollavel?.current) {
            // Se o navegador estiver com um width menor a quebra de query definida, 
            // a refDivScrollavel deve voltar a sua posição inicial;
            if (windowSize.width <= mediaQueryLimite) {
                refDivScrollavel.current.style.top = '0px';
            }
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [windowSize]);

}