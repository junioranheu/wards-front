import Botao from '@/components/botao';
import IconeHamburguer from '@/components/icones/hamburguer';
import IconeLupa from '@/components/icones/lupa';
import useEsconderScroll from '@/hooks/useEsconderScroll';
import CONSTS_SISTEMA from '@/utils/consts/sistema';
import CONSTS_TELAS from '@/utils/consts/telas';
import { Auth } from '@/utils/context/usuarioContext';
import { CONST_NANUM } from '@/utils/fonts/fonts';
import obterPrimeiraPalavra from '@/utils/functions/obter.primeiraPalavra';
import Link from 'next/link';
import { Dispatch, Fragment, SetStateAction } from 'react';
import Styles from '../index.module.scss';
import StylesNavbarSmall from './index.module.scss';

interface iParametros {
    isNavbarSmallOpen: boolean;
    setIsNavbarSmallOpen: Dispatch<SetStateAction<boolean>>;
    isAuth: boolean;
    setIsModalLoginOpen: Dispatch<SetStateAction<boolean>>;
    setIsModalCriarContaOpen: Dispatch<SetStateAction<boolean>>;
    handleLogoff: () => void;
}

export default function NavbarSmall({ isNavbarSmallOpen, setIsNavbarSmallOpen, isAuth, setIsModalLoginOpen, setIsModalCriarContaOpen, handleLogoff }: iParametros) {
    return (
        <Fragment>
            {
                isNavbarSmallOpen && (
                    <ConteudoNavbarSmall
                        isNavbarSmallOpen={isNavbarSmallOpen}
                        setIsNavbarSmallOpen={setIsNavbarSmallOpen}
                        isAuth={isAuth}
                        setIsModalLoginOpen={setIsModalLoginOpen}
                        setIsModalCriarContaOpen={setIsModalCriarContaOpen}
                        handleLogoff={handleLogoff}
                    />
                )
            }

            <nav className={Styles.navbar}>
                <div className={Styles.esquerda}>
                    <Link className={`${CONST_NANUM.className} ${Styles.logo} wavy`} href={CONSTS_TELAS.INDEX}>{CONSTS_SISTEMA.NOME_SISTEMA}</Link>
                </div>

                <div className={Styles.direita}>
                    <IconeLupa
                        escala={0.75}
                        url={null}
                        isNovaAba={false}
                        handleFuncao={() => null}
                    />

                    <IconeHamburguer
                        isOpen={isNavbarSmallOpen}
                        setIsOpen={setIsNavbarSmallOpen}
                        escala={0.8}
                    />
                </div>
            </nav>
        </Fragment>
    )
}

interface iParametrosConteudoNavbarSmall {
    isNavbarSmallOpen: boolean;
    setIsNavbarSmallOpen: Dispatch<SetStateAction<boolean>>;
    isAuth: boolean;
    setIsModalLoginOpen: Dispatch<SetStateAction<boolean>>;
    setIsModalCriarContaOpen: Dispatch<SetStateAction<boolean>>;
    handleLogoff: () => void;
}

function ConteudoNavbarSmall({ isNavbarSmallOpen, setIsNavbarSmallOpen, isAuth, setIsModalLoginOpen, setIsModalCriarContaOpen, handleLogoff }: iParametrosConteudoNavbarSmall) {

    useEsconderScroll();

    return (
        <section className={StylesNavbarSmall.navbarSmall}>
            <div className={StylesNavbarSmall.top}>
                <div className={StylesNavbarSmall.esquerda}>
                    {
                        isAuth ? (
                            <span>Olá, {obterPrimeiraPalavra(Auth.get()?.nomeCompleto ?? 'amigo')}!</span>
                        ) : (
                            <span></span>
                        )
                    }
                </div>

                <div className={StylesNavbarSmall.direita}>
                    <IconeLupa
                        escala={0.75}
                        url={null}
                        isNovaAba={false}
                        handleFuncao={() => null}
                    />

                    <IconeHamburguer
                        isOpen={isNavbarSmallOpen}
                        setIsOpen={setIsNavbarSmallOpen}
                        escala={0.8}
                    />
                </div>
            </div>

            <Botao
                texto='Sobre'
                url={CONSTS_TELAS.SOBRE}
                isNovaAba={false}
                handleFuncao={() => null}
                Svg={null}
                refBtn={null}
                isEnabled={true}
                isPequeno={true}
            />

            {
                !isAuth ? (
                    <Fragment>
                        <span className='separadorHorizontal'></span>

                        <Botao
                            texto='Criar conta'
                            url={null}
                            isNovaAba={true}
                            handleFuncao={() => setIsModalCriarContaOpen(true)}
                            Svg={null}
                            refBtn={null}
                            isEnabled={true}
                            isPequeno={true}
                        />

                        <Botao
                            texto='Entrar'
                            url={null}
                            isNovaAba={true}
                            handleFuncao={() => setIsModalLoginOpen(true)}
                            Svg={null}
                            refBtn={null}
                            isEnabled={true}
                            isPequeno={true}
                        />
                    </Fragment>
                ) : (
                    <Botao
                        texto='Sair'
                        url={null}
                        isNovaAba={true}
                        handleFuncao={() => handleLogoff()}
                        Svg={null}
                        refBtn={null}
                        isEnabled={true}
                        isPequeno={true}
                    />
                )
            }
        </section>
    )
}