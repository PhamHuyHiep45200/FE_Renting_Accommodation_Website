import { IMessageProps } from "@/model/common.model";
import { SnackbarProvider } from "notistack";
import React from "react";

function ProviderMessage(props: IMessageProps) {
  const { children } = props;
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      {children}
    </SnackbarProvider>
  );
}

export default ProviderMessage;
