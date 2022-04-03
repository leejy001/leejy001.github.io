---
date: '2021-12-25'
title: '해시 테이블 (Hash Table)'
categories: ['Data Structure']
summary: '해시 테이블의 정의와 구조에 대해 알아보고 해시 충돌이 발생할 경우 해결방법에 대해 알아보자'
thumbnail: './Hash_Thumbnail.png'
---

### 개발자가 알아야 하는 자료구조 8가지

**3. 해시 테이블 (Hash Table)**

해시 테이블을 알아보기에 앞서 테이블의 정의와 자료구조에서 테이블이 의미하는 것이 무엇인지부터 파악하자
<br /><br />

<p align="center"><img src='/images/DataStructure/Hash/Hash_Table.png' width='70%' alt='table' /></p>
<br />
위 그림에서 보이는 것과 같이 대부분 문서 과정 중에 한번 정도는 만들 법한 '표'이며 테이블이라 한다.  
하지만 자료구조 관점에서는 위의 구조와 비슷한 모든 표를 테이블이라 하진 않으며 표에 저장된 데이터의 형태가 다음과 같을 때에만 테이블로 구분 짓는다.

> 연관배열 구조로 이루어진 키(key)에 결과 값(value)을 저장하는 자료구조다.

## 여기서 연관배열 구조는 무엇일까?

연관배열 구조는 키(key) 1개와 값(value) 1개가 1:1로 연관되어 있는 구조이며 이것을 다른 말로 연상 배열, 결합형 배열, 맵(map), 사전(dictionary)로 부르기도 한다.  
연관배열은 키(key)가 존재하지 않는 '값'은 저장할 수 없으며 모든 키는 1:1이기 때문에 중복되지 않는다.

이렇듯 테이블의 핵심은 키와 값이 하나의 쌍을 이루며 저장되는 데이터의 유형에 있다.  
그런데 아까 **사전(dictionary)** 이라고도 하는데 사전은 단번에 원하는 단어를 찾지 못할 수 있다고도 생각하겠지만 일반적인 여러 페이지에 걸친 사전이 아닌 단 하나의 페이지에 모두 담는다면 단번에 찾을 수도 있을것이다.  
사전의 단어는 키(key)가 되며 단어에 대한 설명은 값(value)이 될 것이다.
이러한 이유로 자료구조의 '테이블'은 '사전 구조'라고도 하며 **맵(map)** 이라고 부르기도 한다.

예로 어떤 회사의 직원들의 정보를 저장하고 있는데 매우 큰 테이블이 필요하다고 하자 이때 어떤 문제가 생길까?

**1. 직원 고유번호의 범위가 배열의 인덱스 값으로 사용하기엔 부적절하다.**  
**2. 직원 고유번호의 범위를 수용 가능한 매우 큰 배열이 필요하다.**

이 문제들을 해결해주는 것이 바로 해시 함수이다.

## 해시 함수는 무엇일까?

해시 함수는 임의의 길이의 데이터를 입력받아 일정한 길이의 비트열로 반환 시켜주는 함수이다. (이를 해싱이라 한다.)
입력값의 길이가 달라도 출력은 항상 고정된 길이로 반환하며 동일한 값이 입력되면 언제나 동일한 출력값을 보장한다.  
해시 테이블은 해시 함수를 사용하여 **색인(index)** 을 **버킷(bucket)** 이나 **슬롯(slot)** 의 배열로 계산한다.

<img src='/images/DataStructure/Hash/Hash_Function.png' width='100%' alt='hash function' />

이렇게 해시 함수를 활용하여 특정 해시값을 알아내고 그 해시값을 인덱스로 변환하여 key-value 데이터를 저장하는 자료구조를 **해시 테이블(Hash Table)** 이라고 한다.
<br /><br />
해시 테이블의 구성은 아래와 같다.  
**key** : 고유한 값, 해시 함수의 input이다.  
key 값을 그대로 저장소의 색인으로 이용시 key의 길이만큼 정보를 저장할 공간도 따로 만들어야 하기 때문에 고정된 길이의 해시로 변경한다.  
**value** : 저장소(버킷, 슬롯)에 최종적으로 저장되는 값이며 해시와 매칭되어 저장, 삭제, 검색, 접근이 가능하다.  
**해시 함수(Hash Function)** : key를 고정된 길이의 해시로 변경해주는 역할을 하며 다양한 길이를 가진 키(key)를 일정한 길이를 가지는 해시(hash)로 변경하여 저장소를 효율적으로 운영하도록 도와준다.  
서로 다른 key가 해싱한 후 같은 해시값이 나오는 경우가 있는데 이를 해시 **충돌(Hash Collision)** 이라 부르며 당연히 충돌 확률이 적을수록 좋다.
이 해시 충돌을 예방하는 방법은 나중에 서술하도록 하겠다.  
**해시(Hash)** : 해시 함수(Hash Function)의 결과물이며, 저장소(bucket, slot)에서 값(value)과 매칭되어 저장된다.
<br /><br />
해시 테이블의 장단점은 다음과 같다.

**장점**  
해시 테이블은 key-value가 1:1로 매핑되어 삽입, 삭제, 검색 과정에서 평균적으로 O(1)의 시간복잡도를 지닌다.

