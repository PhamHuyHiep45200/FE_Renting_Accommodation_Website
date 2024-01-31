/* eslint-disable no-unused-vars */
import { FormikProps } from "formik";

export interface IMaskImage {
  src: string;
  alt?: string;
  height?: number;
  width?: number;
}

export interface ISizeImage {
  width: number;
  height: number;
}

export interface IMutilImageUpload {
  onChange?: (value: string[]) => void;
  value?: string[];
}

export interface IFormMik extends FormikProps<{
  category: string;
  title: string;
  description: string;
  address: string;
  money: string;
  square: string;
  province: number | undefined;
  district: number | undefined;
  contact: string;
  type: string;
  imgs: string[];
}> {}

export interface IFormPost {
  props: IFormMik
  categorys: any
}

export interface IBaseDescription {
  value: string;
  placeholder: string;
  onChange?: (value: string) => void;
}

export interface IUploadSignImageProps {
  onChange?: (value: string) => void;
  value?: string;
}

export interface IHeaderprops {
  icon: JSX.Element,
  title: string,
  color?: string
  fontSize?: number
  center?: boolean
  textColor?: string
}