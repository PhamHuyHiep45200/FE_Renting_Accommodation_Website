import LayoutLogin from "@/components/layouts/auth";
import { FORMAT_DEFAULT_DATE } from "@/config/date.config";
import { useAppDispatch } from "@/store/hooks";
import { useLoginUserMutation } from "@/store/service/user.service";
import { setAuth } from "@/store/slide/auth.slide";
import { validationSchema } from "@/validation/login.validation";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Field, Formik } from "formik";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const initialValues = {
  phone: "",
  password: "",
};
function Login() {
  const dispatch = useAppDispatch()
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);

  const [loginUser, { data, isLoading }] = useLoginUserMutation();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (!isLoading && data) {
      localStorage.setItem("token", data.data.accessToken);
      localStorage.setItem("refresh_token", data.data.refreshToken);
      localStorage.setItem(
        "expires",
        moment().add(data.data.expiresTime, "seconds").format(FORMAT_DEFAULT_DATE)
      );
      dispatch(setAuth(true))
      router.push('/')
    }
  }, [isLoading]);

  return (
    <div className="w-[400px]">
      <div
        className="p-10 bg-white rounded-lg"
      >
        <div className="my-5 font-[500] text-center text-[30px]">Đăng Nhập</div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            loginUser(values);
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <FormControl fullWidth>
                <Field
                  as={TextField}
                  label="Số Điện Thoại"
                  name="phone"
                  variant="outlined"
                  margin="dense"
                  helperText={props.touched.phone && props.errors.phone}
                  error={props.errors.phone && props.touched.phone}
                ></Field>
              </FormControl>
              <FormControl fullWidth className="mt-5">
                <Field
                  as={TextField}
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  helperText={props.touched.password && props.errors.password}
                  error={props.touched.password && props.errors.password}
                  label="Password"
                />
              </FormControl>
              <div className="text-center mt-5">
                <Button variant="contained" size="large" type="submit">
                  Đăng Nhập
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;

Login.getLayout = function getLayout(page: JSX.Element) {
  return <LayoutLogin>{page}</LayoutLogin>;
};
