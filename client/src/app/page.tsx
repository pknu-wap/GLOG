import { Stack } from '@mui/material';

export default function Home() {
  const title: string = 'asdfasfs';
  const count: number = 0;

  // 객체 1번 그냥 이렇게 쓰기
  const card: { title: string; count: number } = { title: 'asdf', count: 0 };

  // 객체 2번 따로 타입을 빼서 쓰기
  type CardType = {
    title: string;
    count: number;
  };

  const card_two: CardType = { title: 'asdf', count: 0 };

  // 배열 1번 그냥 이렇게 쓰기
  const cardArray: { title: string; count: number }[] = [
    { title: 'asdf', count: 0 },
    { title: 'zxcv', count: 1 },
  ];

  // 배열 2번 따로 타입을 빼서 쓰기
  type CardArrayType = {
    title: string;
    count: number;
  }[];

  const cardArray_two: CardArrayType = [
    { title: 'asdf', count: 0 },
    { title: 'zxcv', count: 1 },
  ];

  return (
    <Stack>
      {title}
      {count}
      {card.title}
      {card.count}
      {card_two.title}
      {card_two.count}
      {cardArray[0].title}
      {cardArray_two[0].title}
    </Stack>
  );
}
