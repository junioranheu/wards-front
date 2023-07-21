export default function VideoSource() {
    return (
        <source
            src={(require('@/assets/videos/coding2.mp4'))}
            type='video/mp4'
        />
    )
}