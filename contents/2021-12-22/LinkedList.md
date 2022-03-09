---
date: '2021-12-22'
title: '연결리스트 (Linked List)'
categories: ['Data Structure']
summary: '연결리스트 종류에 대해 알아보자'
thumbnail: './linkedlist_thumbnail.png'
---

### 개발자가 알아야 할 자료구조 8가지

**2. 연결 리스트 (Linked List)**

저번에는 배열과 연결리스트에 대한 특징과 차이에 대해서 알아보았고 이번에는 연결리스트의 종류에 대해서 알아보자
<br/><br/>
연결리스트는 기본적으로 다음과 같은 연결 구조를 가지고 있다고 했었다.

<p align="center"><img src='/images/DataStructure/Array/linked_list.png' width='80%' alt='table' /><p>

하지만 위의 이미지는 단순 연결리스트를 보여주고 있으며 단일 연결리스트 외에도 다른 종류의 연결리스트가 있다.

## 1. Doubly Linked List (이중 연결 리스트)

연결 리스트에서 탐색을 할 때, 뒤 쪽의 원소를 검색하면 loop를 돌아야 하기 때문에 탐색 속도가 많이 느려지게 된다.  
이 문제를 해결하기 위해 등장한 것이 이중 연결리스트 구조다.

<p align="center"><img src='/images/DataStructure/LinkedList/doubly_linked_list.png' width='80%' alt='table' /><p>

이중 연결 리스트는 기존의 단일 연결 리스트와는 다른 **2개의 주소 칸** 을 가지고 있다.  
추가된 주소 칸은 이전 원소의 주소를 기억하며 가장 처음 노드 뿐만 아닌 마지막 노드의 주소도 기억하고 있다.
이런 구조로 사용자가 특정 노드를 탐색하게 된다면 해당 노드가 중앙을 기준으로 앞에 있는지 뒤에 있는지 판단하여
앞쪽인 경우 시작 노드부터 뒤쪽인 경우 마지막 노드 부터 탐색을 시작한다.
그러나 주소 2개를 저장해야 하는 이유로 인해 저장공간이 추가로 더 필요하다는 단점을 가지고 있다.

## 2. Circular Linked List (원형 연결 리스트)

단순 연결리스트의 경우에는 항상 한 방향에서 탐색을 수행해야한다.
이중 연결리스트 구조를 적용해도 앞, 뒤에서 부터 탐색을 수행할 수 있다.
만약 중간에서 부터 탐색을 진행하고자 한다면 어떻게 해야할까?

<p align="center"><img src='/images/DataStructure/LinkedList/circular_linked_list.png' width='80%' alt='table' /><p>

이런 문제를 해결하기 위해 앞과 뒤가 연결되어 있고 마지막 작업한 위치를 따로 표시하는 원형연결리스트 구조가 있다.
원형 연결리스트를 이용하면 시작 노드가 어디인지, 끝 노드가 어디인지 신경 쓸 이유가 없다.
때문에 마지막 위치에서 삽입, 삭제, 탐색등의 연산을 곧 바로 수행할 수 있다는 장점이 있다.
그러나 이런 구조의 특징으로 인해 데이터의 순서가 모호해지기 때문에 인덱스의 사용이 힘들다.

### 단순 연결리스트 구현하기

연결리스트의 노드는 다음과 같이 요소와 다음 노드로 연결되는 주소로 구성되어 있다.  
그리고 연결리스트의 시작 부분인 head를 선언해준다.

```javascript
class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

class LinkedList {
  constructor() {
    this.head = new Node('head')
  }
}
```

연결리스트는 다음과 같은 작업을 할 수 있다.

**삽입**  
단순 연결리스트에는 삽입에 두가지 경우가 있다. 가장 뒤에 삽입하는 경우와 중간에 삽입하는 경우가 있다.

**먼저 가장 뒤에 노드를 삽입하는 경우 (append)**  
시작 노드부터 탐색을 실시하는데 다음 노드의 주소가 null인 경우까지(가장 뒤)탐색을 진행해서 노드를 삽입한다.

```javascript
class LinkedList {
  ...
  append(value) {
    let newNode = new Node(value);
    let current = this.head;
    while(current.next != null) {
      current = current.next;
    }
    current.next = newNode;
  }
}
```

**중간에 노드를 삽입하는 경우 (insert)**  
중간에 노드를 삽입할 때는 어느 노드의 다음 주소에 노드 삽입을 진행할 것인지에 대한 정보가 필요하다.  
해당 노드를 찾았다면 찾은 노드의 다음 노드 주소를 삽입할 노드의 다음 주소에 넣어주고 삽입한 노드를 찾은 노드의 다음 주소에 연결한다.
그리고 해당 노드를 찾기 위한 탐색도 따로 진행해줘야한다.

```javascript
class LinkedList {
  ...
  insert(value, item) {
    let newNode = new Node(value);
    let current = this.find(item);
    newNode.next = current.next;
    current.next = newNode;
  }

  find(item) {
    let curNode = this.head;
    while(curNode.value !== item) {
      curNode = curNode.next;
    }
    return curNode;
  }
}
```

