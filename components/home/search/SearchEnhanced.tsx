import { IPropsSearchEnhanced } from "@/model/search.model";
import { formatMoney } from "@/utils/common.util";
import {
  Button,
  Dialog,
  DialogContentText,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
} from "@mui/material";
import hanoiDistrict from "@/data/district/hanoi.json";
import danangDistrict from "@/data/district/danang.json";
import hcmDistrict from "@/data/district/hcm.json";
import React, { useMemo } from "react";
import { Field } from "formik";
import { useAppSelector } from "@/store/hooks";
import { IAuthSlide } from "@/model/auth.model";
import Image from "next/image";
import province from "@/data/province.json";
import { useGetCategoryQuery } from "@/store/service/user.service";

function SearchEnhanced(props: IPropsSearchEnhanced) {
  const { open, setOpen, formValue } = props;
  const { infoAccout } = useAppSelector(
    (state: { authSlice: IAuthSlide }) => state.authSlice
  );

  const { data, isSuccess } = useGetCategoryQuery({});

  const handleClose = () => {
    setOpen(false);
  };

  const valueMoney = (e: number) => {
    return `${formatMoney(e)}đ`;
  };

  const valueSquareFormat = (e: number) => {
    return `${e} m2`;
  };

  const category = useMemo(() => {
    if (isSuccess) {
      return data.data.data;
    }
    return [];
  }, [isSuccess]);

  const district = useMemo(() => {
    if ((formValue.values as any).province) {
      switch ((formValue.values as any).province) {
        case 1:
          return hanoiDistrict;
        case 48:
          return danangDistrict;
        case 79:
          return hcmDistrict;
        default:
          return [];
      }
    }
  }, [formValue.values]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className="p-5 px-10">
        <DialogContentText>
          <div className="font-bold">Chọn Giá:</div>
          <div className="min-w-[300px]">
            <Field
              name="money"
              as={Slider}
              className="mt-5"
              defaultValue={[infoAccout?.minMoney, infoAccout?.maxMoney]}
              min={infoAccout?.minMoney}
              max={infoAccout?.maxMoney}
              onChange={(event: Event, newValue: number | number[]) => {
                formValue.setFieldValue("money", newValue);
              }}
              valueLabelDisplay="auto"
              valueLabelFormat={valueMoney}
            />
          </div>
          <div className="font-bold mt-5">Chọn Diện Tích:</div>
          <div className="min-w-[300px]">
            <Field
              name="square"
              as={Slider}
              className="mt-5"
              defaultValue={[infoAccout?.minSquare, infoAccout?.maxSquare]}
              min={infoAccout?.minSquare}
              max={infoAccout?.maxSquare}
              onChange={(event: Event, newValue: number | number[]) => {
                formValue.setFieldValue("square", newValue);
              }}
              valueLabelDisplay="auto"
              valueLabelFormat={valueSquareFormat}
            />
          </div>
          <div className="flex flex-1 justify-center my-3">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-standard-label">
                <div className="flex items-center space-x-2">
                  <Image src="/image/home.png" width={22} height={22} alt="" />
                  <span className="text-[16px] block mt-1">Tìm kiếm theo</span>
                </div>
              </InputLabel>
              <Field
                as={Select}
                id="demo-simple-select"
                variant="standard"
                labelId="demo-simple-select-standard-label"
                sx={{ width: 200 }}
                name="type"
              >
                <MenuItem value="RENT">Thuê Nhà</MenuItem>
                <MenuItem value="PAIR">Tìm Người Ở Ghép</MenuItem>
              </Field>
            </FormControl>
          </div>
          <div className="flex flex-1 justify-center my-3">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-standard-label">
                Khu Vực
              </InputLabel>
              <Field
                as={Select}
                id="demo-simple-select"
                variant="standard"
                labelId="demo-simple-select-standard-label"
                name="province"
                sx={{ width: 200 }}
              >
                {province.map((pro) => (
                  <MenuItem key={pro.code} value={pro.code}>
                    {pro.name}
                  </MenuItem>
                ))}
              </Field>
            </FormControl>
          </div>
          <div className="flex flex-1 justify-center my-3">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-standard-label">
                Thể Loại
              </InputLabel>
              <Field
                as={Select}
                id="demo-simple-select"
                variant="standard"
                labelId="demo-simple-select-standard-label"
                name="category"
                sx={{ width: 200 }}
              >
                {category.map((cate: any) => (
                  <MenuItem key={cate._id} value={cate._id}>
                    {cate.name}
                  </MenuItem>
                ))}
              </Field>
            </FormControl>
          </div>
          <FormControl>
            <InputLabel id="demo-simple-select-standard-label">
              Chọn Huyện/Quận
            </InputLabel>
            <Field
              name="district"
              as={Select}
              id="demo-simple-select"
              variant="standard"
              labelId="demo-simple-select-standard-label"
              sx={{ width: 200 }}
            >
              {district?.map((dis) => (
                <MenuItem key={dis.code} value={dis.code}>
                  {dis.name}
                </MenuItem>
              ))}
            </Field>
          </FormControl>
          <div className="text-center mt-5">
            <Button
              variant="contained"
              color="warning"
              className="px-[40px]"
              onClick={handleClose}
            >
              Đóng
            </Button>
          </div>
        </DialogContentText>
      </div>
    </Dialog>
  );
}

export default SearchEnhanced;
