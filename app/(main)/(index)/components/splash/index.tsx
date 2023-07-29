import useEsconderScroll from '@/hooks/useEsconderScroll';
import CONSTS_SISTEMA from '@/utils/consts/sistema';
import Styles from './index.module.scss';

export default function Splash() {

    useEsconderScroll();

    return (
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