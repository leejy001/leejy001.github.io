---
date: '2022-04-07'
title: 'Union Find'
categories: ['JavaScript', 'Algorithm']
summary: '대표적인 그래프 알고리즘 중 하나인 Union Find에 대해서 알아보자'
thumbnail: './javascript_thumbnail.png'
---

### 알고리즘 정리 8번째 [Union-Find]

Union-Find는 대표적인 그래프 알고리즘이며 <b>서로소 집합(Disjoin-Set)</b> 알고리즘이라고도 한다.  
Disjoint Set(서로소 집합) 자료구조란 많은 disjoint set으로 나눠진 원소들에 대한 정보를 저장하고 조작하는 자료구조이다.
여기서 서로소 집합이란 아래 그림과 같이 서로 공통된 원소가 없는 집합을 의미한다.

<p align="center"><img src='/images/Algorithm/UnionFind/DisjointSet.png' width='100%' alt='disjoint set'/><p>

<b>Disjoint Set Union / DSU</b>는 보통 <b>Union Find</b>라고 불린다.

> “공통 원소가 없는, 즉 상호 배타적인 부분 집합 들로 나눠진 원소들에 대한 정보를 저장하고 조작하는 자료구조”

Union Find 자료구조는 2가지의 <b>union</b>과 <b>find</b> 연산을 지원한다.

### Union

union은 2개의 set(집합)을 하나의 set(집합)으로 합쳐준다.  
만약 아래와 같은 두개의 서로소 집합이 존재한다면

<p align="center"><img src='/images/Algorithm/UnionFind/Union_1.png' width='70%' alt='Union_1'/><p>

각 disjoint set의 root를 찾은 다음에 높이가 작은 쪽을 큰 쪽으로 합쳐준다.

<p align="center"><img src='/images/Algorithm/UnionFind/Union_2.png' width='70%' alt='Union_2'/><p>

이를 <b>Union by rank</b>라고 한다.

### Union by rank

Union by rank 방법을 쓰는 이유는 뭘까?

Unoin 순서에 따라서<b>(트리의 depth를 기준으로 할 때)</b>,  
최악의 경우에는 오직 한쪽으로만 트리가 정렬되어 버리는 depth가 가장 깊은 연결 리스트와 같은 형태가 될 수도 있다.  
이 때 <b>Find/Union</b> 시 계산량이 <b>O(N)</b>이 될 수 있기 때문에 해당 문제를 피하고자 Union by rank 기법을 사용한다.  
두 개의 disjoint set을 합칠 때 항상 작은 쪽을 큰 쪽에 합치며 두 트리의 depth가 같은 경우에만 +1 증가한다.  
Union by rank를 이용하면 <b>worst case</b>일 시 시간 복잡도는 <b>O(log n)</b>이 된다.

### Find

find는 어떤 원소(노드)가 주어지면 이 원소가 속해져 있는 대표 원소(즉, root 노드)를 반환한다.  
이를 위해 어떤 원소와 각 대표 원소들 간의 find 결과를 비교하여 같은 집합임을 판단한다.  
아래의 경우 3의 대표 원소는 6이 된다.

<p align="center"><img src='/images/Algorithm/UnionFind/Find_1.png' width='70%' alt='Find_1'/><p>

여기에서도 <b>경로 압축 (path compression)</b>으로 find 연산을 수행 할 때마다 트리의 구조를 평평하게 만드는 방법을 이용하여 성능을 향상 시킬 수 있다.

### path compression

이 방법은 루트 노드까지 순회중 방문한 각 노드들이 직접 루트 노드를 가리키도록 갱신하는 것으로, 모든 노드들은 같은 대표 노드를 공유하게 된다.  
트리 윗부분을 재귀적으로 순회하면서 각 노드들이 루트 노드를 부모 노드로 참조하도록 갱신한다.  
최종적으로 생성된 트리는 보다 평평하며, 이는 해당 원소뿐만 아니라 이들을 직/간접적으로 참조하는 연산들의 속도를 빠르게 해준다.

다음은 <b>경로 압축(path compression)</b>을 적용시킨 트리의 모습이다.
<br/><br/>

<p align="center"><img src='/images/Algorithm/UnionFind/Find_2.png' width='70%' alt='Find_2'/><p>

경로 압축을 하는 방법은 다음과 같다.  
`3 → 2 → 6`으로 이어지는 경로가 있다고 하면 `3의 대표 원소는 2`고 `2의 대표 원소는 6`이다.  
아래와 같이 나타낼 수 있다.

<p align="center"><img src='/images/Algorithm/UnionFind/PathComp_1.png' width='100%' alt='PathComp_1'/><p>

이 경로를 역으로 올라가면 우선 `3의 대표 원소는 2`가 되고 `2의 대표 원소는 6`이 된다.  
6은 자기 자신이 대표 원소가 된다.  
다시 3으로 가서 `3의 대표원소는 결국 2의 대표원소이기도 한 6`이 된다.

<p align="center"><img src='/images/Algorithm/UnionFind/PathComp_2.png' width='100%' alt='PathComp_2'/><p>

위와 같은 방법을 통해서 경로 압축을 진행하게 된다.

### Union-Find 코드

```jsx
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
  if (rootA === rootB) return

  // 작은 부모 노드 값을 가진 쪽으로 합친다.
  if (rootA < rootB) {
    if (parent[b] !== b) Union(parent, parent[b], a)
    parent[b] = parent[a]
  } else {
    if (parent[a] !== a) Union(parent, parent[a], b)
    parent[a] = parent[b]
  }
}

// 두 노드가 연결되어 있는지 검사
function isConnect(parent, a, b) {
  return Find(parent, a) === Find(parent, b)
}

function UnionFind(arr) {
  const parent = {}
  // 자기 자신을 부모노드로 초기화
  arr.forEach(el => (parent[el] = el))

  Union(parent, 'A', 'B') // {A: 'A', B: 'A', C: 'C', D: 'D', E: 'E'}
  Union(parent, 'C', 'D') // {A: 'A', B: 'A', C: 'C', D: 'C', E: 'E'}
  Union(parent, 'A', 'D') // {A: 'A', B: 'A', C: 'A', D: 'C', E: 'E'}
  // {A: 'A', B: 'A', C: 'A', D: 'A', E: 'E'}

  console.log(isConnect(parent, 'B', 'E')) // false
  console.log(isConnect(parent, 'B', 'D')) // true
}

UnionFind(['A', 'B', 'C', 'D', 'E'])
```

### 참고

[wiki 서로소 집합 자료구조](https://ko.wikipedia.org/wiki/%EC%84%9C%EB%A1%9C%EC%86%8C_%EC%A7%91%ED%95%A9_%EC%9E%90%EB%A3%8C_%EA%B5%AC%EC%A1%B0)

[geeksforgeeks union find](https://www.geeksforgeeks.org/union-find-algorithm-set-2-union-by-rank/)
