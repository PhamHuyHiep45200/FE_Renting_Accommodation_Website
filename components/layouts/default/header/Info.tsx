import { InfoList } from "@/config/header.config";
import { IAuthSlide } from "@/model/auth.model";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { userQuery } from "@/store/service/user.service";
import { setUser } from "@/store/slide/auth.slide";
import { Avatar, List, ListItem, Popover } from "@mui/material";
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state";
import { useRouter } from "next/router";
import React from "react";

function Info() {
  const { user } = useAppSelector(
    (state: { authSlice: IAuthSlide }) => state.authSlice
  );
  const router = useRouter();
  const dispatch = useAppDispatch()

  const redirectPath = (path: string) => {
    if (path === "logout") {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("expires");
      router.push("/login");
      dispatch(setUser(null))
      dispatch(userQuery.util.resetApiState());
    } else {
      router.push(path);
    }
  };

  return (
    <PopupState variant="popover" popupId="popup-popover">
      {(popupState) => (
        <div>
          <div
            className="flex items-center space-x-2"
            {...bindTrigger(popupState)}
          >
            <Avatar
              sx={{ height: 40, width: 40 }}
              alt={user?.username?.[0]}
              src={user?.avatar ?? ""}
            />
            <span>{user?.username}</span>
          </div>
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
            <List sx={{ width: 180, bgcolor: "background.paper", padding: 0 }}>
              {InfoList.map((info) => (
                <ListItem
                  key={info.path}
                  className="cursor-pointer font-semibold hover:bg-primary hover:bg-opacity-[0.3]"
                  onClick={() => {
                    redirectPath(info.path);
                    popupState.close();
                  }}
                >
                  {info.label}
                </ListItem>
              ))}
            </List>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}

export default Info;
