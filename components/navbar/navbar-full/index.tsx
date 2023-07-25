import Botao from '@/components/botao';
import IconeEntrar from '@/components/icones/entrar';
import IconeLupa from '@/components/icones/lupa';
import CONSTS_SISTEMA from '@/utils/consts/sistema';
import CONSTS_TELAS from '@/utils/consts/telas';
import { CONST_NANUM } from '@/utils/fonts/fonts';
import redirecionarWardAleatoria from '@/utils/functions/redirecionar.wardAleatoria';
import Link from 'next/link';
import { Dispatch, Fragment, SetStateAction } from 'react';
import Styles from '../index.module.scss';

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
                <Link className={`${CONST_NANUM.className} ${Styles.logo} wavy`} href={CONSTS_TELAS.INDEX}>{CONSTS_SISTEMA.NOME_SISTEMA}</Link>

                <Link href={CONSTS_TELAS.SOBRE}>Sobre</Link>
                <a onClick={() => redirecionarWardAleatoria()}>Estou com sorte</a>
                {/* <IconeInfo escala={0.65} url={CONSTS_TELAS.SOBRE} isNovaAba={false} handleFuncao={() => null} placeholder='Sobre' />
                <IconeSorte escala={0.75} url={null} isNovaAba={false} handleFuncao={() => redirecionarWardAleatoria()} placeholder='Estou com sorte' /> */}
            </div>

            <div className={Styles.direita}>
                <IconeLupa escala={0.75} url={null} isNovaAba={false} handleFuncao={() => null} placeholder='Buscar' />

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
                        <a onClick={() => handleLogoff()}>Sair</a>
                    )
                }
            </div>
        </nav>
    )
}