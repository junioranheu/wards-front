import BotaoAlternativo from '@/components/botaoAlternativo';
import useUsuarioContext from '@/hooks/context/useUsuarioContext';
import useElementoAcompanhaScroll from '@/hooks/useElementoAcompanhaScroll';
import CONSTS_NEWS_LETTERS from '@/utils/api/consts/newsletterCadastro';
import { Fetch } from '@/utils/api/fetch';
import CONSTS_EMOJIS from '@/utils/consts/emojis';
import { Auth } from '@/utils/context/usuarioContext';
import { Aviso } from '@/utils/functions/aviso';
import obterPrimeiraPalavra from '@/utils/functions/obter.primeiraPalavra';
import validarEmail from '@/utils/functions/validar.email';
import { useRef, useState } from 'react';
import Styles from './index.module.scss';

export default function Intro() {

    const [isAuth, setIsAuth] = useUsuarioContext();

    const [emailCadastroNewsletter, setEmailCadastroNewsletter] = useState<string>(Auth.get()?.email ?? '');
    const [isBtnCadastroNewsletterAtivo, setIsBtnCadastroNewsletterAtivo] = useState<boolean>(true);

    const refDivMain = useRef<HTMLDivElement>(null);
    const refDivInfo = useRef<HTMLDivElement>(null);
    const mediaQueryLimite = 1025;

    useElementoAcompanhaScroll(refDivMain, refDivInfo, mediaQueryLimite);

    async function handleCadastrarParaReceberPosts() {
        if (!emailCadastroNewsletter || !validarEmail(emailCadastroNewsletter)) {
            Aviso.toast('Preencha o campo com um e-mail válido antes de prosseguir', 5500, CONSTS_EMOJIS.ERRO, true);
            return false;
        }

        const input = {
            email: emailCadastroNewsletter
        };

        const resp = await Fetch.postApi(CONSTS_NEWS_LETTERS.criar, input);

        if (resp?.mensagens || !resp) {
            Aviso.toast(resp.mensagens![0], 5500, CONSTS_EMOJIS.ERRO, true);
            return false;
        }

        Aviso.toast('Obrigado! Seu e-mail foi cadastrado com sucesso em nossa newsletter', 6000, CONSTS_EMOJIS.SUCESSO, true);
        setIsBtnCadastroNewsletterAtivo(false);
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
                    valorInput={emailCadastroNewsletter}
                    setValorInput={setEmailCadastroNewsletter}
                    placeholderInput='Seu melhor e-mail'
                    placeholderBotao='Inscrever'
                    url={null}
                    isNovaAba={false}
                    handleFuncao={() => handleCadastrarParaReceberPosts()}
                    refBtn={null}
                    isEnabled={isBtnCadastroNewsletterAtivo}
                />
            </div>
        </section>
    )
}