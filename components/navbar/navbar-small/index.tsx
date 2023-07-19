import IconeHamburguer from '@/components/icones/hamburguer';
import IconeLupa from '@/components/icones/lupa';
import CONSTS_SISTEMA from '@/utils/consts/sistema';
import CONSTS_TELAS from '@/utils/consts/telas';
import { CONST_NANUM } from '@/utils/fonts/fonts';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import Styles from '../index.module.scss';

interface iParametros {
    isAuth: boolean;
    setIsModalLoginOpen: Dispatch<SetStateAction<boolean>>;
    setIsModalCriarContaOpen: Dispatch<SetStateAction<boolean>>;
    handleLogoff: () => void;
}

export default function NavbarSmall({ isAuth, setIsModalLoginOpen, setIsModalCriarContaOpen, handleLogoff }: iParametros) {
    return (
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

                {/* <Link href={CONSTS_TELAS.SOBRE}>Sobre</Link> */}

                <IconeHamburguer escala={0.8} handleFuncao={() => null} />

                {/* {
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
                } */}
            </div>
        </nav>
    )
}