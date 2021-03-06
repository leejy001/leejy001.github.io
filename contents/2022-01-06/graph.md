---
date: '2022-01-06'
title: '그래프 (Graph)'
categories: ['Data Structure']
summary: '비선형 자료구조인 그래프에 대해서 알아보자'
thumbnail: './graph_thumbnail.png'
---

### 개발자가 알아야 하는 자료구조 8가지

**6. 그래프**

### 그래프란?

그래프 이론에서 그래프란 객체의 일부 <b>쌍(pair)들이 '연관되어' 있는 객체 집합 구조</b>를 말한다.  
그래프는 노드(또는 vertex라고도 한다.)와 그 노드를 연결하는 간선(edge)를 하나로 모아 놓은 비선형 자료구조다.  
일종의 조직도라고 하며 그런 면에서 트리(tree)역시 그래프의 일종이다.  
다만 트리와는 다르게 그래프는 정점마다 간선이 없을 수도 있으며 부모와 자식 노드로 구분되지도 않는다.

### 그래프의 등장

20세기의 수학 분야에서 가장 놀라운 사건으로 위상수학의 등장을 뽑을 수 있다.  
이러한 위상수학의 등장에 가장 큰 원인은 18세기에 벌어진 재미난 문제에서 비롯되었다.

<p align="center"><img src='/images/DataStructure/Graph/Konigsberg_bridges.png' width='70%' alt='Konigsberg_bridges' /><p>

프로이센 공국의 쾨니히스베르크에는 강 사이에 2개의 큰 섬과 그런 섬과 도시를 연결하는 7개의 다리가 있었다.  
여기서 누군가가 "이 7개의 다리를 한 번씩만 건너서 모두 지나갈 수 있을까?"에 대한 의문을 제기했고
많은 사람들도 경험적으로 한 번씩만 건너가서 모든 다리를 건널 수 있다는 방법이 존재하지 않을 것이라고 생각했지만
명쾌한 해답을 구하지는 못했다.
이때 수학자 레온하르트 오일러가 '쾨니히스베르크의 다리 문제'를 조사했고 결론적으로 위 문제는 불가능하다는 결론을 증명한다.
이것이 <b>그래프 이론</b>의 시작이었다.

### 오일러 경로

그렇다면 오일러는 어떤 방법으로 쾨니히스베르크의 다리 문제를 해결했을까?  
오일러는 이 문제를 아래 그림과 같이 a부터 g까지 이름을 부여하고 도식화하여 1735년에 논문을 발표한다.

<p align="center"><img src='/images/DataStructure/Graph/Euler_sketch.png' width='80%' alt='Euler_sketch' /><p>

오일러의 스케치를 현대식 그래프의 구조에 따라 그림으로 나타내면 A부터 D까지를 <b>정점(vertex)</b>, a부터 g까지는  
<b>간선(edge)</b>으로 구성된 그래프라는 수학적 구조를 찾아볼 수 있다.

<p align="center"><img src='/images/DataStructure/Graph/Konigsberg_graph.png' width='50%' alt='Konigsberg_graph' /><p>

오일러는 모든 정점이 짝수 개의 차수(degree)를 가진다면 모든 다리를 한 번씩만 건너서 도달하는 것이 성립한다고 했으며
그로부터 거의 140년이 지난 1873년에 독일의 수학자 칼 히어홀저가 이를 수학적으로 증명하고 이를 <b>오일러의 정리</b>라 불렀다.
아울러 모든 간선을 한 번씩 방문하는 유한 그래프를 <b>오일러 경로</b>라 하며 다른 말로는 <b>한붓 그리기</b>라고도 한다.
쾨니히스베르크의 다리는 모든 정점이 짝수개의 차수를 갖지 않으므로 오일러의 경로가 아니다.

### 해밀턴 경로

수학자 윌리엄 로원 해밀턴이 그래프 이론에 제기한 회로의 종류이다.
해밀턴 경로는 모든 정점을 한 번씩 방문하는 무향 또는 유향 그래프 경로를 말한다.
오일러 경로와 해밀턴 경로의 차이점은 <b>오일러는 간선을 기준</b>으로 <b>해밀턴은 정점을 기준</b>으로 한다.
그런데 이런 단순한 차이에도 불구하고 해밀턴 경로를 찾는 문제는 최적 알고리즘이 없는 대표적인 NP-완전 ~~완전 환장하는~~ 문제다.
원래의 출발점으로 돌아오는 경로는 <b>해밀턴 순환</b>이라고 하는데 이중에서 특히 최단 거리를 찾는 문제는 알고리즘 분야에서
외판원 문제로도 더욱 유명하다.  
외판원 문제와 관련되어서는 알고리즘 시간에 좀 더 다뤄보도록 하겠다.
<br/><br/>
**그래프 용어에 대해서 간단하게 정리 해봤다.**

