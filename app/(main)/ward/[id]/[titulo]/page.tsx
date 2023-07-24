'use client';
import ImgPadrao from '@/assets/images/outros/coding.webp';
import useTitulo from '@/hooks/useTitulo';
import CONSTS_WARDS from '@/utils/api/consts/wards';
import { Fetch } from '@/utils/api/fetch';
import CONSTS_EMOJIS from '@/utils/consts/emojis';
import CONSTS_TELAS from '@/utils/consts/telas';
import { Aviso } from '@/utils/functions/aviso';
import normalizarBlobParaImagemBase64 from '@/utils/functions/normalizar.blobParaImagemBase64';
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
                />
            </div>

            <div className={Styles.ward}>
                <div className={Styles.esquerda}>
                    <span>Junior</span>
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