'use client';
import StylesLayout from '@/app/(main)/layout.module.scss';
import useTitulo from '@/hooks/useTitulo';
import CONSTS_WARDS from '@/utils/api/consts/wards';
import { Fetch } from '@/utils/api/fetch';
import CONSTS_EMOJIS from '@/utils/consts/emojis';
import CONSTS_TELAS from '@/utils/consts/telas';
import { Aviso } from '@/utils/functions/aviso';
import iWard from '@/utils/types/iWard';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Ward({ params }: { params: { id: string, titulo: string } }) {

    const router = useRouter();

    const [ward, setWard] = useState<iWard>();
    useTitulo(ward?.titulo ?? '@junioranheu', true);

    useEffect(() => {
        async function handleObterWard() {
            const resp = await Fetch.getApi(`${CONSTS_WARDS.obter}?id=${params.id}`) as iWard;

            // @ts-ignore;
            if (resp?.mensagens || !resp) {
                Aviso.toast(resp?.mensagens![0], 5500, CONSTS_EMOJIS.ERRO, true);
                router.push(CONSTS_TELAS.ERRO);
                return false;
            }

            console.log(resp);
            setWard(resp);
        }

        handleObterWard();
    }, []);

    return (
        <section className={StylesLayout.session}>
            <h1>{ward?.titulo} #{ward?.wardId}</h1>
        </section>
    )
}