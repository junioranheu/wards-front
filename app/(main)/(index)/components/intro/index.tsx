import BotaoAlternativo from '@/components/botaoAlternativo';
import useUsuarioContext from '@/hooks/context/useUsuarioContext';
import useElementoAcompanhaScroll from '@/hooks/useElementoAcompanhaScroll';
import { Auth } from '@/utils/context/usuarioContext';
import obterPrimeiraPalavra from '@/utils/functions/obter.primeiraPalavra';
import { useRef, useState } from 'react';
import Styles from './index.module.scss';

export default function Intro() {

    const [isAuth, setIsAuth] = useUsuarioContext();

    const [emailCadastroPost, setEmailCadastroPost] = useState<string>(Auth.get()?.email ?? '');

    const refDivMain = useRef<HTMLDivElement>(null);
    const refDivInfo = useRef<HTMLDivElement>(null);
    const mediaQueryLimite = 1025;

    useElementoAcompanhaScroll(refDivMain, refDivInfo, mediaQueryLimite);

    function handleCadastrarParaReceberPosts() {
        alert(emailCadastroPost);
    }

    return (
        <section className={Styles.intro} ref={refDivMain}>
            <div className={Styles.conteudo}>
                <video autoPlay loop muted playsInline disablePictureInPicture controls={false}>
                    <source src={(require('@/assets/videos/coding2.mp4'))} type='video/mp4' />
                </video>
            </div>

            <div className={Styles.infos} ref={refDivInfo}>
                <span className='titulo'>
                    {
                        isAuth ? (
                            <span>E aí, {obterPrimeiraPalavra(Auth.get()?.nomeCompleto ?? 'amigo')}. 👋</span>
                        ) : (
                            <span>E aí. 👋</span>
                        )
                    }

                    <br />Aqui você vai aprender programação! &lt;/&gt;
                </span>

                <span className='subtitulo'>Inscreva-se abaixo para receber os posts mais recentes diretamente no seu e-mail.</span>

                <BotaoAlternativo
                    valorInput={emailCadastroPost}
                    setValorInput={setEmailCadastroPost}
                    placeholderInput='Seu melhor e-mail'
                    placeholderBotao='Inscrever'
                    url={null}
                    isNovaAba={false}
                    handleFuncao={() => handleCadastrarParaReceberPosts()}
                    refBtn={null}
                    isEnabled={true}
                />
            </div>
        </section>
    )
}