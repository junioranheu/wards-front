import handleClickSvg from '@/utils/functions/handle.clickSvg';
import iSvg from '@/utils/types/iSvg';
import { Fragment } from 'react';
import { Tooltip } from 'react-tooltip';

export default function IconeSorte({ escala, url, isNovaAba, handleFuncao, placeholder }: iSvg) {

    const tooltip = 'tooltipIconeSorte';

    return (
        <Fragment>
            <Tooltip id={tooltip} place='bottom' />

            <svg
                xmlns='http://www.w3.org/2000/svg'
                role='img'
                viewBox='0 0 512 512'
                fill='none'
                stroke='currentColor'
                style={{ transform: `scale(${escala})` }}
                onClick={() => handleClickSvg(url, isNovaAba, handleFuncao)}
                data-tooltip-id={tooltip}
                data-tooltip-html={placeholder ?? ''}
            >
                <path
                    fill='var(--preto)'
                    d='M410.004,264.193c-12.071-43.44-36.381-99.984-52.504-135.522h21.148c7.746,0,14.025-6.279,14.025-14.025v-24.13  c0-7.746-6.279-14.025-14.025-14.025H324c-12.896,0-23.35,10.454-23.35,23.35v0.356c0,18.087,3.94,35.949,11.561,52.353  c14.202,30.568,36.433,82.995,36.433,111.644c0,43.121-35.108,78.246-78.245,78.246h-28.914c-43.137,0-78.228-35.125-78.228-78.246  c0-29.019,22.228-80.956,36.553-111.415c7.791-16.564,11.835-34.633,11.835-52.938c0-12.896-10.454-23.35-23.35-23.35h-54.667  c-7.746,0-14.025,6.279-14.025,14.025v24.13c0,7.746,6.279,14.025,14.025,14.025h22.327  c-16.468,35.553-41.174,91.729-54.094,135.522c-23.439,79.24,32.825,171.316,139.623,171.316h28.914  C385.278,435.51,432.346,344.498,410.004,264.193z M139.492,334.786c-8.889,0-16.112-7.241-16.112-16.13  c0-8.905,7.224-16.129,16.112-16.129s16.112,7.224,16.112,16.129C155.604,327.545,148.38,334.786,139.492,334.786z M201.092,404.332  c-10.999,0-19.938-8.924-19.938-19.957c0-11.032,8.939-19.955,19.938-19.955c11.017,0,19.974,8.923,19.974,19.955  C221.066,395.408,212.109,404.332,201.092,404.332z M311.117,404.332c-11.017,0-19.922-8.924-19.922-19.957  c0-11.032,8.905-19.955,19.922-19.955c11.033,0,19.956,8.923,19.956,19.955C331.073,395.408,322.15,404.332,311.117,404.332z   M372.752,334.786c-8.906,0-16.112-7.241-16.112-16.13c0-8.905,7.206-16.129,16.112-16.129c8.889,0,16.096,7.224,16.096,16.129  C388.848,327.545,381.641,334.786,372.752,334.786z'
                />
            </svg>
        </Fragment>
    )
}