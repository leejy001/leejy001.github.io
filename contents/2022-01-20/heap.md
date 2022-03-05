---
date: '2022-01-20'
title: 'Heap'
categories: ['Data Structure']
summary: 'Heap에 대해 알아보고 최대힙과 최소힙을 구현해보자'
thumbnail: './heap_thumbnail.png'
showThumbnail: true
---

### 개발자가 알아야 하는 자료구조 8가지

**8. 힙**

### 힙이란?

힙은 완전 이진 트리에 있는 노드 중에서 키 값이 가장 큰 노드나 작은 노드를 찾기 위해 만든 자료구조다.  
힙은 어떻게 보면 그래프나 트리와는 전혀 관계 없어 보이는 독특한 이름과는 다르게 트리기반의 자료구조다.

### 힙 종류

<table>
   <tr>
     <th align="center">
       <img src='/images/DataStructure/Heap/max_heap.png' width='80%' alt='root_graph' />
       <br>최대 힙
     </th>
     <th align="center">
       <img src='/images/DataStructure/Heap/min_heap.png' width='80%' alt='part_graph' />
       <br>최소 힙
    </th>
  </tr>
</table>

힙 종류에는 두가지가 있다.  
키 값이 가장 큰 노드를 찾기 위한 힙은 <b>최대 힙</b>이라 하고, 키 값이 작은 노드를 찾기 위한 힙은 <b>최소 힙</b>이라고 한다.  
최대 힙은 <b>부모노드의 키 값 > 자식노드의 키 값</b>의 관계를 가지는 완전이진트리이며 최대 힙의 루트 노드는 가장 큰 값이 된다.
최소 힙은 <b>부모노드의 키 값 < 자식노드의 키 값</b>의 관계를 가지며 최소 힙의 루트 노드는 가장 작은 값이 된다.

힙의 최대/최소의 값을 검색하는데 <b>O(1)</b>의 시간복잡도를 가진다.
이때 값을 얻기 위해 pop을 하면 <b>O(logN)</b>의 시간이 걸리며 맨 처음 펼쳐진 N개의 값들을 힙에 세팅해줘야 하기 때문에 N의 시간이 더 걸린다.
그렇기에 힙의 시간 복잡도는 <b>O(NlogN)</b>이라고 이야기 한다.

### 힙 연산

힙을 만들 때는 배열을 이용해서 만든다.

```javascript
class Heap {
  constructor() {
    this.heap = []
  }
}
```

두 힙을 서로 비교하고 값을 바꿔주는 swap함수를 만들어 주자

```javascript
// class Heap
swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]]
}
```

다음은 부모 노드의 인덱스와 왼쪽 자식 노드, 오른쪽 자식 노드의 인덱스를 구하는 코드와  
두 자식 노드중 큰 값과 작은 값을 구하는 코드다.

```javascript
// class Heap
parent(index) {
    return Math.floor((index - 1) / 2 )
}

leftChild(index) {
    return (index * 2) + 1
}

rightChild(index) {
    return (index * 2) + 2
}

max(left, right) {
    return this.heap[left] < this.heap[right] ? right : left
}

min(left, right) {
    return this.heap[left] < this.heap[right] ? left : right
}
```

### 힙의 삽입 연산

힙에서 삽입 연산을 진행할 때 가장 중요한 것은 완전 이진 트리를 유지하는것이다.  
먼저 마지막 노드의 다음 자리를 확장하여 만든 자리에 노드를 임시로 저장한다.
그 다음에 키 값의 관계가 최대 힙이 되도록 재구성하기 위해 삽입한 노드의 키 값과 부모 노드들의 키 값을 차례로 비교한다.

<br/>

<table>
   <tr>
     <th align="center">
       <img src='/images/DataStructure/Heap/max_heap_add1.png' width='80%' alt='max_heap_add1' />
       <br> 마지막 노드 삽입
     </th>
     <th align="center">
       <img src='/images/DataStructure/Heap/max_heap_add2.png' width='80%' alt='max_heap_add2' />
       <br> 부모 노드와 비교하며 바꿔주기
    </th>
  </tr>
</table>

힙의 삽입 연산 코드다.  
우선 새로 넣어주는 값을 가장 마지막 노드에 넣고 해당 노드의 부모 노드의 인덱스를 구해준다.

**최대 힙의 경우**  
이렇게 구한 부모 노드의 인덱스 위치에 저장된 배열의 값과 자식 노드의 값을 비교해주며
자식 노드가 더 크다면 해당 부모 노드와 swap해주고 다음 부모 노드의 인덱스를 구해준다.  
이 과정을 부모노드가 자식노드보다 큰 경우까지 반복해주면 된다.

```javascript
// class Heap
maxPush(value) {
    this.heap.push(value)
    let idx = this.heap.length - 1
    let parent = this.parent(idx)

    while(this.heap[parent] < value) {
        this.swap(parent, idx)
        idx = parent
        parent = this.parent(idx)
    }
}
```

**최소 힙의 경우**  
먼저 마지막 노드의 다음 자리를 확장하여 만든 자리에 노드를 임시로 저장한다.
그 다음에 키 값의 관계가 최소 힙이 되도록 재구성하기 위해 삽입한 노드의 키 값과 부모 노드들의 키 값을 차례로 비교한다.

<br/>

<table>
   <tr>
     <th align="center">
       <img src='/images/DataStructure/Heap/min_heap_add1.png' width='80%' alt='min_heap_add1' />
       <br> 마지막 노드 삽입
     </th>
     <th align="center">
       <img src='/images/DataStructure/Heap/min_heap_add2.png' width='80%' alt='min_heap_add2' />
       <br> 부모 노드와 비교하며 바꿔주기
    </th>
  </tr>
