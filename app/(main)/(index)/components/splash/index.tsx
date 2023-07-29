import useEsconderScroll from '@/hooks/useEsconderScroll';
import CONSTS_SISTEMA from '@/utils/consts/sistema';
import { Fragment } from 'react';
import Styles from './index.module.scss';

interface iParametros {
    isSplash: boolean;
}

export default function Splash({ isSplash }: iParametros) {

    useEsconderScroll();

    return (
        <Fragment>
            {
                isSplash && (
                    <section className={Styles.splash}>
                        <div className={`${Styles.carregando} ${CONSTS_SISTEMA.ANIMATE}`}>
                            <span>w</span>
                            <span>a</span>
                            <span>r</span>
                            <span>d</span>
                            <span>s</span>
                        </div>
                    </section>
                )
            }
        </Fragment>
    )
}