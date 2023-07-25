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
        { hashtag: 'C#', qtdWards: useNumeroAleatorio(500, 1500) },
        { hashtag: 'React.js', qtdWards: useNumeroAleatorio(500, 1500) },
        { hashtag: 'Angular', qtdWards: useNumeroAleatorio(500, 1500) },
        { hashtag: 'MySQL', qtdWards: useNumeroAleatorio(500, 1500) },
        { hashtag: 'MVC', qtdWards: useNumeroAleatorio(500, 1500) },
        { hashtag: 'Next.js', qtdWards: useNumeroAleatorio(500, 1500) }
    ] as iBusca[];

    const [hashtag, setHashtag] = useState<string>('');

    return (
        <section className={Styles.main}>
            <div className={Styles.divTitulo}>
                <span>Era essa ward<br />que você queria?</span>

                <div className={CONSTS_SISTEMA.ANIMATE_INFINITO}>
                    <Image src={ImgEmojiMedicacao} alt='' />
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