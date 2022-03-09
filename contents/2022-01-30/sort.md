---
date: '2022-01-30'
title: '정렬'
categories: ['JavaScript', 'Algorithm']
summary: '정렬의 종류에 대해서 알아보고 구현해보자'
thumbnail: './javascript_thumbnail.png'
---

### 알고리즘 정리 두번째 [정렬]

이번 시간엔 정렬에 대해서 알아보겠다.  
무작위로 섞인 데이터를 어떤 기준에 맞춰 정렬하는 알고리즘은 여러가지가 있다.
정렬 알고리즘은 각종 데이터 목록을 정리하거나 이진 탐색을 하는 등 다양한 경우에 매우 유용하게 사용된다.  
정렬의 동작에 대해 잘 알고 싶다면 <b>visualgo.net</b>이라는 곳을 추천한다.  
정렬 뿐만 아니라 다양한 알고리즘에 대한 동작 원리를 시각적으로 잘 보여주며 코드도 제공해준다.

### 1. 버블 정렬 (Bubble Sort)

**best: O(n^2) worst: O(n^2)**  
가장 큰 값이 버블이 올라가는 것처럼 뒤로 이동하는 모양을 가지는 알고리즘이다.

<p align="center"><img src='/images/Algorithm/Sort/bubble_sort.gif' width='100%' alt='bubble_sort' /><p>

```javascript
let arr = [10, 11, 9, 2, 3, 6, 5, 4]
let sortArr = []
let len = arr.length

for (let i = 0; i < len; i++) {
  sortArr.unshift(Math.max.apply(null, arr))
  arr.splice(arr.indexOf(Math.max.apply(null, arr)), 1)
}
```

### 2. 선택 정렬 (Selection Sort)

**best: O(n^2) worst: O(n^2)**  
 가장 작은 값을 탐색하고 Swap을 통해 앞부분에 배치시켜준다.

<p align="center"><img src='/images/Algorithm/Sort/selection_sort.gif' width='100%' alt='selection_sort' /><p>

```javascript
let arr = [10, 11, 9, 2, 3, 6, 5, 4]
let sortArr = []
let len = arr.length

for (let i = 0; i < len; i++) {
  sortArr.push(Math.min.apply(null, arr))
  arr.splice(arr.indexOf(Math.min.apply(null, arr)), 1)
}
```

### 3. 삽입 정렬 (Insertion Sort)

**best: O(n) worst: O(n^2)**  
배열 두번째 요소 부터 모든 요소를 앞부분에 이미 정렬된 배열과 비교하며 자신의 위치를 찾아 삽입한다.

 <p align="center"><img src='/images/Algorithm/Sort/insertion_sort.gif' width='100%' alt='insertion_sort' /><p>

```javascript
let arr = [10, 11, 9, 2, 3, 6, 5, 4]
let sortArr = []
let len = arr.length

// 반복문을 통해 curValue보다 큰 값이 있다면 해당 값 인덱스를 리턴한다.
// curValue보다 큰 값이 없다면 가장 마지막 인덱스를 리턴한다.
function searchIdx(sortArr, curValue) {
  for (let i in sortArr) {
    if (curValue < sortArr[i]) return i
  }
  return sortArr.length
}

// 현재 배열 값을 따로 뽑아 searchIdx 함수를 통해 curValue가 들어갈 인덱스를 찾아 넣어준다.
for (let i = 0; i < len; i++) {
  let curValue = arr.shift()
  let idx = searchIdx(sortArr, curValue)
  sortArr.splice(idx, 0, curValue)
}
```

### 4. 병합 정렬 (Merge Sort)

**best: O(nlogn) worst: O(nlogn)**  
병합 정렬에는 <b>병합(merging)</b>과 <b>정렬(sorting)</b>의 두가지 큰 기능으로 구성된다.  
다른 말로 분할 정복 알고리즘이라고도 한다.
길이가 1이하인 배열은 항상 정렬된 상태라는 것을 활용하여 배열을 최소한의 요소로 모두 분리시키고 새롭게 재구성하며 정렬하는 방식이다.

<p align="center"><img src='/images/Algorithm/Sort/merge_sort.gif' width='100%' alt='merge_sort' /><p>

