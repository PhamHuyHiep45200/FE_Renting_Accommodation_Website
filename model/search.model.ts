import { FormikProps } from "formik";

/* eslint-disable no-unused-vars */
export interface IPropsSearchEnhanced {
  open: boolean;
  formValue: FormikProps<{}>;
  setOpen: (value: boolean) => void;
}
