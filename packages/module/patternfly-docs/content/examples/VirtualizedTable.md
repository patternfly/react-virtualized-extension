---
id: Virtual scroll table
section: extensions
source: react
sourceLink: https://github.com/patternfly/react-virtualized-extension
propComponents: ['VirtualTableBody']
---

Note: React Virtualized Extension lives in its own package at [`@patternfly/react-virtualized-extension`](https://www.npmjs.com/package/@patternfly/react-virtualized-extension)!

import SearchIcon from '@patternfly/react-icons/dist/esm/icons/search-icon';
import FilterIcon from '@patternfly/react-icons/dist/esm/icons/filter-icon';
import { CellMeasurerCache, CellMeasurer} from 'react-virtualized';
import { AutoSizer, VirtualTableBody, WindowScroller } from '@patternfly/react-virtualized-extension';
import { Table as TableDeprecated, TableHeader as TableHeaderDeprecated } from '@patternfly/react-table/deprecated';
import { Table, Thead, Tr, Th, Td, Caption, TableGridBreakpoint } from '@patternfly/react-table';
import './VirtualGrid.example.css';
import { useState, useEffect, Fragment } from 'react';

## Examples

### Basic

```js file="./Basic.tsx"

```

### Sortable

```js file="./Sortable.tsx"

```

### Selectable

```js file="./Selectable.tsx"

```

### Actions

```js file="./Actions.tsx"

```

### Filterable with WindowScroller

```js file="./FilterableWithWindowScroller.tsx"

```
