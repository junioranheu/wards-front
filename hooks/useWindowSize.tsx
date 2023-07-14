import { useEffect, useState } from 'react';

interface iWindowSize {
    width: number;
    height: number;
}

export default function useWindowSize(): iWindowSize {

    const [windowSize, setWindowSize] = useState<iWindowSize>({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);

        return () => { window.removeEventListener('resize', handleResize); };
    }, []);

    return windowSize;

}