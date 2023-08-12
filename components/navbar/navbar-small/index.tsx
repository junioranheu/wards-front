import Botao from '@/components/botao';
import IconeHamburguer from '@/components/icones/hamburguer';
import IconeLupa from '@/components/icones/lupa';
import SeparadorHorizontal from '@/components/separador/separador.horizontal';
import useEsconderScroll from '@/hooks/useEsconderScroll';
import CONSTS_TELAS from '@/utils/consts/telas';
import CONSTS_USUARIO_ROLES from '@/utils/consts/usuario.roles';
import redirecionarWardAleatoria from '@/utils/functions/redirecionar.wardAleatoria';
import verificarAcessoIsExibirElemento from '@/utils/functions/verificar.acesso.isExibirElemento';
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
                    <Logo placeholder='Voltar ao início' />
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
                    <div onClick={() => setIsNavbarSmallOpen(false)}>
                        <Logo placeholder='' />
                    </div>
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
                texto='Início'
                url={null}
                isNovaAba={false}
                handleFuncao={() => handleClick(CONSTS_TELAS.INDEX)}
                Svg={null}
                refBtn={null}
                isEnabled={true}
                isPequeno={true}
            />

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
                verificarAcessoIsExibirElemento([CONSTS_USUARIO_ROLES.ADMINISTRADOR_ID]) && (
                    <Botao
                        texto='Criar ward'
                        url={null}
                        isNovaAba={false}
                        handleFuncao={() => handleClick(CONSTS_TELAS.CRIAR)}
                        Svg={null}
                        refBtn={null}
                        isEnabled={true}
                        isPequeno={true}
                    />
                )
            }

            {
                !isAuth ? (
                    <Fragment>
                        <SeparadorHorizontal />

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
                        <SeparadorHorizontal />

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