import { FunctionComponent, useState } from 'react';

import { CellMeasurerCache, CellMeasurer } from 'react-virtualized';
import { AutoSizer, VirtualTableBody } from '@patternfly/react-virtualized-extension';
import { Table, Thead, Tr, Th, Td, Caption, TableGridBreakpoint } from '@patternfly/react-table';

export const SelectableTableVirtualized: FunctionComponent = () => {
  // this StringArray type is just needed because something in our documentation framework crashes when it encounters
  // a string[][] type
  type StringArray = string[];
  const rows: StringArray[] = [];

  for (let i = 0; i < 100; i++) {
    rows.push([`one-${i}`, `two-${i}`, `three-${i}`, `four-${i}`, `five-${i}`]);
  }

  const selectableRepos = rows;

  const [selectedRepoNames, setSelectedRepoNames] = useState<string[]>([]);

  const setRepoSelected = (repo: string, isSelecting = true) =>
    setSelectedRepoNames((prevSelected) => {
      const otherSelectedRepoNames = prevSelected.filter((r) => r !== repo);
      return isSelecting ? [...otherSelectedRepoNames, repo] : otherSelectedRepoNames;
    });

  const columns = ['Repositories', 'Branches', 'Pull requests', 'Workspaces', 'Last Commit'];

  const selectAllRepos = (isSelecting = true) => setSelectedRepoNames(isSelecting ? rows.map((item) => item[0]) : []);

  const areAllReposSelected = selectedRepoNames.length === selectableRepos.length;
  const isRepoSelected = (repo: string) => selectedRepoNames.includes(repo);

  const [recentSelectedRowIndex, setRecentSelectedRowIndex] = useState<number | null>(null);

  const onSelectRepo = (repo: string, rowIndex: number, isSelecting: boolean) => {
    if (recentSelectedRowIndex !== null) {
      const numberSelected = rowIndex - recentSelectedRowIndex;
      const intermediateIndexes =
        numberSelected > 0
          ? Array.from(new Array(numberSelected + 1), (_x, i) => i + recentSelectedRowIndex)
          : Array.from(new Array(Math.abs(numberSelected) + 1), (_x, i) => i + rowIndex);
      intermediateIndexes.forEach(() => setRepoSelected(repo, isSelecting));
    } else {
      setRepoSelected(repo, isSelecting);
    }
    setRecentSelectedRowIndex(rowIndex);
  };

  const measurementCache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: 44,
    keyMapper: (rowIndex) => rowIndex
  });

  const rowRenderer = ({ index: rowIndex, _isScrolling, key, style, parent }) => (
    <CellMeasurer cache={measurementCache} columnIndex={0} key={key} parent={parent} rowIndex={rowIndex}>
      <Tr style={style}>
        <Td
          key={`${rowIndex}_0`}
          select={{
            rowIndex,
            onSelect: (_event, isSelecting) => onSelectRepo(rows[rowIndex][0], rowIndex, isSelecting),
            isSelected: isRepoSelected(rows[rowIndex][0])
          }}
        />
        {columns.map((col, index) => (
          <Td key={`${rowIndex}-${index + 1}`}>{rows[rowIndex][index]}</Td>
        ))}
      </Tr>
    </CellMeasurer>
  );

  return (
    <div aria-label="Scrollable Table" className="pf-v6-c-scrollablegrid">
      <Table gridBreakPoint={TableGridBreakpoint.none} aria-rowcount={rows.length}>
        <Caption>Selectable Virtualized Table</Caption>
        <Thead>
          <Tr>
            <Th
              select={{
                onSelect: (_event, isSelecting) => selectAllRepos(isSelecting),
                isSelected: areAllReposSelected
              }}
            />
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
