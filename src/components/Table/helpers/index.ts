import { DepartmentDateType } from 'state/reducers/department-reducer';

export const addParentHaveTrue = (arr: DepartmentDateType[]): any =>
  arr.map(item => ({ ...item, parentHave: true }));

export const addChildrenHaveTrue = (arr: DepartmentDateType[]): any =>
  arr.map(item => {
    if (item.child && item.child?.length > 0) {
      return {
        ...item,
        childrenHave: true,
        child: addChildrenHaveTrue(addParentHaveTrue(item.child)),
      };
    }

    return item;
  });

export const flatChildren = (initial: DepartmentDateType[]): DepartmentDateType[] =>
  initial.reduce((acc, item) => {
    acc.push(item);

    if (item.child) {
      acc.push(...flatChildren(item.child));
    }

    return acc;
  }, [] as DepartmentDateType[]);

export const addChildrenDeepToItem = (arr: DepartmentDateType[], value: number): any =>
  arr.map(item => ({ ...item, childrenDeep: value }));

export const addChildrenDeep = (arr: DepartmentDateType[], accumval: number = 0): any =>
  arr.map(item => {
    let accum = accumval;

    accum += 1;

    if (item.child && item.child?.length > 0) {
      return {
        ...item,
        child: addChildrenDeep(addChildrenDeepToItem(item.child, accum), accum),
      };
    }

    return item;
  });

export const addChildren = (item: DepartmentDateType): any => {
  if (item.child) {
    return {
      ...item,
      child: [
        ...item.child,
        { salary: 0, equipmentCosts: 0, overheads: 0, estimatedProfit: 0 },
      ],
    };
  }

  return item;
};

export const addRowInTable = (rows: DepartmentDateType[], id: number): any =>
  rows.map(row => {
    if (row.id === id) {
      return addChildren(row);
    }
    if (row.child && row.child?.length > 0) {
      return {
        ...row,
        child: addRowInTable(row.child, id),
      };
    }

    return row;
  });

export const addChildrenToRow = (
  item: DepartmentDateType,
  newRow: DepartmentDateType,
): any => {
  if (item.child) {
    return {
      ...item,
      child: [...item.child, newRow],
    };
  }

  return item;
};

export const addRow = (
  rows: DepartmentDateType[],
  id: number,
  newRow: DepartmentDateType,
): any =>
  rows.map(row => {
    if (row.id === id) {
      return addChildrenToRow(row, newRow);
    }
    if (row.child && row.child?.length > 0) {
      return {
        ...row,
        child: addRow(row.child, id, newRow),
      };
    }

    return row;
  });

export const updateRowWithNew = (
  item: DepartmentDateType,
  newRow: DepartmentDateType,
): any => {
  if (item.child) {
    return {
      ...newRow,
      child: [...item.child],
    };
  }
};

export const updateRow = (rows: DepartmentDateType[], newRow: DepartmentDateType): any =>
  rows.map(row => {
    if (row.id === newRow.id) {
      return updateRowWithNew(row, newRow);
    }
    if (row.child && row.child?.length > 0) {
      return {
        ...row,
        child: updateRow(row.child, newRow),
      };
    }

    return row;
  });

export const filterTreeData = (
  arr: DepartmentDateType[],
  filter: (item: DepartmentDateType) => boolean,
): DepartmentDateType[] =>
  arr.filter(filter).map(item => {
    if (item.child) {
      return {
        ...item,
        child: filterTreeData(item.child, filter),
      };
    }

    return item;
  });

// Хелпер удаляет строку из таблицы
export const deleteRowById = (
  arr: DepartmentDateType[],
  id: number,
): DepartmentDateType[] => filterTreeData(arr, item => item.id !== id);
