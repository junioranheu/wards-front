'use client';
import useTitulo from '@/hooks/useTitulo';
import CONSTS_SISTEMA from '@/utils/consts/sistema';
import Link from 'next/link';
import { lazy } from 'react';
import Styles from './index.module.scss';
const VideoSource = lazy(() => import('@/components/video.source'));

export default function Page() {

    useTitulo('Sobre', true);

    return (
        <section className={Styles.main}>
            <div className={Styles.titulo}>
                <span>Sobre @junioranheu e o projeto <span className='cor-principal'>{CONSTS_SISTEMA.NOME_SISTEMA}</span></span>
            </div>

            <div className={Styles.visual}>
                <VideoSource video='gongos' />
            </div>

            <div className={Styles.sobre}>
                <span>
                    Olá! Bem-vindo ao {CONSTS_SISTEMA.NOME_SISTEMA}. 👋
                </span>

                <span>
                    Me chamo Junior. Adoro programar e tocar violão.
                    Você pode ver meu portfólio clicando <Link href={CONSTS_SISTEMA.URL_PORTFOLIO} target='_blank'><span className='cor-principal'>aqui</span></Link>.
                    Agora, voltemos ao assunto principal.
                </span>

                <span>
                    Aqui é o lugar onde compartilho meus códigos e minha paixão por desenvolvimento de software — com foco principalmente em .NET e React.
                    Como um desenvolvedor full stack, estou sempre em busca de maneiras novas e empolgantes para criar soluções web inovadoras, bem estruturadas e escálaveis.
                </span>

                <span>
                    Mas, por que &#34;{CONSTS_SISTEMA.NOME_SISTEMA}&#34;?
                    Bom, essa palavra é uma referência interna entre mim e meus amigos, e a venho usando desde 2015.
                    Resumindo, uma &#34;ward&#34; é basicamente um lembrete super útil para mais tarde.
                    O que vem a calhar na área do desenvolvimento de software!
                    Quem nunca deixou salvo, para futuras consultas, um código do Stack Overflow que resolveu um problemasso?
                    Surge daí a ideia para o projeto.
                </span>

                <span>
                    Com o {CONSTS_SISTEMA.NOME_SISTEMA}, meu objetivo é compartilhar meu conhecimento e insights com aqueles que também possuem a mesma paixão pelo desenvolvimento web ou simplesmente precisam de uma colinha pra resolver um bug.
                    Wards de C#, .NET, React, Angular, banco de dados e até estratégias para melhorar a produtividade e eficiência.
                </span>

                <span>
                    Portanto, independentemente de você ser um desenvolvedor experiente ou estar apenas começando, o {CONSTS_SISTEMA.NOME_SISTEMA} pode eventualmente te ajudar.
                </span>

                <span>
                    Fun fact: eu inicialmente havia criado apenas um <Link href='https://github.com/junioranheu/wards-api' target='_blank'><span className='cor-principal'>repositório de back-end</span></Link>, com todo o tipo de código em C#, que, de alguma forma, poderia vir me ajudar.
                    E então, para facilitar a experiência em buscar esses códigos, surgiu essas telinhas aqui ✨
                </span>
            </div>
        </section>
    )
}