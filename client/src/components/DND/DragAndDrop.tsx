'use client';
import React, { ReactNode } from 'react';
import CenterContent from '@/components/Layout/CenterContent';
import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import FootPrint from '../../../public/assets/yellowFootPrint.png';
import IconButton from '../Button/IconButton';
import { ArrowRight, Edit } from '@mui/icons-material';
import CategorySettingModal from './CategorySettingModal';
import PageLink from '../PageLink/PageLink';
import Github from '../Github/Github';
import Button from '../Button/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PostCategoryApi } from '@/api/category-api';
import CreateCategoryModal from './CreateCategoryModal';

type Footprint = {
  categoryId: number;
  categoryName: string;
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
}

function DragAndDrop({ rightContainer, footprintList, blogName }: DragAndDropProps) {
  const [isBrowser, setIsBrowser] = useState(false);
  const [categoryEditOpen, setCategoryEditOpen] = useState(false);
  const [createCategoryOpen, setCreateCategoryOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState(0);
  const queryClient = useQueryClient();

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
          <CenterContent bgcolor="transparent">
            <Stack gap={8} width="100%" height="100%" direction="row">
              <Stack sx={{ transition: 'all .35s ease-in-out' }} position="relative" gap={8}>
                <Button onClick={() => setCreateCategoryOpen(true)}>카테고리 생성</Button>
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
                          <PageLink href={`/write/create/${category.categoryId}`}>
                            <Stack sx={{ cursor: 'pointer', width: 'fit-content' }}>글쓰기</Stack>
                          </PageLink>
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            bgcolor="primary.main"
                            padding="4px 8px"
                            borderRadius="0px 8px">
                            <Stack direction="row" spacing={1}>
                              <Stack color="#000000">{category.categoryName}</Stack>
                              <IconButton
                                onClick={() => setCategoryEditOpen(true)}
                                sx={{ padding: '0px' }}
                                size="small">
                                <Edit fontSize="small" />
                              </IconButton>
                            </Stack>
                            <IconButton sx={{ padding: '0px' }} size="small">
                              <PageLink href={`/${blogName}/home/${category.categoryId}`}>
                                <ArrowRight />
                              </PageLink>
                            </IconButton>
                          </Stack>
                          {/* FIXME : 레포지토리 연동 여부 받아와야 함 */}
                          {
                            <>
                              <PageLink
                                onClick={() => {
                                  setCategoryId(category.categoryId);
                                }}
                                href={`${blogName}/prList/${category.categoryId}`}>
                                <Stack sx={{ cursor: 'pointer' }} pl={4} py={1}>
                                  PR 연동
                                </Stack>
                              </PageLink>
                              <Stack
                                onClick={() => setOpen(true)}
                                sx={{ cursor: 'pointer' }}
                                pl={4}
                                py={1}>
                                PR 연동
                              </Stack>
                            </>
                          }
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
                                          <Stack width="101px">{post.title}</Stack>
                                        </Stack>
                                      </PageLink>
                                    </Stack>
                                  )}
                                </Draggable>
                              );
                            })}
                          </Stack>
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
            categoryId={categoryId}
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
