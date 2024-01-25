import { IMutilImageUpload } from "@/model/base.model";
import { Button, CircularProgress } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import MaskImage from "./MaskImage";
import Image from "next/image";
import { useUploadImageMutation } from "@/store/service/user.service";

function UploadMultipleImage(props: IMutilImageUpload) {
  const { value, onChange } = props;
  const [images, setImages] = useState<string[]>([]);

  const [uploadImage, { data, isLoading }] = useUploadImageMutation();

  const selectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      uploadImage(formData);
    }
  };

  const deleteImg = (img: string) => {
    const imgFilter = [...images.filter((image) => img !== image)];
    setImages(imgFilter);
    onChange?.(imgFilter);
  };

  useEffect(() => {
    if (value) {
      setImages([...value]);
    }
  }, [value]);

  useEffect(() => {
    if (!isLoading) {
      if (data) {
        setImages([...images, data.data.url]);
        onChange?.([...images, data.data.url]);
      } else {
      }
    }
  }, [isLoading]);

  return (
    <div>
      <div className="flex items-center space-x-2 mb-2">
        {images.map((img) => (
          <div key={img} className="rounded-lg overflow-hidden relative">
            <Image
              src="/image/close.svg"
              width={30}
              height={30}
              alt=""
              className="absolute right-2 cursor-pointer top-2"
              onClick={() => deleteImg(img)}
            />
            <MaskImage src={img} height={200} width={200} />
          </div>
        ))}
      </div>
      <Button
        component="label"
        variant="contained"
        startIcon={!isLoading ? <CloudUploadIcon /> : <CircularProgress size={20} color='inherit' />}
        className="relative"
      >
        <input
          accept="image/*"
          className="cursor-pointer absolute inset-0 opacity-0"
          id="file"
          type="file"
          onChange={selectFile}
        />
        Upload
      </Button>
    </div>
  );
}

export default UploadMultipleImage;
