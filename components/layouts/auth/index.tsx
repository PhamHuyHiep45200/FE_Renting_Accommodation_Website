import React from "react";

function LayoutLogin({ children }: { children: JSX.Element }) {
  return (
    <div className="w-[100vw] h-[100vh] bg-[#4f7cf6] flex justify-center items-center">
      {children}
    </div>
  );
}

export default LayoutLogin;
