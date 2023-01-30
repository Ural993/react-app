/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { ReactElement } from 'react';

import { useDispatch } from 'react-redux';

import './TableCelbutton.scss';
import { DeleteIcon, FileIcon } from 'components/Icons';
import { deleteRowTC } from 'state/reducers/department-reducer';

type TableCellButtonType = {
  addRow: (rowId: number) => void;
  rowId: number;
  editingId: number | null;
  parentId: number | null;
};
const TableCellButton = ({
  addRow,
  rowId,
  editingId,
  parentId,
}: TableCellButtonType): ReactElement => {
  const dispatch = useDispatch();

  const deleteRow = (rowId: number): void => {
    dispatch<any>(deleteRowTC(rowId));
  };

  return (
    <div className="buttonGroup">
      <FileIcon onClick={() => addRow(rowId)} editingId={editingId} parentId={parentId} />
      <DeleteIcon onClick={() => deleteRow(rowId)} />
    </div>
  );
};

export default TableCellButton;
