---
date: '2022-01-14'
title: '이진 트리 (Binary Tree)'
categories: ['Data Structure']
summary: '이진 트리와 이진 트리 탐색에 대해서 알아보자'
thumbnail: './binary_tree_thumbnail.png'
showThumbnail: true
---

저번 자료구조 시간에 트리에 대해서 알아봤으며 이번에는 이진 트리와 이진 탐색 트리에 대해서 알아보겠다.

### 이진 트리(Binary Tree)

우리가 트리라고 하면 흔히 가장 먼저 생각하는게 이진트리다. 그럼 이진 트리가 과연 뭘까?  
트리에서 가장 널리 사용하는 트리 자료구조는 이진트리와 이진 탐색트리(Binary Search Tree)다.
트리에서 각 노드가 m개 이하의 자식을 가진다면 <b>m-ary 트리(다항 트리, 다진 트리)</b>라고 한다.
여기서 모든 노드가 2개(m = 2)이하의 자식을 가진 경우 이를 <b>이진 트리</b>라고 한다.
이진트리가 널리 쓰이는 이유는 자식을 오른쪽과 왼쪽만 가지기에 다진 트리보다 훨씬 간결하며 여러 가지 알고리즘 구현 시 더 간단하게 처리할 수 있어서, 대체로 트리라고 하면 특별한 경우가 아니라면 이진 트리를 많이 사용한다.

### 이진 트리의 종류

이제 이진트리의 유형에 대해서 알아보도록 하자

<p align="center"><img src='/images/DataStructure/tree_kinds.png' width='90%' alt='tree_kinds' /><p>

**정 이진 트리(Full Binary Tree):** 모든 노드가 0개 또는 2개의 자식 노드를 가진다.  
**완전 이진 트리(Complete Binary Tree):** 마지막 레벨을 제외하고 모든 레벨이 완전히 채워져 있으며 마지막 레벨의 노드는 가장 왼쪽부터 채워진다.  
**포화 이진 트리(Perfect Binary Tree):** 모든 노드가 2개의 자식을 가지고 있으며, 모든 리프 노드가 동일한 깊이 또는 레벨을 가진다.

### 이진 탐색 트리(Binary Search Tree)

이진 탐색 트리는 고정된 데이터 집합에서만 가능한 이진 탐색의 단점을 보완한 이진 탐색을 위한 이진트리다.  
그렇다면, 이진트리와 이진 탐색 트리의 다른 점은 무엇일까?  
<br/>
이진 탐색 트리는 다음과 같은 규칙을 가지고 있다.

> 왼쪽 자식 노드는 루트 노드보다 작고 오른쪽 자식 노드는 루트 노드보다 크다.  
> 왼쪽과 오른쪽 서브 트리 또한 이진 탐색 트리이다.

<p align="center"><img src='/images/DataStructure/binary_tree.png' width='50%' alt='tree_kinds' /><p>

위 그림 처럼 이진 트리를 유지하며 루트 키 값을 기준보다 작은 것은 <b>왼쪽 서브 트리</b>, 큰 것은 <b>오른쪽 서브 트리</b>를 유지하는 구조다.
이진 탐색 트리에서 이진 탐색은 기본 적인 이진 탐색과 별반 다르진 않다. 다만, 고정된 배열의 이진 탐색에서의 중앙요소(mid)가 이진 탐색 트리에서는
루트 노드와 부모 노드들이 그 역할을 맞게 된다.

### 이진 트리 구현

우선 이진 트리는 값을 넣는 value와 왼쪽 자식노드(left)와 오른쪽 자식노드(right)를 갖는다.

```javascript
class Node {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}
```

이진 트리에 삽입, 삭제를 기본적으로 구현하며 삭제 시 필요한 findMinNode 함수도 구현한다.  
findMinNode 함수에 대해선 뒤에서 설명하겠다.  
그다음 이진 트리 탐색과 트리 순회(전위, 중위, 후위)에 대해서도 구현할 것이다.

