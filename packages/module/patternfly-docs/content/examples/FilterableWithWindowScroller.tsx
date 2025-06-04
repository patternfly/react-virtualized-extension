import { CellMeasurerCache, CellMeasurer } from 'react-virtualized';
import { AutoSizer, VirtualTableBody, WindowScroller } from '@patternfly/react-virtualized-extension';
import { Table, Thead, Tr, Th, Td, TableGridBreakpoint, ActionsColumn, Tbody } from '@patternfly/react-table';
import {
  SelectOption,
  ToolbarItem,
  Select,
  MenuToggleElement,
  MenuToggle,
  ToolbarFilter,
  SearchInput,
  Badge,
  Toolbar,
  ToolbarContent,
  ToolbarToggleGroup,
  ToolbarGroup,
  ToolbarLabelGroup,
  Button,
  EmptyState,
  EmptyStateActions,
  EmptyStateBody,
  EmptyStateFooter,
  EmptyStateVariant,
  Bullseye
} from '@patternfly/react-core';
import { FilterIcon, SearchIcon } from '@patternfly/react-icons';
import { Fragment, useEffect, useState, CSSProperties, Ref, MouseEvent as ReactMouseEvent, SyntheticEvent, KeyboardEvent as ReactKeyboardEvent } from 'react';

