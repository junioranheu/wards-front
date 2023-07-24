import handleClickSvg from '@/utils/functions/handle.clickSvg';
import iSvg from '@/utils/types/iSvg';
import { Fragment } from 'react';
import { Tooltip } from 'react-tooltip';

export default function IconeInfo({ escala, url, isNovaAba, handleFuncao, placeholder }: iSvg) {

    const tooltip = 'tooltipIconeInfo';

    return (
        <Fragment>
            <Tooltip id={tooltip} place='bottom' />

            <svg
                xmlns='http://www.w3.org/2000/svg'
                role='img'
                viewBox='0 0 512 512'
                fill='none'
                stroke='currentColor'
                style={{ transform: `scale(${escala})`, fill: 'var(--preto)', border: 'none' }}
                data-tooltip-id={tooltip}
                data-tooltip-html={placeholder ?? ''}
                onClick={() => handleClickSvg(url, isNovaAba, handleFuncao)}
            >
                <g>
                    <path
                        strokeWidth='0px'
                        d='M290.671,135.434c37.324-3.263,64.949-36.175,61.663-73.498c-3.241-37.324-36.152-64.938-73.476-61.675 c-37.324,3.264-64.949,36.164-61.686,73.488C220.437,111.096,253.348,138.698,290.671,135.434z' />

                    <path
                        strokeWidth='0px'
                        d='M311.31,406.354c-16.134,5.906-43.322,22.546-43.322,22.546s20.615-95.297,21.466-99.446
   c8.71-41.829,33.463-100.86-0.069-136.747c-23.35-24.936-53.366-18.225-79.819,7.079c-17.467,16.696-26.729,27.372-42.908,45.322
   c-6.55,7.273-9.032,14.065-5.93,24.717c3.332,11.515,16.8,17.226,28.705,12.871c16.134-5.895,43.3-22.534,43.3-22.534
   s-12.595,57.997-18.869,87c-0.874,4.137-36.06,113.292-2.505,149.18c23.35,24.949,53.343,18.226,79.819-7.066
   c17.467-16.698,26.729-27.373,42.908-45.334c6.55-7.263,9.009-14.054,5.93-24.706C336.66,407.733,323.215,402.01,311.31,406.354z'
                    />
                </g>
            </svg>
        </Fragment>
    )
}