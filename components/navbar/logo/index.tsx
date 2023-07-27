import ImgLogo from '@/assets/images/outros/logo.webp';
import CONSTS_TELAS from '@/utils/consts/telas';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';
import { Tooltip } from 'react-tooltip';
import Styles from '../index.module.scss';

interface iParametros {
    placeholder: string;
}

export default function Logo({ placeholder }: iParametros) {

    const router = useRouter();
    const tooltip = 'tooltipLogo';

    return (
        <Fragment>
            <Tooltip id={tooltip} place='bottom' />

            <div
                className={Styles.logo}
                style={{ cursor: (placeholder ? 'pointer' : 'auto') }}
                onClick={() => router.push(CONSTS_TELAS.INDEX)}
                data-tooltip-id={tooltip}
                data-tooltip-html={placeholder ?? ''}
            >
                <Image src={ImgLogo} alt='' />
            </div>
        </Fragment>
    )
}