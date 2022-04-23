---
date: '2022-04-05'
title: '백트래킹(Backtraking)'
categories: ['JavaScript', 'Algorithm']
summary: 'DFS 기반의 백트래킹(Backtraking) 알고리즘에 대해서 알아보자'
thumbnail: './algorithm.png'
---

### 알고리즘 정리 7번째 [Backtraking]

Backtraking, 되추적이라고도 하는데 해를 구하기 위해 모든 경우의 수를 조사하지만 유망한 경우만 검사한다고 생각하면 된다. 흔히 말하는 <b>‘가지치기’</b>라고 할 수 있다.

백트래킹은 DFS를 기반으로 만들어진다.

깊이 우선 탐색으로 해당 경우의 수로 탐색하며 내려가다가 해당 노드가 조건에 부합되지 않으면 가지치기하듯이 그 경우의 수를 잘라내고 다시 상위 노드로 돌아가 다른 하위 노드로 내려가는 과정을 반복하게 된다.

DFS에 대한 설명은 [해당 포스트](https://leejy001.github.io/2022-03-11/DFS_BFS/)에서 다루고 있다.

### N-Queen

백트래킹으로 풀이 할 수 있는 대표적인 문제인 N-Queen 문제에 대해 알아보자  
크기가 NxN인 체스판에 퀸 N개를 서로 공격할 수 없게 놓는 문제이다.
퀸들은 자신의 일직선상(같은행, 열), 대각선에 있는 퀸을 공격할 수 없다.
3\*3 기준으로 문제를 풀어보자

<p align="center"><img src='/images/Algorithm/BackTraking/BackTraking.png' width='60%' alt='nqueen'/><p>

빨간색 선이 퀸이 이동할 수 있는 경로이며 첫번째 퀸의 공격경로를 제외한 공간에 배치하기 위해선 2번째 줄은 3번째 위치에 퀸을 놓아야한다. 첫번째 퀸의 위치를 (0,0)로 하면 트리구조는 다음과 같다.

위의 과정을 트리로 표현해보자면

<p align="center"><img src='/images/Algorithm/BackTraking/BackTraking_tree.png' width='80%' alt='tree'/><p>

이런식으로 표현할 수 있다. ((1,2)의 자식들은 생략했다.)

그런데 여기서 (1, 0)에 두번째 퀸을 놓게 되는 경우 (0, 0)에 놓여진 퀸의 공격루트에 노출된다.  
해당 경우의 수는 조건에 부합하지 않기에 가지치기를 진행하고 다시 상위 노드로 돌아와 그 다음 하위노드가 조건에 부합하는지 검사를 진행한다.  
(1,1)도 마찬가지로 앞서 배치한 첫번째 퀸의 공격루트에 노출되기 때문에 해당 경우의 수는 조건에 부합하지 않는다는 것을 알 수 있다.

그럼 이 아래의 경우의 수는 더이상 볼 이유가 없기 때문에 가지치기를 진행해주자  
그림으로 나타내면 다음과 같이 된다.

<p align="center"><img src='/images/Algorithm/BackTraking/BackTraking_none.png' width='80%' alt='tree_none'/><p>

이렇게 되면 마지막 노드인 (1,2)에 놓는 경우의 수만 남게된다.  
(1,2)에 두번째 퀸을 놓으면 첫번째 퀸과 충돌하는 경우는 없으므로 (1, 2)에 두번째 퀸을 두고 다시 그 하위 노드를 검사하면 된다.

<p align="center"><img src='/images/Algorithm/BackTraking/BackTraking_done.png' width='80%' alt='tree_done'/><p>

이런식으로 진행되는 것이 백트래킹 기법이며 백트래킹은 DFS를 기반으로 진행됨을 알 수 있다.  
(실제 N-Queen은 n이 4이상인 경우부터 해를 구할 수 있다.)

코드를 통해 풀어보자

```javascript
let board = []
let cnt = 0

function isConflict(row) {
  for (let i = 0; i < row; i++) {
    if (board[i] === board[row]) return true // 2-1
    if (Math.abs(board[row] - board[i]) === row - i) return true //2-2
  }
  return false
}

function NQueen(row, n) {
  if (row === n) {
    // 3
    cnt += 1
    return
  }
  for (let i = 0; i < n; i++) {
    board[row] = i // 1
    if (!isConflict(row)) {
      // 2
      NQueen(row + 1, n) // 3
    }
  }
}

NQueen(0, 4)

console.log(cnt)
```

첫번째로는 2차원적인 문제를 1차원적으로 해결하는 것이 첫번째다.

1. 우선 같은 행에 여러개의 퀸을 두는 경우는 없으며 오직 퀸 하나만 들어가기 때문에 0행의 0열에 퀸을 둔다고 가정하면 board[0] = 0 이 될것이다.
2. 퀸을 체스판 위에 올려둔 다음에 이전 퀸의 공격루트에 겹치게 뒀는지 비교를 해야한다.  
   이때 행을 비교하는건 필요없고 열과 대각선 방향을 검사하면 되는데 만약 1행의 0열에 두번째 퀸을 두었다면 0행의 0열에 위치한 첫번째 퀸과 비교를 하게 된다.

   2-1. `board[0] === board[1]` 이때 둘의 열 위치가 같기 때문에 true를 return하며 1행의 그 다음 열에 퀸을 옮겨놓는다.
   그다음 열에 위치한 두번째 퀸은 첫번째 퀸과 열이 겹치진 않지만 대각선 방향이 겹치게 된다.

   2-2. 대각선 방향이 겹치는지 안겹치는지 알기위해선 n-1행의 퀸의 열의 위치와 n행의 퀸의 열의 위치가 n행과 n-1행의 차와 같다면 대각선 방향이 겹친다는 뜻이다.  
   `Math.abs(board[row] - board[i]) === row - i`  
   겹치는 곳이 존재하면 true를 반환하고 마지막까지 겹치지 않는다면 false를 반환해준다.

3. 위와 같은 과정을 반복하며 마지막 행까지 경우의 수를 찾았다면 카운트를 해주고 다시 0행의 1열부터 n열까지 또 반복해주면 된다.

정리하자면 백트래킹은 DFS를 이용하여 하위 노드와 인접한 하위 노드들을 깊게 탐색하며 하나라도 조건에 부합하지 않는다면 다시 상위 노드로 돌아와 다음 하위 노드를 검색한다.

### n과 m 문제

순열을 구하는 문제이긴 하지만 백트래킹으로 풀이가 가능하다.

각 수마다 방문했는지 아닌지를 체크하는 visited 배열을 만들어 초기값으로 false를 설정하고, 루프를 돌면서 방문한 적이 없다면 arr에 넣어주고, 재귀적으로 또 함수를 실행한다.  
그러다가 cnt가 m과 같다면 콘솔을 출력하고 함수를 종료한다.

```javascript
function dfs(cnt) {
  if (cnt === m) {
    console.log(arr.join(' '))
    return
  }
  for (let i = 1; i <= n; i++) {
    if (!visited[i]) {
      visited[i] = true
      arr[cnt] = i
      dfs(cnt + 1)
      visited[i] = false
    }
  }
}

let n = 3
let m = 2
let visited = new Array(n + 1).fill(false)
let arr = []

dfs(0)
```

### 스타트와 링크

위의 n, m 문제와 종료 조건은 같다.  
start팀에서 뽑힌 숫자를 제외한 나머지 숫자를 link팀에 넣어주고 각 팀의 구성에 따른 점수들의 차이를 구해주면 된다.

```javascript
function dfs(cnt) {
  if (cnt === half) {
    let startSum = 0
    let linkSum = 0

    for (let i = 1; i <= N; i++) {
      if (start.indexOf(i) === -1) link.push(i)
    }

    for (let i = 0; i < half; i++) {
      for (let j = i + 1; j < half; j++) {
        startSum +=
          point[start[i] - 1][start[j] - 1] + point[start[j] - 1][start[i] - 1]
        linkSum +=
          point[link[i] - 1][link[j] - 1] + point[link[j] - 1][link[i] - 1]
      }
    }

    let diff = Math.abs(startSum - linkSum)
    if (min > diff) min = diff
    link = []
    return
  }

  for (let i = 1; i <= N; i++) {
    if (!visited[i]) {
      visited[i] = true
      start.push(i)
      dfs(cnt + 1)
      start.pop()
      visited[i] = false
    }
  }
}

const N = 6

const point = [
  [0, 1, 2, 3, 4, 5],
  [1, 0, 2, 3, 4, 5],
  [1, 2, 0, 3, 4, 5],
  [1, 2, 3, 0, 4, 5],
  [1, 2, 3, 4, 0, 5],
  [1, 2, 3, 4, 5, 0],
]

const visited = Array(N + 1).fill(false)
let start = []
let link = []
let min = Infinity
let half = Math.floor(N / 2)

dfs(0)

console.log(min)
```
