import Botao from '@/components/botao';
import IconeLupa from '@/components/icones/lupa';
import { CONST_NANUM } from '@/utils/fonts/fonts';
import Styles from './index.module.scss';

export default function Navbar() {
    return (
        <nav className={Styles.navbar}>
            <div className={Styles.esquerda}>
                <a className={`${Styles.logo} ${CONST_NANUM.className} wavy`}>Wards</a>
                <a>Sobre</a>
            </div>

            <div className={Styles.direita}>
                <IconeLupa
                    escala={0.75}
                    url={null}
                    isNovaAba={false}
                    handleFuncao={() => null}
                />

                <a>Entrar</a>

                <Botao
                    texto='Criar conta'
                    url={null}
                    isNovaAba={true}
                    handleFuncao={() => null}
                    Svg={null}
                    refBtn={null}
                    isEnabled={true}
                    isPequeno={true}
                />
            </div>
        </nav>
    )
}