**단점**  
첫번째로 순서/관계가 중요한 배열에는 어울리지 않는다.  
순서와 관계없이 key만을 가지고 hash를 찾아 저장하기 때문이다.

두번째로 공간 효율성이 떨어진다. 데이터가 저장되기전 미리 공간을 확보해야하기 때문이다.

세번째로 해시 함수의 의존도가 높으며 복잡할수록 해시를 만드는데 오랜 시간이 걸린다.

## 해시 충돌

만약 임의의 두가지 key를 해시 함수를 이용하여 해시값을 얻었는데 값이 동일하다면 어떻게 해야할까?  
해시 테이블에서는 충돌에 대한 문제에 크게 2가지 방법으로 해결하고 있다.

### 1. 분리 연결법 (Separate Chaining)

보통 체이닝 방식이라고도 하며 저장소에서 충돌이 일어나면 기존 값과 새로운 값을 연결리스트로 연결하는 방법이다.

<img src='/images/DataStructure/Hash/Chaining.png' width='100%' alt='chaining' />

위 사진에서 **복숭아** 를 저장할 때 충돌이 일어났으며 기존에 있는 **바나나** 다음에 연결리스트 형태로 연결한다.

### Chaining의 장단점

**장점**  
미리 충돌을 대비해서 공간을 많이 잡아놓을 필요가 없다. 충돌이 나면 그때 공간을 만들어서 연결만 해주면 된다.  
따라서 한정된 공간을 효율적으로 사용할 수 있다.  
**단점**  
같은 hash에 자료들이 많이 연결되면(쏠림 현상) 검색시 효율이 낮아진다.  
연결리스트를 이용하므로 외부 저장 공간을 사용하게 되어 외부 저장 공간 작업을 추가로 해야한다.

### 2. 개방 주소법 (Open Addressing)

충돌이 일어나면 그다음 비어있는 hash에 데이터를 저장하는 방법이다.  
개방주소법의 해시 테이블은 hash와 value가 1:1관계를 유지한다.

<img src='/images/DataStructure/Hash/Open_Addressing.png' width='100%' alt='open addressing' />

비어있는 해시를 찾는 과정은 동일해야한다.
Open Addressing에는 3가지의 방법이 존재한다.

### Linear Probing (선형 탐색)

<img src='/images/DataStructure/Hash/Linear_Probing.png' width='100%' alt='linear probing' />

**선형 조사의 개념 :** 충돌이 발생하면 다음 원소를 검사한다.

충돌이 벌어진다면 그 다음 자리 혹은 몇 개를 건너뛰어 비어있는 원소를 찾아 데이터를 저장한다.  
h(key) = i일때 해시 테이블 a[i], a[i+1], a[i+2], ... , a[i+j]를 차례로 검색하여 처음으로 찾은 비어있는 원소에 키를 저장한다.
그러나 선형 조사법은 충돌의 횟수가 증가함에 따라 클러스터 현상(군집화)이 발생하는 단점이 있다.

### Quadratic Probing (제곱 탐색)

<img src='/images/DataStructure/Hash/Quadratic_Probing.png' width='100%' alt='quadratic probing' />

선형 조사법의 클러스터 현상을 극복하기 위해 고안한 방법이다.  
충돌이 발생한다면 제곱만큼 위치를 건너뛰어 데이터를 저장한다.  
처음 충돌이 벌어지면 1의 제곱 만큼 다음 지점을 찾고 만약 그 지점도 이미 채워져 있다면 2의 제곱만큼 이동한다.  
그 다음은 3제곱, 4제곱, 5제곱 순으로 비어있는 원소를 찾을 때까지 계속 된다.  
제곱 탐색은 이웃하는 빈곳이 채워지며 만들어지는 1차 클러스터 현상은 해결 하지만 같은 해시값을 갖는 키들은 똑같은 점프 시퀸스에 따라
또다른 클러스터 현상을 발생하며 이를 2차 클러스터 현상이라고 한다.  
또한 점프 크기가 제곱만큼 커지기에 1차원 리스트에 비어있는 원소가 있음에도 찾지 못하고 실패할 가능성이 크다.

### Double Hashing (이중 해싱)

이중 해싱은 위의 제곱 탐색의 문제점을 해결하고자 빈 공간을 찾는 방법을 불규칙적으로 구성하는 방법이다.  
이중 해싱은 두개의 해시함수를 이용한다.  
**1차 해시 함수:** 키를 근거로 저장위치를 결정하기 위한 것  
**2차 해시 함수:** 충돌 발생시 몇칸 뒤를 살필지 결정하기 위한 것

### Open Addressing의 장단점

**장점**  
또다른 저장공간 없이 해시테이블 내에서 데이터 저장 및 처리가 가능하다.  
또 다른 저장공간에서의 추가적인 작업이 없다.  
**단점**  
해시 함수의 성능에 전체 헤시테이블의 성능이 좌지우지된다.  
데이터의 길이가 늘어나면 그에 해당하는 저장소를 마련해두어야 한다.
<br /><br />
해싱의 성능을 높이기 위해 위에 설명한 것 외에도 여러 방법이 있다.  
랜덤 조사(Random probing), 뻐꾸기 해싱(Cuckoo hasing), 동적 해싱(Dynamic hashing)