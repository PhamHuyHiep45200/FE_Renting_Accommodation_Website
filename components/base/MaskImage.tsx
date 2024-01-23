/* eslint-disable @next/next/no-img-element */
import { IMaskImage } from "@/model/base.model";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

function MaskImage(props: IMaskImage) {
  const { src, alt, height, width } = props;
  const [sizeImage, setSizeImage] = useState<"width" | "height">("width");
  const maskImg = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const getSizeImage = () => {
    const image = imgRef.current
    if (image && maskImg.current) {
      const widthMask = maskImg.current?.clientWidth;
      const heightMask = maskImg.current?.clientHeight;
      const ratioWidth = widthMask/image.naturalWidth
      const ratioHeight = heightMask/image.naturalHeight
      if (ratioWidth < ratioHeight) {
        setSizeImage("width");
      } else {
        setSizeImage("height");
      }
    }
  };

  useLayoutEffect(()=>{
    getSizeImage()
  }, [])

  useEffect(()=>{
    window.addEventListener('resize', () => getSizeImage())

    return () => {
      window.removeEventListener('resize', () => getSizeImage())
    }
  },[])
  return (
    <div
      style={{
        height: height ? `${height}px` : "100%",
        width: width ? `${width}px` : "100%",
      }}
      className="flex items-center justify-center bg-black"
      ref={maskImg}
    >
      <img
        onLoad={getSizeImage}
        src={src}
        loading='lazy'
        ref={imgRef}
        alt={alt ?? "image"}
        className={`${sizeImage === "width" ? "w-full" : "h-full"}`}
      />
    </div>
  );
}

export default MaskImage;
