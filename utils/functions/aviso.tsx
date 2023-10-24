import { CSSProperties } from 'react';
import toast from 'react-hot-toast';

export const Aviso = {
    toast(texto: string, ms: number, icone: string | null, isDark: boolean) {
        const styleGlass = {
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '1rem',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(5px)',
            color: 'var(--branco)',
            userSelect: 'none'
        } as CSSProperties;

        const styleDark = {
            background: 'rgb(59, 59, 59)',
            borderRadius: '1rem',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.25)',
            color: 'var(--branco)',
            userSelect: 'none'
        } as CSSProperties;

        const style = isDark ? styleDark : styleGlass;

        toast(
            (t) => (
                <span onClick={() => toast.dismiss(t.id)}>
                    {texto}
                </span>
            ),
            {
                duration: ms,
                position: 'top-center',
                icon: icone,
                style: style
            }
        );
    }
}