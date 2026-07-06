import { HeroProps } from "../types";
import Header from "./Header";

export default function Hero(props: HeroProps) {
  const { videoSrc, handleModal } = props;

  return (
    <div className="relative aspect-[2.1/1] w-full overflow-hidden">
      <video
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      <Header handleModal={handleModal} />
    </div>
  );
}
