---
date: '2022-03-11'
title: 'DFS와 BFS'
categories: ['JavaScript', 'Algorithm']
summary: 'DFS와 BFS이 무엇인지 어떻게 구현하는지 알아보자'
thumbnail: './javascript_thumbnail.png'
---

### 알고리즘 정리 4번째 [DFS/BFS]

그래프를 탐색하는 방법에는 <b>깊이 우선 탐색(DFS)</b>과 <b>너비 우선 탐색(BFS)</b>이 있다.
<br/><br/>
**DFS (Depth-Firest Search)**  
최대한 깊이 내려간 뒤, 더이상 갈 곳이 없을 경우 옆으로 이동

**깊이 우선 탐색의 개념**  
루트 노드(혹은 다른 임의의 노드)에서 시작하여 다음 분기로 넘어가기 전에 해당 분기를 완벽하게 탐색하는 방식이다.
예를 들어 미로 찾기에서 최대한 한 방향으로만 갈 수 있을 때까지 쭉 이동하다가 막다른 길이 나오면 가장 가까운 갈림길로 복귀한 다음에 그 갈림길부터 다시 다른 방향으로 탐색을 진행하는 방법을 깊이 우선 탐색이라고 할 수 있다.
<br/><br/>
**BFS (Breadth-First Search)**  
최대한 넓게 이동한 다음, 더 이상 갈 수 없을 때 아래로 이동

**너비 우선 탐색의 개념**  
루트 노드(혹은 다른 임의의 노드)에서 시작하여 인접 노드를 먼저 탐색하는 방법으로 시작 정점으로 부터 가까운 정점을 모두 방문하고 멀리 떨어진 정점을 나중에 방문하는 방식이다.  
주로 노드 간의 최단 경로를 찾고자 할 때 이 방법을 이용한다.
<br/><br/>

<table>
   <tr>
     <th align="center">
       <img src='/images/Algorithm/BFS_DFS/dfs_bfs.gif' width='70%' alt='lcs one' />
       <br><p>출처 : https://namu.wiki/w/BFS</p>
     </th>
  </tr>
</table>

DFS와 BFS의 대략적인 차이는 DFS는 현재 정점에서 갈 수 있는 점들까지 들어가면서 탐색하고 스택이나 재귀함수로 구현이 가능하다. 반면에 BFS는 현재 정점에 연결된 가까운 점들부터 탐색하며 큐를 이용해서 구현한다.  
DFS와 BFS는 `노드 수 + 간선 수` 만큼의 복잡도를 지닌다. 즉, O(n)

### 그래프일 때 DFS와 BFS

**자바스크립트 그래프 선언**

```javascript
const graph = {
  A: ['B', 'C'],
  B: ['A', 'D'],
  C: ['A', 'G', 'H', 'I'],
  D: ['B', 'E', 'F'],
  E: ['D'],
  F: ['D'],
  G: ['C'],
  H: ['C'],
  I: ['C', 'J'],
  J: ['I'],
}
```

**그래프에서 DFS**

방문 예정인 인접노드를 저장하는 visit과 방문한 노드를 저장하는 visited 배열을 선언하고 visit에 초기값 시작노드를 넣는다.
그리고 방문 예정인 인접노드가 없을 때까지 그래프의 모든 노드의 방문을 진행하게 된다.

<b>조건 1</b>: visit.pop()한 인접 노드가 이미 방문한 노드라면 다음 인접 노드로 이동한다.  
<b>조건 2</b>: visit.pop()한 인접 노드가 아직 방문하지 않은 노드라면 해당 인접 노드를 visited에 넣어 방문처리를 해주고 해당 인접 노드의 인접 노드들을 visit에 넣어준다.

해당 과정을 반복하면 된다.

