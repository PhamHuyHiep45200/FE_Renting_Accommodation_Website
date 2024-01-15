import { CircularProgress } from "@mui/material";
import React from "react";

function MaskLoading() {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-mask-loading">
      <CircularProgress />
    </div>
  );
}

export default MaskLoading;