<p align="center"><img src='/images/DataStructure/Graph/undirection_graph.png' width='30%' alt='undirection_graph' /><p>

1. <b>정점(vertex):</b> 노드(node)라고도 하며 정점에는 데이터가 저장된다. 위 그림에서는 (0, 1, 2, 3)이 정점이다.
2. <b>간선(edge):</b> 정점간의 관계, 링크(arcs)라고도 한다.
3. <b>인접 정점(adjacent vertex):</b> 간선에 의해 직접 연결된 정점이다.  
   위 그림처럼 <b>0</b>과 <b>1</b>이 연결되어 있는 간선이 있다면 두 정점 <b>0, 1</b>은 <b>인접되어 있다</b>고 하고
   간선 <b>(0, 1)</b>은 정점 <b>0</b>와 <b>1</b>에 <b>부속되어 있다</b>고 한다.
4. <b>단순 경로(simple path):</b> 경로 중에서 반복되는 정점이 없는 경우
5. <b>차수(degree):</b> 무방향 그래프에서 하나의 정점에 인접한 정점의 수, 위 그림에서 정점<b>1</b>의 차수는 <b>3개(0, 2, 3)</b>이다.

<p align="center"><img src='/images/DataStructure/Graph/direction_graph.png' width='30%' alt='direction_graph' /><p>

6. <b>진입 차수(in-degree):</b> 방향 그래프에서 외부에서 오는 간선의 수
7. <b>진출 차수(out-degree):</b> 방향 그래픙에서 외부로 향하는 간선의 수  
   위 그림을 토대로 정점 <b>0</b>은 진입 차수 1개 진출 차수 2개라고 할 수 있다.
8. <b>경로 길이(path length):</b> 경로를 구성하는 데 사용된 간선의 수, <b>0</b>에서 <b>1</b>로 가기 위해서 간선이 1개 필요하다.  
   이렇게 서로 다른 정점으로 구성된 경로를 <b>단순경로</b>라 한다. 하지만 <b>0 -> 1 -> 2 -> 0</b>이나 <b>0 -> 3 -> 2 -> 0</b>같은 경우는 단순경로가 아니다.
9. <b>사이클(cycle):</b> <b>0 -> 1 -> 2 -> 0</b>이나 <b>0 -> 3 -> 2 -> 0</b>같은 단순 경로의 시작 정점과 종료 정점이 동일한 경우

### 그래프 구현 방식

그래프를 구현하는 방법에는 두가지의 방법이 존재하며 두 구현 방식은 각각의 상반된 장단점을 가지고 있는데 대부분은 인접리스트 형식을
많이 사용한다.
<br/><br/>

**1. 인접행렬 방식**

인접 행렬은 정점들을 이차원적인 배열로 구현하며 정사각형의 행렬 구조를 가지고 있으며 이를 <b>정방 행렬</b>이라 한다.  
인접 행렬은 그래프에 간선이 많이 존재하는 밀집 그래프의 경우에 용이하며, 간선의 수와 무관하게 항상 n^2개의 메모리 공간이 필요하며
특정 노드들의 인접 노드들을 탐색하기 위해 모든 노드들을 확인해야하지만, 정점간의 연결여부 확인 시 O(1)의 시간복잡도를 요구한다.
<이미지>

무방향 인접 행렬 그래프를 구현 해보자
먼저 정점의 간선을 저장해줄 행렬을 선언한다.

```javascript
class GraphMatrix {
  constructor() {
    this.matrix = []
  }
}
```

정점을 추가할 때 행 방향과 열 방향으로 빈 값(0)을 추가해줘야 한다.

```javascript
// class GraphMatrix
addVertex() {
    const curLen = this.matrix.length;
    for (let i = 0; i < curLen; i++) {
        this.matrix[i].push(0);
    }
    this.matrix.push(new Array(curLen + 1).fill(0));
}
```

정점이 존재하는지 확인하는 코드다.

```javascript
// class GraphMatrix
isVertex(vertex) {
    return vertex < this.matrix.length;
}
```

