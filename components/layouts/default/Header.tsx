import { Badge, Button, Container } from "@mui/material";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import Image from "next/image";
import React from "react";
import Chat from "./header/Chat";
import { useRouter } from "next/router";
import PopUpChat from "./header/PopUpChat";
import { useAppSelector } from "@/store/hooks";
import { ICommon } from "@/model/common.model";
import Info from "./header/Info";
import { IAuthSlide } from "@/model/auth.model";

function Header() {
  const { popupChat } = useAppSelector(
    (state: { commonSlice: ICommon }) => state.commonSlice
  );
  const { favorite } = useAppSelector(
    (state: { authSlice: IAuthSlide }) => state.authSlice
  );
  const router = useRouter();
  const redirect = (path: string) => {
    router.push(path);
  };
  return (
    <div className="fixed top-0 left-0 right-0 h-20 flex items-center z-10 bg-[#ffba00] bg-opacity-[0.9]">
      {popupChat && <PopUpChat />}
      <Container className="!flex justify-between items-center">
        <div className="flex items-center justify-center space-x-3">
          <Image
            alt="logo-phongtro123"
            src="https://phongtro123.com/images/logo-phongtro.svg"
            width={240}
            height={70}
            onClick={() => redirect("/")}
          />
          <Button variant="contained" onClick={() => redirect("/post")}>
            Đăng Bài
          </Button>
        </div>
        <div className="flex space-x-8 justify-between items-center">
          <Badge
            badgeContent={favorite}
            color="error"
            className="cursor-pointer"
            onClick={() => redirect("/favorite")}
          >
            <FavoriteOutlinedIcon
              className="text-[red] text-[35px]"
            />
          </Badge>
          <Chat />
          <Info />
        </div>
      </Container>
    </div>
  );
}

export default Header;
