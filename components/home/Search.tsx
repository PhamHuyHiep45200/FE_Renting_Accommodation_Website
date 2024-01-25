import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

function Search() {
  const router = useRouter()
  const searchData = () => {
    router.push('/search')
  }
  return (
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
            <Image src="/image/home.png" width={22} height={22} alt="" />
            <span className="text-[16px] block mt-1">Thuê Nhà</span>
            </div>
          </InputLabel>
          <Select
            id="demo-simple-select"
            variant="standard"
            labelId="demo-simple-select-standard-label"
            sx={{ width: 200 }}
          >
            <MenuItem value={10}>Thuê Nhà</MenuItem>
            <MenuItem value={20}>Tìm Người Ở Ghép</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="flex flex-1 justify-center">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-standard-label">
            Thuê Nhà / Ở Ghép
          </InputLabel>
          <Select
            id="demo-simple-select"
            variant="standard"
            labelId="demo-simple-select-standard-label"
            sx={{ width: 200 }}
          >
            <MenuItem value={10}>Thuê Nhà</MenuItem>
            <MenuItem value={20}>Tìm Người Ở Ghép</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="flex flex-1 justify-center">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-standard-label">
            Thuê Nhà / Ở Ghép
          </InputLabel>
          <Select
            id="demo-simple-select"
            variant="standard"
            labelId="demo-simple-select-standard-label"
            sx={{ width: 200 }}
          >
            <MenuItem value={10}>Thuê Nhà</MenuItem>
            <MenuItem value={20}>Tìm Người Ở Ghép</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="flex flex-1 justify-center">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-standard-label">
            Thuê Nhà / Ở Ghép
          </InputLabel>
          <Select
            id="demo-simple-select"
            variant="standard"
            labelId="demo-simple-select-standard-label"
            sx={{ width: 200 }}
          >
            <MenuItem value={10}>Thuê Nhà</MenuItem>
            <MenuItem value={20}>Tìm Người Ở Ghép</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="flex flex-1 justify-center">
        <Button variant="contained" size="large" onClick={searchData}>
          Tìm Kiếm
        </Button>
      </div>
    </div>
  );
}

export default Search;
