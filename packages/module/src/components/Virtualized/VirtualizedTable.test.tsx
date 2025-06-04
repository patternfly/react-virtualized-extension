import { render } from '@testing-library/react';
import {
	sortable
} from '@patternfly/react-table';
import {
	Table as TableDeprecated,
	TableHeader as TableHeaderDeprecated
} from '@patternfly/react-table/deprecated';
import { VirtualTableBody } from './index';
import { rows, columns, actions } from './testDataSets';
import { CellMeasurerCache } from 'react-virtualized';

const measurementCache = new CellMeasurerCache({
  fixedWidth: true,
  minHeight: 44,
  keyMapper: (rowIndex: any) => rowIndex
});

describe('Simple virtualized table', () => {
  const rowRenderer = () => {};

  test('className', () => {
    const { asFragment } = render(
      <TableDeprecated aria-label="Virtual Table Test" cells={columns} rows={rows}>
        <TableHeaderDeprecated />
        {({ width }: { width: number }) => (
          <VirtualTableBody
            className="pf-v6-c-table pf-v6-c-virtualized pf-v6-c-window-scroller"
            deferredMeasurementCache={measurementCache}
            height={400}
            rowCount={rows.length}
            rowHeight={measurementCache.rowHeight}
            rows={rows}
            width={width}
            rowRenderer={rowRenderer}
          />
        )}
      </TableDeprecated>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('aria-label', () => {
    const { asFragment } = render(
      <TableDeprecated aria-label="Virtual Table Test" cells={columns} rows={rows}>
        <TableHeaderDeprecated />
        {({ width }: { width: number }) => (
          <VirtualTableBody
            aria-label="Aria labeled"
            height={400}
            rowCount={rows.length}
            rowHeight={measurementCache.rowHeight}
            rowRenderer={rowRenderer}
            rows={rows}
            width={width}
          />
        )}
      </TableDeprecated>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

test('Sortable Virtualized Table', () => {
  const rowRenderer = () => {};

  const onSortCall = () => undefined as any;
  columns[0] = { ...(columns[0] as any), transforms: [sortable] };
  const { asFragment } = render(
    <TableDeprecated aria-label="Aria labeled" onSort={onSortCall} sortBy={{}} cells={columns} rows={rows}>
      <TableHeaderDeprecated />
      {({ width }: { width: number }) => (
        <VirtualTableBody
          height={400}
          rowCount={rows.length}
          rowHeight={measurementCache.rowHeight}
          rowRenderer={rowRenderer}
          rows={rows}
          width={width}
        />
      )}
    </TableDeprecated>
  );
  expect(asFragment()).toMatchSnapshot();
});

test('Simple Actions table', () => {
  const rowRenderer = () => {};

  const rowsWithDisabledAction = [
    ...rows,
    {
      cells: ['one', 'two', 'three', 'four', 'five'],
      disableActions: true
    }
  ];

  const { asFragment } = render(
    <TableDeprecated aria-label="Aria labeled" actions={actions} cells={columns} rows={rowsWithDisabledAction}>
      <TableHeaderDeprecated />
      {({ width }: { width: number }) => (
        <VirtualTableBody
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
    </TableDeprecated>
  );
  expect(asFragment()).toMatchSnapshot();
});

test('Actions virtualized table', () => {
  const rowRenderer = () => {};

  const { asFragment } = render(
    <TableDeprecated
      aria-label="Aria labeled"
      actionResolver={() => actions}
      areActionsDisabled={() => false}
      cells={columns}
      rows={rows}
    >
      <TableHeaderDeprecated />
      {({ width }: { width: number }) => (
        <VirtualTableBody
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
    </TableDeprecated>
  );
  expect(asFragment()).toMatchSnapshot();
});

test('Selectable virtualized table', () => {
  const rowRenderer = () => {};

  const onSelect = () => undefined as any;
  const { asFragment } = render(
    <TableDeprecated aria-label="Aria labeled" onSelect={onSelect} cells={columns} rows={rows}>
      <TableHeaderDeprecated />
      {(width: number) => (
        <VirtualTableBody
          height={400}
          rowCount={rows.length}
          rowHeight={measurementCache.rowHeight}
          rowRenderer={rowRenderer}
          rows={rows}
          width={width}
        />
      )}
    </TableDeprecated>
  );
  expect(asFragment()).toMatchSnapshot();
});
