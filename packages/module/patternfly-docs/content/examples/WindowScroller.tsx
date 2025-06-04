import { useState, useEffect } from 'react';
import { CellMeasurerCache, CellMeasurer } from 'react-virtualized';
import { AutoSizer, VirtualTableBody, WindowScroller } from '@patternfly/react-virtualized-extension';
import { Table, Thead, Tr, Th, Td, Caption, TableGridBreakpoint } from '@patternfly/react-table';

export const WindowScrollerExample = () => {
  const [scrollableElement, setScrollableElement] = useState<HTMLElement>();
  useEffect(() => {
    const scrollableElement = document.getElementById('content-scrollable-2') as HTMLElement;
    setScrollableElement(scrollableElement);
  }, []);

  // this StringArray type is just needed because something in our documentation framework crashes when it encounters
  // a string[][] type
  type StringArray = string[];
  const rows: StringArray[] = [];

  for (let i = 0; i < 100000; i++) {
    const cells: string[] = [];
    const num = Math.floor(Math.random() * Math.floor(2)) + 1;
    for (let j = 0; j < 5; j++) {
      const cellValue = i.toString() + ' Arma virumque cano Troiae qui primus ab oris. '.repeat(num);
      cells.push(cellValue);
    }
    rows.push(cells);
  }

  const columns = ['Repositories', 'Branches', 'Pull requests', 'Workspaces', 'Last Commit'];
  const scrollToIndex = -1; // can be used to programmatically set current index

  const measurementCache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: 44,
    keyMapper: (rowIndex) => rowIndex
  });

  const rowRenderer = ({ index: rowIndex, _isScrolling, key, style, parent }) => {
    const text = rows[rowIndex][0];

    return (
      <CellMeasurer cache={measurementCache} columnIndex={0} key={key} parent={parent} rowIndex={rowIndex}>
        <Tr style={style}>
          {columns.map((col, index) => (
            <Td key={`${rowIndex}-${++index}`}>{text}</Td>
          ))}
        </Tr>
      </CellMeasurer>
    );
  };

  interface ScrollableContainerStyle {
    height: number;
    overflowX: 'auto';
    overflowY: 'scroll';
    scrollBehavior: 'smooth';
    WebkitOverflowScrolling: 'touch';
    position: 'relative';
  }

  const scrollableContainerStyle: ScrollableContainerStyle = {
    height: 500 /* important note: the scrollable container should have some sort of fixed height, or it should be wrapped in container that is smaller than ReactVirtualized__VirtualGrid container and has overflow visible if using the Window Scroller. See WindowScroller.example.css */,
    overflowX: 'auto',
    overflowY: 'scroll',
    scrollBehavior: 'smooth',
    WebkitOverflowScrolling: 'touch',
    position: 'relative'
  };

  return (
    <div
      id="content-scrollable-2"
      aria-label="Scrollable Table"
      className="pf-v6-c-scrollablegrid"
      style={scrollableContainerStyle}
    >
      <Table gridBreakPoint={TableGridBreakpoint.none} aria-rowcount={rows.length}>
        <Caption>
          WindowScroller allows scrolling of a parent container or the window instead of tbody. It also can be used to
          dynamically size the table to the size of the scroll element.
        </Caption>
        <Thead>
          <Tr>
            {columns.map((col, index) => (
              <Th key={++index}>{col}</Th>
            ))}
          </Tr>
        </Thead>
      </Table>
      <WindowScroller scrollElement={scrollableElement}>
        {({ height, isScrolling, registerChild, onChildScroll, scrollTop }) => (
          <AutoSizer disableHeight>
            {({ width }) => (
              <div ref={registerChild as (element: HTMLDivElement | null) => void}>
                <VirtualTableBody
                  autoHeight
                  className={'pf-v6-c-table pf-v6-c-virtualized pf-v6-c-window-scroller'}
                  deferredMeasurementCache={measurementCache}
                  rowHeight={measurementCache.rowHeight}
                  height={height || 0}
                  isScrolling={isScrolling}
                  isScrollingOptOut={true}
                  onScroll={onChildScroll}
                  overscanRowCount={2}
                  columnCount={1}
                  rows={rows}
                  rowCount={rows.length}
                  rowRenderer={rowRenderer}
                  scrollToIndex={scrollToIndex}
                  scrollTop={scrollTop}
                  width={width}
                  role="grid"
                />
              </div>
            )}
          </AutoSizer>
        )}
      </WindowScroller>
    </div>
  );
};