**노드를 삭제하는 경우 (remove)**  
삭제하고자 하는 노드 값을 받아오면 시작 노드부터 탐색을 진행해 해당 노드의 값이 존재하는지 확인하고 해당 노드의 값을 찾는다면
삭제하려는 노드의 이전 노드와 다음 노드를 연결해주면 된다.
그리고 삭제하려는 노드의 이전 노드를 탐색하는 것도 따로 진행해줘야한다.

```javascript
class LinkedList {
  ...
  remove(item) {
    let prevNode = this.findPrevNode(item);
    prevNode.next = PrevNode.next.next;
  }
  ...
  findPrevNode(item) {
    let curNode = this.head;
    while(curNode.next !== null && curNode.next.value !== item) {
      curNode = curNode.next;
    }
    return curNode;
  }
}
```

### 단순 연결리스트의 전체적인 코드

```javascript
class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

class LinkedList {
  constructor() {
    this.head = new Node('head')
  }

  append(value) {
    let newNode = new Node(value)
    let current = this.head
    while (current.next != null) {
      current = current.next
    }
    current.next = newNode
  }

  insert(value, item) {
    let newNode = new Node(value)
    let current = this.find(item)
    newNode.next = current.next
    current.next = newNode
  }

  remove(item) {
    let prevNode = this.findPrevNode(item)
    prevNode.next = prevNode.next.next
  }

  find(item) {
    let curNode = this.head
    while (curNode.value !== item) {
      curNode = curNode.next
    }
    return curNode
  }

  findPrevNode(item) {
    let curNode = this.head
    while (curNode.next !== null && curNode.next.value !== item) {
      curNode = curNode.next
    }
    return curNode
  }

  print() {
    let array = []
    let curNode = this.head
    while (curNode.next !== null) {
      array.push(curNode.next.value)
      curNode = curNode.next
    }
    return array
  }
}

let linkedList = new LinkedList()
linkedList.append('A')
linkedList.append('C')
linkedList.insert('B', 'A')
linkedList.append('D')
linkedList.remove('B')
console.log(linkedList.print())
```

다음은 양쪽 방향에서 접근 가능한 이중 연결리스트를 구현해보자  
양방향 연결리스트 같은 경우는 노드가 **앞(prev), 뒤(next)** 로 접근할 수 있게 해주는 연결리스트이다.
따라서 노드에 이전과 다음 주소를 가리키는 변수를 추가해주자

```javascript
class Node {
  constructor(value) {
    this.value = value
    this.prev = null
    this.next = null
  }
}
```

이중 연결리스트의 삽입과 삭제에 대해서 알아보자  
아래 이미지들은 순서대로 이중 연결리스트에서 삽입과 삭제를 진행하는 방식이다.

<p align="center"><img src='/images/DataStructure/LinkedList/doubly_linked_list_add.png' width='60%' alt='table' /><p>

<p align="center"><img src='/images/DataStructure/LinkedList/doubly_linked_list_delete.png' width='80%' alt='table' /><p>

이중 연결리스트에서 노드를 삽입하거나 삭제할 땐 이전 주소와 다음 주소 모두 설정해줘야 한다는 것을 잊지말자  
아래는 이중 연결리스트의 전체 코드이다.

```javascript
class Node {
  constructor(value) {
    this.value = value
    this.prev = null
    this.next = null
  }
}

class DoublyLinkedList {
  constructor(value) {
    this.head = new Node('head')
  }

  find(item) {
    let curNode = this.head
    while (curNode.value !== item) {
      curNode = curNode.next
    }
    return curNode
  }

  insert(newValue, item) {
    let newNode = new Node(newValue)
    let current = this.find(item)
    if (current.next === null) {
      newNode.next = null
      newNode.prev = current
      current.next = newNode
    } else {
      newNode.next = current.next
      newNode.prev = current
      current.next.prev = newNode
      current.next = newNode
    }
  }

  remove(item) {
    let curNode = this.find(item)
    if (curNode.next !== null) {
      curNode.prev.next = curNode.next
      curNode.next.prev = curNode.prev
      curNode.next = null
      curNode.prev = null
    }
  }

  print() {
    let array = []
    let curNode = this.head
    while (curNode.next !== null) {
      array.push(curNode.next.value)
      curNode = curNode.next
    }
    return array
  }
}

let dLinkedList = new DoublyLinkedList()
dLinkedList.insert('A', 'head')
dLinkedList.insert('C', 'A')
dLinkedList.insert('B', 'A')
dLinkedList.insert('D', 'C')
dLinkedList.remove('B')
console.log(dLinkedList.print())
```

마지막으로 원형 연결리스트는 가장 뒤에 있는 노드의 next가 null이 아닌 시작 노드를 가리키며 순환 구조를 갖는 연결리스트이다.
따라서 아래 코드와 같이 단순 연결리스트에서 처음 선언 시 head.next에 head를 넣어주기만 하면 된다.

```javascript
constructor(value) {
  this.head = new Node("head");
  this.head.next = this.head;
}
```
