![header](https://capsule-render.vercel.app/api?type=waving&color=auto&height=300&section=header&text=We%20are%20team%20Glog!&fontSize=90)

# 2023_2_GLOG
---
## Introduction  

우리는 개발자를 위한 블로그를 만드는 팀 글로그 입니다!  
보다 세련되고 편리한 기능을 제공하기 위해 노력중 입니다 😊

---
## Stack
### Front End
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white">    <img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=next.js&logoColor=white">

### Back End
<img src="https://img.shields.io/badge/spring boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">

### Coop&Deploy
<img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white"> <img src="https://img.shields.io/badge/figma-E7157B?style=for-the-badge&logo=figma&logoColor=white"> <img src="https://img.shields.io/badge/github-000000?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/aws-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white">

---

### Git Flow
기본적으로 Git Flow 전략을 이용합니다. 작업 시작 시 선행되어야 할 작업은 다음과 같습니다.

```gradle
1. Issue를 생성한다.
2. feature Branch를 생성한다.
3. Add - Commit - Push - Pull Request 의 과정을 거친다.
4. merge된 작업이 있을 경우, 다른 브랜치에서 작업을 진행 중이던 개발자는 본인의 브랜치로 merge된 작업을 Pull 받아온다.
5. 종료된 Issue와 Pull Request의 Label과 Project를 관리한다.
```

### Branch Convention

```yaml
- [develop] : 최종 배포
- [feature] : 기능 추가
- [fix] : 에러 수정, 버그 수정
- [docs] : README, 문서
- [refactor] : 코드 리펙토링 (기능 변경 없이 코드만 수정할 때)
- [modify] : 코드 수정 (기능의 변화가 있을 때)
- [chore] : gradle 세팅, 위의 것 이외에 거의 모든 것
```

