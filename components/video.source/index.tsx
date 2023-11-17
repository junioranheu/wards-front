interface iParametros {
    video: string;
    url?: string | null;
    title?: string | null;
}

export default function VideoSource({ video, url, title }: iParametros) {

    function handleClick() {
        if (!url) {
            return;
        }

        window.open(url, '_blank');
    }

    return (
        <video
            autoPlay={true}
            loop={true}
            muted={true}
            playsInline={true}
            disablePictureInPicture={true}
            controls={false}
            onClick={() => handleClick()}
            style={{ cursor: url ? 'alias' : 'default' }}
            title={title ?? ''}
        >
            <source src={(require(`@/assets/videos/${video}.mp4`))} type='video/mp4' />
        </video>
    )
}