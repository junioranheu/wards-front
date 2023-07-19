import ModalLayout from '@/components/modal/_modal.layout';
import ModalWrapper from '@/components/modal/_modal.wrapper';
import ModalAuth from '@/components/modal/modal.auth';
import useUsuarioContext from '@/hooks/context/useUsuarioContext';
import useWindowSize from '@/hooks/useWindowSize';
import CONSTS_USUARIOS from '@/utils/api/consts/usuarios';
import { Fetch } from '@/utils/api/fetch';
import CONSTS_EMOJIS from '@/utils/consts/emojis';
import CONSTS_MODAL from '@/utils/consts/modal.tamanho';
import CONSTS_SISTEMA from '@/utils/consts/sistema';
import { Auth } from '@/utils/context/usuarioContext';
import { Aviso } from '@/utils/functions/aviso';
import gerarStringAleatoria from '@/utils/functions/gerar.stringAleatoria';
import iUsuario from '@/utils/types/iUsuario';
import iUsuarioContext from '@/utils/types/iUsuario.context';
import { Fragment, useState } from 'react';
import NavbarFull from './navbar-full';
import NavbarSmall from './navbar-small';

export default function Navbar() {

    const [isAuth, setIsAuth] = useUsuarioContext();
    const windowSize = useWindowSize();
    const mediaQueryLimite = 1025;

    const [isModalLoginOpen, setIsModalLoginOpen] = useState<boolean>(false);
    const [isModalCriarContaOpen, setIsModalCriarContaOpen] = useState<boolean>(false);
    const [nomeCompleto, setNomeCompleto] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');

    async function handleLogar() {
        if (!email || !senha) {
            Aviso.toast('Preencha os campos de e-mail e senha antes de prosseguir', 5500, CONSTS_EMOJIS.ERRO, true);
            return false;
        }

        const input = {
            login: email,
            senha: senha
        };

        const resp = await Fetch.postApi(CONSTS_USUARIOS.autenticar, input) as iUsuario;

        if (resp?.mensagens || !resp) {
            Aviso.toast(resp.mensagens![0], 5500, CONSTS_EMOJIS.ERRO, true);
            return false;
        }

        const auth = {
            nomeCompleto: resp.nomeCompleto,
            email: resp.email,
            foto: null,
            isAuth: true
        } as iUsuarioContext;

        Auth.set(auth);
        setIsAuth(true);
        setIsModalLoginOpen(false);
    }

    function handleLogoff() {
        Auth.delete();
        setIsAuth(false);
    }

    async function handleCriarConta() {
        if (!nomeCompleto || !email || !senha) {
            Aviso.toast('Preencha todos os campos antes de prosseguir', 5500, CONSTS_EMOJIS.ERRO, true);
            return false;
        }

        const input = {
            nomeUsuarioSistema: gerarStringAleatoria(22),
            chamado: gerarStringAleatoria(3),
            nomeCompleto: nomeCompleto,
            email: email,
            senha: senha
        };

        const resp = await Fetch.postApi(CONSTS_USUARIOS.criar, input) as iUsuario;

        if (resp?.mensagens || !resp) {
            Aviso.toast(resp.mensagens![0], 5500, CONSTS_EMOJIS.ERRO, true);
            return false;
        }

        const auth = {
            nomeCompleto: resp.nomeCompleto,
            email: resp.email,
            foto: null,
            isAuth: true
        } as iUsuarioContext;

        Auth.set(auth);
        setIsAuth(true);
        setIsModalCriarContaOpen(false);
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
                        funcaoFooter={() => { setIsModalLoginOpen(false), setIsModalCriarContaOpen(true) }}

                        textoBotao1='Voltar'
                        funcaoBotao1={() => setIsModalLoginOpen(false)}

                        textoBotao2='Continuar'
                        funcaoBotao2={() => handleLogar()}

                        setNomeCompleto={null}
                        setEmail={setEmail}
                        setSenha={setSenha}
                    />
                </ModalLayout>
            </ModalWrapper>

            <ModalWrapper isOpen={isModalCriarContaOpen}>
                <ModalLayout
                    handleModal={() => setIsModalCriarContaOpen(!isModalCriarContaOpen)}
                    logo={null}
                    isExibirApenasLogo={true}
                    titulo={null}
                    tamanho={CONSTS_MODAL.MENOR}
                    isCentralizado={true}
                    isFecharModalClicandoNoFundo={false}
                >
                    <ModalAuth
                        handleModal={() => setIsModalCriarContaOpen(!isModalCriarContaOpen)}
                        titulo={`Bem-vindo ao ${CONSTS_SISTEMA.NOME_SISTEMA}! 🤙<br/>Crie sua conta agora mesmo`}
                        textoFooter='Já tem uma conta?<br/><a>Entre agora mesmo</a>'
                        funcaoFooter={() => { setIsModalCriarContaOpen(false), setIsModalLoginOpen(true) }}

                        textoBotao1='Voltar'
                        funcaoBotao1={() => setIsModalCriarContaOpen(false)}

                        textoBotao2='Criar conta'
                        funcaoBotao2={() => handleCriarConta()}

                        setNomeCompleto={setNomeCompleto}
                        setEmail={setEmail}
                        setSenha={setSenha}
                    />
                </ModalLayout>
            </ModalWrapper>

            {
                windowSize.width <= mediaQueryLimite ? (
                    <NavbarSmall
                        isAuth={isAuth}
                        setIsModalLoginOpen={setIsModalLoginOpen}
                        setIsModalCriarContaOpen={setIsModalCriarContaOpen}
                        handleLogoff={handleLogoff}
                    />
                ) : (
                    <NavbarFull
                        isAuth={isAuth}
                        setIsModalLoginOpen={setIsModalLoginOpen}
                        setIsModalCriarContaOpen={setIsModalCriarContaOpen}
                        handleLogoff={handleLogoff}
                    />
                )
            }
        </Fragment>
    )
}