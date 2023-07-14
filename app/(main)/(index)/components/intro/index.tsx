import ImgPerfil from '@/assets/images/outros/kapas.webp';
import useElementoAcompanhaScroll from '@/hooks/useElementoAcompanhaScroll';
import Image from 'next/image';
import { useRef } from 'react';
import Styles from './index.module.scss';

export default function Intro() {

    const refDivMain = useRef<HTMLDivElement>(null);
    const refDivInfo = useRef<HTMLDivElement>(null);
    const mediaQueryLimite = 1025;

    useElementoAcompanhaScroll(refDivMain, refDivInfo, mediaQueryLimite);

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