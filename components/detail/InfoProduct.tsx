import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import MaskImage from "../base/MaskImage";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import styled from "@emotion/styled";
import Image from "next/image";
import { formatMoney } from "@/utils/common.util";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#000",
    color: "#fff",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#f5f5f5",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
function InfoProduct() {
  return (
    <div>
      <Swiper
        spaceBetween={40}
        autoplay
        loop
        speed={600}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {[1, 2, 3, 4, 5, 6, 7].map((e) => {
          return (
            <SwiperSlide key={e} className="cursor-pointer">
              <div>
                <MaskImage
                  src="https://vdoc.edu.vn/wp-content/uploads/2022/08/Thien-nhien.jpg"
                  height={400}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <h1 className="text-[#333]">
        Phòng Master Tolet riêng Căn hộ Chung cư Era Town Đức Khải, Phường Phú
        Mỹ, Quận 7
      </h1>
      <span>chuyên mục: Thuê Trọ</span>

      <div className="flex items-center my-2 space-x-1">
        <Image src="/image/money.png" alt="" width={40} height={40} />
        <span className="font-semibold text-[25px] text-[red]">{formatMoney(2000000)} đ</span>
      </div>

      <h3>Thông Tin Mô Tả</h3>
      <p></p>

      <h3>Địa Điểm Thuê</h3>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableBody>
            {[1, 2, 3].map((row) => (
              <StyledTableRow key={row}>
                <StyledTableCell width={"35%"} component="th" scope="row">
                  {row}
                </StyledTableCell>
                <StyledTableCell>{row}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <h3>Thông Tin Khác</h3>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableBody>
            {[1, 2, 3].map((row) => (
              <StyledTableRow key={row}>
                <StyledTableCell width={"35%"} component="th" scope="row">
                  {row}
                </StyledTableCell>
                <StyledTableCell>{row}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default InfoProduct;