```javascript
class BinarySearchTree {
  constructor() {
    this.root = null
  }
  // insert(value)
  // remove(value)

  // findMinNode()
  // inorder(node)
  // preorder(node)
  // postorder(node)
  // search(node)
}
```

우선 삽입의 경우를 보면 insert(value)와 insertNode(node, newNode) 메서드가 있다.  
**insert(value)**  
새로운 노드를 생성한 후 트리가 비어있다면 이 노드를 root로 만들고 그렇지 않으면 insertNode 함수를 호출한다.

<p align="center"><img src='/images/DataStructure/binary_tree_add.png' width='70%' alt='tree_kinds' /><p>

**insertNode(node, newNode)**  
주어진 값을 현재 노드의 데이터와 비교하며 그에 따라 왼쪽 혹은 오른쪽 서브 트리로 이동하고
새로운 노드를 추가할 수 있는 null 값을 가진 노드를 찾을 때까지 반복한다.

```javascript
  insert(value) {
    let newNode = new Node(value);
    if (this.root === null) this.root = newNode;
    else this.insertNode(this.root, newNode);
  }
  insertNode(node, newNode) {
    if (newNode.value < node.value) {
      if (node.left === null) node.left = newNode;
      else this.insertNode(node.left, newNode);
    } else {
      if (node.right === null) node.right = newNode;
      else this.insertNode(node.right, newNode);
    }
  }
```

삭제의 경우에는 remove(value)와 removeNode(node, value) 메서드가 있다.  
**remove(value)**  
root와 주어진 값을 전달하여 removeNode함수를 호출하고 함수에서 반환된 값으로 트리의 루트를 업데이트 한다.

**removeNode(node, value)**  
주어진 값이 있는 노드를 탐색하고 다음 단계를 수행한다.

<p align="center"><img src='/images/DataStructure/binary_tree_delete1.png' width='50%' alt='binary_tree_delete1' /></p>

**자식노드가 없는 경우:** 가장 말단 노드는 자식이 없기에 쉽게 제거할 수 있다.

<p align="center"><img src='/images/DataStructure/binary_tree_delete2.png' width='50%' alt='binary_tree_delete2' /></p>

**하나의 자식노드가 있는 경우:** 노드에 왼쪽 자식노드가 있다면 부모 노드에 왼쪽 자식노드를 업데이트하고 마찬가지로 오른쪽 자식 노드가 있다면
부모 노드에 오른쪽 자식노드를 업데이트하고 기존 자식 노드는 제거한다.

<p align="center"><img src='/images/DataStructure/binary_tree_delete3.png' width='60%' alt='binary_tree_delete3' /></p>

**둘다 존재하는 경우:** 두개의 자식 노드가 있다면 항상 오른쪽 서브트리에서 가장 작은 최소값 노드를 찾아 해당 노드로 부모 노드를 교체하고
해당 서브 트리에서 최솟값 노드를 삭제해준다.

```javascript
  remove (value) {
    this.root = this.removeNode(this.root, value);
  }
  removeNode (node, key) {
    if (node === null) return null;
    else if (key < node.value) {
      node.left = this.removeNode(node.left, key);
      return node;
    }
    else if (key > node.value) {
      node.right = this.removeNode(node.right, key);
      return node;
    } else {
      // 자식 노드가 없는 경우
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }
      // 자식 노드가 하나일 때
      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }
      // 자식 노드가 두개 일 때 가장 최소 노드를 오른쪽 서브트리에서 찾고 지우려는 노드 자리에 넣어준다.
      // 만약 최소 노드를 찾았지만 해당 노드가 오른쪽 자식 노드를 가지고 있는 경우도 있다.
      // 이때 removeNode함수를 실행하여 해당 노드의 오른쪽 자식 노드를 해당 노드의 자리로 옮겨준다.
      let aux = this.findMinNode(node.right);
      node.value = aux.value;

      node.right = this.removeNode(node.right, aux.value);
      return node;
    }
  }
```

자식 노드가 둘다 존재할 때 오른쪽 서브 트리에서 최소값 노드를 찾기 위해 왼쪽 자식에 null인 노드를 찾을 때까지 왼쪽 서브 트리로 계속 이동한다.

