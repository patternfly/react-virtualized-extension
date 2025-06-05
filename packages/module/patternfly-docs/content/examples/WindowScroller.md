---
id: Virtual scroll window scroller
section: extensions
source: react
sourceLink: https://github.com/patternfly/react-virtualized-extension
propComponents: ['VirtualTableBody']
---

Note: React Virtualized Extension lives in its own package at [`@patternfly/react-virtualized-extension`](https://www.npmjs.com/package/@patternfly/react-virtualized-extension)!
<br />
This package is currently an extension. Extension components do not undergo the same rigorous design or coding review process as core PatternFly components. If enough members of the community find them useful, we will work to move them into our core PatternFly system by starting the design process for the idea.
<br />
<br />

import { CellMeasurerCache, CellMeasurer } from 'react-virtualized';
import { AutoSizer, VirtualTableBody, WindowScroller } from '@patternfly/react-virtualized-extension';
import { Table as TableDeprecated, TableHeader as TableHeaderDeprecated } from '@patternfly/react-table/deprecated';
import './VirtualGrid.example.css';
import './WindowScroller.example.css';
import { useState, useEffect } from 'react';

## Examples

### Window scroller

```js file="WindowScroller.tsx"

```