```javascript
function DFS(graph, startNode) {
  let visited = []
  let visit = []

  visit.push(startNode)

  while (visit.length !== 0) {
    const node = visit.pop()
    if (!visited.includes(node)) {
      visited.push(node)
      visit = [...visit, ...graph[node]]
    }
  }
  return visited
}

console.log(DFS(graph, 'A')) // ['A', 'C', 'I', 'J', 'H', 'G', 'B', 'D', 'F', 'E']
```

결과가 좌 → 우로 탐색하는 것이 아니라 우 → 좌로 탐색되게 나오는데 만약 바꾸고 싶다면  
반복문 내부의 코드를 다음과 같이 수정하자

```javascript
while (visit.length !== 0) {
  const node = visit.shift()
  if (!visited.includes(node)) {
    visited.push(node)
    visit = [...graph[node], ...visit]
  }
}
```

위의 코드는 이미 방문한 인접 노드들도 방문 예정 인접 노드 배열에 같이 넣어준다.  
물론 처음 조건에서 걸러지게 되지만 방문 예정 인접 노드에 아직 방문하지 않은 인접 노드만 넣어주려면 다음과 같이  
코드를 수정하면 된다.

```javascript
function DFS(graph, startNode) {
  let visited = []
  let visit = [startNode]
  while (visit.length !== 0) {
    const node = visit.shift()
    if (!visited.includes(node)) {
      visited.push(node)
      let sub = graph[node].filter(x => !visited.includes(x))
      visit = [...sub, ...visit]
    }
  }
  return visited
}
console.log(DFS(graph, 'A')) // ["A", "B", "D", "E", "F", "C", "G", "H", "I", "J"]
```

**그래프에서 BFS**

위의 코드에서 방문 예정 인접 노드를 저장하는 방법을 수정해주면 BFS 코드가 된다.

```javascript
function BFS(graph, startNode) {
  let visited = []
  let visit = [startNode]
  while (visit.length !== 0) {
    const node = visit.shift()
    if (!visited.includes(node)) {
      visited.push(node)
      let sub = graph[node].filter(x => !visited.includes(x))
      visit = [...visit, ...sub]
    }
  }
  return visited
}
console.log(BFS(graph, 'A')) // ["A", "B", "C", "D", "G", "H", "I", "E", "F", "J"]
```

### 트리일 때 DFS와 BFS

트리에 대해서는 자료구조 시간에 설명헀었다. 이제 연결 리스트를 이용하여 트리를 선언해보자  
<br/>
**자바스크립트 트리 선언**

```javascript
class Node {
  constructor(data) {
    this.data = data
    this.left = null
    this.right = null
  }
}

class Tree {
  constructor(data) {
    let init = new Node(data)
    this.root = init
    this.dataSize = 0
  }

  length() {
    return this.dataSize
  }

  insert(data) {
    let newNode = new Node(data)
    let curNode = this.root

    while (curNode) {
      if (data === curNode.data) {
        return // 중복 값 삽입 금지
      }
      if (data < curNode.data) {
        // data가 현재 노드 data보다 작은 경우
        if (!curNode.left) {
          // 현재 노드 left가 없다면
          curNode.left = newNode
          this.dataSize += 1
          return
        }
        curNode = curNode.left // 현재 노드 이동
      }
      if (data > curNode.data) {
        // data가 현재 노드 data보다 큰 경우
        if (!curNode.right) {
          // 현재 노드 right가 없다면
          curNode.right = newNode
          this.dataSize += 1
          return
        }
        curNode = curNode.right // 현재 노드 이동
      }
    }
  }
}

let t = new Tree(5)
t.insert(4)
t.insert(8)
t.insert(1)
t.insert(9)
t.insert(2)
t.insert(7)
t.insert(3)
t.insert(6)
```

**트리에서 DFS**

