'use client';
import Botao from '@/components/botao';
import DivUpload from '@/components/upload/divUpload';
import useUsuarioContext from '@/hooks/context/useUsuarioContext';
import useTitulo from '@/hooks/useTitulo';
import CONSTS_HASHTAGS from '@/utils/api/consts/hashtags';
import CONSTS_WARDS from '@/utils/api/consts/wards';
import { Fetch } from '@/utils/api/fetch';
import CONSTS_EMOJIS from '@/utils/consts/emojis';
import styleReactSelect from '@/utils/consts/style.react-select';
import UPLOAD_SETTINGS from '@/utils/consts/upload.settings';
import { Aviso } from '@/utils/functions/aviso';
import normalizarArrayParaSelect from '@/utils/functions/normalizar.arrayParaSelect';
import verificarAcesso from '@/utils/functions/verificar.acesso';
import iHashtag from '@/utils/types/iHashtag';
import iSelect from '@/utils/types/iSelect';
import { ChangeEvent, KeyboardEvent, useEffect, useId, useRef, useState } from 'react';
import Select from 'react-select';
import Styles from './index.module.scss';

interface iFormData {
    titulo: string;
    conteudo: string;
}

export default function Page() {

    useTitulo('Criar nova ward', true);

    const [isAuth, setIsAuth] = useUsuarioContext();
    const [listaHashtags, setListaHashtags] = useState<iSelect[]>([]);
    const [arquivoUpload, setArquivoUpload] = useState<string | null>('');

    useEffect(() => {
        async function handleListarHashtags() {
            const resp = await Fetch.getApi(CONSTS_HASHTAGS.listar) as iHashtag[];
            setListaHashtags(normalizarArrayParaSelect(resp, 'hashtagId', 'tag'));
        }

        verificarAcesso([1]);
        handleListarHashtags();
    }, [isAuth]);

    const refBtn = useRef<HTMLButtonElement>(null);

    const [formData, setFormData] = useState<iFormData>({ titulo: '', conteudo: '' });
    const [formHashtags, setFormHashtags] = useState<number[]>([]);
    const [exemploReactSelectUnico, setExemploReactSelectUnico] = useState<string>('');

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
        if (!formData.titulo || !formData.conteudo || !formHashtags.length) {
            Aviso.toast('Preencha todos os campos para criar uma nova ward', 5000, CONSTS_EMOJIS.ERRO, true);
            return false;
        }

        // const input = {
        //     input: {
        //         titulo: formData.titulo,
        //         conteudo: formData.conteudo,
        //         listaHashtags: formHashtags
        //     },
        //     formFileImagemPrincipal: null
        // };

        const input = {
            titulo: formData.titulo,
            conteudo: formData.conteudo,
            listaHashtags: formHashtags
        }

        const formFileImagemPrincipal = createEmptyFile("empty-file.txt", "text/plain");

        const formDataInput: FormData = new FormData();
        formDataInput.append('input.titulo', formData.titulo);
        formDataInput.append('input.conteudo', formData.conteudo);
        formDataInput.append('input.listaHashtags', JSON.stringify(formHashtags));
        formDataInput.append('formFileImagemPrincipal', formFileImagemPrincipal);

        const resp = await Fetch.postIFormFileApi(CONSTS_WARDS.criar, formDataInput);

        console.log(resp);

        // if (resp?.mensagens || !resp) {
        //     Aviso.toast(resp?.mensagens![0], 5500, CONSTS_EMOJIS.ERRO, true);
        //     return false;
        // }

        // alert('refreshhhhhhhhhhhhhh :)');
    }

    function createEmptyFile(fileName: string, contentType: string): File {
        const blob = new Blob([], { type: contentType });
        return new File([blob], fileName, { type: contentType });
    }

    return (
        <section className={Styles.main}>
            <div className={Styles.titulo}>
                <span>Criar nova ward</span>
            </div>

            <div className={Styles.form}>
                <input type='text' placeholder='Título da ward' name='titulo'
                    onChange={handleChange} onKeyDown={handleKeyPress} />

                <textarea placeholder='Conteúdo' name='conteudo' rows={5}
                    onChange={handleChange} />

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

                <DivUpload
                    imagem={arquivoUpload ?? ''}
                    apiPasta='XXXXXXXXXXX'
                    titulo='Capa da playlist'
                    infoAleatoriaUm={`Escolhe uma imagem da hora aí`}
                    infoAleatoriaDois={`Peso máximo: ${UPLOAD_SETTINGS.LIMITE_MB} MB`}
                    textoBotaoDireita='Alterar capa'
                    limitarAspectRatio={null}
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