import Botao from '@/components/botao';
import IconeLupa from '@/components/icones/lupa';
import CONSTS_SISTEMA from '@/utils/consts/outros/sistema';
import { CONST_NANUM } from '@/utils/fonts/fonts';
import Styles from './index.module.scss';

export default function Navbar() {
    return (
        <nav className={Styles.navbar}>
            <div className={Styles.esquerda}>
                <a className={`${CONST_NANUM.className} ${Styles.logo} wavy`}>{CONSTS_SISTEMA.NOME_SISTEMA}</a>
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