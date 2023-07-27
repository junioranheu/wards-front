import verificarIsAndroid from '@/utils/functions/verificar.isAndroid';
import verificarIsIphone from '@/utils/functions/verificar.isIphone';
import { useEffect } from 'react';

export default function useEsconderScroll() {

    useEffect(() => {
        document.querySelector('html')!.style.overflow = 'hidden';

        const preventScrollMobile = (event: any) => event.preventDefault();

        if (verificarIsIphone() || verificarIsAndroid()) {
            document.body.addEventListener('touchmove', preventScrollMobile, { passive: false });
        }

        return () => {
            document.querySelector('html')!.style.overflow = 'auto';
            document.body.removeEventListener('touchmove', preventScrollMobile);
        };
    }, []);

}