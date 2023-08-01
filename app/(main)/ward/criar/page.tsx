'use client';
import Botao from '@/components/botao';
import useUsuarioContext from '@/hooks/context/useUsuarioContext';
import useTitulo from '@/hooks/useTitulo';
import verificarAcesso from '@/utils/functions/verificar.acesso';
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import Styles from './index.module.scss';

interface iFormData {
    nomeCompleto: string;
    email: string;
    nomeUsuarioSistema: string;
    senha: string;
    confirmarSenha: string;
}

export default function Page() {

    useTitulo('Criar nova ward', true);

    const [isAuth, setIsAuth] = useUsuarioContext();

    useEffect(() => {
        verificarAcesso([1]);
    }, [isAuth]);

    const refBtn = useRef<HTMLButtonElement>(null);

    const [formData, setFormData] = useState<iFormData>({ nomeCompleto: '', email: '', nomeUsuarioSistema: '', senha: '', confirmarSenha: '' });
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleKeyPressNaoPermitirEspaco(e: ChangeEvent<HTMLInputElement>) {
        e.target.value = e.target.value.replace(' ', '');
    }

    function handleKeyPress(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            refBtn.current && refBtn.current.click();
        }
    }

    async function handleSubmit() {
        // nProgress.start();
        // refBtn.current.disabled = true;

        // // Verificações;
        // const isTrocouSenha = true;
        // let isContinuarUm = validarDadosCriarConta(formData, refNomeCompleto, refEmail, refNomeUsuarioSistema, refSenha, refConfirmarSenha, isTrocouSenha);
        // if (!isContinuarUm) {
        //     refBtn.current.disabled = false;
        //     return false;
        // }

        // // Atribuir o nome formatado para a variavel nome, novamente;
        // formData.nomeCompleto = padronizarNomeCompletoUsuario(formData.nomeCompleto);

        // // Criar conta;
        // const url = CONSTS_AUTENTICAR.API_URL_POST_REGISTRAR;
        // const dto = {
        //     nomeCompleto: formData.nomeCompleto,
        //     email: formData.email,
        //     nomeUsuarioSistema: formData.nomeUsuarioSistema,
        //     senha: formData.senha,
        //     usuarioTipoId: 2, // Usuário comum;
        //     dataCriacao: horarioBrasilia().format('YYYY-MM-DD HH:mm:ss'),
        //     foto: '',
        //     isAtivo: true,
        //     isPremium: false,
        //     IsVerificado: false
        // };

        // const resposta = await Fetch.postApi(url, dto) as iUsuario;
        // if (!resposta || resposta?.erro) {
        //     nProgress.done();
        //     refEmail.current.select();
        //     refSenha.current.value = '';
        //     refConfirmarSenha.current.value = '';
        //     formData.senha = '';
        //     refBtn.current.disabled = false;
        //     Aviso.error((resposta?.mensagemErro ?? 'Parece que ocorreu um erro interno. Tente novamente mais tarde'), 10000);
        //     return false;
        // }

        // // Voltar à tela principal;
        // Router.push('/').then(() => {
        //     Auth.set(resposta as unknown as iContextDadosUsuario);
        //     setIsAuth(true);
        //     nProgress.done();
        // });
    }

    return (
        <section className={Styles.main}>
            <div className={Styles.titulo}>
                <span>Criar nova ward</span>
            </div>

            <div className={Styles.form}>
                <input className='input margem1' type='text' placeholder='Nome completo'
                    name='nomeCompleto' onChange={handleChange} onKeyDown={handleKeyPress}
                />

                <input className='input margem1' type='text' placeholder='Seu melhor e-mail'
                    name='email' onChange={handleChange} onKeyDown={handleKeyPress}
                />

                <input className='input margem1' type='text' placeholder='Nome de usuário'
                    name='nomeUsuarioSistema'
                    onChange={(e) => (handleChange(e), handleKeyPressNaoPermitirEspaco(e))}
                    onKeyDown={handleKeyPress}
                />

                <input className='input margem1' type='password' placeholder='Senha'
                    name='senha' onChange={handleChange} onKeyDown={handleKeyPress}
                />

                <input className='input margem1' type='password' placeholder='Confirme sua senha'
                    name='confirmarSenha' onChange={handleChange} onKeyDown={handleKeyPress}
                />

                <Botao
                    texto='Voltar ao início'
                    url={null}
                    isNovaAba={false}
                    handleFuncao={() => handleSubmit()}
                    Svg={null}
                    refBtn={refBtn}
                    isEnabled={true}
                    isPequeno={true}
                />
            </div>
        </section>
    )
}