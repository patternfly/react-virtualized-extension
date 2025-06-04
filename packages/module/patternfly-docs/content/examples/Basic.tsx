import { FunctionComponent } from 'react';
import { Caption, Table, TableGridBreakpoint, Td, Th, Thead, Tr } from '@patternfly/react-table';
import { CellMeasurerCache, CellMeasurer } from 'react-virtualized';
import { AutoSizer, VirtualTableBody } from '@patternfly/react-virtualized-extension';

export const VirtualizedExample: FunctionComponent = () => {
  // this StringArray type is just needed because something in our documentation framework crashes when it encounters
  // a string[][] type
  type StringArray = string[];
  const rows: StringArray[] = [];
  for (let i = 0; i < 100; i++) {
    rows.push([`one-${i}`, `two-${i}`, `three-${i}`, `four-${i}`, `five-${i}`]);
  }

  const columns = ['Repositories', 'Branches', 'Pull requests', 'Workspaces', 'Last Commit'];

  const measurementCache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: 44,
    keyMapper: (rowIndex) => rowIndex
  });

  const rowRenderer = ({ index: rowIndex, _isScrolling, key, style, parent }) => (
    <CellMeasurer cache={measurementCache} columnIndex={0} key={key} parent={parent} rowIndex={rowIndex}>
      <Tr style={style}>
        {columns.map((col, index) => (
          <Td key={`${rowIndex}-${index + 1}`}>{rows[rowIndex][index]}</Td>
        ))}
      </Tr>
    </CellMeasurer>
  );

  return (
    <div aria-label="Scrollable Table" className="pf-v6-c-scrollablegrid">
      <Table gridBreakPoint={TableGridBreakpoint.none} aria-rowcount={rows.length}>
        <Caption>Simple Table</Caption>
        <Thead>
          <Tr>
            {columns.map((col, index) => (
              <Th key={++index}>{col}</Th>
            ))}
          </Tr>
        </Thead>
      </Table>
      <AutoSizer disableHeight>
        {({ width }) => (
          <VirtualTableBody
            className="pf-v6-c-table pf-v6-c-virtualized pf-v6-c-window-scroller"
            deferredMeasurementCache={measurementCache}
            rowHeight={measurementCache.rowHeight}
            height={400}
            overscanRowCount={2}
            columnCount={1}
            rows={rows}
            rowCount={rows.length}
            rowRenderer={rowRenderer}
            width={width}
            role="grid"
          />
        )}
      </AutoSizer>
    </div>
  );
};
