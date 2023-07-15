import BotaoAlternativo from '@/components/botaoAlternativo';
import useElementoAcompanhaScroll from '@/hooks/useElementoAcompanhaScroll';
import { useRef } from 'react';
import Styles from './index.module.scss';

export default function Intro() {

    const refDivMain = useRef<HTMLDivElement>(null);
    const refDivInfo = useRef<HTMLDivElement>(null);
    const mediaQueryLimite = 1025;

    useElementoAcompanhaScroll(refDivMain, refDivInfo, mediaQueryLimite);

    return (
        <section className={Styles.intro} ref={refDivMain}>
            <div className={Styles.conteudo}>
                {/* <Image src={ImgPerfil} alt='' /> */}

                <video className={Styles.video} autoPlay loop muted playsInline disablePictureInPicture controls={false}>
                    <source src={(require('@/assets/videos/gongos.mp4'))} type='video/mp4' />
                </video>
            </div>

            <div className={Styles.infos} ref={refDivInfo}>
                <span className='titulo'>E aí. 👋<br />Meu nome é Junior,<br />e aqui você vai aprender programação! &lt;/&gt;</span>
                <span className='subtitulo'>Inscreva-se abaixo para receber os posts mais recentes diretamente no seu e-mail.</span>
                <BotaoAlternativo placeholderInput='Seu melhor e-mail' placeholderBotao='Inscrever' url={null} isNovaAba={false} handleFuncao={() => null} refBtn={null} isEnabled={true} />
            </div>
        </section>
    )
}