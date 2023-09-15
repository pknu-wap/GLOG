import { List } from '@mui/material';
import React from 'react';
import { SidebarSubMenuContainer } from './SidebarSubMenuContainer';
import { SidebarSubMenuItem } from './SidebarSubMenuItem';

export type CategoryType = string | number;
export type TitleType = { contentId: number; title: string }[];

const MenuList = ({
  sidebarMenuList,
}: {
  sidebarMenuList: {
    category_id: number;
    category_name: CategoryType;
    titles: TitleType;
  }[];
}) => {
  return (
    <List>
      {sidebarMenuList.map((category) => {
        return (
          <SidebarSubMenuContainer
            key={category.category_id}
            text={category.category_name}
            url={`/${category.category_id}`}>
            {category.titles.map((title) => {
              return (
                <SidebarSubMenuItem
                  key={title.contentId}
                  text={title.title}
                  url={`/${category.category_id}/${title.contentId}`}
                />
              );
            })}
          </SidebarSubMenuContainer>
        );
      })}
    </List>
  );
};

export default MenuList;
