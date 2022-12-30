import Image from 'next/image';
import { useState, useEffect } from 'react';
import DefaultImage from '../../public/fallback-image.png';

type ImageWithFallbackProps = {
  src: string;
  isStatic?: boolean;
  [x: string]: any;
};

const ImageWithFallback = (
  props: ImageWithFallbackProps & React.ComponentProps<typeof Image>,
) => {
  const { src, isStatic, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(DefaultImage);

  useEffect(() => {
    if (src !== imgSrc) {
      let tempSrc = src ?? DefaultImage;
      if (typeof src === 'string' && !isStatic) {
        tempSrc = src;
      }
      setImgSrc(tempSrc);
    }
  }, [imgSrc, isStatic, src]);

  return (
    <Image
      src={imgSrc || DefaultImage}
      // ts-ignore
      alt='Supermomos'
      height={10}
      width={50}
      style={{ objectFit: 'contain' }}
      {...rest}
      onError={() => {
        setImgSrc(DefaultImage);
      }}
    />
  );
};

export default ImageWithFallback;
