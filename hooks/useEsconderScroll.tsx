import { useEffect } from 'react';

export default function useEsconderScroll() {
    useEffect(() => {
        document.querySelector('html')!.style.overflow = 'hidden';

        const isIphone = /iPhone|iPod/.test(navigator.userAgent);
        const isAndroid = /Android/.test(navigator.userAgent);
        const preventScrollMobile = (event: any) => event.preventDefault();

        if (isIphone || isAndroid) {
            document.body.addEventListener('touchmove', preventScrollMobile, { passive: false });
        }

        return () => {
            document.querySelector('html')!.style.overflow = 'auto';
            document.body.removeEventListener('touchmove', preventScrollMobile);
        };
    }, []);

}