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
}

export function FoodImage({
  src,
  alt,
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 33vw",
  fill = true,
}: FoodImageProps) {
  return (
    <Image
      src={src || FOOD_IMAGES.default}
      alt={alt}
      fill={fill}
      className={cn("object-cover", className)}
      sizes={sizes}
      quality={90}
      priority={priority}
    />
  );
}
