# ShoppingMall
## 1. Outline
### 1.1 Introduction
해당 레포지토리는 아래의 라이브러리를 이용한 Typescript 기반의 쇼핑몰 서버이다.
- [NestJS](https://nestjs.com) : A progressive Node.js framework
- [Prisma](https://www.prisma.io/) :  Next-generation Node.js and TypeScript ORM  

누구나 상점을 개설하고, 상품을 판매할 수 있는 ```e-commerce``` 서비스 이다.  
빠른 재현과, 번거로운 환경설정을 방지하기 위해, ```sqlite``` database를 예시로 작성하였다.  
이때문에 createMany, enum, json field 사용 불가능 등의 제약사항이 발생하였다.

해당 서비스의 시작은, ```yarn``` 을 통해 dependency를 설치하는것으로 시작된다.  
현재는 예제 database를 github에 첨부하였으나, 해당 DB를 지운 후 ```npx prisma migrate dev```를 실행하면 새 환경을 얻을 수 있다.  
새 환경을 얻은 이후, ```npx prisma generate```를 통하여 자바스크립트 Client를 얻을 수 있다.  
다만 API에 대한 설계가 목적이기에, 테스트가 부족할 수 있다.
이를 보완하기 위해, ```prisma studio``` 를 사용한다.  
```npx prisma studio``` 명령어를 통해, 콘솔에서 데이터에 대한 CRUD가 가능하다.

###  1.2 Goal
각 상점마다 자신이 소유한 데이터를 확장시킬 수 있는 **사용자 정의 필드** (이하 ```customField```) 기능을 구현하려고 한다.  
각 상점마다 원하는 모델 (상품,고객,주문)의 **사용자 정의 필드** 는 다를 수 있고, 이를 관리할 수 있어야 한다.


## 2. Structure

### 2.1 ERD
![ERD](designs/erd.png)
### 2.2 Before Structure
아래 데이터구조는 사전에 구조가 정의되어 있었던 것들이다.

- ```Customer``` (고객)
- ```Product``` (상품)
- ```Order``` (주문)

### 2.3 Ebodiment Structure
아래 데이터 구조는 사전 정의에 포함되어 있던 것을 구체화 시킨 것이다.
- ````Store```` (고객이 생성한 쇼핑몰)
- ````Category```` (쇼핑몰의 상품 분류)


### 2.4 Implement Structure
아래 데이터 구조는 customField를 위해 구현한 기능이다.

```Asset```
> ```CustomField```의 집합이다.  
> ```Asset```을 ```product```에 등록하는 것으로, 단독으로 동작하는 ```CustomField```를 묶어 모듈화 한다.  
> ```Delivery``` 등의 타입을 기본제공 할 것이다.  
> type을 통해 도메인별 (```Order``` ,```Product```, ```User```)로 구별된다.  

````CustomField````
> 실제로 유저가 사용하는 ```custom field```이다.  
> 해당 필드는, 상품에 직접 적용하는 것이 아닌, ```Asset```에 등록하는 구조이다.  
> 해당 타입의 동작은, 아래의 ```Scalar```타입에 의해 결정된다.

```Scalar```
> ```CustomField```에서 사용가능한 데이터 타입이다.  
> ```phone```, ```text```, ```address```, ```email```, ```number```, ```point```, ```select``` 의 타입을 지원하며, 추후에 새로운 타입을 추가할 수 있다.  
> 무한하게 데이터 타입을 열어줄 경우, 빌더상 문제가 발생할 가능성이 높아 제약사항을 두었다.

## 3 Use Case
유저는 아래와 같은 flow를 통해 쇼핑몰의 생성부터, 상품등록 등을 하게될 것이다.  
동작과 연관된 테이블은 괄호에 표시하겠다.
1. 회원가입을 한다 (```Customer```)
2. 쇼핑몰을 만든다. (```Store```, ```Customer```)
3. 상품을 생성한다. (```Product```)
4. 사용자 정의 필드를 생성한다. (```CustomField```)
5. 사용자 정의 필드를 합친 에셋을 생성한다. (```Asset```, ```CustomField```)
6. 에셋을 상품과 연결한다. (```Product```,```Asset```)
7. 카테고리를 생성한다. (```Category```)
8. 상품을 카테고리에 추가한다. (```Category```,```Product```)