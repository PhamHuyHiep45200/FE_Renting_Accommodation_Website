import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import SearchEnhanced from "./search/SearchEnhanced";
import province from "@/data/province.json";
import {
  useGetCategoryQuery,
} from "@/store/service/user.service";
import { Field, Formik } from "formik";

function Search() {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  const { data, isSuccess } = useGetCategoryQuery({});

  const searchData = (values: any) => {
    const moneyQuery = values.money
      ? {
          money_from: values.money[0],
          money_to: values.money[1],
        }
      : {};
    const squareQuery = values.square
      ? {
          square_from: values.square[0],
          square_to: values.square[1],
        }
      : {};

    delete values.money;
    delete values.square;

    const query = {
      ...values,
      ...moneyQuery,
      ...squareQuery,
    };
    router.push({
      pathname: "/search",
      query,
    });
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const category = useMemo(() => {
    if (isSuccess) {
      return data.data.data;
    }
    return [];
  }, [isSuccess]);


  return (
    <Formik
      initialValues={{}}
      enableReinitialize
      onSubmit={(values) => {
        searchData(values);
      }}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <div
            className="flex items-center justify-between px-4 py-5 rounded-xl"
            style={{
              boxShadow: "1px 10px 27px 5px rgba(0,0,0,0.2)",
              WebkitBoxShadow: "1px 10px 27px 5px rgba(0,0,0,0.2)",
              MozBoxShadow: "1px 10px 27px 5px rgba(0,0,0,0.2)",
            }}
          >
            <div className="flex flex-1 justify-center">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-standard-label">
                  <div className="flex items-center space-x-2">
                    <Image
                      src="/image/home.png"
                      width={22}
                      height={22}
                      alt=""
                    />
                    <span className="text-[16px] block mt-1">
                      Tìm kiếm theo
                    </span>
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
            <div className="flex flex-1 justify-center">
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
            <div className="flex flex-1 justify-center">
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
            <div className="flex flex-1 justify-center">
              <Button variant="contained" color="warning" onClick={handleOpen}>
                Lọc Nâng Cao
              </Button>
            </div>
            <div className="flex flex-1 justify-center">
              <Button variant="contained" size="large" type="submit">
                Tìm Kiếm
              </Button>
            </div>
            <SearchEnhanced open={open} setOpen={setOpen} formValue={props} />
          </div>
        </form>
      )}
    </Formik>
  );
}

export default Search;