'use client';
import React, { useEffect } from 'react';
import PostComponent from '../../../../components/Post/Post';
import { useState } from 'react';
import { PostAreaComponent, PostPagination, ScrapList } from './category.style';
import CenterContent from '@/components/Layout/CenterContent';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import { useGetSidebarQuery } from '@/api/blog-api';
import { ISearchCategory, ISidebarContent } from '@/types/dto';
import DragAndDrop from '@/components/DND/DragAndDrop';
import { Stack } from '@mui/material';
import { usegetblogIdQuery } from '@/api/readme-api';
import { useGetSearchCategoryQuery } from '@/api/category-api';

function page({ params }: { params: { blogName: string; categoryId: string } }) {
  const [page, setPage] = useState(0);
  const [, setBlogId] = useState();
  const { data: blogIdData } = usegetblogIdQuery({ blogUrl: params.blogName });
  const { data: sidebarData } = useGetSidebarQuery({ blogId: blogIdData });
  const [writeList, setWriteList] = useState<ISidebarContent[]>();

  const { data: searchCategoryData } = useGetSearchCategoryQuery({
    categoryId: Number(params.categoryId),
    page: page,
  });
  const [searchCategory, setSearchCategory] = useState<ISearchCategory>();

  useEffect(() => {
    setBlogId(blogIdData);
    setSearchCategory(searchCategoryData);
    setWriteList(sidebarData?.sidebarDtos);
  }, [blogIdData, searchCategoryData, sidebarData]);

  const totalPages = searchCategory?.totalPages;

  return (
    <CenterContent maxWidth={'2000px'}>
      <ScrapList>{params.categoryId}</ScrapList>
      <DragAndDrop
        blogName={params.blogName}
        footprintList={writeList}
        isMe={sidebarData?.isMyPage}
        rightContainer={
          <Stack width="100%">
            <PostAreaComponent>
              {searchCategory?.postPreviewDtos.map((postInfo) => {
                return (
                  <PostComponent
                    isPrivate
                    key={postInfo.postId}
                    thumbnail={postInfo.thumbnail}
                    title={postInfo.title}
                    likesCount={postInfo.likesCount}
                    viewsCount={postInfo.viewsCount}
                    Icon={
                      postInfo.isPrivate ? (
                        <LockIcon fontSize="small" />
                      ) : (
                        <LockOpenIcon fontSize="small" />
                      )
                    }
                  />
                );
              })}
            </PostAreaComponent>
            <PostPagination
              count={totalPages}
              page={page + 1}
              onChange={(_, newPage) => {
                setPage(newPage - 1);
              }}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        }
      />
    </CenterContent>
  );
}

export default page;
