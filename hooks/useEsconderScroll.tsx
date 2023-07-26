import { useEffect } from 'react';

export default function useEsconderScroll() {

    function handleDesabilitarScrollMobile() {
        const isIphone = /iPhone|iPod/.test(navigator.userAgent);
        const isAndroid = /Android/.test(navigator.userAgent);
        const body = document.body;

        if (isIphone || isAndroid) {
            const preventScroll = (event: any) => event.preventDefault();
            body.addEventListener('touchmove', preventScroll, { passive: false });

            return () => {
                body.removeEventListener('touchmove', preventScroll);
            };
        }
    };

    useEffect(() => {
        document.querySelector('html')!.style.overflow = 'hidden';

        const isIphone = /iPhone|iPod/.test(navigator.userAgent);
        const isAndroid = /Android/.test(navigator.userAgent);
        const preventScrollMobile = (event: any) => event.preventDefault();

        alert(isIphone);
        alert(isAndroid);

        if (isIphone || isAndroid) {
            document.body.addEventListener('touchmove', preventScrollMobile, { passive: false });
        }

        return () => {
            document.querySelector('html')!.style.overflow = 'auto';
            document.body.removeEventListener('touchmove', preventScrollMobile);
        };
    }, []);

}