```javascript
let arr = [10, 11, 9, 2, 3, 6, 5, 4]

/*
  분할 과정
  [10, 11, 9, 2, 3, 6, 5, 4]
  [10, 11, 9, 2], [3, 6, 5, 4]
  [10, 11], [9, 2], [3, 6], [5, 4]
  [10], [11], [9], [2], [3], [6], [5], [4]
  정복 과정
  [10, 11], [2, 9], [3, 6], [4, 5]
  [2, 9, 10, 11], [3, 4, 5, 6]
  [2, 3, 4, 5, 6, 9, 10, 11]
*/

function MergeSort(arr) {
  let len = arr.length
  let result = []
  if (len <= 1) {
    return arr
  }

  // 분할 과정
  // 중앙 값을 기준으로 구해주고 배열의 길이가 1이 될 때까지 재귀적으로 왼쪽, 오른쪽으로 나눠 준다.
  let mid = Number(len / 2)
  let left = MergeSort(arr.slice(0, mid))
  let right = MergeSort(arr.slice(mid))

  // 정복 과정
  // 분할 된 배열의 원소를 크기를 비교한 후 합쳐준다.
  // 왼쪽, 오른쪽 배열의 원소가 있다면 두 배열의 앞 원소를 비교해서 가장 작은 원소를 앞에 넣어준다.
  while (left.length !== 0 && right.length !== 0) {
    if (left[0] < right[0]) {
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }

  // 한쪽 배열의 원소만 남았다면 전부 넣어준다.
  while (left.length !== 0) {
    result.push(left.shift())
  }

  while (right.length !== 0) {
    result.push(right.shift())
  }

  return result
}

console.log(MergeSort(arr))
```

### 5. 퀵 정렬 (Quick Sort)

**best: O(n\*\*2) worst: O(nlog2n)**  
병합 정렬과 같이 분할 정복 알고리즘 중 하나다.  
하나의 요소를 pivot으로 선택 후 정렬된 배열에서 pivot이 몇번째 인덱스에 위치 하는지 찾아가는 방식으로 작동한다.  
한번 pivot이 적절한 위치에 배치된다면 pivot 양쪽의 모든 모든 요소들에 퀵 정렬을 적용한다.  
이때 pivot보다 작은 요소들은 왼쪽에, pivot보다 큰 요소들은 오른쪽에 배치한다.

<p align="center"><img src='/images/Algorithm/Sort/quick_sort.gif' width='100%' alt='quick_sort' /><p>

```javascript
let arr = [10, 11, 9, 2, 3, 6, 5, 4]

/*
  // 분할
  pivot: 10
  [9, 2, 3, 6, 5, 4] + [10] + [11]
  pivot: 9
  [2, 3, 6, 5, 4] + [9] + [10] + [11]
  pivot: 2
  [2] + [3, 6, 5, 4] + [9] + [10] + [11]
  pivot: 3
  [2] + [3] + [6, 5, 4] + [9] + [10] + [11]
  pivot: 6
  [2] + [3] + [5, 4] + [6] + [9] + [10] + [11]
  pivot: 5
  [2] + [3] + [4] + [5] + [6] + [9] + [10] + [11]
  // 정복
  // return QuickSort(left: [4]).concat(pivot: 5, QuickSort(right: [ ]));
  [2] + [3] + [4, 5] + [6] + [9] + [10] + [11]
  // return QuickSort(left: [4, 5]).concat(pivot: 6, QuickSort(right: [ ]));
  [2] + [3] + [4, 5, 6] + [9] + [10] + [11]
  // return QuickSort(left: [ ]).concat(pivot: 3, QuickSort(right[4, 5, 6]));
  [2] + [3, 4, 5, 6] + [9] + [10] + [11]
  // return QuickSort(left: [ ]).concat(pivot: 2, QuickSort(right[3, 4, 5, 6]));
  [2, 3, 4, 5, 6] + [9] + [10] + [11]
  // return QuickSort(left: [2, 3, 4, 5, 6]).concat(pivot: 9, QuickSort(right: [ ]));
  [2, 3, 4, 5, 6, 9] + [10] + [11]
  // return QuickSort(left: [2, 3, 4, 5, 6, 9]).concat(pivot: 10, QuickSort(right: [11]));
  [2, 3, 4, 5, 6, 9, 10, 11]
*/

function QuickSort(arr) {
  let len = arr.length

  if (len <= 1) {
    return arr
  }

  let pivot = [arr.shift()]
  let left = []
  let right = []

  for (let i in arr) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  // 재귀적으로 pivot을 이용하여 left와 right로 분리해줬다.
  console.log(`left: ${left}\nright: ${right}\npivot: ${pivot}`)

  return QuickSort(left).concat(pivot, QuickSort(right))
}

console.log(QuickSort(arr))
```
