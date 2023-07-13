import ImgPerfil from '@/assets/images/outros/kapas.webp';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import Styles from './intro.module.scss';

export default function Intro() {

    const refDivTexto = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            console.log('scrollTop', scrollTop);

            if (refDivTexto?.current) {
                refDivTexto.current.style.marginTop = scrollTop + "px";
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section className={Styles.intro}>
            <div className={Styles.imagem}>
                <Image src={ImgPerfil} alt='' />
            </div>

            <div
                className={Styles.texto}
                ref={refDivTexto}
            >
                <span className='titulo'>E aí. 👋<br />Meu nome é Junior, e tô aqui pra te ajudar!</span>
                <span className='subtitulo'>Inscreva-se abaixo para receber meus posts mais recentes diretamente na sua caixa de correio.</span>
                <input type='text' placeholder='junior@exemplo.com' />
            </div>
        </section>
    )
}