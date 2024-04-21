const Table = ({ value }: any) => {
  const { tableData, style, caption } = value;
  const styleFirstRowDifferent = style;

  // Layout of table:
  // value.rows = [{cells: ["text1", "text2"]}]
  const rowsData = tableData.rows;

  const rows = rowsData.map((row: any, rowIndex: number) => {
    const cells = row.cells.map((cell: any, cellIndex: number) => {
      return (
        <td key={cellIndex} className="border border-gray-300 p-2">
          {cell}
        </td>
      );
    });
    const rowStyle =
      styleFirstRowDifferent && rowIndex === 0 ? "font-semibold" : "";
    return (
      <tr key={rowIndex} className={rowStyle}>
        {cells}
      </tr>
    );
  });

  let tableBody;

  if (styleFirstRowDifferent) {
    tableBody = (
      <>
        <thead>{rows[0]}</thead>
        <tbody>{rows.slice(1)}</tbody>
      </>
    );
  } else {
    tableBody = <tbody>{rows}</tbody>;
  }

  // render table
  return (
    <div>
      <div className="overflow-x-auto mb-2">
        <table className="table-auto">{tableBody}</table>
      </div>
      <span>{caption}</span>
    </div>
  );
};

export default Table;
