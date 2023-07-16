import Botao from '@/components/botao';
import IconeLupa from '@/components/icones/lupa';
import CONSTS_SISTEMA from '@/utils/consts/outros/sistema';
import CONSTS_TELAS from '@/utils/consts/outros/telas';
import { CONST_NANUM } from '@/utils/fonts/fonts';
import Link from 'next/link';
import Styles from './index.module.scss';

export default function Navbar() {
    return (
        <nav className={Styles.navbar}>
            <div className={Styles.esquerda}>
                <Link className={`${CONST_NANUM.className} ${Styles.logo} wavy`} href={CONSTS_TELAS.INDEX}>{CONSTS_SISTEMA.NOME_SISTEMA}</Link>
                <Link href={CONSTS_TELAS.SOBRE}>Sobre</Link>
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