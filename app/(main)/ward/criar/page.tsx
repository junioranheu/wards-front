'use client';
import Botao from '@/components/botao';
import SeparadorHorizontal from '@/components/separador/separador.horizontal';
import useUsuarioContext from '@/hooks/context/useUsuarioContext';
import useTitulo from '@/hooks/useTitulo';
import CONSTS_HASHTAGS from '@/utils/api/consts/hashtags';
import CONSTS_WARDS from '@/utils/api/consts/wards';
import { Fetch } from '@/utils/api/fetch';
import CONSTS_EMOJIS from '@/utils/consts/emojis';
import styleReactSelect from '@/utils/consts/style.react-select';
import UPLOAD_SETTINGS from '@/utils/consts/upload.settings';
import { Aviso } from '@/utils/functions/aviso';
import gerarNumeroAleatorio from '@/utils/functions/gerar.numeroAleatorio';
import normalizarArrayParaSelect from '@/utils/functions/normalizar.arrayParaSelect';
import setDesabilitarBotoes from '@/utils/functions/set.desabilitarBotoes';
import verificarAcesso from '@/utils/functions/verificar.acesso';
import iHashtag from '@/utils/types/iHashtag';
import iSelect from '@/utils/types/iSelect';
import dynamic from 'next/dynamic';
import { ChangeEvent, KeyboardEvent, lazy, useEffect, useId, useRef, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import Select from 'react-select';
import Styles from './index.module.scss';
const DivUpload = lazy(() => import('@/components/upload/divUpload'));
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface iFormData {
    titulo: string;
    conteudo: string;
}

export default function Page() {

    useTitulo('Criar nova ward', true);

    const [isAuth, setIsAuth] = useUsuarioContext();
    const [listaHashtags, setListaHashtags] = useState<iSelect[]>([]);

    useEffect(() => {
        async function handleListarHashtags() {
            const resp = await Fetch.get(CONSTS_HASHTAGS.listar) as iHashtag[];
            setListaHashtags(normalizarArrayParaSelect(resp, 'hashtagId', 'tag'));
        }

        verificarAcesso([1]);
        handleListarHashtags();
    }, [isAuth]);

    const refBtn = useRef<HTMLButtonElement>(null);

    const [formData, setFormData] = useState<iFormData>({ titulo: '', conteudo: '' });
    const [formHashtags, setFormHashtags] = useState<string[]>([]);
    const [arquivoUpload, setArquivoUpload] = useState<File | ArrayBuffer | string | null>(null);
    // const [exemploReactSelectUnico, setExemploReactSelectUnico] = useState<string>('');

    function handleHashtagsChangeMulti(item: any) {
        setFormHashtags(item.map((x: iSelect) => x.value));
    }

    function handleChange(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleKeyPress(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            refBtn.current && refBtn.current.click();
        }
    }

    async function handleSubmit() {
        if (!formData.titulo || !formData.conteudo || !formHashtags.length || !arquivoUpload) {
            Aviso.toast('Preencha todos os campos para criar uma nova ward', 5000, CONSTS_EMOJIS.ERRO, true);
            return false;
        }

        const input: FormData = new FormData();
        input.append('Titulo', formData.titulo);
        input.append('Conteudo', formData.conteudo);
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
            location.reload();
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
                    onChange={handleChange}
                    onKeyDown={handleKeyPress}
                    value={formData.titulo}
                />

                <ReactQuill
                    theme='snow'
                    placeholder='Conteúdo da ward'
                    onChange={(e) => setFormData({ ...formData, 'conteudo': e })}
                    value={formData.conteudo}
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