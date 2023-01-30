import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { AppRootStateType } from './state';

import { CreateRowRequestType, departmentApi, UpdateRowRequestType } from 'api/api';
import { addRow, deleteRowById, updateRow } from 'components/Table/helpers';

export interface DepartmentDateType {
  child?: DepartmentDateType[];
  equipmentCosts: number;
  estimatedProfit: number;
  id: number;
  machineOperatorSalary: number;
  mainCosts: number;
  materials: number;
  mimExploitation: number;
  overheads: number;
  rowName: string;
  salary: number;
  supportCosts: number;
  total: number;
}

const initialState: DepartmentDateType[] = [];

const slice = createSlice({
  name: 'department',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getList.fulfilled, (state, action) => action.payload.data);
    builder.addCase(deleteRowTC.fulfilled, (state, action) => action.payload);
    builder.addCase(createRowTC.fulfilled, (state, action) => action.payload);
    builder.addCase(updateRowTC.fulfilled, (state, action) => action.payload);
  },
});

export const departmentReducer = slice.reducer;

export const getList = createAsyncThunk('department/getList', async () => {
  const res = await departmentApi.getList();
  const { data } = res;

  return { data };
});

export const deleteRowTC = createAsyncThunk(
  'department/deleteRowTC',
  async (rowId: number, thunkAPI) => {
    await departmentApi.deleteRow(rowId);

    const state = thunkAPI.getState() as AppRootStateType;

    const newState = deleteRowById(state.department, rowId);

    return newState;
  },
);

export const createRowTC = createAsyncThunk(
  'department/createRowTC',
  async (rowData: CreateRowRequestType, thunkAPI) => {
    const res = await departmentApi.createRow(rowData);

    const state = thunkAPI.getState() as AppRootStateType;

    const newState = addRow(state.department, rowData.parentId, res.data.current);

    return newState;
  },
);

export const updateRowTC = createAsyncThunk(
  'department/updateRowTC',
  async (payload: { rowId: number; rowData: UpdateRowRequestType }, thunkAPI) => {
    const res = await departmentApi.updateRow(payload.rowId, payload.rowData);

    const state = thunkAPI.getState() as AppRootStateType;

    const newState = updateRow(state.department, res.data.current);

    return newState;
  },
);
