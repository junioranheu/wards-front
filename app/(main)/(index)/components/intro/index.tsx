import ImgPerfil from '@/assets/images/outros/jinmiran.webp';
import Image from 'next/image';
import Styles from './intro.module.scss';

export default function Intro() {
    return (
        <section className={Styles.intro}>
            <div className={Styles.imagem}>
                <Image src={ImgPerfil} alt='' />
            </div>

            <div className={Styles.texto}>
                <h1>Junior</h1>
                <h1>Junior</h1>
            </div>
        </section>
    )
}