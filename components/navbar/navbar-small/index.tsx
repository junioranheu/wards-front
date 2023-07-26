import Botao from '@/components/botao';
import IconeHamburguer from '@/components/icones/hamburguer';
import IconeLupa from '@/components/icones/lupa';
import useEsconderScroll from '@/hooks/useEsconderScroll';
import CONSTS_TELAS from '@/utils/consts/telas';
import { Auth } from '@/utils/context/usuarioContext';
import obterPrimeiraPalavra from '@/utils/functions/obter.primeiraPalavra';
import redirecionarWardAleatoria from '@/utils/functions/redirecionar.wardAleatoria';
import { useRouter } from 'next/navigation';
import { Dispatch, Fragment, SetStateAction } from 'react';
import Styles from '../index.module.scss';
import Logo from '../logo';
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
                    <Logo />
                </div>

                <div className={Styles.direita}>
                    <IconeLupa escala={0.75} url={CONSTS_TELAS.BUSCA} isNovaAba={false} handleFuncao={() => null} placeholder='Buscar' />

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

    const router = useRouter();
    useEsconderScroll();

    function handleClick(url: string) {
        router.push(url);
        setIsNavbarSmallOpen(false);
    }

    function handleSair() {
        handleLogoff();
        setIsNavbarSmallOpen(false);
    }

    function handleEstouComSorte() {
        redirecionarWardAleatoria();
        setIsNavbarSmallOpen(false);
    }

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
                    <IconeHamburguer
                        isOpen={isNavbarSmallOpen}
                        setIsOpen={setIsNavbarSmallOpen}
                        escala={0.8}
                    />
                </div>
            </div>

            <Botao
                texto='Sobre'
                url={null}
                isNovaAba={false}
                handleFuncao={() => handleClick(CONSTS_TELAS.SOBRE)}
                Svg={null}
                refBtn={null}
                isEnabled={true}
                isPequeno={true}
            />

            <Botao
                texto='Estou com sorte'
                url={null}
                isNovaAba={false}
                handleFuncao={() => handleEstouComSorte()}
                Svg={null}
                refBtn={null}
                isEnabled={true}
                isPequeno={true}
            />

            <Botao
                texto='Buscar'
                url={null}
                isNovaAba={false}
                handleFuncao={() => handleClick(CONSTS_TELAS.BUSCA)}
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
                    <Fragment>
                        <span className='separadorHorizontal'></span>

                        <Botao
                            texto='Sair'
                            url={null}
                            isNovaAba={true}
                            handleFuncao={() => handleSair()}
                            Svg={null}
                            refBtn={null}
                            isEnabled={true}
                            isPequeno={true}
                        />
                    </Fragment>
                )
            }
        </section>
    )
}