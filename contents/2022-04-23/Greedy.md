---
date: '2022-04-23'
title: 'Greedy Algorithm'
categories: ['JavaScript', 'Algorithm']
summary: '그리디 알고리즘에 대해서 알아보자'
thumbnail: './algorithm.png'
---

### 알고리즘 정리 11번째 [Greedy Algorithm]

<b>그리디 알고리즘(Greedy Algorithm)</b>이란 매 선택의 순간마다 당장 눈앞에 보이는 최적의 상황만을 쫓아 해답에 도달하는 방법을 의미한다.
<br/><br/>
만약 5개의 도시를 모두 한번씩만 거쳐서 여행하는 경로 중 기름값을 아끼기 위해 가능하면 짧은 경로를 이용하고 싶다고 가정할 때 120가지(5!)의 조합을 전부 살펴보고 그 중 가장 짧은 경로를 택할 수 있지만, 그냥 각 도시마다 내가 다음 도시로 넘어갈 수 있는 가장 짧은 경로를 선택하여 이동하는 것이 그리디 알고리즘이라 할 수 있다.
<br/><br/>
물론 그렇게 매 순간 최적의 경로를 따라가서 (1-1-1-100)이라는 순서로 가는데, 중간에 (1-1-10-10)으로 움직이는 것이 더 빠를 수도 있는, 매 선택에서는 최적이지만 종합적으로 봤을 땐 최적이라는 보장은 절대 없다는 것을 명심하자
<br/><br/>
그리디 알고리즘을 해결하는 방법은 다음과 같다.

1. <b>선택 절차</b>: 현재 상태에서의 최적의 해답을 선택한다.
2. <b>적절성 검사</b>: 선택된 해가 문제의 조건을 만족하는지 검사
3. <b>해당 검사</b>: 원래의 문제가 해결되었는지 검사하고, 해결되지 않았다면 선택 절차로 돌아가 위의 과정을 반복한다.

탐욕 알고리즘을 적용하기 위해 2가지의 조건은 다음과 같다.

<b>탐욕적 선택 속성(Greedy Choice Property)</b> : 앞의 선택이 이후의 선택에 영향을 주지 않는다.  
<b>최적 부분 구조(Optimal Substructure)</b> : 문제에 대한 최종 해결 방법은 부분 문제에 대한 최적 문제 해결 방법으로 구성된다.

탐욕 알고리즘은 항상 최적의 결과를 도출하진 않지만, 어느 정도 최적에 근사한 값을 빠르게 도출하는 장점이 있다.  
그리디 문제의 대표적인 문제로는 배낭문제(짐 옮기기 문제)와 거스름돈 문제가 있다.

### 배낭문제(짐 옮기기 문제)

짐의 무게 [70, 50, 80, 50, 20]이며 박스의 무게 제한이 100이다.  
박스를 최대한 적게 사용하여 모든 짐을 옮긴다.

```javascript
function solution(arr, limit) {
  let count = 0
  let sortArr = arr.sort((a, b) => a - b) // 오름차순 정렬 [20, 50, 50, 70, 80]
  while (sortArr.length !== 0) {
    if (sortArr[0] + sortArr[sortArr.length - 1] <= limit) {
      count++
      sortArr.shift()
      sortArr.pop()
    } else {
      count++
      sortArr.pop()
    }
  }
  return count
}

console.log(solution([70, 50, 80, 50, 20], 100)) // 3
```

### 거스름돈 문제

현재 가지고 있는 동전은 10, 50, 100, 500이 있고 각 동전들은 서로 배수 관계에 있음 동전 개수를 최소화하여 거스름돈 K를 만들어야한다.

```javascript
function solution(k) {
  let count = 0
  const arr = [500, 100, 50, 10]
  for (let item of arr) {
    count = count + Math.floor(k / item) // 동전의 개수
    k = k - item * Math.floor(k / item) // 남은 돈 계산
  }
  return count
}

console.log(solution(980)) // 9
```
