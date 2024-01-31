import { Avatar, Button, Card, CardContent, Tooltip } from "@mui/material";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import MarkUnreadChatAltOutlinedIcon from "@mui/icons-material/MarkUnreadChatAltOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import React, { useEffect } from "react";
import { copyText } from "@/utils/common.util";
import { useAppDispatch } from "@/store/hooks";
import { openChat, startLoading, stopLoading } from "@/store/slide/common.slide";
import { useAddFavoriteMutation } from "@/store/service/user.service";
import { useSnackbar } from "notistack";

function InfoUser({detail}: any) {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  // const [favorite, setFavorite] = useState<boolean>(detail?.like)

  const [addFavorite, {isLoading, isSuccess, isError}] = useAddFavoriteMutation()

  const openChatModal = () => {
    dispatch(openChat());
  };

  const favoriteHouse = () => {
    addFavorite({
      house: detail._id
    })
  }

  useEffect(() => {
    if (isSuccess) {
    }
    if(isError) {
      enqueueSnackbar("Đã có lỗi xảy ra", {
        variant: "error",
      });
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (isLoading) {
      dispatch(startLoading());
    } else {
      dispatch(stopLoading());
    }
  }, [isLoading]);

  return (
    <Card>
      <CardContent className="flex flex-col items-center">
        <Avatar src={detail?.user?.avatar} sx={{ width: 60, height: 60 }}>{detail?.user?.username?.[0]}</Avatar>
        <span className="block mt-2 font-semibold">{detail?.user?.username}</span>
        <div className="my-2 font-semibold flex items-center space-x-2 text-primary">
          <PhoneInTalkOutlinedIcon />
          <Tooltip title="Sao Chép" arrow>
            <span
              className="underline cursor-pointer"
              onClick={() => copyText("0397349543")}
            >
              {detail?.user?.phone}
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
        <Button fullWidth variant="contained" color="warning" onClick={favoriteHouse}>
          <FavoriteBorderOutlinedIcon />
          <span className="ml-2">Yêu Thích</span>
        </Button>
      </div>
    </Card>
  );
}

export default InfoUser;
