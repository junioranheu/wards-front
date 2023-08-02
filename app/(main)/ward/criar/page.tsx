'use client';
import Botao from '@/components/botao';
import useUsuarioContext from '@/hooks/context/useUsuarioContext';
import useTitulo from '@/hooks/useTitulo';
import CONSTS_HASHTAGS from '@/utils/api/consts/hashtags';
import { Fetch } from '@/utils/api/fetch';
import CONSTS_EMOJIS from '@/utils/consts/emojis';
import { Aviso } from '@/utils/functions/aviso';
import normalizarArrayParaSelect from '@/utils/functions/normalizar.arrayParaSelect';
import verificarAcesso from '@/utils/functions/verificar.acesso';
import iHashtag from '@/utils/types/iHashtag';
import iSelect from '@/utils/types/iSelect';
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
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
    const [formHashtag, setFormHashtag] = useState<string>('');
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleKeyPress(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            refBtn.current && refBtn.current.click();
        }
    }

    async function handleSubmit() {
        if (!formData.titulo || !formData.conteudo) {// || !formData.listaHashtags) {
            Aviso.toast('Preencha todos os campos para criar uma nova ward', 5000, CONSTS_EMOJIS.ERRO, true);
            return false;
        }

        // [FromForm] WardInputAlt input, IFormFile? formFileImagemPrincipal;
    }

    const selectStyles = {
        control: (base: any) => ({
            ...base,
            fontSize: '0.9rem',
            fontWeight: 'normal',
            borderRadius: '0.5rem',
            padding: '6px 5px',
            border: 'var(--border) !important',
            boxShadow: 'none',
            '&:focus': {
                border: '0 !important',
            },
        }),
        multiValue: (base: any) => ({
            ...base,
            backgroundColor: 'blue',
            color: 'white',
        }),
    }

    return (
        <section className={Styles.main} >
            <div className={Styles.titulo}>
                <span>Criar nova ward</span>
            </div>

            <h1>{formHashtag}</h1>

            <div className={Styles.form}>
                <input type='text' placeholder='Título da ward' name='titulo'
                    onChange={handleChange} onKeyDown={handleKeyPress} />

                <input type='text' placeholder='Conteúdo' name='conteudo'
                    onChange={handleChange} onKeyDown={handleKeyPress} />

                <input type='text' placeholder='Lista de hashtags' name='listaHashtags'
                    onChange={handleChange} onKeyDown={handleKeyPress} />

                <Select
                    defaultValue={null}
                    onChange={(e) => setFormHashtag(e?.label)}
                    options={listaHashtags}
                    isDisabled={false}
                    isSearchable={true}
                    isMulti={false}
                    styles={selectStyles}
                    placeholder='Hashtags'
                    noOptionsMessage={() => 'Nenhuma opção encontrada'}
                />

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
        </section >
    )
}