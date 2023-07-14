import ImgPerfil from '@/assets/images/outros/kapas.webp';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Styles from './index.module.scss';

export default function Intro() {

    const refDivMain = useRef<HTMLDivElement>(null);
    const refDivInfo = useRef<HTMLDivElement>(null);

    const [tamanhoDivMain, setTamanhoDivMain] = useState<number>(0);

    useEffect(() => {
        function handleScroll() {
            if (refDivInfo?.current) {
                const porcentagemScrollada = (window.scrollY / tamanhoDivMain) * 100;
                const teste = refDivInfo.current.getBoundingClientRect().height / tamanhoDivMain;
                const maxPorcentagem = (100 - (teste * 100)) - 3;
                console.log(teste, maxPorcentagem);

                if (porcentagemScrollada <= maxPorcentagem) {
                    refDivInfo.current.style.top = `${window.scrollY}px`;
                }
            }
        }

        if (refDivMain?.current) {
            const { offsetTop, clientHeight } = refDivMain.current;
            const bottomPosition = offsetTop + clientHeight;
            setTamanhoDivMain(bottomPosition);
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [tamanhoDivMain]);

    return (
        <section
            className={Styles.intro}
            ref={refDivMain}
        >
            <div className={Styles.imagem}>
                <Image src={ImgPerfil} alt='' />
            </div>

            <div
                className={Styles.infos}
                ref={refDivInfo}
            >
                <span className='titulo'>E aí. 👋<br />Meu nome é Junior,<br />e tô aqui pra te ajudar!</span>
                <span className='subtitulo'>Inscreva-se abaixo para receber os posts mais recentes diretamente no seu e-mail.</span>
                <input type='text' placeholder='junior@exemplo.com' />
                <h1>posicaoBottomDivMain: {tamanhoDivMain}</h1>
            </div>
        </section>
    )
}