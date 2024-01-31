import hanoi from "@/data/district/hanoi.json";
import danang from "@/data/district/danang.json";
import hcm from "@/data/district/hcm.json";
import province from "@/data/province.json";
export const formatMoney = (num: number) => {
  return new Intl.NumberFormat().format(+num);
};

export const copyText = (text: string) => {
  navigator.clipboard.writeText(text);
};

export const getProvince = (code: number) => {
  return province?.find((pro)=>pro.code === code)?.name
}

export const getDistrict = (provinceCode: number, districtCode: number) => {
  const provinceData: Record<number, any> = {
    1: hanoi,
    48: danang,
    79: hcm,
  };
  return provinceData[provinceCode]?.find((e: any) => e.code === districtCode).name;
};
