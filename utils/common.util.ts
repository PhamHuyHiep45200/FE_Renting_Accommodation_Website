export const formatMoney = (num: number) => {
  return new Intl.NumberFormat().format(+num);
};

export const copyText = (text: string) => {
  navigator.clipboard.writeText(text);
};
