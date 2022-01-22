---
date: '2022-01-11'
title: '트리 (Tree)'
categories: ['Data Structure']
summary: '비선형 자료구조인 트리에 대해서 알아보자'
thumbnail: './tree_thumbnail.png'
showThumbnail: true
---

### 개발자가 알아야 하는 자료구조 8가지

**7. 트리**

### 트리란?

트리는 하나의 뿌리에서 위로 뻗어 나가는 형상이라서 <b>트리(tree)</b>라는 명칭이 붙었는데, 트리 구조를 표현할 때는 나무의 형상과는 반대로 표현한다.
트리 구조는 우리가 일상 생활에서 볼 수 있는 족보나 회사 조직도 같은 걸 떠올리면 된다.  
트리의 속성으로는 비선형 자료구조이며 <b>계층적 구조</b>라고 표현하기도 하며 재귀로 정의된 <b>자기 참조 자료구조</b>라고도 한다.
쉽게 생각하자면 부모도 트리고 자식도 트리며 자식의 자식도 트리이다.
즉 여러 개의 트리가 쌓여 큰 트리가 되며 이런걸 흔히 <b>서브 트리</b>로 구성되어있다고 표현한다.
이런 재귀적 특성에 의해 트리를 순회할 때도 재귀 순회가 좀 더 자연스러운 편이다.

### 트리의 각 명칭

다음은 이미지는 트리의 구조를 보여주고 있다.

<p align="center"><img src='/images/DataStructure/Tree/tree_structure.png' width='90%' alt='tree_structure' /><p>

트리는 항상 <b>루트(Root)</b>에서부터 시작된다. 루트는 <b>자식(Child)</b>노드를 가지며, <b>간선(Edge)</b>으로 연결되어 있다.  
자식 노드의 개수는 <b>차수(Degree)</b>라고 하며 <b>크기(Size)</b>는 자신을 포함한 모든 자식 노드의 개수다.  
위의 이미지에서 B노드는 차수가 2이며 크기는 6이라고 할 수 있다.  
<b>높이(Height)</b>는 현재 위치에서 <b>리프(Leaf)</b>까지의 거리, <b>깊이(Depth)</b>는 루트에서부터 현재 노드까지의 거리다.  
트리는 그 자식도 트리인 서브트리 구성을 가지고 있으며 트리의 레벨은 0부터 시작된다.  
트리는 항상 단방향이기 때문에 간선의 화살표는 생략 가능하다.

### 그래프 vs 트리

그렇다면 그래프와 트리의 차이점은 무엇일까?
앞서 그래프를 소개할 때 간략하게 설명했었다.

> 트리와는 다르게 그래프는 정점마다 간선이 없을 수도 있으며 부모와 자식 노드로 구분되지도 않는다.

트리는 확실히 부모와 자식간으로 이루어진 계층 구조를 가지고 있다.
그리고 그래프가 순환 구조(Cyclic)를 가질 수 있는것과 달리 트리는 순환 구조를 가지지 않는 그래프다.
실은 가장 핵심이 <b>순환 구조를 가지지 않는다</b>는 점이다.  
트리는 특수한 그래프의 일종이며, 크게 본다면 그래프의 범주에 포함한다.
하지만 트리는 그래프와는 다르게 어떤 경우에도 한번 연결된 노드가 다시 연결되는 법이 없으며 단방향, 양방향을 가리킬 수 있는 그래프와는 다르게
오직 부모에서 자식노드를 가리키는 단방향뿐이다.
그리고 트리는 오직 하나의 부모만을 가지며 루트 역시 하나뿐이어야 한다.

### 트리 구현하기

가장 먼저 빈트리를 생성해준다.  
이때 tree는 root를 반드시 가져야 하며 생성자(Constructor)를 이용해 root를 선언해준다.

```javascript
class Tree {
  constructor(data) {
    this.root = null
  }
}
```

트리는 최상위에 root를 가지며, 각 Node는 data와 children을 가지고 있다.  
트리는 기본적으로 추가와 삭제 기능을 사용하여 다룬다.

```javascript
class Node {
  constructor(data) {
    this.data = data
    this.children = []
  }
  add(data) {
    this.children.push(new Node(data))
  }
  remove(data) {
    this.children = this.children.filter(node => {
      node.data !== data
    })
  }
}
```

### 트리의 탐색 (DFS, BFS)

트리를 이용하여 순회를 할 수 있다.

**BFS**

<p align="center"><img src='/images/DataStructure/Tree/tree_bfs.png' width='90%' alt='tree_bfs' /><p>

너비 우선 탐색은 root 노드에서 시작해서 한 단계씩 아래 위치로 이동하며 Node를 탐색한다.  
이때 큐를 이용하는데 위 이미지 처럼 root인 A를 빼며 자식 노드인 B, C를 큐에 넣어주고 다시 B의 자식 노드인 D,E와 C의 자식노드인 F,G를 큐에 넣어주며 B와 C는 큐에서 빼준다.  
따라서 BFS로 트리 탐색을 진행하면 **A -> B -> C -> D -> E -> F -> G** 순으로 탐색을 진행한다.

구현 코드

```javascript
class Tree {
  constructor(data) {
    this.root = null
  }
  BFS(cb) {
    if (this.root === null) return

    const queue = [this.root]
    while (queue.length) {
      const curNode = queue.shift()
      queue.push(...curNode.children) // 부모 노드의 자식 노드를 전부 queue에 push한다.
      cb(curNode)
    }
  }
}

const tree = new Tree()
tree.root = new Node('A')
tree.root.add('B')
tree.root.add('C')
tree.root.add('D')
tree.root.children[0].add('E')
tree.root.children[0].add('F')
tree.root.children[1].add('G')

const bfs = []
tree.BFS(node => bfs.push(node.data)) // ['A', 'B', 'C', 'D', 'E', 'F', 'G']
```

**DFS**

<p align="center"><img src='/images/DataStructure/Tree/tree_dfs.png' width='90%' alt='tree_dfs' /><p>

깊이 우선 탐색은 root 노드에서 시작하여 가장 깊은 곳(리프 노드 까지)을 먼저 탐색하는 알고리즘이며
BFS와 달리 DFS에서는 노드를 추가할 때 push()메서드가 아닌 unshift() 메서드로 앞에다 추가해준다.  
root인 A노드에서 부터 부모 노드의 왼쪽 서브 트리를 먼저 탐색하고 오른쪽 서브트리를 탐색해준다.  
따라서 DFS로 트리 탐색을 진행하면 **A -> B -> E -> F -> C -> G -> D** 순으로 탐색을 진행한다.

구현 코드

```javascript
class Tree {
  constructor(data) {
    this.root = null
  }
  DFS(cb) {
    if (this.root === null) return

    const queue = [this.root]
    while (queue.length) {
      const curNode = queue.shift()
      queue.unshift(...curNode.children) // 부모 노드의 자식 노드를 전부 queue에 push한다.
      cb(curNode)
    }
  }
}

const tree = new Tree()
tree.root = new Node('A')
tree.root.add('B')
tree.root.add('C')
tree.root.add('D')
tree.root.children[0].add('E')
tree.root.children[0].add('F')
tree.root.children[1].add('G')

const dfs = []
tree.DFS(node => dfs.push(node.data)) // ['A', 'B', 'E', 'F', 'C', 'G', 'D']
```

다음 시간에는 이진 트리와 이진 탐색 트리에 대해서 알아보겠다.
