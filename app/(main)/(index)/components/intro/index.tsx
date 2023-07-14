import ImgPerfil from '@/assets/images/outros/kapas.webp';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Styles from './index.module.scss';

export default function Intro() {

    const refDivMain = useRef<HTMLDivElement>(null);
    const refDivInfo = useRef<HTMLDivElement>(null);

    const [posicaoBottomDivMain, setPosicaoBottomDivMain] = useState<number>(0);
    const [posicaoBottomDivInfo, setPosicaoBottomDivInfo] = useState<number>(0);

    useEffect(() => {
        function handleScroll() {
            if (refDivMain?.current) {
                setPosicaoBottomDivMain(refDivMain.current.getBoundingClientRect().bottom);
            }

            if (refDivInfo?.current) {
                if (posicaoBottomDivMain >= posicaoBottomDivInfo) {
                    refDivInfo.current.style.marginTop = `${window.scrollY}px`;
                }

                setPosicaoBottomDivInfo(refDivInfo.current.getBoundingClientRect().bottom);
            }
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [posicaoBottomDivMain, posicaoBottomDivInfo]);

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
                <h1>posicaoBottomDivMain: {posicaoBottomDivMain}</h1>
                <h1>posicaoBottomDivInfo: {posicaoBottomDivInfo}</h1>
            </div>
        </section>
    )
}