---
date: '2021-12-28'
title: '스택/큐 (Stack & Queue)'
categories: ['Data Structure']
summary: '대표적인 선형 자료구조인 스택과 큐에 대해서 알아보자'
thumbnail: './Stack_Queue_Thumbnail.png'
showThumbnail: true
---

### 개발자가 알아야 하는 자료구조 8가지

**4. 스택 (Stack)**  
**5. 큐 (Queue)**

자료구조에는 크게 선형 자료구조와 비선형 자료구조가 있다.  
오늘은 그 중에서 선형 자료구조의 대표적인 스택/큐에 대해서 알아보겠다.
<br/><br/>
**스택(Stack)** 과 **큐(Queue)** 이 둘은 가장 고전적인 자료구조 중 하나로 그 중 스택은 거의 모든 애플리케이션을 만들 때 사용되는 자료구조이다.  
스택은 **LIFO(Last-In-First-Out) 후입 선출** 이라 하며 큐는 **FIFO(First-In-First-Out) 선입 선출** 로 처리한다.  
스택과 큐의 예시를 들어보자면 스택 같은 경우는 탁자위에 층층이 쌓인 접시를 생각하면 된다.  
가장 마지막에 올려진 접시가 접시들 중 가장 맨 위에 올려져 있을것이다.  
큐는 영화관에 입장하기 위해 줄을 서는 것을 생각하면 된다. 가장 먼저 줄을 선 사람이 가장 먼저 입장한다.

<img src='/images/DataStructure/Stack_Queue.png' width='100%' alt='stack queue' />

### 스택은 어디에 쓰일까?

우린 문서를 작성하다가 수정하고 싶을 때 ctrl + z를 활용해서 되돌리기를 하곤 한다.  
이런 작업들을 스택을 통해 구현할 수 있다. 또한 자바스크립트의 모든 함수 호출은 스택 자료 구조로 이루어져 있다.  
이렇게 스택은 서로 관계가 있는 여러 작업을 연달아 수행하며 이전의 작업 내용을 저장해 둘 필요가 있을 때 사용된다.
<br/><br/>
아래 코드는 배열 구조의 스택이다.  
데이터를 집어넣는 push, 데이터를 추출하는 pop, 맨 나중에 집어넣은 데이터를 확인하는 peek 작업을 할 수 있다.
<br/><br/>

```javascript
class Stack {
  constructor() {
    this._arr = []
  }
  push(item) {
    this._arr.push(item)
  }
  pop() {
    return this._arr.pop()
  }
  peek() {
    return this._arr[this._arr.length - 1]
  }
}

const stack = new Stack()
stack.push(1)
stack.push(2)
stack.push(3)
stack.pop()
```

<br/>
다음은 연결리스트 구조의 스택이다.
<br/>

```javascript
class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

class Stack {
  constructor() {
    this.top = null
    this.bottom = null
    this.length = 0
  }
  peek() {
    return this.top
  }
  push(value) {
    const newNode = new Node(value)

    if (this.length === 0) {
      this.top = newNode
      this.bottom = newNode
    } else {
      const curPoint = this.top
      this.top = newNode
      this.top.next = curPoint
    }
    this.length++
    return this
  }
  pop() {
    if (!this.top) return null
    if (this.top === this.bottom) {
      this.bottom = null
    }
    this.top = this.top.next
    this.length--
    return this
  }
}

const stack = new Stack()
stack.push(1)
stack.push(2)
stack.push(3)
stack.pop()
stack.pop()
stack.peek()
```

### 큐는 어디에 쓰일까?

큐는 스택에 비해 상대적으로 쓰임새가 적다.  
그러나 스택에 비해서 그렇다는 것일 뿐 데크(Deque)나 우선순위 큐(Priority Queue) 같은 변형들은 여러 분야에서 유용하게 쓰인다.  
큐는 순서대로 처리해야 하는 작업을 임시로 저장하는 버퍼에 많이 사용하며 너비 우선 탐색(Breadth-First-Search)이나 캐시 등을 구현할 때도 널리 사용한다.
<br/><br/>
아래 코드는 배열 구조의 큐이다.  
데이터를 집어넣는 enqueue, 데이터를 추출하는 dequeue 등의 작업을 할 수 있다.
<br/><br/>

```javascript
class Queue {
  constructor() {
    this._arr = []
  }
  enqueue(item) {
    this._arr.push(item)
  }
  dequeue() {
    return this._arr.shift()
  }
}

const queue = new Queue()
queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(3)
queue.dequeue()
```

<br/>

하지만 일반적인 배열을 이용한 큐의 구현에는 문제가 있다.  
자바스크립트의 배열 내장 메서드에는 shift()라는 메서드가 있는데 배열의 가장 앞에 있는 원소부터 하나씩 제거하는 기능을 수행한다.  
그러나 shift()메서드는 가장 앞에 있는 원소를 제거하고 나머지 원소를 다시 재정렬한다는 문제점이 있다.
따라서 큐는 연결 리스트로 구현하는 것이 좋다.
<br/>

```javascript
class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

class Queue {
  constructor() {
    this.front = null
    this.rear = null
    this.length = 0
  }
  peek() {
    return this.front
  }
  enqueue(value) {
    const newNode = new Node(value)
    if (this.length === 0) {
      this.front = newNode
      this.rear = newNode
    } else {
      this.rear.next = newNode
      this.rear = newNode
    }
    this.length++
    return this
  }
  dequeue() {
    if (!this.front) {
      return null
    }
    if (this.front === this.rear) {
      this.rear = null
    }
    this.front = this.front.next
    this.length--
    return this
  }
}

const queue = new Queue()
queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(3)
queue.enqueue(4)
queue.dequeue()
```
