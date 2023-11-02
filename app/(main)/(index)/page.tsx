'use client';
import StylesLayout from '@/app/(main)/layout.module.scss';
import ImgGitHub from '@/assets/images/outros/github.webp';
import ImgJunior from '@/assets/images/outros/junioranheu.webp';
import useTitulo from '@/hooks/useTitulo';
import CONSTS_AUXILIARES from '@/utils/api/consts/auxiliares';
import { Fetch } from '@/utils/api/fetch';
import filtroPaginacaoInput from '@/utils/api/filters/paginacaoInput';
import CONSTS_SESSION_STORAGE from '@/utils/consts/sessionStorage';
import CONSTS_SISTEMA from '@/utils/consts/sistema';
import CONSTS_TELAS from '@/utils/consts/telas';
import gerarNumeroAleatorio from '@/utils/functions/gerar.numeroAleatorio';
import { getSessionStorage, setSessionStorage } from '@/utils/session/sessionStorage';
import { Fragment, lazy, useEffect, useState } from 'react';
import Splash from './components/splash';
const Intro = lazy(() => import('./components/intro'));
const Wards = lazy(() => import('./components/wards'));
const Projeto = lazy(() => import('./components/projeto'));

export default function Page() {

    useTitulo(`${CONSTS_SISTEMA.NOME_SISTEMA} • Tipo um blog do Stack Overflow`, false);

    const [isSplash, setIsSplash] = useState<boolean>(true);

    useEffect(() => {
        async function handleTesteAtivarAPI() {
            await Fetch.get(`${CONSTS_AUXILIARES.listarEstado}?${filtroPaginacaoInput(0, 1, false)}`) as unknown;
        }

        function handleSplash() {
            if (getSessionStorage(CONSTS_SESSION_STORAGE.SPLASH)) {
                setIsSplash(false);
                return false;
            }

            handleTesteAtivarAPI();
            setSessionStorage(CONSTS_SESSION_STORAGE.SPLASH, { isSplashExibido: true });

            const handleDelayDebounce = setTimeout(() => {
                setIsSplash(false);
            }, gerarNumeroAleatorio(2250, 3000));

            return () => clearTimeout(handleDelayDebounce);
        }

        handleSplash();
    }, []);

    return (
        <Fragment>
            {
                isSplash && <Splash />
            }

            <section className={StylesLayout.session}>
                <Intro />

                <Projeto
                    miniInfo='Repositório completo de back-end no GitHub'
                    titulo='<repo-github.com/wards-api />'
                    descricao={
                        `Um repositório de códigos em <span class="wavy">C#</span>, super úteis que servem de apoio para outros projetos em <span class="wavy">.NET</span>. 
                        <br/><br/>Contém múltiplos exemplos referentes à criação de uma API com .NET 7, 
                        token JWT e refresh token, criptografia de senha, 
                        padrão DDD, EF e Dapper, Clean Arch, 
                        Vertical Slice, Clean Code, upload de arquivos, FluentValidation, 
                        Health Check, Moq, envio de e-mail, Quartz.NET, bulk insert, 
                        streaming de arquivos em chunks, Parallel Threads, Cancellation Token, 
                        Generic Repository, RabbitMQ, ChatGPT, SignalR e etc.`
                    }
                    Img={ImgGitHub}
                    listaTecnologias={['Back-end', 'C#', '.NET 7', 'Etc']}
                    url={CONSTS_SISTEMA.URL_WARDS_BACKEND_GITHUB}
                    isDireita={true}
                    isMargemTop={true}
                    isOcultarImagemOnMobile={true}
                />

                <Projeto
                    miniInfo='Sobre mim e o projeto'
                    titulo='<sobre-wards-e-@junioranheu />'
                    descricao={
                        `Descubra um pouco mais sobre mim e principalmente sobre o projeto <span class="wavy">wards</span>.
                        <br/><br/>Lembrando que esse projeto <b>não</b> tem propósitos reais; ou seja, ser uma plataforma ativa e estar regularmente atualizado.
                        Ele é exclusivamente destinado a estudos e prática no desenvolvimento full stack.`
                    }
                    Img={ImgJunior}
                    listaTecnologias={['Sobre', 'Wards', '@junioranheu']}
                    url={CONSTS_TELAS.SOBRE}
                    isDireita={false}
                    isMargemTop={true}
                    isOcultarImagemOnMobile={true}
                />

                <Wards />
            </section>
        </Fragment>
    )
}