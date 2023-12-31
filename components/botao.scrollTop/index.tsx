import IconeScrollCima from '@/components/icones/scroll.cima';
import CONSTS_SISTEMA from '@/utils/consts/sistema';
import { Fragment } from 'react';
import { Tooltip } from 'react-tooltip';
import Styles from './botao.scrollTop.module.scss';

interface iParametros {
    isExibirTexto: boolean;
    marginTop: number;
}

export default function BotaoScrolltop({ isExibirTexto, marginTop }: iParametros) {

    const tooltip = 'tooltipFinal';

    return (
        <Fragment>
            <Tooltip id={tooltip} place='right' />

            <section
                className={`${Styles.botaoScrollTop} ${CONSTS_SISTEMA.ANIMATE}`}
                style={{ marginTop: `${marginTop ?? 0}rem` }}
            >
                {
                    isExibirTexto && (
                        <Fragment>
                            <span>Opa! — Parece que você chegou ao final e já viu todas as wards ✨</span>
                            <span>Dê uma olhada também nos links abaixo ou volte ao topo</span>
                        </Fragment>
                    )
                }

                <div
                    onClick={() => window.scrollTo(0, 0)}
                    data-tooltip-id={tooltip}
                    data-tooltip-html='Voltar ao topo'
                >
                    <IconeScrollCima title={null} />
                </div>
            </section>
        </Fragment>
    )
}