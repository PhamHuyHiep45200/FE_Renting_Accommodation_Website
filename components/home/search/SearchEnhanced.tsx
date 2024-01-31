import { IPropsSearchEnhanced } from "@/model/search.model";
import { formatMoney } from "@/utils/common.util";
import {
  Button,
  Dialog,
  DialogContentText,
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

function SearchEnhanced(props: IPropsSearchEnhanced) {
  const { open, setOpen, formValue } = props;
  const { infoAccout } = useAppSelector(
    (state: { authSlice: IAuthSlide }) => state.authSlice
  );

  const handleClose = () => {
    setOpen(false);
  };

  const valueMoney = (e: number) => {
    return `${formatMoney(e)}đ`;
  };

  const valueSquareFormat = (e: number) => {
    return `${e} m2`;
  };

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
              defaultValue={[infoAccout?.minMoney , infoAccout?.maxMoney ]}
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
              defaultValue={[infoAccout?.minSquare , infoAccout?.maxSquare ]}
              min={infoAccout?.minSquare }
              max={infoAccout?.maxSquare }
              onChange={(event: Event, newValue: number | number[]) => {
                formValue.setFieldValue("square", newValue);
              }}
              valueLabelDisplay="auto"
              valueLabelFormat={valueSquareFormat}
            />
          </div>
          <div className="font-bold mt-5 mb-1">Chọn Huyện/Quận:</div>
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