간선을 추가하는데 추가하려는 해당 간선이 두 정점을 포함하고 있는지, 범위에서 벗어나지 않는지 확인하고  
무방향 그래프이기 때문에 두 정점의 방향 (A->B, B->A) 모두 간선을 추가해 줘야한다.

```javascript
// class GraphMatrix
addEdge(from, to) {
    const curLen = this.matrix.length;
    if (from === undefined || to === undefined) {
        console.log("need two vertex");
        return;
    }
    if (from + 1 > curLen || to + 1 > curLen || from < 0 || to < 0) {
        console.log("out of range");
        return;
    }
    this.matrix[from][to] = 1;
    this.matrix[to][from] = 1;
}
```

두 정점 사이에 간선이 있는지 확인한다.

```javascript
// class GraphMatrix
hasEdge(from, to) {
    return this.matrix[from][to] === 1;
}
```

간선을 삭제할 때 추가할 때와 마찬가지로 조건을 확인하고  
무방향 그래프이기 때문에 두 정점의 방향 (A->B, B->A) 모두 간선을 제거해 준다.

```javascript
// class GraphMatrix
removeEdge(from, to) {
    const curLen = this.matrix.length;
    if (from === undefined || to === undefined) {
        console.log("need two vertex");
        return;
    }
    if (from + 1 > curLen || to + 1 > curLen || from < 0 || to < 0) {
        console.log("out of range");
        return;
    }
    this.matrix[from][to] = 0;
    this.matrix[to][from] = 0;
}
```

**2. 인접리스트 방식**  
그래프내에 적은 숫자의 간선만을 가지는 경우에 가장 용이한 방식이다.  
각각의 정점에 인접한 정점들을 리스트로 표시했으며 배열이나 연결리스트 등을 이용하여 구현이 가능하다.  
특징은 연결된 간선의 정보만을 저장하여 O(E)의 공간을 요구하며 인접행렬에 비해 공간 효율성은 좋지만
각 정점들의 연결 여부 확인을 위한 O(v)의 시간 복잡도를 가진다.
<이미지>

다음은 무방향 그래프 인접 리스트를 구현한 코드다.  
자바스크립트에는 리스트라는 데이터 형태가 없기에 객체로 대체해서 구현한다.  
(실은 자바스크립트로 그래프를 구현할 때 가장 많이 쓰기도 한다.)

```javascript
class GraphList {
  constructor() {
    this.vertices = {}
  }
}
```

정점을 추가한다.  
넘겨 받은 정점은 key가 되고 빈 배열을 값으로 할당하며 이미 존재하는 정점일 때 덮어 씌워 지는 것을 방지한다.

```javascript
// class GraphList
addVertex(vertex) {
    if (vertex in this.vertices) {
        this.vertices[vertex] = this.vertices[vertex];
    } else {
        this.vertices[vertex] = [];
    }
}

// vertex: [edge, ...]
```

넘겨받은 정점의 존재여부를 파악한다.

```javascript
// class GraphList
isVertex(vertex) {
    return !!this.vertices[vertex];
}
```

정점을 삭제한다.  
인자로 넘겨받은 정점이 존재하면 이 정점을 삭제 함은 물론이고 다른 모든 정점들을 살피며 해당 정점과 연결되어 있는 간선을 제거한다.

```javascript
// class GraphList
removeVertex(vertex) {
    if (this.isVertex(vertex)) {
        while (this.vertices[vertex].length > 0) {
            this.removeEdge(this.vertices[vertex][0], vertex);
        }
        delete this.vertices[vertex];
    }
}
```

간선을 추가한다.  
해당 간선이 두 정점을 포함하고 있는지 확인하고 from과 to정점의 인접 리스트에 서로 정점을 추가해준다.

```javascript
// class GraphList
addEdge(from, to) {
    if (!this.isVertex(from) || !this.isVertex(to)) {
        console.log("need two vertex");
        return;
    }
    if (!this.hasEdge(from, to)) {
        this.vertices[from].push(to);
        this.vertices[to].push(from);
    }
}
```

간선이 있는지 확인한다.  
만약 from정점이 존재하지 않으면 false반환한다.  
정점이 존재하다면 from정점의 인접 리스트에 해당 간선과 이어지는 to정점이 있는지 반환한다.

```javascript
// class GraphList
hasEdge(from, to) {
    if (!this.isVertex(from)) return false;
    return !!this.vertices[from].includes(to);
}
```

