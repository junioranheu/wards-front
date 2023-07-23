import IconeScrollCima from '@/components/icones/scroll.cima';
import { Fragment } from 'react';
import { Tooltip } from 'react-tooltip';
import Styles from './index.module.scss';

export default function Final() {

    const tooltip = 'tooltipFinal';

    return (
        <Fragment>
            <Tooltip id={tooltip} place='right' />

            <section className={Styles.final}>
                <span>Opa! — Parece que você chegou ao final e já viu todas as wards ✨</span>
                <span>Dê uma olhada também nos links abaixo ou volte ao topo</span>

                <div
                    className={Styles.iconeScroll}
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