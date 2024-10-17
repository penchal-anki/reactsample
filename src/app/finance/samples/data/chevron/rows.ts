import { Row, } from '@silevis/reactgrid';

const height = 40;

export const headerRow: Row = {
  rowId: 'header',
  reorderable: false,
  height,
  cells: [
    { type: 'header', text: `Labels` },
    { type: 'header', text: `Formula` },
    // { type: 'header', text: `Branch Name` },
    // { type: 'header', text: `Commit hash` },
    // { type: 'header', text: `Added` },
    // { type: 'header', text: `Removed` },
    // { type: 'header', text: `Author` },
    // { type: 'header', text: `Date` },
    { type: "header", text: "Oct" },
    { type: "header", text: "Nov" },
    { type: "header", text: "Dec" },
    { type: "header", text: "Jan" },
    { type: "header", text: "Feb" },
    { type: "header", text: "Mar" },
    { type: "header", text: "Apr" },
    { type: "header", text: "May" },
    { type: "header", text: "Jun" },
    { type: "header", text: "Jul" },
    { type: "header", text: "Aug" },
    { type: "header", text: "Sep" },
  ]
};


export const rows = (monthsList: any) => {
  const monthsCount = monthsList?.length || 12;

  const cellsByMonth = Array.from({ length: monthsCount }).map(() => {
    return { type: "text", text: "-" };
  });

  const seventyFiveRows = Array.from({ length: 75 }).map((i: any, index) => {
    const rowString = index + 1;
    return {
      rowId: Number(rowString),
      height,
      reorderable: true,
      cells: [{ type: "chevron", text: "", isExpanded: true }, ...cellsByMonth],
    };
  });
  return seventyFiveRows;
};






// export const rows = (reorderable: boolean) => {
//   const seventyFiveRows = Array.from({ length: 75 }).map((i: any,index) => {
//     const rowString = index + 1
//     return {
//       rowId: Number(rowString),
//       height,
//       reorderable,
//       cells: [
//         { type: 'chevron', text: '', isExpanded: true },
//         { type: 'text', text: '-' },
//         { type: 'text', text: '-' },
//         { type: 'text', text: '-' },
//         { type: 'text', text: '-' },
//         { type: 'text', text: '-' },
//         { type: 'text', text: '-' },
//         { type: 'text', text: '-' },
//         { type: 'text', text: '-' },
//         { type: 'text', text: '-' },
//         { type: 'text', text: '-' },
//         { type: 'text', text: '-' },
//         { type: 'text', text: '-' },
//         { type: 'text', text: '-' },
//       ]
//     }
//   })

//   return seventyFiveRows
// }

//  [
// {
//   rowId: 1,
//   height,
//   reorderable,
//   cells: [
//     { type: 'chevron', text: '1', isExpanded: true, },
//     {type:'text', text: ''},
//     {type:'text', text: ''},
//     {type:'text', text: ''},
//     {type:'text', text: ''},
//     {type:'text', text: ''},
//     {type:'text', text: ''},
//     {type:'text', text: ''},
//     {type:'text', text: ''},
//     {type:'text', text: ''},
//     {type:'text', text: ''},
//     {type:'text', text: ''},
//     {type:'text', text: ''},
//     {type:'text', text: ''},
//   ]
// },
// {
//   rowId: 2,
//   height,
//   reorderable,
//   cells: [
//     { type: 'chevron', text: '2', isExpanded: true, parentId: 1 },
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//   ]
// },
// {
//   rowId: 3,
//   height,
//   reorderable,
//   cells: [
//     { type: 'chevron', text: '3', isExpanded: false },
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//   ]
// },
// {
//   rowId: 4,
//   height,
//   reorderable,
//   cells: [
//     { type: 'chevron', text: '4', isExpanded: true, parentId: 3 },
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//   ]
// },
// {
//   rowId: 5,
//   height,
//   reorderable,
//   cells: [
//     { type: 'chevron', text: '5', isExpanded: true, parentId: 4 },
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//   ]
// },
// {
//   rowId: 6,
//   height,
//   reorderable,
//   cells: [
//     { type: 'chevron', text: '6', isExpanded: true, parentId: 4 },
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//   ]
// },
// {
//   rowId: 7,
//   height,
//   reorderable,
//   cells: [
//     { type: 'chevron', text: '7', isExpanded: true, },
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//   ]
// },
// {
//   rowId: 8,
//   height,
//   reorderable,
//   cells: [
//     { type: 'chevron', text: '', isExpanded: true},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//     {type:'text', text: '-'},
//   ]
// }
// ]