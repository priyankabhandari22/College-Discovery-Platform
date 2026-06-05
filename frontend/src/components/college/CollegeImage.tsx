'use client';

import Image from 'next/image';
import { useState } from 'react';
import { getCollegeCampusPath, getCollegeLogoPath } from '@/lib/college-images';
import { cn } from '@/lib/utils';

type CollegeImageType = 'campus' | 'logo';

interface CollegeImageProps {
  collegeId: string;
  src: string;
  alt: string;
  type: CollegeImageType;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

export default function CollegeImage({
  collegeId,
  src,
  alt,
  type,
  fill,
  width,
  height,
  sizes,
  priority,
  className,
}: CollegeImageProps) {
  const fallback =
    type === 'campus' ? getCollegeCampusPath(collegeId) : getCollegeLogoPath(collegeId);
  const [imgSrc, setImgSrc] = useState(src || fallback);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      className={cn(className)}
      onError={() => {
        if (imgSrc !== fallback) setImgSrc(fallback);
      }}
    />
  );
}
