'use client';
import React, { ReactNode } from 'react';
import CenterContent from '@/components/Layout/CenterContent';
import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import FootPrint from '../../../public/assets/yellowFootPrint.png';

type Footprint = {
  categoryId: number;
  categoryName: string;
  postTitleDtos: {
    postId: number;
    title: string;
  }[];
};

interface DragAndDropProps {
  rightContainer: ReactNode;
  footprintList?: Footprint[];
  categoryNumber?: string;
}

function DragAndDrop({ rightContainer, footprintList, categoryNumber }: DragAndDropProps) {
  const [isBrowser, setIsBrowser] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setIsBrowser(process.browser);
  }, []);

  const dragHandler = (result: DropResult) => {
    if (
      result.destination?.droppableId === 'right-droppable' &&
      result.source.droppableId === 'left-droppable'
    ) {
      router.push(
        categoryNumber
          ? `/home/${categoryNumber}/${result.draggableId}`
          : `/home/${result.draggableId}`,
      );
    }
  };

  return (
    <>
      {isBrowser ? (
        <DragDropContext onDragEnd={dragHandler}>
          <CenterContent bgcolor="transparent">
            <Stack gap={8} width="100%" height="100%" direction="row">
              <Stack sx={{ transition: 'all .35s ease-in-out' }} position="relative" gap={8}>
                {footprintList?.map((category) => {
                  return (
                    <Droppable key={category.categoryId} droppableId="left-droppable">
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
                          <Stack bgcolor="#e4ba5a" padding="4px 8px" borderRadius="0px 8px">
                            {category.categoryName}
                          </Stack>
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
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}>
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
        </DragDropContext>
      ) : null}
    </>
  );
}

export default DragAndDrop;
