import { Column } from '@silevis/reactgrid';

export const columns = (reorderable: boolean, resizable: boolean): Column[] => [
  { columnId: 'id', reorderable, resizable, width: 250 },
  { columnId: 'Formula', reorderable, resizable, width: 250 },
  // { columnId: 'branchName', reorderable, resizable, width: 150 },
  // { columnId: 'commitHash', reorderable, resizable, width: 400 },
  // { columnId: 'added', reorderable, resizable, width: 100 },
  // { columnId: 'removed', reorderable, resizable, width: 100 },
  // { columnId: 'author', reorderable, resizable, width: 150 },
  // { columnId: 'date', reorderable, resizable, width: 100 },
  { columnId: "jan",reorderable, width: 125 },
  { columnId: "feb",reorderable, width: 125 },
  { columnId: "mar",reorderable, width: 125 },
  { columnId: "apr",reorderable, width: 125 },
  { columnId: "may",reorderable, width: 125 },
  { columnId: "jun",reorderable, width: 125 },
  { columnId: "jul",reorderable, width: 125 },
  { columnId: "aug",reorderable, width: 125 },
  { columnId: "sep",reorderable, width: 125 },
  { columnId: "oct",reorderable, width: 125 },
  { columnId: "nov",reorderable, width: 125 },
  { columnId: "dec",reorderable, width: 125 }
];

