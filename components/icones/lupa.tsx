import handleClickSvg from '@/utils/functions/handle.clickSvg';
import iSvg from '@/utils/types/iSvg';
import { Fragment } from 'react';
import { Tooltip } from 'react-tooltip';

export default function IconeLupa({ escala, url, isNovaAba, handleFuncao }: iSvg) {

    const tooltip = 'tooltipIconeLupa';

    return (
        <Fragment>
            <Tooltip id={tooltip} place='bottom' />

            <svg
                xmlns='http://www.w3.org/2000/svg'
                role='img'
                viewBox='0 0 20 20'
                fill='none'
                stroke='currentColor'
                style={{ transform: `scale(${escala})` }}
                onClick={() => handleClickSvg(url, isNovaAba, handleFuncao)}
                data-tooltip-id={tooltip}
                data-tooltip-html='Buscar'
            >
                <path
                    d='M17.5 17.5L12.5 12.5L17.5 17.5ZM14.1667 8.33333C14.1667 9.09938 14.0158 9.85792 13.7226 10.5657C13.4295 11.2734 12.9998 11.9164 12.4581 12.4581C11.9164 12.9998 11.2734 13.4295 10.5657 13.7226C9.85792 14.0158 9.09938 14.1667 8.33333 14.1667C7.56729 14.1667 6.80875 14.0158 6.10101 13.7226C5.39328 13.4295 4.75022 12.9998 4.20854 12.4581C3.66687 11.9164 3.23719 11.2734 2.94404 10.5657C2.65088 9.85792 2.5 9.09938 2.5 8.33333C2.5 6.78624 3.11458 5.30251 4.20854 4.20854C5.30251 3.11458 6.78624 2.5 8.33333 2.5C9.88043 2.5 11.3642 3.11458 12.4581 4.20854C13.5521 5.30251 14.1667 6.78624 14.1667 8.33333Z'
                    stroke='currentColor'
                    strokeWidth='2px'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    fill='none'
                >
                </path>
            </svg>
        </Fragment>
    )
}