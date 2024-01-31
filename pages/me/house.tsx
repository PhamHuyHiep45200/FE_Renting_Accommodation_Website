/* eslint-disable no-mixed-operators */
import MaskImage from "@/components/base/MaskImage";
import {
  useHouseUserQuery,
  useUpdateHouseMutation,
} from "@/store/service/user.service";
import { formatMoney, getDistrict, getProvince } from "@/utils/common.util";
import {
  Chip,
  Container,
  Divider,
  Pagination,
  Switch,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
} from "@mui/material";
import { useSnackbar } from "notistack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RunningWithErrorsIcon from "@mui/icons-material/RunningWithErrors";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { HOUSE_STATUS } from "@/config/house.config";

function House() {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
  });
  const [tab, setTab] = useState(0);

  const { data, isSuccess, refetch } = useHouseUserQuery({
    page: pagination.page,
    status: HOUSE_STATUS[Number(router.query.tab ?? 0)],
  });
  const [updateHouse, { isSuccess: isSuccessUpdate, isError: isErrorUpdate }] =
    useUpdateHouseMutation();

  const listHouse = useMemo(() => {
    if (isSuccess) {
      setPagination({
        ...pagination,
        total: data.data.total,
      });
      return data.data.data;
    }
    return [];
  }, [isSuccess, data]);

  useEffect(() => {
    if (isSuccessUpdate) {
      refetch();
    }
    if (isErrorUpdate) {
      enqueueSnackbar("Update Thất Bại", {
        variant: "error",
      });
    }
  }, [isSuccessUpdate, isErrorUpdate]);

  const changeActive = (
    e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    id: string
  ) => {
    updateHouse({
      id,
      data: {
        active: (e.target as HTMLInputElement).checked,
      },
    });
  };

  const changePage = (_: ChangeEvent<unknown>, page: number) => {
    setPagination({
      ...pagination,
      page,
    });
  };

  const handleChangeTabs = (_: any, tab: number) => {
    setTab(tab);
    setPagination({
      ...pagination,
      page: 1,
    });
    router.replace({
      query: {
        tab: tab,
      },
    });
  };

  useEffect(() => {
    if (router.query.tab) {
      setTab(Number(router.query.tab));
    }
  }, [router]);

  return (
    <Container className="bg-white rounded-lg py-5">
      <Tabs
        value={tab}
        onChange={handleChangeTabs}
        variant="scrollable"
        scrollButtons={false}
        aria-label="scrollable prevent tabs example"
      >
        <Tab
          label={
            <Chip color="success" icon={<CheckCircleIcon />} label="Đã Duyệt" />
          }
        />
        <Tab
          label={
            <Chip
              color="warning"
              icon={<RunningWithErrorsIcon />}
              label="Đang Đợi Duyệt"
            />
          }
        />
        <Tab
          label={
            <Chip color="error" icon={<HighlightOffIcon />} label="Bị Huỷ" />
          }
        />
      </Tabs>
      <Divider />
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Phòng Trọ</TableCell>
            <TableCell>Địa Chỉ</TableCell>
            <TableCell>Số Tiền</TableCell>
            <TableCell>Hoạt Động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listHouse.map((row: any) => (
            <TableRow
              key={row?._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <div className="flex items-start space-x-2">
                  <MaskImage src={row?.imgs?.[0]} width={150} height={100} />
                  <div>
                    <span className="font-semibold w-[200px] truncate-2">
                      {row?.title}
                    </span>
                    <span className="text-[#666] block mt-1 text-[12px]">
                      Thể Loại: {row?.category?.name}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col items-start">
                  <span className="text-gray font-bold">
                    {getProvince(row?.province)}
                  </span>
                  <span className="text-gray font-semibold">
                    {getDistrict(row?.province, row?.district)}
                  </span>
                  <span className="text-gray w-[150px] truncate">
                    {row?.address}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-[red] font-semibold">
                {formatMoney(row?.money ?? 0)}đ
              </TableCell>
              <TableCell>
                <Switch
                  checked={row?.active}
                  onClick={(e) => changeActive(e, row?._id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Divider />
      {isSuccess && data.data.total > 0 && (
        <div className="flex justify-center mt-5">
          <Pagination
            count={Math.floor(pagination.total / 10 + 1)}
            page={pagination.page}
            onChange={changePage}
            color="primary"
          />
        </div>
      )}
    </Container>
  );
}

export default House;
