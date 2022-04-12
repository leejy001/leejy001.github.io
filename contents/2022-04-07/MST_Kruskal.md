---
date: '2022-04-10'
title: 'MST - Kruskal'
categories: ['JavaScript', 'Algorithm']
summary: '대표적인 최소 신장 트리 알고리즘(MST) 중 하나인 Kruskal Algorithm에 대해서 알아보자'
thumbnail: './javascript_thumbnail.png'
---

### 알고리즘 정리 9번째 [Kruskal Algorithm]

<b>Spanning Tree</b>는 그래프의 최소 연결 부분(간선의 수가 가장 적은) 그래프다.  
n개의 정점을 가지는 그래프의 최소 간선의 수는 (n-1)개이고, (n-1)개의 간선으로 연결되어 있다면 필연적으로 트리 형태가 되고 이것이 바로 <b>Spanning Tree</b>가 된다.
<br/><br/>
**Spanning Tree의 특징**

1. DFS, BFS를 이용해서 그래프에서 신장 트리를 찾을 수 있다. 탐색 도중에 사용된 간선만 모으면 만들 수 있다.
2. 하나의 그래프에는 많은 신장 트리가 존재할 수 있다.
3. Spanning Tree는 트리의 특수한 형태이므로 모든 정점들이 연결되어 있어야 하고 사이클을 포함해서는 안된다.  
   따라서 Spanning Tree는 그래프에 있는 n개의 정점을 정확히 (n-1)개의 간선으로 연결한다.

**통신 네트워크 구축**

예를 들어, 회사 내의 모든 PC를 가장 적은 수의 케이블을 사용하여 연결하고자 하는 경우  
n개의 위치를 연결하는 통신 네트워크를 최소의 링크(간선)를 이용하여 구축하고자 하는 경우  
최소 링크의 수는 (n-1)개가 되고, 따라서 Spanning Tree가 가능해진다.

### MST란?

Spanning Tree 중에서도 사용된 간선들의 가중치 합이 최소인 트리<b>(Minimum Spanning Tree)</b>  
각 간선의 가중치가 동일하지 않을 때 단순히 가장 적은 간선을 사용한다고 해서 최소 비용이 얻어지는 것은 아니다.  
MST는 간선에 가중치를 고려하여 최소 비용의 Spanning Tree를 선택하는 것을 말한다.  
즉, 네트워크(가중치를 간선에 할당한 그래프)에 있는 모든 정점들을 가장 적은 수의 간선과 비용으로 연결하는 것이다.
<br/><br/>
**MST의 특징**

1. 간선의 가중치의 합이 최소여야한다.
2. n개의 정점을 가지는 그래프에 대해 반드시 (n-1)개의 간선만을 사용해야한다.
3. 사이클이 포함되어서는 안된다.

**MST의 사용 사례**

통신망, 도로망, 유통망에서 길이, 구축 비용, 전송 시간 등을 최소로 구축하려는 경우

### Kruskal MST 알고리즘

탐욕적인 방법(greedy method)를 이용하여 네트워크(가중치를 간선에 할당한 그래프)의 모든 정점을 최소 비용으로 연결하는 최적 해답을 구하는 것

- MST(최소 비용 신장 트리)가 최소 비용의 간선으로 구성됨  
  사이클을 포함하지 않음의 조건에 근거하여 각 단계에서 사이클을 이루지 않는 최소 비용 간선을 선택한다.
- 간선 선택을 기반으로 하는 알고리즘이다.
- 이전 단계에서 만들어진 신장 트리와는 상관없이 무조건 최소 간선만을 선택하는 방법이다.

### Kruskal MST 알고리즘 동작 과정

간선 선택을 기반으로 하는 알고리즘  
이전 단계에서 만들어진 신장 트리와는 상관없이 무조건 최소 간선만을 선택하는 방법

다음과 같이 노드와 간선이 배치되어있을때

<p align="center"><img src='/images/Algorithm/Kruskal/kruskal_one.png' width='80%' alt='kruskal_one'/><p>

간선들의 가중치를 오름차순으로 정렬하고 앞에서부터 차례대로 경로를 더해준다.

<p align="center"><img src='/images/Algorithm/Kruskal/kruskal_two.png' width='80%' alt='kruskal_two'/><p>

차례대로 경로를 더해주는 과정에서 사이클이 형성 되는 간선이 존재한다면 해당 간선은 제외해준다.

<p align="center"><img src='/images/Algorithm/Kruskal/kruskal_three.png' width='80%' alt='kruskal_three'/><p>

완성되면 다음과 같다.

<p align="center"><img src='/images/Algorithm/Kruskal/kruskal_four.png' width='80%' alt='kruskal_four'/><p>

### Kruskal Algorithm Code

```javascript
// 해당 노드의 부모노드 찾기
function Find(parent, el) {
  while (parent[el] !== el) {
    el = parent[el]
  }
  return el
}

// 두 트리를 하나로 합침
function Union(parent, a, b) {
  let rootA = Find(parent, a)
  let rootB = Find(parent, b)

  // 이미 연결된 노드의 경우
  if (rootA === rootB) return false

  // 작은 부모 노드 값을 가진 쪽으로 합친다.
  if (rootA < rootB) {
    if (parent[b] !== b) Union(parent, parent[b], a)
    parent[b] = parent[a]
    return true
  } else {
    if (parent[a] !== a) Union(parent, parent[a], b)
    parent[a] = parent[b]
    return true
  }
}

function Kruskal(nodes, edges) {
  let graph = []
  const parent = {}
  nodes.forEach(el => (parent[el] = el)) // 1
  edges.sort((a, b) => a[2] - b[2])
  while (edges.length > 0) {
    // 2
    let minweight = edges.shift()
    let result = Union(parent, minweight[0], minweight[1]) // false면 사이클을 형성
    if (result) graph.push(minweight) // 3
  }
  return graph
}

var nodes = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
var edges = [
  ['A', 'B', 7],
  ['A', 'D', 5],
  ['B', 'C', 8],
  ['B', 'D', 9],
  ['B', 'E', 7],
  ['C', 'E', 5],
  ['D', 'E', 15],
  ['D', 'F', 6],
  ['E', 'F', 8],
  ['E', 'G', 9],
  ['F', 'G', 11],
]

console.log(Kruskal(nodes, edges))

/*
[['A', 'D', 5], ['C', 'E', 5], ['D', 'F', 6], 
 ['A', 'B', 7], ['B', 'E', 7], ['E', 'G', 9]]
*/
```

1.  그래프의 간선을 가중치의 오름차순으로 정렬한다.
2.  정렬된 간선 리스트에서 순서대로 사이클을 형성하지 않는 간선을 선택한다.  
    즉, 가장 낮은 가중치를 먼저 선택한다.  
    사이클을 형성하는 간선을 제외하며 사이클 유무는 Union-Find를 이용하여 판단한다.
3.  해당 간선을 현재의 MST(최소 비용 신장 트리)의 집합에 추가한다.
