/* eslint-disable no-console */
import { FunctionComponent } from 'react';
import {
  ActionsColumn,
  Caption,
  IActions,
  Table,
  TableGridBreakpoint,
  Td,
  Th,
  Thead,
  Tr
} from '@patternfly/react-table';
import { CellMeasurerCache, CellMeasurer } from 'react-virtualized';
import { AutoSizer, VirtualTableBody } from '@patternfly/react-virtualized-extension';

export const ActionsExample: FunctionComponent = () => {
  interface RowType {
    disableActions: boolean;
    id: string;
    cells: string[];
  }

  const rows: RowType[] = [];
  for (let i = 0; i < 100; i++) {
    rows.push({
      disableActions: i % 3 === 2,
      id: `actions-row-${i}`,
      cells: [`one-${i}`, `two-${i}`, `three-${i}`, `four-${i}`, `five-${i}`]
    });
  }

  const columns = ['Name', 'Namespace', 'Labels', 'Status', 'Pod Selector'];

  const actions: IActions = [
    {
      title: 'Some action',
      onClick: (_event, rowId, _rowData, _extra) => console.log('clicked on Some action, on row: ', rowId)
    },
    {
      title: <div>Another action</div>,
      onClick: (_event, rowId, _rowData, _extra) => console.log('clicked on Another action, on row: ', rowId)
    },
    {
      isSeparator: true
    },
    {
      title: 'Third action',
      onClick: (_event, rowId, _rowData, _extra) => console.log('clicked on Third action, on row: ', rowId)
    }
  ];

  const measurementCache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: 44,
    keyMapper: (rowIndex) => rowIndex
  });

  const rowRenderer = ({ index: rowIndex, _isScrolling, key, style, parent }) => (
    <CellMeasurer cache={measurementCache} columnIndex={0} key={key} parent={parent} rowIndex={rowIndex}>
      <Tr resetOffset style={style}>
        {columns.map((col, index) => (
          <Td key={`${rowIndex}-${index + 1}`}>{rows[rowIndex].cells[index]}</Td>
        ))}
        <Td isActionCell>
          <ActionsColumn items={actions} isDisabled={rows[rowIndex].disableActions} />
        </Td>
      </Tr>
    </CellMeasurer>
  );

  return (
    <div aria-label="Scrollable Table" className="pf-v6-c-scrollablegrid">
      <Table gridBreakPoint={TableGridBreakpoint.none} aria-rowcount={rows.length} variant="compact">
        <Caption>Actions VirtualizedTable</Caption>
        <Thead>
          <Tr>
            <Th key={0}>{columns[0]}</Th>
            <Th key={1}>{columns[1]}</Th>
            <Th key={2}>{columns[2]}</Th>
            <Th key={3}>{columns[3]}</Th>
            <Th key={4}>{columns[4]}</Th>
            <Td isActionCell></Td>
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
          />
        )}
      </AutoSizer>
    </div>
  );
};
