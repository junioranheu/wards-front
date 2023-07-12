import { Caveat, Montserrat } from 'next/font/google';

export const CONST_MONTSERRAT = Montserrat({
    weight: ['400', '600'],
    style: ['normal', 'italic'],
    subsets: ['latin']
});

export const CONST_CAVEAT = Caveat({
    weight: ['400', '600'],
    style: ['normal'],
    subsets: ['latin']
});