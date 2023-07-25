'use client';
import ImgEmojiMedicacao from '@/assets/images/outros/emoji-meditacao.webp';
import useNumeroAleatorio from '@/hooks/useNumeroAleatorio';
import useTitulo from '@/hooks/useTitulo';
import CONSTS_SISTEMA from '@/utils/consts/sistema';
import iBusca from '@/utils/types/iBusca';
import Image from 'next/image';
import { useState } from 'react';
import BuscaInput from './components/busca.input';
import BuscaListaItens from './components/busca.listaItens';
import Styles from './index.module.scss';

export default function Page() {

    useTitulo('Busca', true);

    const listaHashtags = [
        { hashtag: 'Cachorros', qtdWards: useNumeroAleatorio(500, 1500) },
        { hashtag: 'Cachorros', qtdWards: useNumeroAleatorio(500, 1500) },
        { hashtag: 'Cachorros', qtdWards: useNumeroAleatorio(500, 1500) },
        { hashtag: 'Cachorros', qtdWards: useNumeroAleatorio(500, 1500) },
        { hashtag: 'Cachorros', qtdWards: useNumeroAleatorio(500, 1500) },
        { hashtag: 'Cachorros', qtdWards: useNumeroAleatorio(500, 1500) },
        { hashtag: 'Cachorros', qtdWards: useNumeroAleatorio(500, 1500) },
        { hashtag: 'Cachorros', qtdWards: useNumeroAleatorio(500, 1500) }
    ] as iBusca[];

    const [hashtag, setHashtag] = useState<string>('');

    return (
        <section className={Styles.main}>
            <div className={Styles.divTitulo}>
                <span>{CONSTS_SISTEMA.NOME_SISTEMA}</span>

                <div className='animate__animated animate__pulse animate__slower animate__infinite'>
                    <Image src={ImgEmojiMedicacao} alt='' width={50} height={63} />
                </div>
            </div>

            <BuscaInput
                hashtag={hashtag}
                setHashtag={setHashtag}
            />

            <BuscaListaItens
                listaHashtags={listaHashtags}
                hashtag={hashtag}
            />
        </section>
    )
}