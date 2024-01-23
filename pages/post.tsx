import { validationSchema } from "@/validation/post.validation";
import { Container, Divider } from "@mui/material";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import FormPost from "@/components/post/FormPost";
import { wrapper } from "@/store/store";
import {
  getCategory,
  getRunningQueriesThunk,
  useGetCategoryQuery,
  usePostHouseMutation,
} from "@/store/service/user.service";
import { useSnackbar } from "notistack";

const initialValues = {
  category: "",
  title: "",
  description: "",
  address: "",
  money: "",
  square: "",
  province: undefined as number | undefined,
  district: undefined as number | undefined,
  contact: "",
  type: "",
  imgs: [] as string[],
};
function Post() {
  const { enqueueSnackbar } = useSnackbar();
  const [categorys, setCategorys] = useState([]);

  const [postHouse, { data: dataPost, isLoading }] = usePostHouseMutation();
  const { data, isFetching } = useGetCategoryQuery({});

  useEffect(() => {
    if (!isLoading) {
      if (dataPost) {
        enqueueSnackbar("Tạo Bài Viết Thành Công", {
          variant: "success",
        });
      } else {
        enqueueSnackbar("Đã có lỗi xảy ra", {
          variant: "error",
        });
      }
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isFetching) {
      if (data) {
        setCategorys(data.data.data);
      } else {
        enqueueSnackbar("Đã có lỗi xảy ra", {
          variant: "error",
        });
      }
    }
  }, [isFetching]);
  return (
    <Container>
      <h1>Đăng Tin Mới</h1>
      <Divider />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          postHouse(values);
        }}
      >
        {(props) => <FormPost props={props} categorys={categorys} />}
      </Formik>
    </Container>
  );
}

export default Post;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    store.dispatch(getCategory.initiate);

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);
