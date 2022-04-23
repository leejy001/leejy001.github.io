---
date: '2022-04-12'
title: 'MST - Prim'
categories: ['JavaScript', 'Algorithm']
summary: '대표적인 최소 신장 트리 알고리즘(MST) 중 하나인 Prim Algorithm에 대해서 알아보자'
thumbnail: './algorithm.png'
---

### 알고리즘 정리 10번째 [Prim Algorithm]

이전 시간에 Kruskal 알고리즘에 대해 알아봤다.  
Prim 알고리즘도 Kruskal과 마찬가지로 Greedy 알고리즘에 속한다. 가중치가 있는 연결된 무향 그래프의 모든 꼭짓점을 포함하면서 각 변의 비용의 합이 최소가 되는 부분 그래프인 트리이다.

### Prim MST 알고리즘

시작 정점에서부터 출발하여 신장트리 집합을 단계적으로 확장하는 방법

- 정점 선택을 기반으로 하는 알고리즘이다.
- 이전 단계에서 만들어진 신장 트리를 확장하는 방법이다.

### Prim MST 알고리즘 동작 과정

<p align="center"><img src='/images/Algorithm/Prim/Prim_one.png' width='80%' alt='prim_one'/><p>

세트 mstSet은 초기에 비어 있고 정점에 할당된 키는 {0, INF, INF, INF, INF, INF, INF, INF}이며 INF는 가장 큰 정수를 나타낸다.
이제 최소 키 값으로 정점을 선택하는데 정점 0이 선택되어 mstSet에 포함되고 mstSet은 {0}이 된다.  
정점 0을 mstSet에 포함시킨 후 인접 정점의 키 값을 업데이트한다.  
0의 인접 정점은 1과 7이고 1과 7의 키 값은 4와 8로 업데이트된다.  
다음 하위 그래프는 정점과 해당 키 값을 보여주지만 유한 키 값을 가진 정점만 표시된다.  
MST에 포함된 꼭짓점은 녹색으로 표시해줄것이다.

<p align="center"><img src='/images/Algorithm/Prim/Prim_two.png' width='20%' alt='prim_two'/><p>

키 값이 최소이고 MST에 아직 포함되지 않은 정점을 선택한다. (mstSet에는 없음)  
정점 1이 선택되어 mstSet에 추가되고 mstSet은 이제 {0, 1}이 된다.  
인접 정점의 키 값을 1로 업데이트하고. 정점 2의 키 값은 8이 된다.

<p align="center"><img src='/images/Algorithm/Prim/Prim_three.png' width='30%' alt='prim_three'/><p>

키 값이 최소이고 MST에 아직 포함되지 않은 정점을 선택한다. (mstSet에는 없음)  
정점 7 또는 정점 2를 선택할 수 있다. 정점 7을 선택하고 mstSet은 이제 {0, 1, 7}이 된다.  
인접한 정점 7의 키 값을 업데이트한다. 정점 6과 8의 키 값은 유한이 된다. (각각 1과 7).

<p align="center"><img src='/images/Algorithm/Prim/Prim_four.png' width='30%' alt='prim_four'/><p>

키 값이 최소이고 MST에 아직 포함되지 않은 정점을 선택한다. (mstSet에는 없음)  
정점 6이 선택되고 mstSet은 이제 {0, 1, 7, 6}이 된다.  
인접 정점 6의 키 값을 업데이트한다. 정점 5와 8의 키 값이 업데이트된다.

<p align="center"><img src='/images/Algorithm/Prim/Prim_five.png' width='40%' alt='prim_five'/><p>

mstSet에 주어진 그래프의 모든 정점이 포함될 때까지 위의 단계를 반복하면 마지막에 다음 그래프를 얻는다.

<p align="center"><img src='/images/Algorithm/Prim/Prim_last.png' width='50%' alt='prim_last'/><p>

### MST - Prim 코드 (인접 행렬)

