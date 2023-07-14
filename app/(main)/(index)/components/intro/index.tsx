import ImgPerfil from '@/assets/images/outros/kapas.webp';
import useWindowSize from '@/hooks/useWindowSize';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import Styles from './index.module.scss';

export default function Intro() {

    const windowSize = useWindowSize();

    const refDivMain = useRef<HTMLDivElement>(null);
    const refDivInfo = useRef<HTMLDivElement>(null);
    const mediaQueryLimite = 1025;

    useEffect(() => {
        function handleScroll() {
            if (refDivInfo?.current && refDivMain?.current) {
                if (windowSize.width > mediaQueryLimite) {
                    const refDivMainCurrent = refDivMain.current;
                    const refDivInfoCurrent = refDivInfo.current;

                    const { offsetTop, clientHeight } = refDivMain.current;
                    const tamanhoDivMain = offsetTop + clientHeight;

                    const porcentagemTamanhoDivTextoDescontadoComBaseNaDivMain = (refDivInfoCurrent.getBoundingClientRect().height / tamanhoDivMain) * 100;
                    const porcenatemTamanhoOffsetTopDivMain = (offsetTop / refDivMainCurrent.getBoundingClientRect().height) * 100;

                    const maxPorcentagem = 100 - (porcentagemTamanhoDivTextoDescontadoComBaseNaDivMain + porcenatemTamanhoOffsetTopDivMain);
                    const porcentagemScrollada = (window.scrollY / tamanhoDivMain) * 100;

                    if (porcentagemScrollada <= maxPorcentagem) {
                        refDivInfoCurrent.style.top = `${window.scrollY}px`;
                    }
                }
            }
        }

        if (refDivInfo?.current) {
            if (windowSize.width <= mediaQueryLimite) {
                refDivInfo.current.style.top = '0px';
            }
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [windowSize]);

    return (
        <section className={Styles.intro} ref={refDivMain}>
            <div className={Styles.imagem}>
                <Image src={ImgPerfil} alt='' />
            </div>

            <div className={Styles.infos} ref={refDivInfo}>
                <span className='titulo'>E aí. 👋<br />Meu nome é Junior,<br />e tô aqui pra te ajudar!</span>
                <span className='subtitulo'>Inscreva-se abaixo para receber os posts mais recentes diretamente no seu e-mail.</span>
                <input type='text' placeholder='junior@exemplo.com' />
            </div>
        </section>
    )
}