import Styles from './index.module.scss';

export default function Navbar() {
    return (
        <nav className={Styles.navbar}>
            <div className={Styles.esquerda}>
                <a>Logo</a>
                <a>Sobre</a>
            </div>

            <div className={Styles.direita}>
                <a>Icone de busca</a>
                <a>Entrar</a>
                <a>Criar conta</a>
            </div>
        </nav>
    )
}