```javascript
// 그래프의 정점 수
let V = 5

// MST에 아직 포함되지 않은 꼭짓점 집합에서 키 값이 최소인 꼭짓점을 찾는 함수
function minKey(key, mstSet) {
  // 최소값 초기화
  let min = Number.MAX_VALUE
  let min_index
  for (let v = 0; v < V; v++) {
    if (mstSet[v] === false && key[v] < min) {
      min = key[v]
      min_index = v
    }
  }
  return min_index
}

// parent[]에 저장된 생성된 MST를 출력하는 함수
function printMST(parent, graph) {
  for (let i = 1; i < V; i++) {
    console.log(parent[i] + ' - ' + i, graph[i][parent[i]])
  }
}

// 인접 행렬 표현을 사용하여 표현된 그래프에 대한 MST를 구성하고 인쇄하는 함수
function primMST(graph) {
  // 해당 MST의 부모 노드를 저장할 배열
  let parent = []
  // 최소 가중치 값을 저장하는 배열
  let key = []
  // 방문 완료된 노드를 표시하는 배열
  let mstSet = []
  // 모든 키를 INF로 초기화
  for (let i = 0; i < V; i++) {
    key[i] = Number.MAX_VALUE
    mstSet[i] = false
  }
  // 항상 MST의 첫 번째 첫 번째 정점을 포함
  // 이 정점이 첫 번째 정점으로 선택되도록 키를 0으로 만든다.
  key[0] = 0
  parent[0] = -1 // 첫 번째 노드는 항상 MST의 루트 노드

  for (let count = 0; count < V - 1; count++) {
    // MST에 아직 포함되지 않은 정점 집합에서 최소 키 정점을 선택
    let u = minKey(key, mstSet)
    // 선택한 정점을 mseSet에 추가
    mstSet[u] = true
    // 선택된 정점의 인접 정점의 키 값과 상위 인덱스를 업데이트한다.
    // mstSet에 아직 포함되지 않은 정점만 고려
    for (let v = 0; v < V; v++) {
      // graph[u][v]는 m의 인접 정점에 대해서만 0이 아니다.
      // mstSet[v]는 아직 MST에 포함되지 않은 정점에 대해 false다.
      // graph[u][v]가 key[v]보다 작은 경우에만 키를 업데이트한다.
      if (graph[u][v] && mstSet[v] === false && graph[u][v] < key[v]) {
        parent[v] = u
        key[v] = graph[u][v]
      }
    }
  }
  printMST(parent, graph)
}

let graph = [
  [0, 2, 0, 6, 0],
  [2, 0, 3, 8, 5],
  [0, 3, 0, 0, 7],
  [6, 8, 0, 0, 9],
  [0, 5, 7, 9, 0],
]

primMST(graph)

/*
0 - 1 2
1 - 2 3
0 - 3 6
1 - 4 5
*/
```

나도 배우면서 이해가 잘 안되어서 동작 과정을 나열해보았다.

```plaintext
우선 해당 노드의 부모노드가 저장될 parent를 초기화 한다.
parent = []
그 다음 최소 가중치 값을 저장해줄 key를 INF로 초기화 한다.
key = [INF, INF, INF, INF, INF]
마지막으로 정점의 방문 여부를 파악할 mstSet을 초기화해준다.
mstSet = [false, false, false, false, false]

우선 처음으로 root 노드를 방문해준다.

0부터 출발하며 0은 부모 노드가 없기에 parent[0]을 -1로 초기화 해준다.
parent[-1]
최소 가중치 값도 없기에 0으로 초기화 해준다.
key = [0, INF, INF, INF, INF]
mstSet이 false인 노드중 가장 key값이 작은 노드는 0번 노드이기에 (minKey 함수)
if (mstSet[v] === false && key[v] < min)

최소 정점인 u는 0번 노드가 된다.
u = 0
mstSet도 0번 노드는 방문을 했기때문에 true로 바꿔준다.
mstSet = [true, false, false, false, false]

0과 인접한 노드를 전부 parent와 key에 저장한다.
[0, 2, 0, 6, 0]
[2, 0, 3, 8, 5] <= 1번
[0, 3, 0, 0, 7]
[6, 8, 0, 0, 9] <= 3번
[0, 5, 7, 9, 0]

parent = [-1, 0, empty, 0]
key = [0, 2, INF, 6, INF]

다음 0과 인접한 노드 중 가중치가 최소인 노드는 어디일까? (minKey 함수)
if (mstSet[v] === false && key[v] < min)
[0, 2, 0, 6, 0]
[2, 0, 3, 8, 5] <= 1번 (가중치 2)
[0, 3, 0, 0, 7]
[6, 8, 0, 0, 9]
[0, 5, 7, 9, 0]
1번 노드다.

최소 정점 노드 u는 1번 노드가 되고
u = 1
mstSet도 1번 노드가 방문 확정이므로 true로 바꿔준다.
mstSet[true, true, false, false, false]

그 다음 1번 정점의 인접 노드를 구해주고
[0, 2, 0, 6, 0]
[2, 0, 3, 8, 5]
[0, 3, 0, 0, 7] <= 2번
[6, 8, 0, 0, 9] <= 3번
[0, 5, 7, 9, 0] <= 4번
해당 인접노드의 가중치 중 최소값을 parent와 key에 넣어준다.
이때 2번과 4번 노드는 이전 노드(부모 노드)가 1이기 때문에 1을 넣어준다.

parent = [-1, 0, 1, 0, 1]
key = [0, 2, 3, 6, 5]

이렇게 인접 노드에서 가중치가 작은 순서대로 구해주면
다음과 같은 최소 가중치를 가진 경로가 나온다.
0 - 1 2
1 - 2 3
0 - 3 6
1 - 4 5

여기서 주의할 점은 이중 for문 중 첫 번째 for문은 단지 노드의 수 만큼 반복하기위해 존재한다.
인접 행렬로 구현했기 때문에 노드 한개마다 다른 인접 노드 유무를 확인하기위해 이중 for문으로 구현.
```

