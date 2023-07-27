import ImgLoading from '@/assets/images/outros/loading.webp';
import Image from 'next/image';
import { Fragment } from 'react';
import { Tooltip } from 'react-tooltip';
import Styles from './index.module.scss';

export default function GifLoading() {

    const tooltip = 'tooltipLoading';

    return (
        <Fragment>
            <Tooltip id={tooltip} place='right' />

            <div
                className={Styles.loader}
                data-tooltip-id={tooltip}
                data-tooltip-html='Carregando...'
            >
                <Image src={ImgLoading} width={64} height={64} alt='' />
            </div>
        </Fragment>
    )
}