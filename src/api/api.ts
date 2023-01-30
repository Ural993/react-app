import axios from 'axios';

import { DepartmentDateType } from 'state/reducers/department-reducer';

const eID = 33252;

const initial = axios.create({
  baseURL: ' http://185.244.172.108:8081/',
});

export const departmentApi = {
  getList: () => initial.get(`v1/outlay-rows/entity/${eID}/row/list`),

  deleteRow: (rID: number) =>
    initial.delete<ResponseType<DepartmentDateType>>(
      `v1/outlay-rows/entity/${eID}/row/${rID}/delete`,
    ),

  createRow: (data: CreateRowRequestType) =>
    initial.post<ResponseType<DepartmentDateType>>(
      `v1/outlay-rows/entity/${eID}/row/create`,
      data,
    ),

  updateRow: (rID: number, data: UpdateRowRequestType) =>
    initial.post<ResponseType<DepartmentDateType>>(
      `v1/outlay-rows/entity/${eID}/row/${rID}/update`,
      data,
    ),
};

export interface CreateRowRequestType extends Omit<DepartmentDateType, 'id' | 'total'> {
  parentId: number;
}

export type UpdateRowRequestType = Omit<DepartmentDateType, 'id' | 'total'>;

export type ResponseType<D> = {
  current: D;
};
