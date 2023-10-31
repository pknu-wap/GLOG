'use client';

import { useGetSidebarQuery } from '@/api/blog-api';
import DragAndDrop from '@/components/DND/DragAndDrop';
import { ISidebarContent } from '@/types/dto';
import { Stack } from '@mui/material';
import MDEditor from '@uiw/react-md-editor';
import { useEffect, useState } from 'react';

const Home = ({ params }: { params: { blogName: string } }) => {
  const [writeList, setWriteList] = useState<ISidebarContent[]>();
  const { data: sidebarData } = useGetSidebarQuery({ blogId: 3 });

  useEffect(() => {
    setWriteList(sidebarData?.sidebarDtos);
  }, [sidebarData]);

  const tempData = `![header](https://capsule-render.vercel.app/api?type=waving&color=auto&height=300&section=header&text=We%20are%20team%20Glog!&fontSize=90)

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
  
  gradle
  1. Issue를 생성한다.
  2. feature Branch를 생성한다.
  3. Add - Commit - Push - Pull Request 의 과정을 거친다.
  4. merge된 작업이 있을 경우, 다른 브랜치에서 작업을 진행 중이던 개발자는 본인의 브랜치로 merge된 작업을 Pull 받아온다.
  5. 종료된 Issue와 Pull Request의 Label과 Project를 관리한다.
  
  ### Branch Convention
  
  - [develop] : 최종 배포
  - [feature] : 기능 추가
  - [fix] : 에러 수정, 버그 수정
  - [docs] : README, 문서
  - [refactor] : 코드 리펙토링 (기능 변경 없이 코드만 수정할 때)
  - [modify] : 코드 수정 (기능의 변화가 있을 때)
  - [chore] : gradle 세팅, 위의 것 이외에 거의 모든 것
  
  ### Issue Template
  ## 💥이슈 설명
  
  ## 📚할 일 목록
  
  ## 👀참고 사항
  
  ## ⌛기한
  
  
  ### Pr Template
  ### PR 타입(하나 이상의 PR 타입을 선택해주세요)
  - [ ] 기능 추가 ✨
  - [ ] 기능 삭제 🔥
  - [ ] 버그 수정 🐛
  - [ ] 코드 형태 개선 🎨
  - [ ] 의존성, 환경 변수, 빌드 관련 코드 업데이트 🔨
  
  ### 변경 사항
  ex) 로그인 시, 구글 소셜 로그인 기능을 추가했습니다.
  
  ### 이슈 사항
  ex) 베이스 브랜치에 포함되기 위한 코드는 모두 정상적으로 동작해야 합니다. 결과물에 대한 스크린샷, GIF, 혹은 라이브 데모가 가능하도록 샘플API를 첨부할 수도 있습니다.
  
  ### To reviewer
  ex) 여기에서 이 부분 잘 모르겠는데 한번 봐주실 수 있나요?
  
  
  ### Contributor
  |  <img src="https://github.com/pknu-wap/GLOG/assets/66813821/9d17f0a6-ed4d-4b80-8f8f-d9ba61f560e1" alt="3_pano" width="100" height="100">  | <img src="https://github.com/pknu-wap/GLOG/assets/66813821/31fa8a99-7f76-49eb-99fc-d4695b107d2c" alt="3_jumo" width="100" height="100"> | <img src="https://github.com/pknu-wap/GLOG/assets/66813821/79de9800-c16d-4a7a-b306-c933d276cb2d" alt="3_simba" width="100" height="100">  | <img src="https://github.com/pknu-wap/GLOG/assets/48638700/160f21e5-40da-44dc-9e26-1f234c731791" alt="3_pano" width="100" height="100"> | <img src="https://github.com/pknu-wap/GLOG/assets/66813821/aece1d61-7853-42a6-ace3-ce8023cc91e0" alt="3_miki" width="100" height="100"> |
  | :------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: |
  |                                 [채연(F.E)](https://github.com/chaeyeon1)                                  |                                  [준서(F.E)](https://github.com/dev-junseo)                                  |                                 [도연(B.E)](https://github.com/dy102)                                 |                                [두영(B.E)](https://github.com/FhRh)                                     |                             [종경(B.E)](https://github.com/JONG-KYEONG)                                     |
  | [![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=chaeyeon1&show_icons=true&theme=swift&hide_title=true)](https://github.com/anuraghazra/github-readme-stats) |  [![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=dev-junseo&show_icons=true&theme=swift&hide_title=true)](https://github.com/anuraghazra/github-readme-stats) |  [![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=dy102&show_icons=true&theme=swift&hide_title=true)](https://github.com/anuraghazra/github-readme-stats)  |  [![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=FhRh&show_icons=true&theme=swift&hide_title=true)](https://github.com/anuraghazra/github-readme-stats) |  [![Anurag's github stats](https://github-readme-stats.vercel.app/api?username=jeongkyeong&show_icons=true&theme=swift&hide_title=true)](https://github.com/anuraghazra/github-readme-stats) 
`;

  return (
    <Stack height={'fit-content'}>
      <DragAndDrop
        blogName={params.blogName}
        footprintList={writeList}
        rightContainer={
          <Stack width="80%" margin="auto" overflow={'scroll'}>
            <MDEditor.Markdown source={tempData} />
          </Stack>
        }
      />
    </Stack>
  );
};

export default Home;