간선을 삭제한다.  
인자로 넘겨받은 두 정점이 모두 존재한다면 from정점의 인접 리스트에 있는 to정점을 삭제하고 to 정점의 인접 리스트에 있는 from 정점을 삭제한다.

```javascript
// class GraphList
removeEdge(from, to) {
    if (!this.isVertex(from) || !this.isVertex(to)) {
        console.log("need two vertex");
        return;
    }
    if (this.hasEdge(from, to)) {
        const toIndex = this.vertices[to].indexOf(from);
        const fromIndex = this.vertices[from].indexOf(to);
        this.vertices[to].splice(index, 1);
        this.vertices[from].splice(index, 1);
    }
}

```

### 그래프 종류

**무방향 그래프**  
무방향 그래프는 간선에 방향이 없는 그래프를 말한다.
무방향 그래프는 정점 A와 정점 B를 연결하는 간선을 (A, B)로 표현한다.

<p align="center"><img src='/images/DataStructure/Graph/undirection_graph.png' width='30%' alt='undirection_graph' /><p>

위 무방향 그래프를 정점의 집합V(G)과 간선의 집합E(G)을 사용하여 다음과 같은 표현이 가능하다.

> V(G) = {0,1,2,3}, E(G) = {(0, 1), (0, 2), (1, 2), (1, 3), (2, 3)}  
> 무방향 그래프의 최대 간선 수 : n(n-1)/2

**방향 그래프**  
방향 그래프는 간선에 방향이 있는 그래프를 말하며, 다이 그래프라고도 한다.
방향 그래프에서 정점 A에서 정점 B를 연결하는 간선 (A -> B)를 <b><A, B></b>로 나타낸다.
여기서 A를 꼬리라 부르고 B를 머리라고 부른다.  
또한 방향그래프에서 <A, B>, <B, A>는 서로 다른 간선이다.

<p align="center"><img src='/images/DataStructure/Graph/direction_graph.png' width='30%' alt='direction_graph' /><p>

위 방향 그래프를 정점의 집합 V(G)와 간선의 집합E(G)를 사용하여 다음과 같은 표현이 가능하다.

> V(G) = {0,1,2,3}, E(G) = {<0, 1>, <0, 3>, <1, 2>, <2, 0>, <3, 2>}  
> 방향 그래프의 최대 간선 수 : n(n-1)/1

**부분 그래프**  
부분 그래프는 원래 그래프에서 일부 정점이나 간선을 제외하여 만든 그래프다.  
아래 이미지를 보면 그래프 G와 그래프 G\`는 종속적인 관계를 가진다.

<table>
   <tr>
     <th align="center">
       <img src='/images/DataStructure/Graph/root_graph.png' width='80%' alt='root_graph' />
       <br>G
     </th>
     <th align="center">
       <img src='/images/DataStructure/Graph/part_graph.png' width='80%' alt='part_graph' />
       <br>G`
    </th>
  </tr>
</table>

> V(G\`) ⊆ V(G), E(G`) ⊆ E(G)

**가중치 그래프**  
가중 그래프는 간선에 가중치를 할당한 그래프를 말하며 네트워크라고도 한다.

<p align="center"><img src='/images/DataStructure/Graph/network.png' width='30%' alt='network' /><p>

### 그래프 탐색

첫 정점에서부터 그래프에 존재하는 모든 정점들을 모두 한번씩 방문하는 것을 그래프 탐색이라고 한다.
그래프 탐색의 방법에는 깊이 우선 탐색과 너비 우선 탐색 방식이 있다.
여기선 간단히 어떤 건지에 대해서만 설명하고 자세한 구현 방법은 알고리즘 시간에 따로 쓰겠다.

**DFS**  
깊이 우선 탐색은 한 경로로 갈 수 있는 만큼 최대한 깊이 가고, 더 이상 갈 곳이 없다면 이전 정점으로 되돌아가는 방식으로 그래프를 순회한다.
간단히 재귀호출이나 스택을 사용하여 구현한다.

**BFS**  
넓이 우선 탐색은 시작 정점을 방문하고 해당 정점과 인접한 모든 정점을 방문한 후 시작 정점에 인접한 모든 정점들을 우선 방문하는 방법이다.
재귀를 이용하여 구현은 불가능 하며 일반적으로 큐를 사용해서 인접 정점을 모두 저장하는 방식으로 구현한다.
