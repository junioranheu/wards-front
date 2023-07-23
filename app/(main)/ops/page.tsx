'use client';
import Botao from '@/components/botao';
import CONSTS_TELAS from '@/utils/consts/telas';
import Styles from './index.module.scss';

export default function Ops() {
    return (
        <section className={Styles.main}>
            <div>
                <span>Parece que deu ruim</span>
                <span>&#40;╯°□°&#41;╯︵ ┻━┻</span>
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