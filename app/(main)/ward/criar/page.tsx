'use client';
import Botao from '@/components/botao';
import InputRichTextEditor from '@/components/input.rich-text-editor';
import SeparadorHorizontal from '@/components/separador/separador.horizontal';
import useUsuarioContext from '@/hooks/context/useUsuarioContext';
import useTitulo from '@/hooks/useTitulo';
import CONSTS_HASHTAGS from '@/utils/api/consts/hashtags';
import CONSTS_WARDS from '@/utils/api/consts/wards';
import { Fetch } from '@/utils/api/fetch';
import CONSTS_EMOJIS from '@/utils/consts/emojis';
import styleReactSelect from '@/utils/consts/style.react-select';
import CONSTS_TELAS from '@/utils/consts/telas';
import UPLOAD_SETTINGS from '@/utils/consts/upload.settings';
import CONSTS_USUARIO_ROLES from '@/utils/consts/usuario.roles';
import { Aviso } from '@/utils/functions/aviso';
import gerarNumeroAleatorio from '@/utils/functions/gerar.numeroAleatorio';
import normalizarURL from '@/utils/functions/normalizar.URL';
import normalizarArrayParaSelect from '@/utils/functions/normalizar.arrayParaSelect';
import normalizarRemoverEncodedStringHTML from '@/utils/functions/normalizar.removerEncodedStringHTML';
import normalizarSanitizeHTML from '@/utils/functions/normalizar.sanitizeHTML';
import setDesabilitarBotoes from '@/utils/functions/set.desabilitarBotoes';
import verificarAcesso from '@/utils/functions/verificar.acesso';
import iHashtag from '@/utils/types/iHashtag';
import iSelect from '@/utils/types/iSelect';
import { KeyboardEvent, lazy, useEffect, useId, useRef, useState } from 'react';
import Select from 'react-select';
import Styles from './criar.module.scss';
const DivUpload = lazy(() => import('@/components/upload/divUpload'));

export default function Page() {

    useTitulo('Criar nova ward', true);

    const [isAuth, setIsAuth] = useUsuarioContext();
    const [listaHashtags, setListaHashtags] = useState<iSelect[]>([]);

    useEffect(() => {
        async function handleListarHashtags() {
            const resp = await Fetch.get(CONSTS_HASHTAGS.listar) as iHashtag[];
            setListaHashtags(normalizarArrayParaSelect(resp, 'hashtagId', 'tag'));
        }

        verificarAcesso([CONSTS_USUARIO_ROLES.ADMINISTRADOR_ID]);
        handleListarHashtags();
    }, [isAuth]);

    const refBtn = useRef<HTMLButtonElement>(null);

    const [formTitulo, setFormTitulo] = useState<string>('');
    const [formConteudo, setFormConteudo] = useState<string>('');
    const [formHashtags, setFormHashtags] = useState<string[]>([]);
    const [arquivoUpload, setArquivoUpload] = useState<File | ArrayBuffer | string | null>(null);
    // const [exemploReactSelectUnico, setExemploReactSelectUnico] = useState<string>('');

    function handleHashtagsChangeMulti(item: any) {
        setFormHashtags(item.map((x: iSelect) => x.value));
    }

    function handleKeyPress(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            refBtn.current && refBtn.current.click();
        }
    }

    async function handleSubmit() {
        if (!formTitulo || !formConteudo || !formHashtags.length || !arquivoUpload) {
            Aviso.toast('Preencha todos os campos para criar uma nova ward', 5000, CONSTS_EMOJIS.ERRO, true);
            return false;
        }

        const input: FormData = new FormData();
        input.append('Titulo', formTitulo);
        input.append('Conteudo', normalizarSanitizeHTML(normalizarRemoverEncodedStringHTML(formConteudo)));
        input.append('ListaHashtags', formHashtags.join(','));
        input.append('FormFileImagemPrincipal', arquivoUpload as File);

        const resp = await Fetch.postIFormFile(CONSTS_WARDS.criar, input);

        if (resp?.mensagens || !resp) {
            Aviso.toast(resp?.mensagens![0], 5500, CONSTS_EMOJIS.ERRO, true);
            return false;
        }

        setDesabilitarBotoes(true);
        Aviso.toast('Ward salva com sucesso!', 5500, CONSTS_EMOJIS.SUCESSO, true);

        setTimeout(() => {
            try {
                window.location.href = `${CONSTS_TELAS.WARD}/${resp}/${normalizarURL(formTitulo)}`;
            } catch (error: any) {
                location.reload();
            }
        }, gerarNumeroAleatorio(2000, 2500));
    }

    return (
        <section className={Styles.main}>
            <div className={Styles.titulo}>
                <span>Criar nova ward</span>
            </div>

            <div className={Styles.form}>
                <input
                    type='text'
                    placeholder='Título da ward'
                    name='titulo'
                    onChange={(e) => setFormTitulo(e.target.value)}
                    onKeyDown={handleKeyPress}
                    value={formTitulo}
                />

                <InputRichTextEditor
                    placeholder='Conteúdo da ward'
                    valor={formConteudo}
                    setValor={setFormConteudo}
                />

                <Select
                    instanceId={useId()}
                    defaultValue={null}
                    onChange={handleHashtagsChangeMulti}
                    options={listaHashtags}
                    isDisabled={false}
                    isSearchable={true}
                    isMulti={true}
                    styles={styleReactSelect}
                    placeholder='Hashtags'
                    noOptionsMessage={() => 'Nenhuma opção encontrada'}
                />

                <SeparadorHorizontal />

                <DivUpload
                    titulo='Imagem principal da ward'
                    infoAleatoriaUm=':)'
                    infoAleatoriaDois={`Tamanho máximo: ${UPLOAD_SETTINGS.LIMITE_MB} MBs`}
                    textoBotaoDireita='Alterar imagem'
                    isBase64={false}
                    arquivoUpload={arquivoUpload}
                    setArquivoUpload={setArquivoUpload}
                />

                {/* =-=-=-=-=-=-= EXEMPLO DE COMO USAR UM REACT-SELECT PARA SETAR UM VALOR ÚNICO (NÃO UM ARRAY) =-=-=-=-=-=-= */}
                {/* <Select
                                instanceId={useId()}
                                defaultValue={null}
                                onChange={(e) => setExemploReactSelectUnico(e?.label)}
                                options={listaHashtags}
                                isDisabled={false}
                                isSearchable={true}
                                isMulti={false}
                                styles={styleReactSelect}
                                placeholder='Hashtags'
                                noOptionsMessage={() => 'Nenhuma opção encontrada'}
                            /> */}

                <SeparadorHorizontal />

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