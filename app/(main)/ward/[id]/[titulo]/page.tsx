'use client';
import ImgPadrao from '@/assets/images/outros/coding.webp';
import ImgJuniorAnheu from '@/assets/images/outros/junioranheu.webp';
import useTitulo from '@/hooks/useTitulo';
import CONSTS_WARDS from '@/utils/api/consts/wards';
import { Fetch } from '@/utils/api/fetch';
import CONSTS_EMOJIS from '@/utils/consts/emojis';
import CONSTS_TELAS from '@/utils/consts/telas';
import { Aviso } from '@/utils/functions/aviso';
import formatarData from '@/utils/functions/formatar.data';
import normalizarBlobParaImagemBase64 from '@/utils/functions/normalizar.blobParaImagemBase64';
import obterPrimeiraPalavra from '@/utils/functions/obter.primeiraPalavra';
import iWard from '@/utils/types/iWard';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Styles from './index.module.scss';

export default function Ward({ params }: { params: { id: string, titulo: string } }) {

    const router = useRouter();

    const [ward, setWard] = useState<iWard>();
    useTitulo(ward?.titulo ?? '@junioranheu', true);

    useEffect(() => {
        async function handleObterWard() {
            const resp = await Fetch.getApi(`${CONSTS_WARDS.obter}?id=${params.id}`) as iWard;

            // @ts-ignore;
            if (resp?.mensagens || !resp) {
                Aviso.toast(`A ward #${params.id} não foi encontrada`, 7500, CONSTS_EMOJIS.ERRO, true);
                router.push(CONSTS_TELAS.ERRO);
                return false;
            }

            // console.log(resp);
            setWard(resp);
        }

        handleObterWard();
    }, [router, params.id]);

    function handleNormalizarUsuario(ward: iWard) {
        if (ward.usuarios.nomeCompleto.includes('Adm')) {
            return 'Junior';
        }

        return obterPrimeiraPalavra(ward.usuarios.nomeCompleto);
    }

    function handleNormalizarData(ward: iWard) {
        return ward.dataMod ? formatarData(ward.dataMod, 2) : formatarData(ward.data, 2);
    }

    if (!ward) {
        return false;
    }

    return (
        <section className={Styles.main}>
            <div className={Styles.titulo}>
                <span>{ward?.titulo}</span>
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
                    <div className={Styles.img} title={handleNormalizarUsuario(ward)}>
                        <Image src={ImgJuniorAnheu} alt='' />
                    </div>

                    <div className={Styles.infos}>
                        <span className={Styles.nome}>{handleNormalizarUsuario(ward)}</span>
                        <span className={Styles.data}>{handleNormalizarData(ward)}</span>
                    </div>
                </div>

                <div className={Styles.direita}>
                    <section
                        className={Styles.conteudo}
                        dangerouslySetInnerHTML={{ __html: ward?.conteudo }}
                    />
                </div>
            </div>
        </section>
    )
}