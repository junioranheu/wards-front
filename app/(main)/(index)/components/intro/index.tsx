import ImgPerfil from '@/assets/images/outros/kapas.webp';
import useWindowSize from '@/hooks/useWindowSize';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Styles from './index.module.scss';

export default function Intro() {

    const windowSize = useWindowSize();

    const refDivMain = useRef<HTMLDivElement>(null);
    const refDivInfo = useRef<HTMLDivElement>(null);

    const [tamanhoDivMain, setTamanhoDivMain] = useState<number>(0);
    const [porcentagemTamanhoDivTextoDescontadoComBaseNaDivMain, setPorcentagemTamanhoDivTextoDescontadoComBaseNaDivMain] = useState<number>(0);

    useEffect(() => {
        if (refDivMain?.current) {
            const { offsetTop, clientHeight } = refDivMain.current;
            const bottomPosition = offsetTop + clientHeight;
            setTamanhoDivMain(bottomPosition);
        }

        if (refDivInfo?.current) {
            const porcentagem = (refDivInfo.current.getBoundingClientRect().height / tamanhoDivMain) * 100;
            setPorcentagemTamanhoDivTextoDescontadoComBaseNaDivMain(porcentagem);
        }
    }, [tamanhoDivMain]);

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
                    const porcentagemExtraDesconto = 7.5;
                    const maxPorcentagem = (100 - porcentagemTamanhoDivTextoDescontadoComBaseNaDivMain) - porcentagemExtraDesconto;
                    const porcentagemScrollada = (window.scrollY / tamanhoDivMain) * 100;

                    if (porcentagemScrollada <= maxPorcentagem) {
                        refDivInfo.current.style.top = `${window.scrollY}px`;
                    }
                }
            }
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [windowSize, tamanhoDivMain, porcentagemTamanhoDivTextoDescontadoComBaseNaDivMain]);

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