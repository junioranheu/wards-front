import Botao from '@/components/botao';
import IconeLupa from '@/components/icones/lupa';
import ModalLayout from '@/components/modal/_modal.layout';
import ModalWrapper from '@/components/modal/_modal.wrapper';
import ModalAuth from '@/components/modal/modal.auth';
import CONSTS_USUARIOS from '@/utils/api/consts/usuarios';
import { Fetch } from '@/utils/api/fetch';
import CONSTS_MODAL from '@/utils/consts/modal.tamanho';
import CONSTS_SISTEMA from '@/utils/consts/sistema';
import CONSTS_TELAS from '@/utils/consts/telas';
import { CONST_NANUM } from '@/utils/fonts/fonts';
import iUsuario from '@/utils/types/iUsuario';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import Styles from './index.module.scss';

export default function Navbar() {

    const [isModalLoginOpen, setIsModalLoginOpen] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');

    async function handleLogar() {
        const resp = await Fetch.postApi(CONSTS_USUARIOS.obter, botDTO) as iUsuario;
        console.log(resp);

        if (resp?.erro) {

        }
    }

    return (
        <Fragment>
            <ModalWrapper isOpen={isModalLoginOpen}>
                <ModalLayout
                    handleModal={() => setIsModalLoginOpen(!isModalLoginOpen)}
                    logo={null}
                    isExibirApenasLogo={true}
                    titulo={null}
                    tamanho={CONSTS_MODAL.MENOR}
                    isCentralizado={true}
                    isFecharModalClicandoNoFundo={false}
                >
                    <ModalAuth
                        handleModal={() => setIsModalLoginOpen(!isModalLoginOpen)}
                        titulo='Bem-vindo de volta! 🖖'
                        textoFooter='Não tem uma conta?<br/><a>Crie uma agora mesmo</a>'

                        textoBotao1='Voltar'
                        funcaoBotao1={() => setIsModalLoginOpen(false)}

                        textoBotao2='Continuar'
                        funcaoBotao2={() => handleLogar()}

                        setEmail={setEmail}
                        setSenha={setSenha}
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