'use client';
import Botao from '@/components/botao';
import CONSTS_TELAS from '@/utils/consts/telas';
import Styles from './index.module.scss';

export default function Erro404() {
    return (
        <section className={Styles.main}>
            <div>
                <h1>Parece que deu ruim</h1>
                <h1> <span className={Styles.ascii}>(╯°□°）╯︵ ┻━┻</span></h1>
            </div>

            <div>
                <Botao
                    texto='Voltar ao ínicio'
                    url={CONSTS_TELAS.INDEX}
                    isNovaAba={false}
                    handleFuncao={() => null}
                    Svg={null}
                    refBtn={null}
                    isEnabled={true}
                    isPequeno={true}
                />
            </div>
        </section>
    )
}