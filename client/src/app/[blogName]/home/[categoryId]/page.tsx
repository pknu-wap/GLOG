'use client';
import React, { useEffect } from 'react';
import PostComponent from '../../../../components/Post/Post';
import { useState } from 'react';
import { PostAreaComponent, ScrapList } from './category.style';
import CenterContent from '@/components/Layout/CenterContent';
import { useGetSidebarQuery } from '@/api/blog-api';
import { ICategory, IPostPreview, ISidebarContent } from '@/types/dto';
import DragAndDrop from '@/components/DND/DragAndDrop';
import { Menu, MenuItem, Stack } from '@mui/material';
import { useGetCategoryQuery, useGetPostPreviewQuery } from '@/api/postPreview-api';
import Button from '@/components/Button/Button';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';


function page({ params }: { params: { blogName: string; categoryId: string } }) {

  const { data: sidebarData } = useGetSidebarQuery({ blogId: 3 });
  const [writeList, setWriteList] = useState<ISidebarContent[]>();

  const {data: categoryNameData} = useGetCategoryQuery({categoryId: Number(params.categoryId)})
  const [categoryName, setCategoryName] = useState<ICategory>()

  const [kind, setKind] = useState("likes");
  const kindList = ["recent", "likes", "views", "randoms"]
  const { data: postPreviewData } = useGetPostPreviewQuery({
    kind: kind,
    page: Number(params.categoryId),
  });
  console.log(params.categoryId);
  const [previewData, setPreviewData] = useState<IPostPreview>();


  useEffect(() => {
    setCategoryName(categoryNameData)
    setWriteList(sidebarData?.sidebarDtos);
    setPreviewData(postPreviewData);
  }, [categoryNameData, sidebarData, postPreviewData]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };



  return (
    <CenterContent maxWidth={'2000px'}>
      <ScrapList>{categoryName?.categoryName}</ScrapList>
      <DragAndDrop
        blogName={params.blogName}
        footprintList={writeList}
        rightContainer={
          <Stack width="100%">

            <Stack flexDirection={'row'}>
              <Stack>
                <Button onClick={handleClick} sx={{ padding: '0 10px 0 0', minWidth: '24px' }}>
                  <AlignHorizontalLeftIcon fontSize="medium"></AlignHorizontalLeftIcon>
                </Button>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      setKind(kindList[1]);
                    }}>
                    인기순
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      setKind(kindList[0]);
                    }}>
                    최신순
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      setKind(kindList[2]);;
                    }}>
                    조회순
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      setKind(kindList[3]);;
                    }}>
                    랜덤
                  </MenuItem>
                </Menu>
              </Stack>
              <Stack>정렬기준</Stack>
              </Stack>

            <PostAreaComponent>
              {previewData?.postPreviewDtos.map((postInfo) => {
                return (
                  <PostComponent
                    isPrivate
                    key={postInfo.postId}
                    thumbnail={postInfo.thumbnail}
                    title={postInfo.title}
                    likesCount={postInfo.likesCount}
                    viewsCount={postInfo.viewsCount}
                    Icon={<></>}
                  />
                );
              })}
            </PostAreaComponent>

          </Stack>
        }
      />
    </CenterContent>
  );
}

export default page;
