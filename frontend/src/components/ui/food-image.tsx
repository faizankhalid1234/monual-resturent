import Image from "next/image";
import { cn } from "@/lib/utils";
import { FOOD_IMAGES } from "@/lib/images";

interface FoodImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
  quality?: number;
  unoptimized?: boolean;
}

export function FoodImage({
  src,
  alt,
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 33vw",
  fill = true,
  quality = 90,
  unoptimized = false,
}: FoodImageProps) {
  return (
    <Image
      src={src || FOOD_IMAGES.default}
      alt={alt}
      fill={fill}
      className={cn("object-cover", className)}
      sizes={sizes}
      quality={quality}
      priority={priority}
      unoptimized={unoptimized}
    />
  );
}
