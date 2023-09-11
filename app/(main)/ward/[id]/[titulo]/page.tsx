'use client';
import ImgPadrao from '@/assets/images/outros/coding.webp';
import ImgJuniorAnheu from '@/assets/images/outros/junioranheu.webp';
import BotaoScrolltop from '@/components/botao.scrollTop';
import Tags from '@/components/tag';
import useTitulo from '@/hooks/useTitulo';
import CONSTS_WARDS from '@/utils/api/consts/wards';
import { Fetch } from '@/utils/api/fetch';
import CONSTS_EMOJIS from '@/utils/consts/emojis';
import CONSTS_TELAS from '@/utils/consts/telas';
import { Aviso } from '@/utils/functions/aviso';
import formatarData from '@/utils/functions/formatar.data';
import normalizarBlobParaImagemBase64 from '@/utils/functions/normalizar.blobParaImagemBase64';
import normalizarCodigo from '@/utils/functions/normalizar.codigo';
import obterPrimeiraPalavra from '@/utils/functions/obter.primeiraPalavra';
import iWard from '@/utils/types/iWard';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import Styles from './ward.id.titulo.module.scss';

export default function Ward({ params }: { params: { id: string, titulo: string } }) {

    const router = useRouter();

    const [ward, setWard] = useState<iWard>();
    const [listaHashtags, setListaHashtags] = useState<string[]>([]);
    useTitulo(ward?.titulo ?? '@junioranheu', true);

    useEffect(() => {
        async function handleObterWard() {
            const resp = await Fetch.get(`${CONSTS_WARDS.obter}?id=${params.id}`) as iWard;

            // @ts-ignore;
            if (resp?.mensagens || !resp) {
                Aviso.toast(`A ward #${params.id} não foi encontrada`, 7500, CONSTS_EMOJIS.ERRO, true);
                router.push(CONSTS_TELAS.ERRO);
                return false;
            }

            // console.log(resp);
            setWard(resp);
            resp.listaHashtags && setListaHashtags(resp.listaHashtags);

            Aviso.toast('Ward produzida pelo ChatGPT (GPT-3.5)', 5000, CONSTS_EMOJIS.INFO, true);
        }

        handleObterWard();
    }, [router, params.id]);

    function handleNormalizarUsuario(nome: string) {
        if (nome.includes('Adm')) {
            return 'Junior Souza';
        }

        return obterPrimeiraPalavra(nome);
    }

    function handleNormalizarData(data: string | Date, dataMod: string | Date | null) {
        return dataMod ? formatarData(dataMod, 4) : formatarData(data, 4);
    }

    if (!ward) {
        return false;
    }

    return (
        <section className={Styles.main}>
            <div className={Styles.titulo}>
                <span>{ward?.titulo}</span>

                {
                    listaHashtags.length ? (
                        <div className={Styles.hashtags}>
                            <Tags listaTags={listaHashtags} />
                        </div>
                    ) : (
                        <Fragment></Fragment>
                    )
                }
            </div>

            <div className={Styles.visual}>
                <Image
                    width={0}
                    height={0}
                    src={ward?.imagemPrincipalBlob ? normalizarBlobParaImagemBase64(ward.imagemPrincipalBlob) : ImgPadrao}
                    alt=''
                    priority={true}
                />
            </div>

            <div className={Styles.ward}>
                <div className={Styles.esquerda}>
                    <div className={Styles.img} title={handleNormalizarUsuario(ward.usuarios.nomeCompleto)}>
                        <Image src={ImgJuniorAnheu} alt='' />
                    </div>

                    <div className={Styles.infos}>
                        <span className={Styles.nome}>{handleNormalizarUsuario(ward.usuarios.nomeCompleto)}</span>
                        <span className={Styles.data}>{handleNormalizarData(ward.data, ward?.dataMod)}</span>
                    </div>
                </div>

                <div className={Styles.direita}>
                    <section
                        className={Styles.conteudo}
                        dangerouslySetInnerHTML={{ __html: normalizarCodigo(ward?.conteudo, 'code') }}
                    />
                </div>
            </div>

            <div className={Styles.centralizarElemento}>
                <BotaoScrolltop
                    isExibirTexto={false}
                    marginTop={0}
                />
            </div>
        </section>
    )
}