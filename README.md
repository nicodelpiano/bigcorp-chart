# BigCorp Chart

Displays an organization structure as a hierarchy tree.

You can see a working [demo here](https://bigcorp-chart.herokuapp.com).

Use the mouse scroll to zoom-in and zoom-out and to drag the chart.

## Build & Run

In the project directory, you can run (use `yarn` if preferred):

    npm install

to install dependencies. Then execute

    npm start

to run the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Test

To run tests simply execute

    npm test

## Analysis

Currently the underlying data structure (`./utils/chart.js`) to represent the diagram supports displaying a huge amount of nodes (I tested it with more than 100k nodes).

The `Chart` class uses a `Map` to store employee ids as _keys_, and employees data as _values_, plus the employee's children ids if it manages other people. To store the children ids in each entry I opted for `Set`, as it will guarantee they will be unique, while giving good performance for insertion.

The operations supported are:

- **insert:** inserts a new employee into the chart. The operation cost in time is `O(1)` (constant), and space is `O(1)` as well, as it only stores one new entry in the hash.
- **insertMultiple:** inserts a list of employees into the chart. The operation cost in time is `O(n)` (where `n` is the number of employees being inserted), and space is `O(n)`.
- **get:** retrieves an employees from the chart. The operation cost in time is `O(1)` and space is `O(1)`.
- **buildTree:** builds the representation of the chart as a tree, that is, an object with arrays as children of objects. The operation cost for building the tree is `O(n)` in time complexity, as we have to traverse the whole hash, and space is also `O(n)` as we need to store all the employees in a new structure.

|   | Time  |  Space  |
|---|---|---|
| get | O(1) | O(1) |
| insert | O(1) | O(1) |
| insertMultiple | O(n) | O(n) |
| buildTree | O(n) | O(n) |

## Caveats

For a considerable amount of nodes, let's say, the top manager has 1000 employees under their supervision, it can experienced a noticeable slowdown.
This is due to rendering, as my solution just shows everything eagerly, not on demand. We can circumvent this using an additional library, like `react-window` or `react-virtualized`, which tackle the problem of rendering only what is needed. I personally tried them for this example, and it could load lazily (on user’s demand, by scrolling) a whole subtree with more than one hundred thousand of nodes instantaneously.

## Future Improvements

- Use `react-window` or `react-virtualized` to speed-up rendering when the chart is huge
- Implement `remove` and `update` operations in `Chart` class
- Improve styling