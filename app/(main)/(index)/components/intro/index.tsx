import ImgPerfil from '@/assets/images/outros/kapas.webp';
import BotaoAlternativo from '@/components/botaoAlternativo';
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
                <span className='titulo'>E aí. 👋<br />Meu nome é <span className='wavy'>Junior</span>,<br />e tô aqui pra te ajudar!</span>
                <span className='subtitulo'>Inscreva-se abaixo para receber os posts mais recentes diretamente no seu e-mail.</span>

                <BotaoAlternativo texto='Enviar avaliação' url={null} isNovaAba={false} handleFuncao={() => null} Svg={null} refBtn={null} isEnabled={true} />
            </div>
        </section>
    )
}