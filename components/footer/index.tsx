import CONSTS_SISTEMA from '@/utils/consts/sistema';
import CONSTS_TELAS from '@/utils/consts/telas';
import redirecionarWardAleatoria from '@/utils/functions/redirecionar.wardAleatoria';
import Link from 'next/link';
import Styles from './footer.module.scss';

export default function Footer() {
    return (
        <footer className={Styles.footer}>
            <div className={Styles.principal}>
                <div className={Styles.sessao}>
                    <span className={Styles.tituloSessao}>{CONSTS_SISTEMA.NOME_SISTEMA}</span>

                    <Link href={CONSTS_TELAS.INDEX}>Voltar ao início</Link>
                    <Link href={CONSTS_TELAS.SOBRE}>Sobre o projeto</Link>
                    <Link href={CONSTS_TELAS.BUSCA}>Buscar alguma ward</Link>
                    <a onClick={() => redirecionarWardAleatoria()}>Estou com sorte</a>
                </div>

                <div className={Styles.sessao}>
                    <span className={Styles.tituloSessao}>Outros projetos</span>

                    <Link href={CONSTS_SISTEMA.URL_PORTFOLIO} target='_blank'>Portfólio</Link>
                    <Link href='https://anheu.vercel.app/' target='_blank'>AnheuOS</Link>
                </div>

                <div className={Styles.sessao}>
                    <span className={Styles.tituloSessao}>Outros links</span>

                    <Link href={CONSTS_SISTEMA.URL_GITHUB} target='_blank'>GitHub</Link>
                    <Link href={CONSTS_SISTEMA.URl_LINKEDIN} target='_blank'>LinkedIn</Link>
                </div>
            </div>

            <div className={Styles.secundaria}>
                <div>
                    <span>
                        Copyright © {new Date().getFullYear()} — <b>{CONSTS_SISTEMA.NOME_SISTEMA}</b> — Desenvolvido por

                        <Link href={CONSTS_SISTEMA.URL_GITHUB} target='_blank'>
                            &nbsp;@junioranheu
                        </Link>
                    </span>
                </div>

                {/* <div className={Styles.direita}>
                    <div className={Styles.icones}>
                        <span title='GitHub'>
                            <FontAwesomeIcon className='pointer cor-principal-hover' icon={faGithub} size='lg' onClick={() => { window.open(CONSTS_SISTEMA.URL_GITHUB, '_blank') }} />
                        </span>

                        <span title='LinkedIn'>
                            <FontAwesomeIcon className='pointer cor-principal-hover' icon={faLinkedinIn} size='lg' onClick={() => { window.open(CONSTS_SISTEMA.URl_LINKEDIN, '_blank') }} />
                        </span>
                    </div>
                </div> */}
            </div>
        </footer>
    )
} 