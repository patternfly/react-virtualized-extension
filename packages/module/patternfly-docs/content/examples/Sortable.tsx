import type { FunctionComponent } from 'react';
import { useState } from 'react';
import { Caption, Table, Td, Th, Thead, ThProps, Tr } from '@patternfly/react-table';
import { CellMeasurerCache, CellMeasurer } from 'react-virtualized';
import { AutoSizer, VirtualTableBody } from '@patternfly/react-virtualized-extension';

export const SortableExample: FunctionComponent = () => {
  const rows: { id: string; cells: string[] }[] = [];
  for (let i = 0; i < 100; i++) {
    rows.push({
      id: `sortable-row-${i}`,
      cells: [`one-${i}`, `two-${i}`, `three-${i}`, `four-${i}`, `five-${i}`]
    });
  }

  const columns = ['Repositories', 'Branches', 'Pull requests', 'Workspaces', 'Last Commit'];

  const [activeSortIndex, setActiveSortIndex] = useState<number>(-1);

  // Sort direction of the currently sorted column
  const [activeSortDirection, setActiveSortDirection] = useState<'asc' | 'desc' | undefined>();

  const getRowIndex = (str: string) => Number(str?.split('-')[1]);

  const getSortParams = (columnIndex: number): ThProps['sort'] => ({
    sortBy: {
      index: activeSortIndex,
      direction: activeSortDirection
    },
    onSort: (_event, index, direction) => {
      setActiveSortIndex(index);
      setActiveSortDirection(direction as 'desc' | 'asc');
    },
    columnIndex
  });

  if (activeSortIndex !== null) {
    rows.sort((a, b) => {
      const aValue = a.cells[activeSortIndex];
      const bValue = b.cells[activeSortIndex];

      const aValueIndex = getRowIndex(aValue);
      const bValueIndex = getRowIndex(bValue);

      if (activeSortDirection === 'asc') {
        return aValueIndex - bValueIndex;
      }

      return bValueIndex - aValueIndex;
    });
  }

  const measurementCache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: 44,
    keyMapper: (rowIndex) => rowIndex
  });

  const rowRenderer = ({ index: rowIndex, _isScrolling, key, style, parent }) => (
    <CellMeasurer cache={measurementCache} columnIndex={0} key={key} parent={parent} rowIndex={rowIndex}>
      <Tr style={style}>
        {columns.map((col, index) => (
          <Td key={`${rowIndex}-${index + 1}`}>{rows[rowIndex].cells[index]}</Td>
        ))}
      </Tr>
    </CellMeasurer>
  );
  return (
    <div aria-label="Scrollable Table" className="pf-v6-c-scrollablegrid">
      <Table aria-label="Sortable table" ouiaId="SortableTable">
        <Caption>Sortable Virtualized Table</Caption>
        <Thead>
          <Tr>
            <Th sort={getSortParams(0)}>{columns[0]}</Th>
            <Th>{columns[1]}</Th>
            <Th sort={getSortParams(2)}>{columns[2]}</Th>
            <Th>{columns[3]}</Th>
            <Th>{columns[4]}</Th>
          </Tr>
        </Thead>
      </Table>
      <AutoSizer disableHeight>
        {({ width }) => (
          <VirtualTableBody
            ref={(ref) => ref}
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
