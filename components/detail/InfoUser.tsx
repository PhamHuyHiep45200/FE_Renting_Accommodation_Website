import { Avatar, Button, Card, CardContent, Tooltip } from "@mui/material";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import MarkUnreadChatAltOutlinedIcon from "@mui/icons-material/MarkUnreadChatAltOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import React from "react";
import { copyText } from "@/utils/common.util";
import { useAppDispatch } from "@/store/hooks";
import { openChat } from "@/store/slide/common.slide";

function InfoUser() {
  const dispatch = useAppDispatch();

  const openChatModal = () => {
    dispatch(openChat());
  };

  return (
    <Card>
      <CardContent className="flex flex-col items-center">
        <Avatar sx={{ width: 60, height: 60 }}>H</Avatar>
        <span className="block mt-2 font-semibold">Pham Huy H</span>
        <div className="my-2 font-semibold flex items-center space-x-2 text-primary">
          <PhoneInTalkOutlinedIcon />
          <Tooltip title="Sao Chép" arrow>
            <span
              className="underline cursor-pointer"
              onClick={() => copyText("0397349543")}
            >
              0397349543
            </span>
          </Tooltip>
        </div>
      </CardContent>
      <div className="!flex flex-col px-2 !py-2">
        <Button
          fullWidth
          className="mb-2"
          variant="contained"
          color="success"
          onClick={openChatModal}
        >
          <MarkUnreadChatAltOutlinedIcon />
          <span className="ml-2">Nhắn Tin</span>
        </Button>
        <Button fullWidth variant="contained" color="warning">
          <FavoriteBorderOutlinedIcon />
          <span className="ml-2">Yêu Thích</span>
        </Button>
      </div>
    </Card>
  );
}

export default InfoUser;
