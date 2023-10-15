'use client';
import React, { ReactNode } from 'react';
import CenterContent from '@/components/Layout/CenterContent';
import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useRouter } from 'next/navigation';
import { BearFootprint, Big__toe, Small__toe, Small__toe2, Small__toe3 } from './DragAndDrop.style';

interface Category {
  categoryId: number;
  categoryName: string;
}

interface Post {
  postId: number;
  title: string;
}

type Footprint = Category | Post;

interface DragAndDropProps<T> {
  rightContainer: ReactNode;
  footprintList?: T[];
  categoryNumber?: string;
}

function DragAndDrop<T extends Footprint>({
  rightContainer,
  footprintList,
  categoryNumber,
}: DragAndDropProps<T>) {
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
          ? `/home/${categoryNumber}/${result.source.index}`
          : `/home/${result.source.index}`,
      );
    }
  };

  return (
    <>
      {isBrowser ? (
        <DragDropContext onDragEnd={dragHandler}>
          <CenterContent>
            <Stack gap={8} width="100%" height="100%" direction="row">
              <Droppable droppableId="left-droppable">
                {(provided, snapshot) => (
                  <div
                    className="top-container"
                    style={{
                      backgroundColor: snapshot.isDraggingOver ? 'transparent' : 'transparent',
                    }}
                    {...provided.droppableProps}
                    ref={provided.innerRef}>
                    <Stack gap={15}>
                      {footprintList?.map((item, index) => {
                        const postId = 'postId' in item ? item.postId : undefined;
                        const title = 'title' in item ? item.title : undefined;
                        const categoryId = 'categoryId' in item ? item.categoryId : undefined;
                        const categoryTitle =
                          'categoryName' in item ? item.categoryName : undefined;

                        return (
                          <Draggable
                            key={postId || categoryId}
                            draggableId={`container-${postId || categoryId}`}
                            index={index}>
                            {(provided) => (
                              <div
                                style={{ backgroundColor: 'transparent' }}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}>
                                <Stack
                                  direction="row"
                                  justifyContent="right"
                                  alignItems="center"
                                  marginRight="30px"
                                  gap={10}>
                                  <Stack>{title || categoryTitle}</Stack>
                                  <BearFootprint>
                                    <Big__toe></Big__toe>
                                    <Small__toe></Small__toe>
                                    <Small__toe2></Small__toe2>
                                    <Small__toe3></Small__toe3>
                                  </BearFootprint>
                                </Stack>
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                    </Stack>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
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
