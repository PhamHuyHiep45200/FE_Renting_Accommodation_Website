import { IUploadSignImageProps } from "@/model/base.model";
import { useUploadImageMutation } from "@/store/service/user.service";
import { Avatar, LinearProgress } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";

function UploadSignImage(props: IUploadSignImageProps) {
  const { value, onChange } = props;
  const [img, setImg] = useState<string>("");
  const [uploadImage, { data, isLoading, isSuccess, isError }] =
    useUploadImageMutation();

  const changeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      uploadImage(formData);
    }
  };

  useEffect(() => {
    if (value) {
      setImg(value);
    }
  }, [value]);

  useEffect(() => {
    if (isSuccess) {
      setImg(data.data.url);
      onChange?.(data.data.url);
    }
  }, [isSuccess, isError]);
  return (
    <div className="flex flex-col items-center">
      <label htmlFor="uploadSignImage" className="cursor-pointer">
        {!isLoading ? (
          <Avatar sx={{ width: 200, height: 200 }} src={img}></Avatar>
        ) : (
          <div className="w-[200px]">
            <LinearProgress sx={{ height: "10px", marginBottom: 5 }} />
          </div>
        )}
      </label>
      <div className="mt-5 font-semibold text-[20px]">Ảnh Đại Diện</div>
      <input type="file" hidden id="uploadSignImage" onChange={changeFile} />
    </div>
  );
}

export default UploadSignImage;
