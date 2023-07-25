import Router from 'next/router';

interface iSvg {
    width: number | null
    url: string | null;
    title: string | null;
    isCorPrincipal: boolean;
}

export default function LupaAlt({ width, url, title, isCorPrincipal }: iSvg) {
    return (
        <svg width={width ?? 24} height={width ?? 24} className={`pointer cor-principal-hover ${(isCorPrincipal && 'cor-principal')}`} onClick={() => url && Router.push(url)}>
            <defs>
                <symbol id='svg-lupa' viewBox='0 0 24 24'>
                    <path d='M23.28,19.86l-6.45-6.45a9,9,0,1,0-3.43,3.43l6.44,6.44a2.42,2.42,0,1,0,3.43-3.42ZM1,9a8,8,0,1,1,8,8A8,8,0,0,1,1,9ZM22.57,22.58a1.45,1.45,0,0,1-2,0l-6.29-6.29a9.06,9.06,0,0,0,2-2l6.3,6.3a1.41,1.41,0,0,1,0,2Z'></path>
                </symbol>
            </defs>
            &gt;
            {title && <title>{title}</title>}
            <use xlinkHref='#svg-lupa' fill='currentColor'></use>
        </svg>
    )
} 