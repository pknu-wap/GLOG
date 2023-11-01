import { Stack } from '@mui/material';
import React from 'react';
import { SidebarSubMenuContainer } from './SidebarSubMenuContainer';
import { SidebarSubMenuItem } from './SidebarSubMenuItem';

export type CategoryType = string | number;
export type TitleType = { postId: number; postTitle: string }[];

const MenuList = ({
  sidebarMenuList,
}: {
  sidebarMenuList: {
    category_id: number;
    category_name: CategoryType;
    postTitleDtos: TitleType;
  }[];
}) => {
  return (
    <Stack>
      {sidebarMenuList.map((category) => {
        return (
          <SidebarSubMenuContainer
            key={category.category_id}
            text={category.category_name}
            url={`/home/${category.category_id}`}>
            {category.postTitleDtos.map((post) => {
              return (
                <SidebarSubMenuItem
                  key={post.postId}
                  text={post.postTitle}
                  url={`/home/${category.category_id}/${post.postId}`}
                />
              );
            })}
          </SidebarSubMenuContainer>
        );
      })}
    </Stack>
  );
};

export default MenuList;
