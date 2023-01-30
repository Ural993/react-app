/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { ReactElement, useCallback, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/exports';

import EditableRow from './EditableRow';
import {
  addChildrenDeep,
  addChildrenHaveTrue,
  addRowInTable,
  flatChildren,
} from './helpers';

import { DepartmentDateType, getList } from 'state/reducers/department-reducer';
import { AppRootStateType } from 'state/reducers/state';
import './Table.scss';

export interface ExtendsDepartmentDateType extends DepartmentDateType {
  childrenDeep?: number;
  childrenHave?: boolean;
  parentHave?: boolean;
}

export const Table = (): ReactElement => {
  const dispatch = useDispatch();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [parentId, setParentId] = useState<number>(0);
  const [tableRows, setTableRows] = useState<ExtendsDepartmentDateType[]>([]);

  const departmentDate = useSelector<AppRootStateType, DepartmentDateType[]>(
    state => state.department,
  );

  const addRow = useCallback(
    (rowId: number): void => {
      const newRows = addRowInTable(departmentDate, rowId);

      setParentId(rowId);
      if (newRows.length > 0) {
        setTableRows(flatChildren(addChildrenDeep(addChildrenHaveTrue(newRows))));
      }
    },
    [departmentDate],
  );

  useEffect(() => {
    dispatch<any>(getList());
  }, []);

  useEffect(() => {
    setTableRows(flatChildren(addChildrenDeep(addChildrenHaveTrue(departmentDate))));
  }, [departmentDate]);

  const tableBody = tableRows.map((el: ExtendsDepartmentDateType) => (
    <EditableRow
      el={el}
      key={el.id}
      setEditingId={setEditingId}
      editingId={editingId}
      addRow={addRow}
      parentId={parentId}
      setParentId={setEditingId}
    />
  ));

  return (
    <table>
      <tr>
        <th>Уровень</th>
        <th>Наименование работ</th>
        <th>Основная з/п</th>
        <th>Оборудование</th>
        <th>Накладные расходы</th>
        <th>Сметная прибыль</th>
      </tr>
      {tableBody}
    </table>
  );
};
