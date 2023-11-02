import Image, { StaticImageData } from 'next/image';
import Styles from './fancy-image.module.scss';

interface iParametros {
    Img: StaticImageData;
    width: string;
    alt: string;
}

export default function FancyImage({ Img, width, alt }: iParametros) {
    return (
        <div className={Styles.fancy}>
            <div className={Styles.wrapper}>
                <picture>
                    <Image src={Img} style={{ width: width, height: 'auto' }} alt={alt} />
                </picture>
            </div>
        </div>
    )
}