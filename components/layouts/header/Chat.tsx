import {
  Avatar,
  Badge,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Popover,
} from "@mui/material";
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state";
import Image from "next/image";
import React from "react";

function Chat() {
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <Badge
            badgeContent={4}
            color="error"
            className="cursor-pointer"
            {...bindTrigger(popupState)}
          >
            <Image src="/image/msg.png" alt="chat" width={35} height={30} />
          </Badge>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <List sx={{ width: 260, bgcolor: "background.paper", padding: 0 }}>
                <div className="text-center font-semibold pt-5 pb-2 text-[20px]">Chat Của Bạn</div>
              <ListItem className="cursor-pointer hover:bg-primary hover:bg-opacity-[0.3]">
                <ListItemAvatar>
                  <Avatar>H</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={<span className=" font-semibold">photo</span>}
                  secondary="Jan 9, 2014"
                />
              </ListItem>
            </List>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}

export default Chat;
