import handleClickSvg from '@/utils/functions/handle.clickSvg';
import iSvg from '@/utils/types/iSvg';
import { Fragment } from 'react';
import { Tooltip } from 'react-tooltip';

export default function IconeEntrar({ escala, url, isNovaAba, handleFuncao, placeholder }: iSvg) {

    const tooltip = 'tooltipIconeEntrar';

    return (
        <Fragment>
            <Tooltip id={tooltip} place='bottom' />

            <svg
                xmlns='http://www.w3.org/2000/svg'
                role='img'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                style={{ transform: `scale(${escala})` }}
                onClick={() => handleClickSvg(url, isNovaAba, handleFuncao)}
                data-tooltip-id={tooltip}
                data-tooltip-html={placeholder ?? ''}
            >
                <path
                    d='M6 16.9998C6 17.3511 6 17.5268 6.01567 17.6795C6.14575 18.9473 7.0626 19.9945 8.30206 20.291C8.45134 20.3267 8.6255 20.3499 8.97368 20.3963L15.5656 21.2753C17.442 21.5254 18.3803 21.6505 19.1084 21.361C19.7478 21.1068 20.2803 20.6406 20.6168 20.0405C21 19.3569 21 18.4104 21 16.5174V7.48232C21 5.58928 21 4.64275 20.6168 3.95923C20.2803 3.35911 19.7478 2.89288 19.1084 2.63868C18.3803 2.34914 17.442 2.47423 15.5656 2.72442L8.97368 3.60335C8.62546 3.64978 8.45135 3.67299 8.30206 3.7087C7.0626 4.0052 6.14575 5.05241 6.01567 6.32018C6 6.47288 6 6.64854 6 6.99984M12 7.99984L16 11.9998M16 11.9998L12 15.9998M16 11.9998H3'
                    stroke='var(--preto)'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                />
            </svg>
        </Fragment>
    )
}