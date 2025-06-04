import { createElement, Fragment } from 'react';
import { AutoLinkHeader, Example, Link as PatternflyThemeLink } from '@patternfly/documentation-framework/components';
import SearchIcon from '@patternfly/react-icons/dist/esm/icons/search-icon';
import FilterIcon from '@patternfly/react-icons/dist/esm/icons/filter-icon';
import { CellMeasurerCache, CellMeasurer} from 'react-virtualized';
import { AutoSizer, VirtualTableBody, WindowScroller } from '@patternfly/react-virtualized-extension';
import { Table as TableDeprecated, TableHeader as TableHeaderDeprecated } from '@patternfly/react-table/deprecated';
import { Table, Thead, Tr, Th, Td, Caption, TableGridBreakpoint } from '@patternfly/react-table';
import '../../../content/examples/./VirtualGrid.example.css';
const pageData = {
  "id": "Virtual scroll table",
  "section": "extensions",
  "subsection": "",
  "deprecated": false,
  "template": false,
  "beta": false,
  "demo": false,
  "newImplementationLink": false,
  "source": "react",
  "tabName": null,
  "slug": "/extensions/virtual-scroll-table/react",
  "sourceLink": "https://github.com/patternfly/react-virtualized-extension",
  "relPath": "packages/module/patternfly-docs/content/examples/VirtualizedTable.md",
  "propComponents": [
    {
      "name": "VirtualTableBody",
      "description": "It is inefficient to create and manage a large list of DOM elements within a scrolling container\nif only a few of those elements are visible. The primary purpose of this component is to improve\nperformance by only rendering the DOM nodes that a user is able to see based on their current\nscroll position.\n\nThis component renders a virtualized list of elements with either fixed or dynamic heights.",
      "props": [
        {
          "name": "aria-label",
          "type": "string",
          "description": ""
        },
        {
          "name": "autoHeight",
          "type": "boolean",
          "description": "Removes fixed height from the scrollingContainer so that the total height\nof rows can stretch the window. Intended for use with WindowScroller",
          "defaultValue": "false"
        },
        {
          "name": "className",
          "type": "string",
          "description": "Optional CSS class name"
        },
        {
          "name": "columnCount",
          "type": "number",
          "description": ""
        },
        {
          "name": "columns",
          "type": "any[]",
          "description": ""
        },
        {
          "name": "estimatedRowSize",
          "type": "number",
          "description": "Used to estimate the total height of a List before all of its rows have actually been measured.\nThe estimated total height is adjusted as rows are rendered.",
          "defaultValue": "30"
        },
        {
          "name": "height",
          "type": "number",
          "description": "Height constraint for list (determines how many actual rows are rendered)",
          "required": true
        },
        {
          "name": "innerScrollContainerComponent",
          "type": "No type info",
          "defaultValue": "'tbody'"
        },
        {
          "name": "noRowsRenderer",
          "type": "NoContentRenderer",
          "description": "Optional renderer to be used in place of rows when rowCount is 0",
          "defaultValue": "() => null as any"
        },
        {
          "name": "onRowsRendered",
          "type": "(params: any) => void",
          "description": "Callback invoked with information about the slice of rows that were just rendered.",
          "defaultValue": "() => {}"
        },
        {
          "name": "onScroll",
          "type": "(params: Scroll) => void",
          "description": "Callback invoked whenever the scroll offset changes within the inner scrollable region.\nThis callback can be used to sync scrolling between lists, tables, or grids.",
          "defaultValue": "() => {}"
        },
        {
          "name": "overscanIndicesGetter",
          "type": "OverscanIndicesGetter",
          "description": "See VirtualGrid#overscanIndicesGetter",
          "defaultValue": "accessibilityOverscanIndicesGetter"
        },
        {
          "name": "overscanRowCount",
          "type": "number",
          "description": "Number of rows to render above/below the visible bounds of the list.\nThese rows can help for smoother scrolling on touch devices.",
          "defaultValue": "10"
        },
        {
          "name": "rowCount",
          "type": "number",
          "description": "Number of rows in list.",
          "required": true
        },
        {
          "name": "rowHeight",
          "type": "CellSize",
          "description": "Either a fixed row height (number) or a function that returns the height of a row given its index.",
          "required": true
        },
        {
          "name": "rowRenderer",
          "type": "any",
          "description": "Responsible for rendering a row given an index; ({ index: number }): node",
          "required": true
        },
        {
          "name": "rows",
          "type": "any[]",
          "description": "",
          "required": true
        },
        {
          "name": "scrollContainerComponent",
          "type": "No type info",
          "defaultValue": "'table'"
        },
        {
          "name": "scrollToAlignment",
          "type": "Alignment",
          "description": "See VirtualGrid#scrollToAlignment",
          "defaultValue": "'auto'"
        },
        {
          "name": "scrollToIndex",
          "type": "number",
          "description": "Row index to ensure visible (by forcefully scrolling if necessary)",
          "defaultValue": "-1"
        },
        {
          "name": "scrollTop",
          "type": "number",
          "description": "Vertical offset."
        },
        {
          "name": "style",
          "type": "Object",
          "description": "",
          "defaultValue": "{}"
        },
        {
          "name": "tabIndex",
          "type": "number",
          "description": "Tab index for focus"
        },
        {
          "name": "width",
          "type": "number",
          "description": "Width of list",
          "required": true
        }
      ]
    }
  ],
  "examples": [
    "Basic",
    "Sortable",
    "Selectable",
    "Actions",
    "Filterable with WindowScroller"
  ]
};
pageData.liveContext = {
  SearchIcon,
  FilterIcon,
  CellMeasurerCache,
  CellMeasurer,
  AutoSizer,
  VirtualTableBody,
  WindowScroller,
  TableDeprecated,
  TableHeaderDeprecated,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Caption,
  TableGridBreakpoint
};
pageData.relativeImports = "import 'content/examples/./VirtualGrid.example.css';"
pageData.examples = {
  'Basic': props => 
    <Example {...pageData} {...props} {...{"code":"import React from 'react';\nimport { Caption, Table, TableGridBreakpoint, Td, Th, Thead, Tr } from '@patternfly/react-table';\nimport { CellMeasurerCache, CellMeasurer } from 'react-virtualized';\nimport { AutoSizer, VirtualTableBody } from '@patternfly/react-virtualized-extension';\n\nexport const VirtualizedExample: React.FunctionComponent = () => {\n  // this StringArray type is just needed because something in our documentation framework crashes when it encounters\n  // a string[][] type\n  type StringArray = string[];\n  const rows: StringArray[] = [];\n  for (let i = 0; i < 100; i++) {\n    rows.push([`one-${i}`, `two-${i}`, `three-${i}`, `four-${i}`, `five-${i}`]);\n  }\n\n  const columns = ['Repositories', 'Branches', 'Pull requests', 'Workspaces', 'Last Commit'];\n\n  const measurementCache = new CellMeasurerCache({\n    fixedWidth: true,\n    minHeight: 44,\n    keyMapper: (rowIndex) => rowIndex\n  });\n\n  const rowRenderer = ({ index: rowIndex, _isScrolling, key, style, parent }) => (\n    <CellMeasurer cache={measurementCache} columnIndex={0} key={key} parent={parent} rowIndex={rowIndex}>\n      <Tr style={style}>\n        {columns.map((col, index) => (\n          <Td key={`${rowIndex}-${index + 1}`}>{rows[rowIndex][index]}</Td>\n        ))}\n      </Tr>\n    </CellMeasurer>\n  );\n\n  return (\n    <div aria-label=\"Scrollable Table\" className=\"pf-v6-c-scrollablegrid\">\n      <Table gridBreakPoint={TableGridBreakpoint.none} aria-rowcount={rows.length}>\n        <Caption>Simple Table</Caption>\n        <Thead>\n          <Tr>\n            {columns.map((col, index) => (\n              <Th key={++index}>{col}</Th>\n            ))}\n          </Tr>\n        </Thead>\n      </Table>\n      <AutoSizer disableHeight>\n        {({ width }) => (\n          <VirtualTableBody\n            className=\"pf-v6-c-table pf-v6-c-virtualized pf-v6-c-window-scroller\"\n            deferredMeasurementCache={measurementCache}\n            rowHeight={measurementCache.rowHeight}\n            height={400}\n            overscanRowCount={2}\n            columnCount={1}\n            rows={rows}\n            rowCount={rows.length}\n            rowRenderer={rowRenderer}\n            width={width}\n            role=\"grid\"\n          />\n        )}\n      </AutoSizer>\n    </div>\n  );\n};\n","title":"Basic","lang":"js","className":""}}>
      
    </Example>,
  'Sortable': props => 
    <Example {...pageData} {...props} {...{"code":"import React from 'react';\nimport { Caption, Table, Td, Th, Thead, ThProps, Tr } from '@patternfly/react-table';\nimport { CellMeasurerCache, CellMeasurer } from 'react-virtualized';\nimport { AutoSizer, VirtualTableBody } from '@patternfly/react-virtualized-extension';\n\nexport const SortableExample: React.FunctionComponent = () => {\n  const rows: { id: string; cells: string[] }[] = [];\n  for (let i = 0; i < 100; i++) {\n    rows.push({\n      id: `sortable-row-${i}`,\n      cells: [`one-${i}`, `two-${i}`, `three-${i}`, `four-${i}`, `five-${i}`]\n    });\n  }\n\n  const columns = ['Repositories', 'Branches', 'Pull requests', 'Workspaces', 'Last Commit'];\n\n  const [activeSortIndex, setActiveSortIndex] = React.useState<number>(-1);\n\n  // Sort direction of the currently sorted column\n  const [activeSortDirection, setActiveSortDirection] = React.useState<'asc' | 'desc' | undefined>();\n\n  const getRowIndex = (str: string) => Number(str?.split('-')[1]);\n\n  const getSortParams = (columnIndex: number): ThProps['sort'] => ({\n    sortBy: {\n      index: activeSortIndex,\n      direction: activeSortDirection\n    },\n    onSort: (_event, index, direction) => {\n      setActiveSortIndex(index);\n      setActiveSortDirection(direction as 'desc' | 'asc');\n    },\n    columnIndex\n  });\n\n  if (activeSortIndex !== null) {\n    rows.sort((a, b) => {\n      const aValue = a.cells[activeSortIndex];\n      const bValue = b.cells[activeSortIndex];\n\n      const aValueIndex = getRowIndex(aValue);\n      const bValueIndex = getRowIndex(bValue);\n\n      if (activeSortDirection === 'asc') {\n        return aValueIndex - bValueIndex;\n      }\n\n      return bValueIndex - aValueIndex;\n    });\n  }\n\n  const measurementCache = new CellMeasurerCache({\n    fixedWidth: true,\n    minHeight: 44,\n    keyMapper: (rowIndex) => rowIndex\n  });\n\n  const rowRenderer = ({ index: rowIndex, _isScrolling, key, style, parent }) => (\n    <CellMeasurer cache={measurementCache} columnIndex={0} key={key} parent={parent} rowIndex={rowIndex}>\n      <Tr style={style}>\n        {columns.map((col, index) => (\n          <Td key={`${rowIndex}-${index + 1}`}>{rows[rowIndex].cells[index]}</Td>\n        ))}\n      </Tr>\n    </CellMeasurer>\n  );\n  return (\n    <div aria-label=\"Scrollable Table\" className=\"pf-v6-c-scrollablegrid\">\n      <Table aria-label=\"Sortable table\" ouiaId=\"SortableTable\">\n        <Caption>Sortable Virtualized Table</Caption>\n        <Thead>\n          <Tr>\n            <Th sort={getSortParams(0)}>{columns[0]}</Th>\n            <Th>{columns[1]}</Th>\n            <Th sort={getSortParams(2)}>{columns[2]}</Th>\n            <Th>{columns[3]}</Th>\n            <Th>{columns[4]}</Th>\n          </Tr>\n        </Thead>\n      </Table>\n      <AutoSizer disableHeight>\n        {({ width }) => (\n          <VirtualTableBody\n            ref={(ref) => ref}\n            className=\"pf-v6-c-table pf-v6-c-virtualized pf-v6-c-window-scroller\"\n            deferredMeasurementCache={measurementCache}\n            rowHeight={measurementCache.rowHeight}\n            height={400}\n            overscanRowCount={2}\n            columnCount={1}\n            rows={rows}\n            rowCount={rows.length}\n            rowRenderer={rowRenderer}\n            width={width}\n            role=\"grid\"\n          />\n        )}\n      </AutoSizer>\n    </div>\n  );\n};\n","title":"Sortable","lang":"js","className":""}}>
      
    </Example>,
  'Selectable': props => 
    <Example {...pageData} {...props} {...{"code":"import React from 'react';\n\nimport { CellMeasurerCache, CellMeasurer } from 'react-virtualized';\nimport { AutoSizer, VirtualTableBody } from '@patternfly/react-virtualized-extension';\nimport { Table, Thead, Tr, Th, Td, Caption, TableGridBreakpoint } from '@patternfly/react-table';\n\nexport const SelectableTableVirtualized: React.FunctionComponent = () => {\n  // this StringArray type is just needed because something in our documentation framework crashes when it encounters\n  // a string[][] type\n  type StringArray = string[];\n  const rows: StringArray[] = [];\n\n  for (let i = 0; i < 100; i++) {\n    rows.push([`one-${i}`, `two-${i}`, `three-${i}`, `four-${i}`, `five-${i}`]);\n  }\n\n  const selectableRepos = rows;\n\n  const [selectedRepoNames, setSelectedRepoNames] = React.useState<string[]>([]);\n\n  const setRepoSelected = (repo: string, isSelecting = true) =>\n    setSelectedRepoNames((prevSelected) => {\n      const otherSelectedRepoNames = prevSelected.filter((r) => r !== repo);\n      return isSelecting ? [...otherSelectedRepoNames, repo] : otherSelectedRepoNames;\n    });\n\n  const columns = ['Repositories', 'Branches', 'Pull requests', 'Workspaces', 'Last Commit'];\n\n  const selectAllRepos = (isSelecting = true) => setSelectedRepoNames(isSelecting ? rows.map((item) => item[0]) : []);\n\n  const areAllReposSelected = selectedRepoNames.length === selectableRepos.length;\n  const isRepoSelected = (repo: string) => selectedRepoNames.includes(repo);\n\n  const [recentSelectedRowIndex, setRecentSelectedRowIndex] = React.useState<number | null>(null);\n\n  const onSelectRepo = (repo: string, rowIndex: number, isSelecting: boolean) => {\n    if (recentSelectedRowIndex !== null) {\n      const numberSelected = rowIndex - recentSelectedRowIndex;\n      const intermediateIndexes =\n        numberSelected > 0\n          ? Array.from(new Array(numberSelected + 1), (_x, i) => i + recentSelectedRowIndex)\n          : Array.from(new Array(Math.abs(numberSelected) + 1), (_x, i) => i + rowIndex);\n      intermediateIndexes.forEach(() => setRepoSelected(repo, isSelecting));\n    } else {\n      setRepoSelected(repo, isSelecting);\n    }\n    setRecentSelectedRowIndex(rowIndex);\n  };\n\n  const measurementCache = new CellMeasurerCache({\n    fixedWidth: true,\n    minHeight: 44,\n    keyMapper: (rowIndex) => rowIndex\n  });\n\n  const rowRenderer = ({ index: rowIndex, _isScrolling, key, style, parent }) => (\n    <CellMeasurer cache={measurementCache} columnIndex={0} key={key} parent={parent} rowIndex={rowIndex}>\n      <Tr style={style}>\n        <Td\n          key={`${rowIndex}_0`}\n          select={{\n            rowIndex,\n            onSelect: (_event, isSelecting) => onSelectRepo(rows[rowIndex][0], rowIndex, isSelecting),\n            isSelected: isRepoSelected(rows[rowIndex][0])\n          }}\n        />\n        {columns.map((col, index) => (\n          <Td key={`${rowIndex}-${index + 1}`}>{rows[rowIndex][index]}</Td>\n        ))}\n      </Tr>\n    </CellMeasurer>\n  );\n\n  return (\n    <div aria-label=\"Scrollable Table\" className=\"pf-v6-c-scrollablegrid\">\n      <Table gridBreakPoint={TableGridBreakpoint.none} aria-rowcount={rows.length}>\n        <Caption>Selectable Virtualized Table</Caption>\n        <Thead>\n          <Tr>\n            <Th\n              select={{\n                onSelect: (_event, isSelecting) => selectAllRepos(isSelecting),\n                isSelected: areAllReposSelected\n              }}\n            />\n            {columns.map((col, index) => (\n              <Th key={++index}>{col}</Th>\n            ))}\n          </Tr>\n        </Thead>\n      </Table>\n      <AutoSizer disableHeight>\n        {({ width }) => (\n          <VirtualTableBody\n            className=\"pf-v6-c-table pf-v6-c-virtualized pf-v6-c-window-scroller\"\n            deferredMeasurementCache={measurementCache}\n            rowHeight={measurementCache.rowHeight}\n            height={400}\n            overscanRowCount={2}\n            columnCount={1}\n            rows={rows}\n            rowCount={rows.length}\n            rowRenderer={rowRenderer}\n            width={width}\n            role=\"grid\"\n          />\n        )}\n      </AutoSizer>\n    </div>\n  );\n};\n","title":"Selectable","lang":"js","className":""}}>
      
    </Example>,
  'Actions': props => 
    <Example {...pageData} {...props} {...{"code":"/* eslint-disable no-console */\nimport React from 'react';\nimport {\n  ActionsColumn,\n  Caption,\n  IActions,\n  Table,\n  TableGridBreakpoint,\n  Td,\n  Th,\n  Thead,\n  Tr\n} from '@patternfly/react-table';\nimport { CellMeasurerCache, CellMeasurer } from 'react-virtualized';\nimport { AutoSizer, VirtualTableBody } from '@patternfly/react-virtualized-extension';\n\nexport const ActionsExample: React.FunctionComponent = () => {\n  interface RowType {\n    disableActions: boolean;\n    id: string;\n    cells: string[];\n  }\n\n  const rows: RowType[] = [];\n  for (let i = 0; i < 100; i++) {\n    rows.push({\n      disableActions: i % 3 === 2,\n      id: `actions-row-${i}`,\n      cells: [`one-${i}`, `two-${i}`, `three-${i}`, `four-${i}`, `five-${i}`]\n    });\n  }\n\n  const columns = ['Name', 'Namespace', 'Labels', 'Status', 'Pod Selector'];\n\n  const actions: IActions = [\n    {\n      title: 'Some action',\n      onClick: (_event, rowId, _rowData, _extra) => console.log('clicked on Some action, on row: ', rowId)\n    },\n    {\n      title: <div>Another action</div>,\n      onClick: (_event, rowId, _rowData, _extra) => console.log('clicked on Another action, on row: ', rowId)\n    },\n    {\n      isSeparator: true\n    },\n    {\n      title: 'Third action',\n      onClick: (_event, rowId, _rowData, _extra) => console.log('clicked on Third action, on row: ', rowId)\n    }\n  ];\n\n  const measurementCache = new CellMeasurerCache({\n    fixedWidth: true,\n    minHeight: 44,\n    keyMapper: (rowIndex) => rowIndex\n  });\n\n  const rowRenderer = ({ index: rowIndex, _isScrolling, key, style, parent }) => (\n    <CellMeasurer cache={measurementCache} columnIndex={0} key={key} parent={parent} rowIndex={rowIndex}>\n      <Tr resetOffset style={style}>\n        {columns.map((col, index) => (\n          <Td key={`${rowIndex}-${index + 1}`}>{rows[rowIndex].cells[index]}</Td>\n        ))}\n        <Td isActionCell>\n          <ActionsColumn items={actions} isDisabled={rows[rowIndex].disableActions} />\n        </Td>\n      </Tr>\n    </CellMeasurer>\n  );\n\n  return (\n    <div aria-label=\"Scrollable Table\" className=\"pf-v6-c-scrollablegrid\">\n      <Table gridBreakPoint={TableGridBreakpoint.none} aria-rowcount={rows.length} variant=\"compact\">\n        <Caption>Actions VirtualizedTable</Caption>\n        <Thead>\n          <Tr>\n            <Th key={0}>{columns[0]}</Th>\n            <Th key={1}>{columns[1]}</Th>\n            <Th key={2}>{columns[2]}</Th>\n            <Th key={3}>{columns[3]}</Th>\n            <Th key={4}>{columns[4]}</Th>\n            <Td isActionCell></Td>\n          </Tr>\n        </Thead>\n      </Table>\n      <AutoSizer disableHeight>\n        {({ width }) => (\n          <VirtualTableBody\n            className=\"pf-v6-c-table pf-v6-c-virtualized pf-v6-c-window-scroller\"\n            deferredMeasurementCache={measurementCache}\n            rowHeight={measurementCache.rowHeight}\n            height={400}\n            overscanRowCount={2}\n            columnCount={1}\n            rows={rows}\n            rowCount={rows.length}\n            rowRenderer={rowRenderer}\n            width={width}\n          />\n        )}\n      </AutoSizer>\n    </div>\n  );\n};\n","title":"Actions","lang":"js","className":""}}>
      
    </Example>,
  'Filterable with WindowScroller': props => 
    <Example {...pageData} {...props} {...{"code":"import React from 'react';\nimport { CellMeasurerCache, CellMeasurer } from 'react-virtualized';\nimport { AutoSizer, VirtualTableBody, WindowScroller } from '@patternfly/react-virtualized-extension';\nimport { Table, Thead, Tr, Th, Td, TableGridBreakpoint, ActionsColumn, Tbody } from '@patternfly/react-table';\nimport {\n  SelectOption,\n  ToolbarItem,\n  Select,\n  MenuToggleElement,\n  MenuToggle,\n  ToolbarFilter,\n  SearchInput,\n  Badge,\n  Toolbar,\n  ToolbarContent,\n  ToolbarToggleGroup,\n  ToolbarGroup,\n  ToolbarLabelGroup,\n  Button,\n  EmptyState,\n  EmptyStateActions,\n  EmptyStateBody,\n  EmptyStateFooter,\n  EmptyStateVariant,\n  Bullseye\n} from '@patternfly/react-core';\nimport { FilterIcon, SearchIcon } from '@patternfly/react-icons';\n\nexport const ComposableTableWindowScroller = () => {\n  const [scrollableElement, setScrollableElement] = React.useState<HTMLElement>();\n  React.useEffect(() => {\n    const scrollableElement = document.getElementById('content-scrollable-2') as HTMLElement;\n    setScrollableElement(scrollableElement);\n  }, []);\n\n  interface DataType {\n    cells: (string | number)[];\n    id: string;\n    disableActions: boolean;\n  }\n\n  const rows: DataType[] = [];\n  for (let i = 0; i < 100; i++) {\n    if (i % 2 === 0) {\n      rows.push({\n        disableActions: false,\n        id: `actions-row-${i}`,\n        cells: [`US-Node ${i}`, i, i, 'Down', 'Brno']\n      });\n    } else if (i % 3 === 0) {\n      rows.push({\n        disableActions: false,\n        id: `actions-row-${i}`,\n        cells: [`CN-Node ${i}`, i, i, 'Running', 'Westford']\n      });\n    } else {\n      rows.push({\n        disableActions: true,\n        id: `actions-row-${i}`,\n        cells: [`US-Node ${i}`, i, i, 'Stopped', 'Raleigh']\n      });\n    }\n  }\n\n  const actions = [\n    {\n      title: 'Some action',\n      // eslint-disable-next-line no-console\n      onClick: (_event, rowId, _rowData, _extra) => console.log('clicked on Some action, on row: ', rowId)\n    },\n    {\n      title: <div>Another action</div>,\n      // eslint-disable-next-line no-console\n      onClick: (_event, rowId, _rowData, _extra) => console.log('clicked on Another action, on row: ', rowId)\n    },\n    {\n      isSeparator: true\n    },\n    {\n      title: 'Third action',\n      // eslint-disable-next-line no-console\n      onClick: (_event, rowId, _rowData, _extra) => console.log('clicked on Third action, on row: ', rowId)\n    }\n  ];\n\n  const columns = ['Servers', 'Threads', 'Applications', 'Status', 'Location'];\n  const scrollToIndex = -1; // can be used to programmatically set current index\n\n  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = React.useState(false);\n  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = React.useState(false);\n  const [currentCategory, setCurrentCategory] = React.useState('Name');\n  const [filters, setFilters] = React.useState<Record<string, string[]>>({ location: [], name: [], status: [] });\n  const [inputValue, setInputValue] = React.useState('');\n\n  const onDelete = (type: string | ToolbarLabelGroup, id: string) => {\n    if (type === 'Location') {\n      setFilters({\n        ...filters,\n        location: filters.location.filter((fil: string) => fil !== id)\n      });\n    } else if (type === 'Name') {\n      setFilters({\n        ...filters,\n        name: filters.name.filter((fil: string) => fil !== id)\n      });\n    } else if (type === 'Status') {\n      setFilters({\n        ...filters,\n        status: filters.status.filter((fil: string) => fil !== id)\n      });\n    } else {\n      setFilters({ location: [], name: [], status: [] });\n    }\n  };\n\n  const onCategoryToggle = () => {\n    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);\n  };\n\n  const onCategorySelect = (event) => {\n    setCurrentCategory(event.target.innerText);\n    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);\n  };\n\n  const onFilterToggle = () => {\n    setIsFilterDropdownOpen(!isFilterDropdownOpen);\n  };\n\n  const onInputChange = (newValue: string) => {\n    setInputValue(newValue);\n  };\n\n  const onStatusSelect = (event: React.MouseEvent<Element, MouseEvent> | undefined, selection: string | number | undefined) => {\n    const checked = (event?.target as HTMLInputElement).checked;\n    setFilters({\n      ...filters,\n      status: (checked && selection) ? [...filters.status, `${selection}`] : filters.status.filter((value) => value !== selection)\n    });\n    setIsFilterDropdownOpen(false);\n  };\n\n  const onNameInput = (event: React.SyntheticEvent<HTMLButtonElement> | React.KeyboardEvent) => {\n    setIsCategoryDropdownOpen(false);\n    const pressedKey = (event as React.KeyboardEvent).key;\n    if (pressedKey && pressedKey !== 'Enter') {\n      return;\n    }\n\n    const prevFilters = filters.name;\n    setFilters({ ...filters, name: prevFilters.includes(inputValue) ? prevFilters : [...prevFilters, inputValue] });\n  };\n\n  const onFilterSelect = () => {\n    setIsFilterDropdownOpen(!isFilterDropdownOpen);\n    setIsCategoryDropdownOpen(false);\n  };\n\n  const onLocationSelect = (_event: React.MouseEvent<Element, MouseEvent> | undefined, selection: string | number | undefined) => {\n    setFilters({ ...filters, location: [`${selection}`] });\n\n    setIsFilterDropdownOpen(false);\n    onFilterSelect();\n  };\n\n  const buildCategoryDropdown = () => {\n    const categoryMenuItems = [\n      <SelectOption key=\"cat1\" value=\"Location\">\n        Location\n      </SelectOption>,\n      <SelectOption key=\"cat2\" value=\"Name\">\n        Name\n      </SelectOption>,\n      <SelectOption key=\"cat3\" value=\"Status\">\n        Status\n      </SelectOption>\n    ];\n\n    return (\n      <ToolbarItem>\n        <Select\n          onSelect={onCategorySelect}\n          selected={currentCategory}\n          toggle={(toggleRef: React.Ref<MenuToggleElement>) => (\n            <MenuToggle\n              ref={toggleRef}\n              onClick={onCategoryToggle}\n              isExpanded={isCategoryDropdownOpen}\n              icon={<FilterIcon />}\n              style={\n                {\n                  width: '100%',\n                  verticalAlign: 'text-bottom'\n                } as React.CSSProperties\n              }\n            >\n              {currentCategory}\n            </MenuToggle>\n          )}\n          isOpen={isCategoryDropdownOpen}\n        >\n          {categoryMenuItems}\n        </Select>\n      </ToolbarItem>\n    );\n  };\n\n  const buildFilterDropdown = () => {\n    const locationMenuItems = [\n      <SelectOption key=\"raleigh\" value=\"Raleigh\">\n        Raleigh\n      </SelectOption>,\n      <SelectOption key=\"westford\" value=\"Westford\">\n        Westford\n      </SelectOption>,\n      <SelectOption key=\"boston\" value=\"Boston\">\n        Boston\n      </SelectOption>,\n      <SelectOption key=\"brno\" value=\"Brno\">\n        Brno\n      </SelectOption>,\n      <SelectOption key=\"bEmptyStateHeadangalore\" value=\"Bangalore\">\n        Bangalore\n      </SelectOption>\n    ];\n\n    const statusMenuItems = [\n      <SelectOption hasCheckbox key=\"statusRunning\" value=\"Running\" isSelected={filters.status.includes('Running')}>\n        Running\n      </SelectOption>,\n      <SelectOption hasCheckbox key=\"statusStopped\" value=\"Stopped\" isSelected={filters.status.includes('Stopped')}>\n        Stopped\n      </SelectOption>,\n      <SelectOption hasCheckbox key=\"statusDown\" value=\"Down\" isSelected={filters.status.includes('Down')}>\n        Down\n      </SelectOption>,\n      <SelectOption hasCheckbox key=\"statusDegraded\" value=\"Degraded\" isSelected={filters.status.includes('Degraded')}>\n        Degraded\n      </SelectOption>,\n      <SelectOption\n        hasCheckbox\n        key=\"statusMaint\"\n        value=\"Needs maintenance\"\n        isSelected={filters.status.includes('Needs maintenance')}\n      >\n        Needs maintenance\n      </SelectOption>\n    ];\n\n    return (\n      <React.Fragment>\n        <ToolbarFilter\n          labels={filters.location}\n          deleteLabel={(category, chip) => onDelete(category, chip as string)}\n          categoryName=\"Location\"\n          showToolbarItem={currentCategory === 'Location'}\n        >\n          <Select\n            aria-label=\"Location\"\n            onSelect={onLocationSelect}\n            selected={filters.location[0]}\n            isOpen={isFilterDropdownOpen}\n            popperProps={{ minWidth: '100px' }}\n            toggle={(toggleRef: React.Ref<MenuToggleElement>) => (\n              <MenuToggle\n                ref={toggleRef}\n                onClick={onFilterToggle}\n                isExpanded={isFilterDropdownOpen}\n                style={\n                  {\n                    width: '100%',\n                    verticalAlign: 'text-bottom'\n                  } as React.CSSProperties\n                }\n              >\n                {filters.location[0] || `Any`}\n              </MenuToggle>\n            )}\n          >\n            {locationMenuItems}\n          </Select>\n        </ToolbarFilter>\n        <ToolbarFilter\n          labels={filters.name}\n          deleteLabel={(category, chip) => onDelete(category, chip as string)}\n          categoryName=\"Name\"\n          showToolbarItem={currentCategory === 'Name'}\n        >\n          <SearchInput\n            aria-label=\"name filter\"\n            placeholder=\"Filter by name...\"\n            onChange={(_event, value) => onInputChange(value)}\n            value={inputValue}\n            onClear={() => {\n              onInputChange('');\n            }}\n            onSearch={onNameInput} // any typing is needed because of what I think is a bug in the SearchInput typing\n          />\n        </ToolbarFilter>\n        <ToolbarFilter\n          labels={filters.status}\n          deleteLabel={(category, chip) => onDelete(category, chip as string)}\n          categoryName=\"Status\"\n          showToolbarItem={currentCategory === 'Status'}\n        >\n          <Select\n            aria-label=\"Status\"\n            isOpen={isFilterDropdownOpen}\n            popperProps={{ minWidth: '100px' }}\n            onSelect={onStatusSelect}\n            selected={filters.status}\n            toggle={(toggleRef: React.Ref<MenuToggleElement>) => (\n              <MenuToggle\n                ref={toggleRef}\n                onClick={onFilterToggle}\n                isExpanded={isFilterDropdownOpen}\n                style={\n                  {\n                    width: '100%',\n                    verticalAlign: 'text-bottom'\n                  } as React.CSSProperties\n                }\n              >\n                Filter by status\n                {filters.status.length > 0 && <Badge isRead>{filters.status.length}</Badge>}\n              </MenuToggle>\n            )}\n          >\n            {statusMenuItems}\n          </Select>\n        </ToolbarFilter>\n      </React.Fragment>\n    );\n  };\n\n  const renderToolbar = () => (\n    <Toolbar\n      id=\"toolbar-with-chip-groups\"\n      clearAllFilters={() => setFilters({ location: [], name: [], status: [] })}\n      collapseListedFiltersBreakpoint=\"xl\"\n    >\n      <ToolbarContent>\n        <ToolbarToggleGroup toggleIcon={<FilterIcon />} breakpoint=\"xl\">\n          <ToolbarGroup variant=\"filter-group\">\n            {buildCategoryDropdown()}\n            {buildFilterDropdown()}\n          </ToolbarGroup>\n        </ToolbarToggleGroup>\n      </ToolbarContent>\n    </Toolbar>\n  );\n\n  const measurementCache = new CellMeasurerCache({\n    fixedWidth: true,\n    minHeight: 44,\n    keyMapper: (rowIndex) => rowIndex\n  });\n\n  const filteredRows =\n    filters.name.length > 0 || filters.location.length > 0 || filters.status.length > 0\n      ? rows.filter(\n          (row) =>\n            (filters.name.length === 0 ||\n              filters.name.some((name) => (row.cells[0] as string).toLowerCase().includes(name.toLowerCase()))) &&\n            (filters.location.length === 0 || filters.location.includes(row.cells[4] as string)) &&\n            (filters.status.length === 0 || filters.status.includes(row.cells[3] as string))\n        )\n      : rows;\n\n  const emptyState = (\n    <EmptyState variant={EmptyStateVariant.xs}\n        titleText=\"Clear all filters and try again.\"\n        headingLevel=\"h5\"\n        icon={SearchIcon}>\n      <EmptyStateBody>No results match the filter criteria. Clear all filters and try again.</EmptyStateBody>\n      <EmptyStateFooter>\n        <EmptyStateActions>\n          <Button\n            variant=\"link\"\n            onClick={() => {\n              setFilters({ location: [], name: [], status: [] });\n            }}\n          >\n            Clear all filters\n          </Button>\n        </EmptyStateActions>\n      </EmptyStateFooter>\n    </EmptyState>\n  );\n\n  const rowRenderer = ({ index: rowIndex, _isScrolling, key, style, parent }) => (\n    <CellMeasurer cache={measurementCache} columnIndex={0} key={key} parent={parent} rowIndex={rowIndex}>\n      <Tr style={style}>\n        {columns.map((col, index) => (\n          <Td key={`${rowIndex}-${index}`}>{filteredRows[rowIndex].cells[index]}</Td>\n        ))}\n        <Td isActionCell>\n          <ActionsColumn\n            items={actions}\n            isDisabled={filteredRows[rowIndex].disableActions} // Also arbitrary for the example\n          />\n        </Td>\n      </Tr>\n    </CellMeasurer>\n  );\n\n  interface ScrollableContainerStyle {\n    height: number;\n    overflowX: 'auto';\n    overflowY: 'scroll';\n    scrollBehavior: 'smooth';\n    WebkitOverflowScrolling: 'touch';\n    position: 'relative';\n  }\n\n  const scrollableContainerStyle: ScrollableContainerStyle = {\n    height: 500 /* important note: the scrollable container should have some sort of fixed height, or it should be wrapped in container that is smaller than ReactVirtualized__VirtualGrid container and has overflow visible if using the Window Scroller. See WindowScroller.example.css */,\n    overflowX: 'auto',\n    overflowY: 'scroll',\n    scrollBehavior: 'smooth',\n    WebkitOverflowScrolling: 'touch',\n    position: 'relative'\n  };\n\n  return (\n    <div\n      id=\"content-scrollable-2\"\n      aria-label=\"Scrollable Table\"\n      className=\"pf-v6-c-scrollablegrid\"\n      style={scrollableContainerStyle}\n    >\n      {renderToolbar()}\n      <Table gridBreakPoint={TableGridBreakpoint.none} aria-rowcount={rows.length}>\n        <Thead>\n          <Tr>\n            {columns.map((col, index) => (\n              <Th key={index}>{col}</Th>\n            ))}\n            <Td isActionCell></Td>\n          </Tr>\n        </Thead>\n        {filteredRows.length === 0 && (\n          <Tbody>\n            <Tr>\n              <Td colSpan={8}>\n                <Bullseye>{emptyState}</Bullseye>\n              </Td>\n            </Tr>\n          </Tbody>\n        )}\n      </Table>\n      <WindowScroller scrollElement={scrollableElement}>\n        {({ height, isScrolling, registerChild, onChildScroll, scrollTop }) => (\n          <AutoSizer disableHeight>\n            {({ width }) => (\n              <div ref={registerChild as (element: HTMLDivElement | null) => void}>\n                <VirtualTableBody\n                  autoHeight\n                  className={'pf-v6-c-table pf-v6-c-virtualized pf-v6-c-window-scroller'}\n                  deferredMeasurementCache={measurementCache}\n                  rowHeight={measurementCache.rowHeight}\n                  height={height || 0}\n                  isScrolling={isScrolling}\n                  isScrollingOptOut={true}\n                  onScroll={onChildScroll}\n                  overscanRowCount={2}\n                  columnCount={1}\n                  rows={filteredRows}\n                  rowCount={filteredRows.length}\n                  rowRenderer={rowRenderer}\n                  scrollToIndex={scrollToIndex}\n                  scrollTop={scrollTop}\n                  width={width}\n                  role=\"grid\"\n                />\n              </div>\n            )}\n          </AutoSizer>\n        )}\n      </WindowScroller>\n    </div>\n  );\n};\n","title":"Filterable with WindowScroller","lang":"js","className":""}}>
      
    </Example>
};

const Component = () => (
  <Fragment>
    <p {...{"className":"pf-v6-c-content--p pf-m-editorial ws-p "}}>
      {`Note: React Virtualized Extension lives in its own package at `}
      <PatternflyThemeLink {...{"to":"https://www.npmjs.com/package/@patternfly/react-virtualized-extension","className":""}}>
        <code {...{"className":"ws-code "}}>
          {`@patternfly/react-virtualized-extension`}
        </code>
      </PatternflyThemeLink>
      {`!`}
    </p>
    <AutoLinkHeader {...{"id":"examples","headingLevel":"h2","className":"ws-title ws-h2"}}>
      {`Examples`}
    </AutoLinkHeader>
    {createElement(pageData.examples["Basic"])}
    {createElement(pageData.examples["Sortable"])}
    {createElement(pageData.examples["Selectable"])}
    {createElement(pageData.examples["Actions"])}
    {createElement(pageData.examples["Filterable with WindowScroller"])}
  </Fragment>
);
Component.displayName = 'ExtensionsVirtualScrollTableReactDocs';
Component.pageData = pageData;

export default Component;
