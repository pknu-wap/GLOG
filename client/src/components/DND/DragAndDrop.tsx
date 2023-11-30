'use client';
import React, { ReactNode } from 'react';
import CenterContent from '@/components/Layout/CenterContent';
import { Stack, Tooltip, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import FootPrint from '../../../public/assets/yellowFootPrint.png';
import IconButton from '../Button/IconButton';
import { Add, Edit } from '@mui/icons-material';
import CategorySettingModal from './CategorySettingModal';
import PageLink from '../PageLink/PageLink';
import Github from '../Github/Github';
import Button from '../Button/Button';
import CreateCategoryModal from './CreateCategoryModal';

type Footprint = {
  categoryId: number;
  categoryName: string;
  isPrCategory: boolean;
  postTitleDtos: {
    postId: number;
    title: string;
  }[];
};

interface DragAndDropProps {
  blogName: string;
  rightContainer: ReactNode;
  footprintList?: Footprint[];
  categoryNumber?: string;
  isMe?: boolean;
}

function DragAndDrop({ rightContainer, footprintList, blogName, isMe }: DragAndDropProps) {
  const [isBrowser, setIsBrowser] = useState(false);
  const [categoryEditOpen, setCategoryEditOpen] = useState(false);
  const [createCategoryOpen, setCreateCategoryOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState(0);
  const [paramsCategoryId, setParamsCategoryId] = useState(Number);
  const theme = useTheme();

  const router = useRouter();
  useEffect(() => {
    setIsBrowser(process.browser);
  }, []);

  const dragHandler = (result: DropResult) => {
    if (result.destination?.droppableId === 'right-droppable') {
      router.push(`/${blogName}/home/${result.source.droppableId}/${result.draggableId}`);
    }
  };

  return (
    <>
      {isBrowser ? (
        <DragDropContext onDragEnd={dragHandler}>
          <CenterContent bgcolor="themeColor.main">
            <Stack gap={8} width="100%" height="100%" direction="row">
              <Stack sx={{ transition: 'all .35s ease-in-out' }} position="relative" gap={8}>
                {isMe && (
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => setCreateCategoryOpen(true)}
                    sx={{ marginBottom: '-24px' }}>
                    카테고리 생성
                  </Button>
                )}
                {footprintList?.map((category) => {
                  return (
                    <Droppable key={category.categoryId} droppableId={String(category.categoryId)}>
                      {(provided, snapshot) => (
                        <div
                          className="top-container"
                          style={{
                            backgroundColor: snapshot.isDraggingOver
                              ? 'transparent'
                              : 'transparent',
                          }}
                          {...provided.droppableProps}
                          ref={provided.innerRef}>
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            bgcolor="primary.main"
                            padding="4px 8px"
                            borderRadius="0px 8px">
                            <Stack direction="row" spacing={1}>
                              <PageLink href={`/${blogName}/home/${category.categoryId}`}>
                                <Tooltip title="카테고리 모아보기" placement="left">
                                  <Stack
                                    sx={{ padding: 1, ':hover': { color: 'rgba(0,0,0,0.4)' } }}
                                    color={theme.palette.oppositeColor.main}>
                                    {category.categoryName}
                                  </Stack>
                                </Tooltip>
                              </PageLink>
                              {isMe && (
                                <Tooltip
                                  onClick={() => {
                                    setCategoryEditOpen(true);
                                    setParamsCategoryId(category.categoryId);
                                  }}
                                  title="게시글 수정">
                                  <IconButton sx={{ padding: '0px' }} size="small">
                                    <Edit fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              )}
                            </Stack>
                            <Stack direction="row" alignItems="center" spacing={1}>
                              {isMe && (
                                <PageLink href={`/write/create/${category.categoryId}`}>
                                  <Tooltip title="게시글 작성">
                                    <IconButton sx={{ padding: '0px' }} size="small">
                                      <Add fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                </PageLink>
                              )}
                            </Stack>
                          </Stack>
                          <Stack>
                            {category?.isPrCategory ? (
                              <PageLink
                                onClick={() => {
                                  setCategoryId(category.categoryId);
                                }}
                                href={`/${blogName}/prList/${category.categoryId}`}>
                                <Stack
                                  height="100%"
                                  alignItems="center"
                                  sx={{
                                    fontSize: '14px',
                                    cursor: 'pointer',
                                    ':hover': { opacity: 0.6 },
                                    color: theme.palette.oppositeColor.main,
                                  }}
                                  pl={4}
                                  pt={1}>
                                  PR 연동 보러가기 {'->'}
                                </Stack>
                              </PageLink>
                            ) : (
                              isMe && (
                                <Stack
                                  onClick={() => {
                                    setOpen(true);
                                    setCategoryId(category.categoryId);
                                  }}
                                  sx={{
                                    fontSize: '14px',
                                    cursor: 'pointer',
                                    ':hover': { opacity: 0.6 },
                                    color: theme.palette.oppositeColor.main,
                                  }}
                                  pl={4}
                                  pt={1}>
                                  PR 연동 하러가기 {'->'}
                                </Stack>
                              )
                            )}
                          </Stack>
                          {!category?.isPrCategory && (
                            <Stack
                              sx={{
                                padding: '8px',
                                borderRadius: '8px',
                              }}>
                              {category.postTitleDtos?.map((post) => {
                                return (
                                  <Draggable
                                    key={post.postId}
                                    draggableId={`${post.postId}`}
                                    index={post.postId}>
                                    {(provided) => (
                                      <Stack
                                        sx={{
                                          padding: '4px 8px',
                                          ':hover': {
                                            borderRadius: '8px',
                                            backgroundColor: 'primary.light',
                                          },
                                          ':active': {
                                            backgroundColor: 'transparent',
                                          },
                                        }}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}>
                                        <PageLink
                                          href={`/${blogName}/home/${category.categoryId}/${post.postId}`}>
                                          <Stack
                                            direction="row"
                                            justifyContent="left"
                                            alignItems="center"
                                            width="fit-content"
                                            gap={2}>
                                            <Image
                                              src={FootPrint}
                                              alt="footPrint"
                                              width="15"
                                              height="15"
                                            />
                                            <Stack
                                              width="101px"
                                              color={theme.palette.oppositeColor.main}>
                                              {post.title}
                                            </Stack>
                                          </Stack>
                                        </PageLink>
                                      </Stack>
                                    )}
                                  </Draggable>
                                );
                              })}
                            </Stack>
                          )}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  );
                })}
              </Stack>
              <Droppable droppableId="right-droppable">
                {(provided) => {
                  return (
                    <div
                      className="right-container"
                      {...provided.droppableProps}
                      style={{ width: '100%', height: '100%' }}
                      ref={provided.innerRef}>
                      {rightContainer}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </Stack>
          </CenterContent>
          <CategorySettingModal
            open={categoryEditOpen}
            categoryId={paramsCategoryId}
            onClose={() => setCategoryEditOpen(false)}
          />
          <CreateCategoryModal
            open={createCategoryOpen}
            onClose={() => setCreateCategoryOpen(false)}
          />
          <Github categoryId={categoryId} open={open} onClose={() => setOpen(false)} />
        </DragDropContext>
      ) : null}
    </>
  );
}

export default DragAndDrop;
