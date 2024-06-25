// @ts-ignore
import * as uslug from "uslug";

export const getSlug = (str: string) => {
  let uSlug = str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
  uSlug = uslug(uSlug, { lower: true });
  return uSlug;
};

export const getPaginationNewPerPage = (
  page: number,
  limit: number,
  limitDes: number,
) => {
  const startRecord = (page - 1) * limitDes + 1;
  const endRecord = startRecord + limitDes - 1;

  const startPage = Math.ceil(startRecord / limit);
  const endPage = Math.ceil(endRecord / limit);

  return {
    startPage,
    endPage,
    startRecord,
    endRecord,
    numberOfPages: endPage - startPage + 1,
  };
};
