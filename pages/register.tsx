import LayoutLogin from "@/components/layouts/auth";
import { validationSchema } from "@/validation/login.validation";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import { Field, Formik } from "formik";
import React from "react";

const initialValues = {
  phone: "",
  password: "",
};
function Register() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div>
      <div className="my-5 font-[500] text-center text-[30px]">Đăng Nhập</div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          // eslint-disable-next-line no-console
          console.log({ ...values });
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <FormControl fullWidth>
              <Field
                as={TextField}
                label="Họ Tên"
                name="phone"
                variant="outlined"
                margin="dense"
                helperText={props.touched.phone && props.errors.phone}
                error={props.errors.phone && props.touched.phone}
              ></Field>
            </FormControl>
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
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <Field
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
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
                label="Password"
              />
            </FormControl>
            <div className="text-center">
              <Button variant="contained" type="submit">
                Đăng Nhập
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Register;

Register.getLayout = function getLayout(page: JSX.Element) {
  return <LayoutLogin>{page}</LayoutLogin>;
};
