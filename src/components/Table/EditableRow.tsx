/* eslint-disable jsx-a11y/no-autofocus */
import React, { ChangeEvent, ReactElement, useState } from 'react';

import { useDispatch } from 'react-redux';

import { ExtendsDepartmentDateType } from './Table';

import { CreateRowRequestType, UpdateRowRequestType } from 'api/api';
import Input from 'components/Input/Input';
import TableCellButton from 'components/TableCellButton/TableCellButton';
import { createRowTC, updateRowTC } from 'state/reducers/department-reducer';

type EditableRowPropsType = {
  el: ExtendsDepartmentDateType;
  setEditingId: (value: number | null) => void;
  setParentId: (value: number | null) => void;
  editingId: number | null;
  parentId: number;
  addRow: (rowId: number) => void;
};

const EditableRow = ({
  el,
  setEditingId,
  setParentId,
  editingId,
  addRow,
  parentId,
}: EditableRowPropsType): ReactElement => {
  const dispatch = useDispatch();

  const PADDING_LEFT = 26;
  const PADDING_STEP = 30;

  const px = el.childrenDeep
    ? PADDING_LEFT + PADDING_STEP * el.childrenDeep
    : PADDING_LEFT;

  const [inputData, setInputData] = useState({
    rowName: el.rowName,
    salary: el.salary,
    equipmentCosts: el.equipmentCosts,
    overheads: el.overheads,
    estimatedProfit: el.estimatedProfit,
  });

  const onInputChange = (e: ChangeEvent<HTMLInputElement>): any => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const onInputDublClick = (id: number): void => {
    if (!editingId || !parentId) {
      setEditingId(id);
    }
  };

  const onKeyDownPass = (e: any): void => {
    if (e.key === 'Enter') {
      if (el.id) {
        const rowId = el.id;
        const rowData: UpdateRowRequestType = {
          ...inputData,
          machineOperatorSalary: 0,
          mainCosts: 0,
          materials: 0,
          mimExploitation: 0,
          supportCosts: 0,
        };

        dispatch<any>(updateRowTC({ rowId, rowData }));
        setEditingId(null);
        setParentId(null);
      } else {
        const rowData: CreateRowRequestType = {
          ...inputData,
          machineOperatorSalary: 0,
          mainCosts: 0,
          materials: 0,
          mimExploitation: 0,
          supportCosts: 0,
          parentId,
        };

        dispatch<any>(createRowTC(rowData));
        setEditingId(null);
        setParentId(null);
      }
    }
  };

  if (editingId === el.id || !el.id) {
    return (
      <tr>
        <td>
          <div style={{ paddingLeft: `${px}px` }}>
            <TableCellButton
              addRow={addRow}
              rowId={el.id}
              editingId={editingId}
              parentId={parentId}
            />
          </div>
        </td>
        <td>
          <Input
            autoFocus
            name="rowName"
            value={inputData.rowName}
            onChange={onInputChange}
            onKeyDown={onKeyDownPass}
          />
        </td>
        <td>
          <Input
            name="salary"
            value={inputData.salary}
            onChange={onInputChange}
            onKeyDown={onKeyDownPass}
          />
        </td>
        <td>
          <Input
            name="equipmentCosts"
            value={inputData.equipmentCosts}
            onChange={onInputChange}
            onKeyDown={onKeyDownPass}
          />
        </td>
        <td>
          <Input
            name="overheads"
            value={inputData.overheads}
            onChange={onInputChange}
            onKeyDown={onKeyDownPass}
          />
        </td>
        <td>
          <Input
            name="estimatedProfit"
            value={inputData.estimatedProfit}
            onChange={onInputChange}
            onKeyDown={onKeyDownPass}
          />
        </td>
      </tr>
    );
  }

  return (
    <tr onDoubleClick={() => onInputDublClick(el.id)}>
      <td>
        <div style={{ paddingLeft: `${px}px` }}>
          <TableCellButton
            addRow={addRow}
            rowId={el.id}
            editingId={editingId}
            parentId={parentId}
          />
        </div>
      </td>
      <td>{el.rowName}</td>
      <td>{el.salary}</td>
      <td>{el.equipmentCosts}</td>
      <td>{el.overheads}</td>
      <td>{el.estimatedProfit}</td>
    </tr>
  );
};

export default EditableRow;
