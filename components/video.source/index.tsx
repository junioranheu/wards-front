interface iParametros {
    video: string;
}

export default function VideoSource({ video }: iParametros) {
    return (
        <video
            autoPlay={true}
            loop={true}
            muted={true}
            playsInline={true}
            disablePictureInPicture={true}
            controls={false}
        >
            <source src={(require(`@/assets/videos/${video}.mp4`))} type='video/mp4' />
        </video>
    )
}