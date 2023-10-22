import Botao from '@/components/botao';
import IconeEntrar from '@/components/icones/entrar';
import IconeLupa from '@/components/icones/lupa';
import IconeSair from '@/components/icones/sair';
import CONSTS_TELAS from '@/utils/consts/telas';
import CONSTS_USUARIO_ROLES from '@/utils/consts/usuario.roles';
import redirecionarWardAleatoria from '@/utils/functions/redirecionar.wardAleatoria';
import verificarAcessoIsExibirElemento from '@/utils/functions/verificar.acesso.isExibirElemento';
import Link from 'next/link';
import { Dispatch, Fragment, SetStateAction } from 'react';
import Logo from '../logo';
import Styles from '../navbar.module.scss';

interface iParametros {
    isAuth: boolean;
    setIsModalLoginOpen: Dispatch<SetStateAction<boolean>>;
    setIsModalCriarContaOpen: Dispatch<SetStateAction<boolean>>;
    handleLogoff: () => void;
}

export default function NavbarFull({ isAuth, setIsModalLoginOpen, setIsModalCriarContaOpen, handleLogoff }: iParametros) {
    return (
        <nav className={Styles.navbar}>
            <div className={Styles.esquerda}>
                <Logo placeholder='' />

                <Link href={CONSTS_TELAS.INDEX}>Início</Link>
                <Link href={CONSTS_TELAS.SOBRE}>Sobre</Link>
                <a onClick={() => redirecionarWardAleatoria()}>Estou com sorte ✨</a>

                {
                    verificarAcessoIsExibirElemento([CONSTS_USUARIO_ROLES.ADMINISTRADOR_ID]) && <Link href={CONSTS_TELAS.CRIAR}>Criar ward 📜</Link>
                }

                {
                    verificarAcessoIsExibirElemento([]) && <Link href={CONSTS_TELAS.CHAT}>Chat 💬</Link>
                }
            </div>

            <div className={Styles.direita}>
                <IconeLupa escala={0.75} url={CONSTS_TELAS.BUSCA} isNovaAba={false} handleFuncao={() => null} placeholder='Buscar' />

                {
                    !isAuth ? (
                        <Fragment>
                            <IconeEntrar escala={0.75} url={null} isNovaAba={false} handleFuncao={() => setIsModalLoginOpen(true)} placeholder='Entrar' />

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
                        <IconeSair escala={0.85} url={null} isNovaAba={false} handleFuncao={() => handleLogoff()} placeholder='Finalizar sessão' />
                    )
                }
            </div>
        </nav>
    )
}