import { useEffect } from 'react';

export default function useEsconderScroll() {

    useEffect(() => {
        document.querySelector('html')!.style.overflow = 'hidden';

        return () => {
            document.querySelector('html')!.style.overflow = 'auto';
        };
    }, []);

}