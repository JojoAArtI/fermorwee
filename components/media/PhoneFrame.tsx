import Image from "next/image";

interface PhoneFrameProps {
  src: string;
  alt: string;
  /** next/image sizes; match the frame's rendered width. */
  sizes?: string;
  className?: string;
  priority?: boolean;
}

/** CSS device frame: 44px outer radius, 10px bezel, 1px ring, dynamic island, 9:19.5 screen. */
export function PhoneFrame({ src, alt, sizes = "(min-width: 768px) 18vw, 180px", className = "w-[clamp(180px,18vw,260px)]", priority }: PhoneFrameProps) {
  return (
    <div className={`relative aspect-[9/19.5] rounded-[44px] border border-[#2A2A2A] bg-[#0B0B0C] p-2.5 ${className}`}>
      <div className="relative h-full w-full overflow-hidden rounded-[34px] bg-white">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
        <span aria-hidden className="absolute left-1/2 top-[2.2%] h-[3.6%] w-[30%] -translate-x-1/2 rounded-full bg-[#0B0B0C]" />
      </div>
    </div>
  );
}
