import { Avatar, Card, Container, Divider, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import React from "react";
import { useAppDispatch } from "@/store/hooks";
import { closeChat } from "@/store/slide/common.slide";

function PopUpChat() {
  const dispatch = useAppDispatch();
  const closeChatModal = () => {
    dispatch(closeChat());
  };
  return (
    <div className="fixed bottom-0 right-0 left-0">
      <Container className="flex justify-end">
        <Card className="py-2 relative" sx={{ minWidth: 300 }}>
          <div className="px-5 flex justify-between items-center">
            <div className="flex items-center space-x-2 pb-2">
              <Avatar sx={{ width: 30, height: 30 }}>H</Avatar>
              <span className=" font-semibold">Pham Huy H</span>
            </div>
            <CloseIcon className="cursor-pointer" onClick={closeChatModal} />
          </div>
          <Divider />
          <div className="mb-[50px] px-5 pt-2 min-h-[250px] max-h-[250px]">
            hello
          </div>
          <div
            className="absolute px-5 h-[50px] bg-white flex items-center justify-between space-x-2 bottom-0 left-0 right-0"
            style={{ borderTop: "1px solid rgba(0, 0, 0, 0.12)" }}
          >
            <TextField fullWidth size="small" />
            <SendOutlinedIcon
              sx={{ height: 45, width: 35, cursor: "pointer" }}
            />
          </div>
        </Card>
      </Container>
    </div>
  );
}

export default PopUpChat;
