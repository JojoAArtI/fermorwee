import Image from "next/image";

interface PhoneFrameProps {
  src: string;
  alt: string;
  /** next/image sizes; match the frame's rendered width. */
  sizes?: string;
  className?: string;
  priority?: boolean;
}

/**
 * A slim, modern phone drawn in CSS: thin titanium edge, narrow black bezel, dynamic island
 * and side buttons. Every measurement is in cqw (a share of the phone's own width), so the
 * proportions hold from a 150px thumbnail to a 260px hero phone.
 */
export function PhoneFrame({ src, alt, sizes = "(min-width: 768px) 18vw, 180px", className = "w-[clamp(180px,18vw,260px)]", priority }: PhoneFrameProps) {
  return (
    <div className={`relative aspect-[9/19.5] [container-type:inline-size] ${className}`}>
      {/* Side buttons sit just outside the edge. */}
      <span aria-hidden className="absolute -left-[0.9cqw] top-[17%] h-[3.2%] w-[1.1cqw] rounded-l-[1cqw] bg-[#3a3a3d]" />
      <span aria-hidden className="absolute -left-[0.9cqw] top-[23%] h-[6%] w-[1.1cqw] rounded-l-[1cqw] bg-[#3a3a3d]" />
      <span aria-hidden className="absolute -left-[0.9cqw] top-[30.5%] h-[6%] w-[1.1cqw] rounded-l-[1cqw] bg-[#3a3a3d]" />
      <span aria-hidden className="absolute -right-[0.9cqw] top-[26%] h-[9.5%] w-[1.1cqw] rounded-r-[1cqw] bg-[#3a3a3d]" />

      {/* Titanium edge */}
      <div className="absolute inset-0 rounded-[17cqw] bg-[linear-gradient(145deg,#5c5c60_0%,#2b2b2e_35%,#1d1d1f_65%,#4a4a4e_100%)] p-[0.9cqw]">
        {/* Bezel */}
        <div className="h-full w-full rounded-[16.1cqw] bg-black p-[2cqw]">
          {/* Screen */}
          <div className="relative h-full w-full overflow-hidden rounded-[14.1cqw] bg-white">
            <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
            <span aria-hidden className="absolute left-1/2 top-[1.5%] h-[3%] w-[30%] -translate-x-1/2 rounded-full bg-black" />
          </div>
        </div>
      </div>
    </div>
  );
}