트리에서 DFS를 구현할 때 방문 결과인 result와 현재 방문 예정 노드를 저장하는 stack을 선언한다.  
그리고 stack에 초기값으로 root 노드를 넣어준다.
스택은 후입선출이기 때문에 stack에서 pop한 노드를 curNode라고 하고 curNode의 왼쪽, 오른쪽 자식 노드가 존재한다면 stack에 push한다.  
그리고 방문 결과에 현재 노드의 data를 저장해주면 된다.

```javascript
class Tree {
  ...
  DFS() {
    let result = [];
    let stack = [this.root];

    while (stack.length !== 0) {
			let curNode = stack.pop();
      if (curNode.right) stack.push(curNode.right);
      if (curNode.left) stack.push(curNode.left);
      result.push(curNode.data);
    }
    return result;
  }
}
```

**트리에서 BFS**

트리에서 BFS를 구현할 때 선언 방식은 DFS와 같다.  
대신 큐는 선입선출이기 때문에 queue에서 shift한 노드를 curNode라고 하고 curNode의 왼쪽, 오른쪽 자식 노드가 존재한다면 queue에 push한다.
그리고 방문 결과에 현재 노드의 data를 저장해주면 된다.

```javascript
class Tree {
  ...
  BFS() {
    let result = [];
    let queue = [this.root];

    while (queue.length !== 0) {
			let curNode = queue.shift();
      if (curNode.left) queue.push(curNode.left);
      if (curNode.right) queue.push(curNode.right);
      result.push(curNode.data);
    }
    return result;
  }
}
```

### 2차원 배열 탐색에서 DFS와 BFS

2차원 배열의 탐색 문제에서도 문제에 따라 DFS를 쓰는 경우와 BFS를 쓰는 경우가 있다.  
예를 들어 "지도 상에 섬이 총 몇개가 있는가?" 아니면 "구역은 총 몇개로 나뉘는가?" 등 단순히 노드의 갯수를 파악하는 문제라고 하면 DFS나 BFS중 어떤 것을 이용해도 문제는 없다.  
그런데 만약 미로 찾기에서 목적지 까지 갈 수 있는지만 파악하는 정도라면 DFS로 풀어도 충분하며
미로의 목적지 까지 도달하는데 있어서 최소 비용을 구하는 문제라면 BFS를 이용하여 풀이하는 것이좋다.  
<br/>
이제 2차원 배열일 때 DFS, BFS 탐색을 이용한 문제를 풀어보자  
<br/>
예를 들어 어떤 지도에 섬이 표기되어 있으며 육지인 경우는 1로, 바다인 경우는 0으로 표시되어있다고 가정한다. 그리고 해당 지도에서 총 섬이 몇 개인지 구하려고 한다.

만약 육지에서 상하좌우 및 대각선으로 연결된 육지가 더 이상 없다면 해당 육지는 하나의 섬으로 간주된다.

**test case**

```javascript
let n = 7 // 지도의 길이
let map = [
  [1, 1, 0, 0, 0, 1, 0],
  [0, 1, 1, 0, 1, 1, 0],
  [0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 0, 0],
  [1, 0, 0, 0, 1, 0, 0],
  [1, 0, 1, 0, 1, 0, 0],
]
```

**2차원 배열 탐색에서 DFS**

상하좌우 및 대각선 까지 탐색을 진행하려면 현재 위치에서 8방향의 좌표가 필요하다.  
그리고 섬의 갯수를 카운트 하기위한 변수도 하나 선언해주자

```javascript
let dx = [-1, -1, 0, 1, 1, 1, 0, -1]
let dy = [0, 1, 1, 1, 0, -1, -1, -1]
let cnt = 0
```

그다음 DFS를 진행하려면 크게 2가지로 나뉜다.

첫번째는 전체 지도에서 바다가 아닌 육지를 찾는 경우의 코드다.  
바다(0)인 경우는 건너뛰고 육지(1)인 경우 육지를 찾은 좌표에서부터 카운트를 올려주고 탐색을 시작해야한다.

