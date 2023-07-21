export default function VideoSource() {
    return (
        <video
            autoPlay={true}
            loop={true}
            muted={true}
            playsInline={true}
            disablePictureInPicture={true}
            controls={false}
        >
            <source src={(require('@/assets/videos/coding2.mp4'))} type='video/mp4' />
        </video>
    )
}