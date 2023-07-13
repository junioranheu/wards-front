import ImgPerfil from '@/assets/images/outros/kapas.webp';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Styles from './index.module.scss';

export default function Intro() {

    const refDivMain = useRef<HTMLDivElement>(null);
    const refDivTexto = useRef<HTMLDivElement>(null);
    const [teste, setTeste] = useState<string>('x');

    useEffect(() => {
        function handleScroll() {
            const scrollTop = window.scrollY;
            console.log('scrollTop', scrollTop);

            if (refDivTexto?.current) {
                refDivTexto.current.style.marginTop = scrollTop + 'px';
            }
        }

        // setTeste();

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section
            className={Styles.intro}
            ref={refDivMain}
        >
            <div className={Styles.imagem}>
                <Image src={ImgPerfil} alt='' />
            </div>

            <div
                className={Styles.texto}
                ref={refDivTexto}
            >
                <span className='titulo'>E aí. 👋<br />Meu nome é Junior,<br />e tô aqui pra te ajudar!</span>
                <span className='subtitulo'>Inscreva-se abaixo para receber meus posts mais recentes diretamente na sua caixa de correio.</span>
                <input type='text' placeholder='junior@exemplo.com' />
                <h1>{teste}</h1>
            </div>
        </section>
    )
}