```javascript
for (let x = 0; x < n; x++) {
  for (let y = 0; y < n; y++) {
    if (arr[x][y]) {
      dfs(x, y)
      cnt++
    }
  }
}
```

두번째는 육지가 시작되는 좌표부터 육지가 끝나는 좌표까지 DFS를 진행해준다.  
현재 방문한 좌표는 이미 방문했으므로 0으로 바꿔주고 상하좌우 및 대각선에 위치한 좌표들이 육지 인지, 지도를 벗어나지 않았는지에 대해 알아보고 벗어나지 않았다면 해당 좌표로 이동한 뒤 탐색을 재귀적으로 반복해주면 된다.

```javascript
function dfs(x, y) {
  arr[x][y] = 0
  for (let i = 0; i < 8; i++) {
    let nx = x + dx[i]
    let ny = y + dy[i]
    // 육지인지? 지도는 벗어나지 않았는지?
    if (nx < 0 || ny < 0 || nx >= n || ny >= n) continue
    if (arr[nx][ny]) dfs(nx, ny) // 다음 방문 좌표
  }
}
```

**전체 코드**

```javascript
function DFS(n, arr) {
  let dx = [-1, -1, 0, 1, 1, 1, 0, -1]
  let dy = [0, 1, 1, 1, 0, -1, -1, -1]
  let cnt = 0

  function dfs(x, y) {
    arr[x][y] = 0
    for (let i = 0; i < 8; i++) {
      let nx = x + dx[i]
      let ny = y + dy[i]
      if (nx < 0 || ny < 0 || nx >= n || ny >= n) continue
      if (arr[nx][ny]) dfs(nx, ny)
    }
  }

  for (let x = 0; x < n; x++) {
    for (let y = 0; y < n; y++) {
      if (arr[x][y]) {
        dfs(x, y)
        cnt++
      }
    }
  }
  return cnt
}

console.log(DFS(n, map)) // 5
```

**2차원 배열 탐색에서 BFS**

BFS로 풀이할 땐 지금 위치한 좌표에서 방문 가능한 좌표들을 전부 저장해주는 queue를 하나 선언해준다.  
DFS와 풀이 방법은 대체적으로 비슷하고 몇가지 다른 점이 있는데 일단 탐색 초반에 탐색을 시작할 위치를 queue에 넣어주고 현재 탐색 위치를 shift한 다음에 해당 탐색 위치에서 탐색 가능한 (육지인 경우)모든 좌표를 queue에 저장하고 현재 위치는 0으로(탐색완료) 바꿔준다.
해당 부분을 queue에 더 이상 저장된 좌표가 없을 때까지 반복해주면 된다.

**전체 코드**

```javascript
function BFS(n, arr) {
  let dx = [-1, -1, 0, 1, 1, 1, 0, -1]
  let dy = [0, 1, 1, 1, 0, -1, -1, -1]
  let cnt = 0
  let queue = []

  function bfs(x, y) {
    arr[x][y] = 0
    queue.push([x, y])
    while (queue.length) {
      let [x, y] = queue.shift() // 현재 방문 좌표 shift
      for (let i = 0; i < 8; i++) {
        let nx = x + dx[i]
        let ny = y + dy[i]
        if (nx < 0 || ny < 0 || nx >= n || ny >= n) continue
        if (arr[nx][ny]) {
          arr[nx][ny] = 0
          queue.push([nx, ny]) // 다음 방문 좌표 push
        }
      }
    }
  }

  for (let x = 0; x < n; x++) {
    for (let y = 0; y < n; y++) {
      if (arr[x][y]) {
        bfs(x, y)
        cnt++
      }
    }
  }
  return cnt
}

console.log(BFS(n, map)) // 5
```

지금까지 다양한 경우의 DFS, BFS 탐색에 대하여 알아봤다.

DFS, BFS 탐색을 알아두면 여러 자료구조의 탐색 알고리즘을 적용할 때 많이 도움이 될 것 같다.
