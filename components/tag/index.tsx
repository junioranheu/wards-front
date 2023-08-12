import Styles from './index.module.scss';

interface iParametros {
    listaTags: string[];
}

export default function Tags({ listaTags }: iParametros) {
    return (
        <ul className={Styles.tags}>
            {
                listaTags?.map((t: string, i: number) => (
                    <li key={i}><a href="#" className={Styles.tag}>{t}</a></li>
                ))
            }
        </ul>
    )
}