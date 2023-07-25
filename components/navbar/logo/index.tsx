import ImgLogo from '@/assets/images/outros/logo.webp';
import CONSTS_TELAS from '@/utils/consts/telas';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';
import { Tooltip } from 'react-tooltip';
import Styles from '../index.module.scss';

export default function Logo() {

    const router = useRouter();
    const tooltip = 'tooltipLogo';

    return (
        <Fragment>
            <Tooltip id={tooltip} place='bottom' />

            <div
                className={Styles.logo}
                onClick={() => router.push(CONSTS_TELAS.INDEX)}
                data-tooltip-id={tooltip}
                data-tooltip-html='Voltar ao início'
            >
                <Image src={ImgLogo} alt='' />
            </div>
        </Fragment>
    )
}