</table>

```javascript
// class Heap
minPush(value) {
    let idx, parent = 0
    this.heap.push(value)
    idx = this.heap.length-1
    parent = this.parent(idx)

    while(this.heap[parent] > value) {
        this.swap(idx, parent)
        idx = parent
        parent = this.parent(idx)
    }
}
```

### 힙의 추출 연산

힙에서의 삭제 연산은 항상 루트 노드에 있는 원소를 삭제하여 반환해준다.  
최대 힙에서는 가장 큰 원소를 삭제하여 반환하며 최소 힙에서는 가장 작은 원소를 삭제하여 반환해준다.

**최대힙의 경우**

먼저 루트의 원소를 삭제해 주고 마지막 노드의 값을 루트 노드에 넣고 마지막 노드를 삭제한다.  
그 다음에 자리를 바꾸며 가장 큰 노드가 루트 노드로 오게 한다.

<br/>

<table>
   <tr>
     <th align="center">
       <img src='/images/DataStructure/Heap/max_heap_delete1.png' width='80%' alt='max_heap_delete1' />
       <br> 루트 노드 삭제 후 마지막 노드 루트로 이동
     </th>
     <th align="center">
       <img src='/images/DataStructure/Heap/max_heap_delete2.png' width='87%' alt='max_heap_delete2' />
       <br> 부모 노드와 비교하며 바꿔주기
    </th>
  </tr>
</table>

힙의 추출 연산 코드다.  
힙의 추출은 삽입보다 조건이 까다롭다.  
일단 마지막 노드를 루트 노드로 이동시키는 것 까진 간단하지만,
이동한 다음에 자식요소가 없는 경우, 왼쪽 자식만 있는 경우, 두 가지 자식이 모두 존재하는 경우를 따져봐야 한다.

```javascript
// class Heap
maxPop() {
    const lastIdx = this.heap.length - 1
    let idx = 0
    this.swap(0, lastIdx)  // 루트 노드와 마지막 노드를 swap해준다.
    let value = this.heap.pop()

    while(idx < lastIdx) {
        let leftChildIdx = this.leftChild(idx)
        let rightChildIdx = this.rightChild(idx)

        if (leftChildIdx > lastIdx) { // 왼쪽 자식 인덱스가 더 크다는 것은 자식 노드가 없다는 뜻
            break
        } else if (rightChildIdx > lastIdx) {  // 왼쪽 자식만 있는 경우
            if(this.heap[idx] < this.heap[leftChildIdx]) {  // 왼쪽 자식이 더 크다면, 둘이 자리를 바꿔준다.
                this.swap(idx, leftChildIdx)
                idx = leftChildIdx
            } else {
                break
            }
        } else {  // 둘다 있는 경우 하나의 자식노드의 값이라도 부모노드 값보다 크다면
            if(this.heap[leftChildIdx] > this.heap[idx] || this.heap[rightChildIdx] > this.heap[idx]) {
                // 두 자식을 비교해 가장 큰 자식노드와 부모노드를 swap
                let maxChildIdx = this.max(leftChildIdx, rightChildIdx)
                this.swap(idx, maxChildIdx)
                idx = maxChildIdx
            } else {  // 둘다 작은 경우 바꾸지 않음
                break
            }
        }
    }
    return value
}
```

**최소 힙의 경우**  
먼저 루트의 원소를 삭제해 주고 마지막 노드의 값을 루트 노드에 넣고 마지막 노드를 삭제한다.  
자리를 바꾸며 가장 작은 노드가 루트 노드로 오게 한다.

<br/>

<table>
   <tr>
     <th align="center">
       <img src='/images/DataStructure/Heap/min_heap_delete1.png' width='80%' alt='min_heap_delete1' />
       <br> 루트 노드 삭제 후 마지막 노드 루트로 이동
     </th>
     <th align="center">
       <img src='/images/DataStructure/Heap/min_heap_delete2.png' width='100%' alt='min_heap_delete2' />
       <br> 부모 노드와 비교하며 바꿔주기
    </th>
  </tr>
</table>

```javascript
// class Heap
minPop() {
    const lastIdx = this.heap.length - 1
    let idx = 0
    this.swap(0, lastIdx)  // 루트 노드와 마지막 노드를 swap해준다.
    let value = this.heap.pop()

    while(idx < lastIdx) {
        let leftChildIdx = this.leftChild(idx)
        let rightChildIdx = this.rightChild(idx)

        if (leftChildIdx > lastIdx) { // 왼쪽 자식 인덱스가 더 크다는 것은 자식 노드가 없다는 뜻
            break
        } else if (rightChildIdx > lastIdx) {  // 왼쪽 자식만 있는 경우
            if(this.heap[idx] > this.heap[leftChildIdx]) {  // 왼쪽 자식이 더 작으면, 둘이 자리를 바꿔준다.
                this.swap(idx, leftChildIdx)
                idx = leftChildIdx
            } else {
                break
            }
        } else {  // 둘다 있는 경우 하나의 자식노드의 값이라도 부모노드 값보다 작다면
            if(this.heap[leftChildIdx] < this.heap[idx] || this.heap[rightChildIdx] < this.heap[idx]) {
                // 두 자식을 비교해 가장 작은 자식노드와 부모노드를 swap
                let minChildIdx = this.min(leftChildIdx, rightChildIdx)
                this.swap(idx, minChildIdx)
                idx = minChildIdx
            } else {  // 둘다 큰 경우 바꾸지 않음
                break
            }
        }
    }
    return value
}
```
