import FancyImage from '@/components/fancy-image';
import CONSTS_SISTEMA from '@/utils/consts/sistema';
import { StaticImageData } from 'next/image';
import Styles from './projeto.module.scss';

interface iParametros {
    miniInfo: string;
    titulo: string;
    descricao: string;
    Img: StaticImageData;
    listaTecnologias: string[];
    url: string | null;
    isDireita: boolean;
    isMargemTop: boolean;
}

export default function Projeto({ miniInfo, titulo, descricao, Img, listaTecnologias, url, isDireita, isMargemTop }: iParametros) {
    return (
        <section className={`${Styles.projeto} ${(isDireita ? Styles.direita : '')} ${(isMargemTop ? Styles.margemTop : '')}`}>
            <div
                className={Styles.imagem}
                onClick={() => window.open(url ?? CONSTS_SISTEMA.URL_GITHUB, '_blank')}
                title={titulo}
            >
                <FancyImage
                    Img={Img}
                    width='22rem'
                    alt={titulo}
                />
            </div>

            <div className={Styles.infos}>
                <div className={Styles.titulo}>
                    <span>{miniInfo}</span>

                    <span onClick={() => window.open(url ?? CONSTS_SISTEMA.URL_GITHUB, '_blank')}>
                        {titulo}
                    </span>
                </div>

                <div className={Styles.descricao}>
                    <span dangerouslySetInnerHTML={{ __html: descricao }} />
                </div>

                <div className={Styles.tecnologias}>
                    {
                        listaTecnologias?.map((tecnologia: string, i: number) => (
                            <span key={i}>{tecnologia}</span>
                        ))
                    }
                </div>

                {/* <div className={Styles.icones}>
                    {
                        url1 && url1Icone && (
                            <Link href={url1} target='_blank'>
                                <FontAwesomeIcon icon={url1Icone} size='lg' />
                            </Link>
                        )
                    }

                    {
                        url2 && url2Icone && (
                            <Link href={url2} target='_blank'>
                                <FontAwesomeIcon icon={url2Icone} size='lg' />
                            </Link>
                        )
                    }
                </div> */}
            </div>
        </section>
    )
}