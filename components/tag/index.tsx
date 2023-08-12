import Styles from './index.module.scss';

export default function Tags() {
    return (
        <ul className={Styles.tags}>
            <li><a href="#" className={Styles.tag}>HTML</a></li>
            <li><a href="#" className={Styles.tag}>CSS</a></li>
            <li><a href="#" className={Styles.tag}>JavaScript</a></li>
        </ul>
    )
}