위 프로그램의 시간 복잡도는 <b>O(V^2)</b>이다.  
정점의 갯수만큼 2차원 배열을 확장시킨 다음에 하나의 노드당 연결되어 있는 인접 노드들의 최소 가중치 값을 전부 파악해줘야하기 때문이다.
그래프를 인접 리스트로 표현하고 최소 힙을 이용하면 Prim 알고리즘의 시간 복잡도를 <b>O(E log V)</b>로 줄일 수 있다.

### MST - Prim 코드 (인접 리스트)

맨 처음 초기화 과정은 인접 행렬 방식과 동일하며  
queue에 해당 정점의 인접 정점들을 저장하며 만약 인접 정점의 가중치들 중, 기존의 가중치보다 더 작은 가중치가 나온다면 업데이트 해준다.  
정점의 가중치들을 수정해준뒤에는 항상 최소값이 앞에 오도록 수정을 해줘야한다.
여기선 최소힙을 직접 구현하는 대신에 다음 노드로 방문하기 전에 항상 queue를 오름차순으로 정렬하여 앞서부터 빼준다.

```javascript
function MST(road, N) {
  let graph = {}
  let mstSet = new Array(N)
  let cost = new Array(N)
  let parent = new Array(N)
  let path = []

  for (let i = 0; i < N; i++) {
    graph[i] = []
  }
  for (let i in road) {
    graph[road[i][0]].push([road[i][1], road[i][2]])
    graph[road[i][1]].push([road[i][0], road[i][2]])
  }
  for (let i = 0; i < N; i++) {
    cost[i] = { vertex: null, key: null }
  }
  for (let i = 0; i < N; i++) {
    mstSet[i] = false
    cost[i].key = Number.MAX_VALUE
    cost[i].vertex = i
    parent[i] = -1
  }

  cost[0].key = 0
  let queue = []

  for (let i = 0; i < N; i++) {
    queue.push(cost[i])
  }
  queue.sort((a, b) => a.key - b.key)

  while (queue.length !== 0) {
    let curNode = queue.shift()
    path.push(curNode.vertex)
    mstSet[curNode.vertex] = true
    // 추출된 정점 V의 모든 인접 정점에 대해
    for (let iterator of graph[curNode.vertex]) {
      // V가 큐에 있는 경우
      if (mstSet[iterator[0]] === false) {
        // 인접 정점의 키 값이 추출된 키보다 크면
        // 인접 정점의 키 값을 업데이트하여 먼저 업데이트
        // 업데이트된 정점을 제거하고 추가
        if (cost[iterator[0]].key > iterator[1]) {
          queue.splice(queue.indexOf(cost[iterator[0]]), 1)
          cost[iterator[0]].key = iterator[1]
          queue.push(cost[iterator[0]])
          queue.sort((a, b) => a.key - b.key)
          parent[iterator[0]] = curNode.vertex
        }
      }
    }
  }
  console.log(path) // [0, 1, 7, 6, 5, 2, 8, 3, 4]
}

let N = 9
let road = [
  [0, 1, 4],
  [0, 7, 8],
  [1, 2, 8],
  [1, 7, 11],
  [2, 3, 7],
  [2, 8, 2],
  [2, 5, 4],
  [3, 4, 9],
  [3, 5, 14],
  [4, 5, 10],
  [5, 6, 2],
  [6, 7, 1],
  [6, 8, 6],
  [7, 8, 7],
]

MST(road, N)
```

### 참고

[프림 알고리즘 (인접 행렬)](https://www.geeksforgeeks.org/prims-minimum-spanning-tree-mst-greedy-algo-5/?ref=gcse)  
[프림 알고리즘 (인접 리스트)](https://www.geeksforgeeks.org/prims-mst-for-adjacency-list-representation-greedy-algo-6/?ref=rp)
