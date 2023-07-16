import Botao from '@/components/botao';
import IconeLupa from '@/components/icones/lupa';
import ModalLayout from '@/components/modal/_modal.layout';
import ModalWrapper from '@/components/modal/_modal.wrapper';
import ModalLogin from '@/components/modal/modal.login';
import CONSTS_MODAL from '@/utils/consts/outros/modal.tamanho';
import CONSTS_SISTEMA from '@/utils/consts/outros/sistema';
import CONSTS_TELAS from '@/utils/consts/outros/telas';
import { CONST_NANUM } from '@/utils/fonts/fonts';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import Styles from './index.module.scss';

export default function Navbar() {

    const [isModalLoginOpen, setIsModalLoginOpen] = useState<boolean>(false);

    return (
        <Fragment>
            <ModalWrapper isOpen={isModalLoginOpen}>
                <ModalLayout
                    handleModal={() => setIsModalLoginOpen(!isModalLoginOpen)}
                    logo={null}
                    isExibirApenasLogo={false}
                    titulo='Bem-vindo de volta! 🖖'
                    tamanho={CONSTS_MODAL.PEQUENO}
                    isCentralizado={true}
                    isFecharModalClicandoNoFundo={false}
                >
                    <ModalLogin
                        handleModal={() => setIsModalLoginOpen(!isModalLoginOpen)}
                        titulo='Pera aí, você tem certeza disso?'
                        descricao='AEA PUES'
                        textoFooter={'aeaeaea'}

                        textoBotao1='Voltar'
                        urlBotao1={null}
                        isNovaAba1={false}
                        funcaoBotao1={() => setIsModalLoginOpen(false)}
                        isBtnEnabled1={true}

                        textoBotao2='Confirmar'
                        urlBotao2={null}
                        isNovaAba2={false}
                        funcaoBotao2={() => null}
                        isBtnEnabled2={true}
                    />
                </ModalLayout>
            </ModalWrapper>

            <nav className={Styles.navbar}>
                <div className={Styles.esquerda}>
                    <Link className={`${CONST_NANUM.className} ${Styles.logo} wavy`} href={CONSTS_TELAS.INDEX}>{CONSTS_SISTEMA.NOME_SISTEMA}</Link>
                    <Link href={CONSTS_TELAS.SOBRE}>Sobre</Link>
                </div>

                <div className={Styles.direita}>
                    <IconeLupa
                        escala={0.75}
                        url={null}
                        isNovaAba={false}
                        handleFuncao={() => null}
                    />

                    <a onClick={() => setIsModalLoginOpen(true)}>Entrar</a>

                    <Botao
                        texto='Criar conta'
                        url={null}
                        isNovaAba={true}
                        handleFuncao={() => null}
                        Svg={null}
                        refBtn={null}
                        isEnabled={true}
                        isPequeno={true}
                    />
                </div>
            </nav>
        </Fragment>
    )
}