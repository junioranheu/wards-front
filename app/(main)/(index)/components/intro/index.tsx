import ImgPerfil from '@/assets/images/outros/kapas.webp';
import useWindowSize from '@/hooks/useWindowSize';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import Styles from './index.module.scss';

export default function Intro() {

    const refDivMain = useRef<HTMLDivElement>(null);
    const refDivInfo = useRef<HTMLDivElement>(null);

    const windowSize = useWindowSize();

    useEffect(() => {
        if (refDivInfo?.current) {
            if (windowSize.width <= 1025) {
                refDivInfo.current.style.top = '0px';
            }
        }
    }, [windowSize]);

    useEffect(() => {
        function handleScroll() {
            if (refDivInfo?.current) {
                if (windowSize.width > 1025) {
                    const porcentagemScrollada = (window.scrollY / tamanhoDivMain) * 100;

                    if (porcentagemScrollada <= maxPorcentagem) {
                        refDivInfo.current.style.top = `${window.scrollY}px`;
                    }
                }
            }
        }

        let tamanhoDivMain = 0;
        let porcentagemTamanhoDivTextoDescontadoComBaseNaDivMain = 0;
        const porcentagemExtraDesconto = 7.5;

        if (refDivMain?.current) {
            const { offsetTop, clientHeight } = refDivMain.current;
            const bottomPosition = offsetTop + clientHeight;
            tamanhoDivMain = bottomPosition;
        }

        if (refDivInfo?.current) {
            porcentagemTamanhoDivTextoDescontadoComBaseNaDivMain = (refDivInfo.current.getBoundingClientRect().height / tamanhoDivMain) * 100;
        }

        const maxPorcentagem = (100 - porcentagemTamanhoDivTextoDescontadoComBaseNaDivMain) - porcentagemExtraDesconto;
        console.log(maxPorcentagem);

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
                <h1>{windowSize.width}</h1>
            </div>
        </section>
    )
}