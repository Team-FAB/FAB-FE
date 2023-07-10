# 방갑고
![사진](https://github.com/Team-FAB/FAB-FE/assets/122066788/595eb1c6-d188-460e-825f-ff15e9c75cf1)
***

# Overview

사회 초년생들이 사회에 첫 발을 내딛을 때, 주거비용은 상당한 부담으로 다가옵니다.
특히 월세나 전세금이 계속해서 높아지는 현실에서 혼자 주거비용을 감당하는 것은 새로운 지역으로 이동하거나 독립을 할 때 생각보다 많은 경제적 압박을 받게 됩니다.

`**🏅First And Best**` 에서는 이러한 문제를 해결하고자 주거비용을 공유할 수 있는 룸메이트를 매칭를 매칭할 수 있는 서비스를 기획하게 되었습니다.

**룸메이트 매칭 플랫폼 - 방갑고** 를 통해 사회 초년생들은 주거비용 부담을 줄이고, 적합한 룸메이트를 찾을 수 있습니다.

- 룸메이트 성향이 맞는 룸메이트 **자동 추천 기능 제공**
    - 사용자의 흡연 유무, 희망 연령대, 지역, 활동시간을 비교하고, MBTI 궁합까지 고려하여 최적의 룸메이트를 자동으로 추천해드립니다. 추천 시스템을 통해 사용자들은 자신과 성향이 비슷한 사람들을 쉽게 찾을 수 있습니다.
- 매칭이 완료되면 매칭된 **유저 채팅 기능 제공**
    - 매칭된 사용자들은 편리하게 1:1 채팅 기능을 이용하여 함께 주거 정보를 나누고 공유할 수 있습니다.
    이를 통해 매칭된 룸메이트들은 서로의 선호사항이나 규칙 등을 논의하고, 상호간의 소통을 원활하게 할 수 있습니다.
- **세분화된 검색 기능 제공**
    - 사용자는 원하는 지역, 기간, 보증금, 성별 정보를 기반으로 게시글을 검색하고 필터링할 수 있습니다. 또한, 모집 중인 글만 따로 보거나 마감된 글까지 전체로 보는 것이 가능합니다.
    이를 통해 사용자들은 자신의 선호사항에 맞는 룸메이트 구하는 게시글을 빠르게 찾을 수 있습니다.

***

# 배포주소
https://fab-fe-rust.vercel.app/

***

# 시연영상
https://youtu.be/T61bLiATLN0

***

# Notion주소
https://www.notion.so/cb2e54049e1240c59d18928fdd83c5d0?v=c40b3db97f7a4042b2db491e8e752346

***

# Project

## ⚙ 프로젝트 아키텍처
![아키택처](https://github.com/Team-FAB/FAB-FE/assets/122066788/fb1ff4ca-f768-4ea0-984b-f0114893f785)





## 🛠 기술스택
**Frontend**
- React
- Typescript
- Redux
- React-router-dom
- StompJs
- Vite

**Style**
- module.css
- Ant Design

**Communication**
- Slack
- Discord
- Gather town

## CI / CD
- Deploy
    - Vercel

## 🔗 주요 기능
- 프로젝트의 모든 기획 (게시글 CRUD, Modal, 찜하기 등) ⬇️

![작성](https://github.com/Team-FAB/FAB-FE/assets/122290134/ae5ac58d-c8a7-4586-b8d8-f32a3316fa0e)
![게시글모달](https://github.com/Team-FAB/FAB-FE/assets/122290134/fbec47ee-be22-44d5-9186-5ed0d9e38df3)
![찜하기](https://github.com/Team-FAB/FAB-FE/assets/122290134/060987cb-f6e1-4593-887e-36822354f1ba)

- 로그인 OAuth(카카오, google) ⬇️

![로그인](https://github.com/Team-FAB/FAB-FE/assets/122290134/399005c2-7b42-4552-8d73-e267e758748d)

- 프로필 조회, 수정 및 이미지 업로드 ⬇️

![이미지 업로드 (1)](https://github.com/Team-FAB/FAB-FE/assets/122290134/86ebe20b-ba6a-4c52-ba7b-8416a5e35271)

- 프로필을 기반으로 추천 시스템 ⬇️

![추천](https://github.com/Team-FAB/FAB-FE/assets/122290134/20b5c208-d022-41b5-9608-1fa6361f6d51)

- 룸메이트 모집 게시글 CRUD 및 신청 하기 ⬇️

![신청현황](https://github.com/Team-FAB/FAB-FE/assets/122290134/c2aa59bb-0e2c-4122-90d4-4ac9f585a45e)

- 매칭된 사용자끼리 채팅 ⬇️

![채팅](https://github.com/Team-FAB/FAB-FE/assets/122290134/68faefd5-214a-4d64-9791-e4b7b2bd6ede)

## 📋 ERD
![Untitled (2)](https://github.com/Team-FAB/FAB-FE/assets/122066788/f0f62fec-f5d7-42dc-ae69-50a344491f44)
