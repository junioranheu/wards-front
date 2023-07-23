'use client';
import StylesLayout from '@/app/(main)/layout.module.scss';
import useTitulo from '@/hooks/useTitulo';
import CONSTS_WARDS from '@/utils/api/consts/wards';
import { Fetch } from '@/utils/api/fetch';
import CONSTS_EMOJIS from '@/utils/consts/emojis';
import { Aviso } from '@/utils/functions/aviso';
import iWard from '@/utils/types/iWard';
import { useEffect, useState } from 'react';

export default function Ward({ params }: { params: { id: string, titulo: string } }) {

    const [ward, setWard] = useState<iWard>();
    useTitulo(ward?.titulo ?? '@junioranheu', true);

    useEffect(() => {
        async function handleObterWard() {
            const resp = await Fetch.getApi(`${CONSTS_WARDS.obter}?id=${params.id}`) as iWard;

            // @ts-ignore;
            if (resp?.mensagens || !resp) {
                Aviso.toast(resp?.mensagens![0], 5500, CONSTS_EMOJIS.ERRO, true);
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