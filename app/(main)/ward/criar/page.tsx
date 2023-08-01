'use client';
import Botao from '@/components/botao';
import useUsuarioContext from '@/hooks/context/useUsuarioContext';
import useTitulo from '@/hooks/useTitulo';
import CONSTS_HASHTAGS from '@/utils/api/consts/hashtags';
import { Fetch } from '@/utils/api/fetch';
import CONSTS_EMOJIS from '@/utils/consts/emojis';
import { Aviso } from '@/utils/functions/aviso';
import verificarAcesso from '@/utils/functions/verificar.acesso';
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import Styles from './index.module.scss';

interface iFormData {
    titulo: string;
    conteudo: string;
    listaHashtags: string[];
}

export default function Page() {

    useTitulo('Criar nova ward', true);

    const [isAuth, setIsAuth] = useUsuarioContext();

    const [hashtags, setHashtags] = useState<string[]>([]);

    useEffect(() => {
        async function handleListarHashtags() {
            const resp = await Fetch.getApi(CONSTS_HASHTAGS.listar) as string[];
            setHashtags(resp);
        }

        verificarAcesso([1]);
        handleListarHashtags();
    }, [isAuth]);

    const refBtn = useRef<HTMLButtonElement>(null);

    const [formData, setFormData] = useState<iFormData>({ titulo: '', conteudo: '', listaHashtags: [] });
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleKeyPress(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            refBtn.current && refBtn.current.click();
        }
    }

    async function handleSubmit() {
        if (!formData.titulo || !formData.conteudo || !formData.listaHashtags) {
            Aviso.toast('Preencha todos os campos para criar uma nova ward', 5000, CONSTS_EMOJIS.ERRO, true);
            return false;
        }

        // [FromForm] WardInputAlt input, IFormFile? formFileImagemPrincipal

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
                <input className='input margem1' type='text' placeholder='Título da ward' name='titulo'
                    onChange={handleChange} onKeyDown={handleKeyPress} />

                <input className='input margem1' type='text' placeholder='Conteúdo' name='conteudo'
                    onChange={handleChange} onKeyDown={handleKeyPress} />

                <input className='input margem1' type='text' placeholder='Lista de hashtags' name='listaHashtags'
                    onChange={handleChange} onKeyDown={handleKeyPress} />

                <Botao
                    texto='Criar'
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