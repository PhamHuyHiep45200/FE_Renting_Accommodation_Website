import { Avatar, Badge, Container, Popover } from "@mui/material";
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state";
import Image from "next/image";
import React from "react";
import Chat from "./header/Chat";

function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 h-20 flex items-center z-10 bg-[#ffba00] bg-opacity-[0.9]">
      <Container className="flex justify-between items-center">
        <Image
          alt="logo-phongtro123"
          src="https://phongtro123.com/images/logo-phongtro.svg"
          width={240}
          height={70}
        />
        <div className="flex space-x-8 justify-between items-center">
          <div>
            <span>Yêu Thích</span>
          </div>
          <Chat />
          <div className="flex items-center space-x-2">
            <Avatar
              sx={{ height: 30, width: 30 }}
              alt="Huy"
              src="/static/images/avatar/1.jpg"
            />
            <span>Huy</span>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Header;