export const ComposableTableWindowScroller = () => {
  const [scrollableElement, setScrollableElement] = useState<HTMLElement>();
  useEffect(() => {
    const scrollableElement = document.getElementById('content-scrollable-2') as HTMLElement;
    setScrollableElement(scrollableElement);
  }, []);

  interface DataType {
    cells: (string | number)[];
    id: string;
    disableActions: boolean;
  }

  const rows: DataType[] = [];
  for (let i = 0; i < 100; i++) {
    if (i % 2 === 0) {
      rows.push({
        disableActions: false,
        id: `actions-row-${i}`,
        cells: [`US-Node ${i}`, i, i, 'Down', 'Brno']
      });
    } else if (i % 3 === 0) {
      rows.push({
        disableActions: false,
        id: `actions-row-${i}`,
        cells: [`CN-Node ${i}`, i, i, 'Running', 'Westford']
      });
    } else {
      rows.push({
        disableActions: true,
        id: `actions-row-${i}`,
        cells: [`US-Node ${i}`, i, i, 'Stopped', 'Raleigh']
      });
    }
  }

  const actions = [
    {
      title: 'Some action',
      // eslint-disable-next-line no-console
      onClick: (_event, rowId, _rowData, _extra) => console.log('clicked on Some action, on row: ', rowId)
    },
    {
      title: <div>Another action</div>,
      // eslint-disable-next-line no-console
      onClick: (_event, rowId, _rowData, _extra) => console.log('clicked on Another action, on row: ', rowId)
    },
    {
      isSeparator: true
    },
    {
      title: 'Third action',
      // eslint-disable-next-line no-console
      onClick: (_event, rowId, _rowData, _extra) => console.log('clicked on Third action, on row: ', rowId)
    }
  ];

  const columns = ['Servers', 'Threads', 'Applications', 'Status', 'Location'];
  const scrollToIndex = -1; // can be used to programmatically set current index

  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('Name');
  const [filters, setFilters] = useState<Record<string, string[]>>({ location: [], name: [], status: [] });
  const [inputValue, setInputValue] = useState('');

  const onDelete = (type: string | ToolbarLabelGroup, id: string) => {
    if (type === 'Location') {
      setFilters({
        ...filters,
        location: filters.location.filter((fil: string) => fil !== id)
      });
    } else if (type === 'Name') {
      setFilters({
        ...filters,
        name: filters.name.filter((fil: string) => fil !== id)
      });
    } else if (type === 'Status') {
      setFilters({
        ...filters,
        status: filters.status.filter((fil: string) => fil !== id)
      });
    } else {
      setFilters({ location: [], name: [], status: [] });
    }
  };

  const onCategoryToggle = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  };

  const onCategorySelect = (event) => {
    setCurrentCategory(event.target.innerText);
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  };

  const onFilterToggle = () => {
    setIsFilterDropdownOpen(!isFilterDropdownOpen);
  };

  const onInputChange = (newValue: string) => {
    setInputValue(newValue);
  };

  const onStatusSelect = (event: ReactMouseEvent<Element, MouseEvent> | undefined, selection: string | number | undefined) => {
    const checked = (event?.target as HTMLInputElement).checked;
    setFilters({
      ...filters,
      status: (checked && selection) ? [...filters.status, `${selection}`] : filters.status.filter((value) => value !== selection)
    });
    setIsFilterDropdownOpen(false);
  };

  const onNameInput = (event: SyntheticEvent<HTMLButtonElement> | ReactKeyboardEvent) => {
    setIsCategoryDropdownOpen(false);
    const pressedKey = (event as ReactKeyboardEvent).key;
    if (pressedKey && pressedKey !== 'Enter') {
      return;
    }

    const prevFilters = filters.name;
    setFilters({ ...filters, name: prevFilters.includes(inputValue) ? prevFilters : [...prevFilters, inputValue] });
  };

  const onFilterSelect = () => {
    setIsFilterDropdownOpen(!isFilterDropdownOpen);
    setIsCategoryDropdownOpen(false);
  };

  const onLocationSelect = (_event: ReactMouseEvent<Element, MouseEvent> | undefined, selection: string | number | undefined) => {
    setFilters({ ...filters, location: [`${selection}`] });

    setIsFilterDropdownOpen(false);
    onFilterSelect();
  };

  const buildCategoryDropdown = () => {
    const categoryMenuItems = [
      <SelectOption key="cat1" value="Location">
        Location
      </SelectOption>,
      <SelectOption key="cat2" value="Name">
        Name
      </SelectOption>,
      <SelectOption key="cat3" value="Status">
        Status
      </SelectOption>
    ];

    return (
      <ToolbarItem>
        <Select
          onSelect={onCategorySelect}
          selected={currentCategory}
          toggle={(toggleRef: Ref<MenuToggleElement>) => (
            <MenuToggle
              ref={toggleRef}
              onClick={onCategoryToggle}
              isExpanded={isCategoryDropdownOpen}
              icon={<FilterIcon />}
              style={
                {
                  width: '100%',
                  verticalAlign: 'text-bottom'
                } as CSSProperties
              }
            >
              {currentCategory}
            </MenuToggle>
          )}
          isOpen={isCategoryDropdownOpen}
        >
          {categoryMenuItems}
        </Select>
      </ToolbarItem>
    );
  };

  const buildFilterDropdown = () => {
    const locationMenuItems = [
      <SelectOption key="raleigh" value="Raleigh">
        Raleigh
      </SelectOption>,
      <SelectOption key="westford" value="Westford">
        Westford
      </SelectOption>,
      <SelectOption key="boston" value="Boston">
        Boston
      </SelectOption>,
      <SelectOption key="brno" value="Brno">
        Brno
      </SelectOption>,
      <SelectOption key="bEmptyStateHeadangalore" value="Bangalore">
        Bangalore
      </SelectOption>
    ];

    const statusMenuItems = [
      <SelectOption hasCheckbox key="statusRunning" value="Running" isSelected={filters.status.includes('Running')}>
        Running
      </SelectOption>,
      <SelectOption hasCheckbox key="statusStopped" value="Stopped" isSelected={filters.status.includes('Stopped')}>
        Stopped
      </SelectOption>,
      <SelectOption hasCheckbox key="statusDown" value="Down" isSelected={filters.status.includes('Down')}>
        Down
      </SelectOption>,
      <SelectOption hasCheckbox key="statusDegraded" value="Degraded" isSelected={filters.status.includes('Degraded')}>
        Degraded
      </SelectOption>,
      <SelectOption
        hasCheckbox
        key="statusMaint"
        value="Needs maintenance"
        isSelected={filters.status.includes('Needs maintenance')}
      >
        Needs maintenance
      </SelectOption>
    ];

    return (
      <Fragment>
        <ToolbarFilter
          labels={filters.location}
          deleteLabel={(category, chip) => onDelete(category, chip as string)}
          categoryName="Location"
          showToolbarItem={currentCategory === 'Location'}
        >
          <Select
            aria-label="Location"
            onSelect={onLocationSelect}
            selected={filters.location[0]}
            isOpen={isFilterDropdownOpen}
            popperProps={{ minWidth: '100px' }}
            toggle={(toggleRef: Ref<MenuToggleElement>) => (
              <MenuToggle
                ref={toggleRef}
                onClick={onFilterToggle}
                isExpanded={isFilterDropdownOpen}
                style={
                  {
                    width: '100%',
                    verticalAlign: 'text-bottom'
                  } as CSSProperties
                }
              >
                {filters.location[0] || `Any`}
              </MenuToggle>
            )}
          >
            {locationMenuItems}
          </Select>
        </ToolbarFilter>
        <ToolbarFilter
          labels={filters.name}
          deleteLabel={(category, chip) => onDelete(category, chip as string)}
          categoryName="Name"
          showToolbarItem={currentCategory === 'Name'}
        >
          <SearchInput
            aria-label="name filter"
            placeholder="Filter by name..."
            onChange={(_event, value) => onInputChange(value)}
            value={inputValue}
            onClear={() => {
              onInputChange('');
            }}
            onSearch={onNameInput} // any typing is needed because of what I think is a bug in the SearchInput typing
          />
        </ToolbarFilter>
        <ToolbarFilter
          labels={filters.status}
          deleteLabel={(category, chip) => onDelete(category, chip as string)}
          categoryName="Status"
          showToolbarItem={currentCategory === 'Status'}
        >
          <Select
            aria-label="Status"
            isOpen={isFilterDropdownOpen}
            popperProps={{ minWidth: '100px' }}
            onSelect={onStatusSelect}
            selected={filters.status}
            toggle={(toggleRef: Ref<MenuToggleElement>) => (
              <MenuToggle
                ref={toggleRef}
                onClick={onFilterToggle}
                isExpanded={isFilterDropdownOpen}
                style={
                  {
                    width: '100%',
                    verticalAlign: 'text-bottom'
                  } as CSSProperties
                }
              >
                Filter by status
                {filters.status.length > 0 && <Badge isRead>{filters.status.length}</Badge>}
              </MenuToggle>
            )}
          >
            {statusMenuItems}
          </Select>
        </ToolbarFilter>
      </Fragment>
    );
  };

  const renderToolbar = () => (
    <Toolbar
      id="toolbar-with-chip-groups"
      clearAllFilters={() => setFilters({ location: [], name: [], status: [] })}
      collapseListedFiltersBreakpoint="xl"
    >
      <ToolbarContent>
        <ToolbarToggleGroup toggleIcon={<FilterIcon />} breakpoint="xl">
          <ToolbarGroup variant="filter-group">
            {buildCategoryDropdown()}
            {buildFilterDropdown()}
          </ToolbarGroup>
        </ToolbarToggleGroup>
      </ToolbarContent>
    </Toolbar>
  );

  const measurementCache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: 44,
    keyMapper: (rowIndex) => rowIndex
  });

  const filteredRows =
    filters.name.length > 0 || filters.location.length > 0 || filters.status.length > 0
      ? rows.filter(
          (row) =>
            (filters.name.length === 0 ||
              filters.name.some((name) => (row.cells[0] as string).toLowerCase().includes(name.toLowerCase()))) &&
            (filters.location.length === 0 || filters.location.includes(row.cells[4] as string)) &&
            (filters.status.length === 0 || filters.status.includes(row.cells[3] as string))
        )
      : rows;

  const emptyState = (
    <EmptyState variant={EmptyStateVariant.xs}
        titleText="Clear all filters and try again."
        headingLevel="h5"
        icon={SearchIcon}>
      <EmptyStateBody>No results match the filter criteria. Clear all filters and try again.</EmptyStateBody>
      <EmptyStateFooter>
        <EmptyStateActions>
          <Button
            variant="link"
            onClick={() => {
              setFilters({ location: [], name: [], status: [] });
            }}
          >
            Clear all filters
          </Button>
        </EmptyStateActions>
      </EmptyStateFooter>
    </EmptyState>
  );

  const rowRenderer = ({ index: rowIndex, _isScrolling, key, style, parent }) => (
    <CellMeasurer cache={measurementCache} columnIndex={0} key={key} parent={parent} rowIndex={rowIndex}>
      <Tr style={style}>
        {columns.map((col, index) => (
          <Td key={`${rowIndex}-${index}`}>{filteredRows[rowIndex].cells[index]}</Td>
        ))}
        <Td isActionCell>
          <ActionsColumn
            items={actions}
            isDisabled={filteredRows[rowIndex].disableActions} // Also arbitrary for the example
          />
        </Td>
      </Tr>
    </CellMeasurer>
  );

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
      {renderToolbar()}
      <Table gridBreakPoint={TableGridBreakpoint.none} aria-rowcount={rows.length}>
        <Thead>
          <Tr>
            {columns.map((col, index) => (
              <Th key={index}>{col}</Th>
            ))}
            <Td isActionCell></Td>
          </Tr>
        </Thead>
        {filteredRows.length === 0 && (
          <Tbody>
            <Tr>
              <Td colSpan={8}>
                <Bullseye>{emptyState}</Bullseye>
              </Td>
            </Tr>
          </Tbody>
        )}
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
                  rows={filteredRows}
                  rowCount={filteredRows.length}
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