```javascript
  findMinNode(node) {
    if(node.left === null) return node;
    else return this.findMinNode(node.left);
  }
```

### 트리 순회

이진 검색 트리를 탐색하는 다양한 방법이 있다.
<br/><br/>
**전위 순회 (Preorder Traversal)**  
전위 순회는 깊이 우선 순회(DFT, Depth-First-Traversal)라고도 한다.
트리를 복사하거나, 전위 표기법을 구하는데 주로 사용되는데 이유는 트리를 복사할 때는 부모노드가 자식노드보다 먼저 생성되어야하기 때문이다.

전위 순회는 다음과 같은 방법으로 진행한다.

<p align="center"><img src='/images/DataStructure/preorder.png' width='60%' alt='binary_tree_delete3' /></p>

**Root 노드 방문 -> 왼쪽 서브 트리 순회 -> 오른쪽 서브트리 순회**

```javascript
preorder(node)
{
  if (node !== null) {
    console.log(node.value)
    this.preorder(node.left)
    this.preorder(node.right)
  }
}
```

**중위 순회**  
중위 순회는 왼쪽 오른쪽 대칭 순서로 순회를 하기에 대칭 순회(Symmetric traversal)라고도 한다.
중위 순회는 이진 탐색 트리에서 오름차순 또는 내림차순으로 값을 가져올 때 사용된다.

중위 순회는 다음과 같은 방법으로 진행한다.

<p align="center"><img src='/images/DataStructure/inorder.png' width='60%' alt='binary_tree_delete3' /></p>

**왼쪽 서브 트리 순회 -> Root 노드 방문 -> 오른쪽 서브트리 순회**

```javascript
inorder(node)
{
  if (node !== null) {
    this.inorder(node.left)
    console.log(node.value)
    this.inorder(node.right)
  }
}
```

**후위 순회**  
후위 순회는 주로 트리를 삭제하는데 사용된다.
이유는 부모 노드를 삭제하기 전에 자식 노드를 삭제하는 순으로 노드를 삭제해야하기 때문이다.

후위 순회는 다음과 같은 방법으로 진행한다.

<p align="center"><img src='/images/DataStructure/postorder.png' width='60%' alt='binary_tree_delete3' /></p>

**왼쪽 서브 트리 순회 -> 오른쪽 서브트리 순회 -> Root 노드 방문**

```javascript
postorder(node)
{
  if (node !== null) {
    this.postorder(node.left)
    this.postorder(node.right)
    console.log(node.value)
  }
}
```

### 이진 트리 탐색 하기

전체 트리에서 값을 이용하여 노드를 탐색한다.  
만약 일치하는 노드가 없다면 null을 반환한다.  
검색한 값보다 부모노드가 작다면 왼쪽 서브 트리를, 크다면 오른쪽 서브 트리로 이동하며 검색한 값과 일치하는 노드가 나올 때까지 탐색을 반복하면 된다.

```javascript
search(node, value)
{
  if (node === null) return null
  else if (data < node.value) return this.search(node.left, value)
  else if (data > node.value) return this.search(node.right, value)
  else return node
}
```

### 이진 탐색 트리 VS 해시 테이블

기본적으로 이진 탐색 트리와 해시 테이블은 모두 키 & 값 형태로 자료를 저장하는 자료구조이며 사용성 측면에는 유사한 인터페이스를 가지고 있다.  
그러나 둘의 가장 큰 차이점은 정렬방식이다. 이진 탐색 트리는 값의 크기에 따라 삽입/삭제 시 마다 정렬이 이루어 지지만 해시 테이블은 그렇지 않다.
탐색의 경우에도 해시는 key 값에 따라 저장된 위치를 찾아 O(1)의 일정한 탐색 성능을 가지지만 이진 탐색트리는 평균 O(logn) 최악은 O(n)의 성능을 제공한다.

따라서 대부분의 작업에서 해시 테이블이 이진 탐색 트리보단 빠르나 순서와 밀접한 데이터를 다루거나 정렬 형태를 유지해야 하는 등에서는 이진 탐색 트리가 낫다.
