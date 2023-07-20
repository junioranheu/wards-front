import Botao from '@/components/botao';
import IconeHamburguer from '@/components/icones/hamburguer';
import IconeLupa from '@/components/icones/lupa';
import useEsconderScroll from '@/hooks/useEsconderScroll';
import CONSTS_SISTEMA from '@/utils/consts/sistema';
import CONSTS_TELAS from '@/utils/consts/telas';
import { CONST_NANUM } from '@/utils/fonts/fonts';
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
    isAuth: boolean;
    setIsModalLoginOpen: Dispatch<SetStateAction<boolean>>;
    setIsModalCriarContaOpen: Dispatch<SetStateAction<boolean>>;
    handleLogoff: () => void;
}

function ConteudoNavbarSmall({ isAuth, setIsModalLoginOpen, setIsModalCriarContaOpen, handleLogoff }: iParametrosConteudoNavbarSmall) {

    useEsconderScroll();

    return (
        <section className={StylesNavbarSmall.navbarSmall}>
            <Link href={CONSTS_TELAS.SOBRE}>Sobre</Link>

            {
                !isAuth ? (
                    <Fragment>
                        <a onClick={() => setIsModalLoginOpen(true)}>Entrar</a>

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
                    </Fragment>
                ) : (
                    <a onClick={() => handleLogoff()}>Sair</a>
                )
            }
        </section>
    )
}