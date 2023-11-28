'use client';

import React, { useState } from 'react';
import FootPrint from './FootPrint';
import FootPrintWrap from './FootPrintWrap';
import { GuestBookButtonStyle, GuestBookTooltipStyle } from './FootPrint.style';
import GuestBookModal from '../GuestBook/GuestBookModal';

function FootPrintAnimation({ blogId }: { blogId: number }) {
  const [open, setOpen] = useState(false);
  const [newFootprints, setNewFootPrints] = useState<number[]>([]);
  const [tooltipOpacity, setTooltipOpacity] = useState<0 | 1>(0);

  let bottom = 20;
  let right = 100;

  const createFootprints = async () => {
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    for (let i = 0; i < 3; i++) {
      setNewFootPrints((prevFootprints) => [...prevFootprints, i]);
      await delay(300);
    }

    setNewFootPrints([]);
    setOpen(true);
  };

  return (
    <>
      <GuestBookButtonStyle
        newFootprints={newFootprints}
        onMouseOver={() => setTooltipOpacity(1)}
        onMouseOut={() => setTooltipOpacity(0)}
        onClick={() => {
          setTooltipOpacity(0);
          createFootprints();
        }}>
        <FootPrint width={60} height={60} />
      </GuestBookButtonStyle>
      <GuestBookTooltipStyle tooltipOpacity={tooltipOpacity}>방명록 보러가기</GuestBookTooltipStyle>
      {Array.from({ length: 3 }, (_, i) => {
        // 시간초마다 발자국 id가 배열에 담기고, id에 있으면, 그 발자국 보이도록 설정
        const isCurrentVisible = newFootprints.includes(i);

        bottom += 80;
        right += 100;

        return (
          <FootPrintWrap
            sx={{ display: isCurrentVisible ? 'flex' : 'none' }}
            key={i}
            bottom={bottom}
            right={right}
          />
        );
      })}
      <GuestBookModal open={open} blogId={blogId} onClose={() => setOpen(false)} />
    </>
  );
}

export default FootPrintAnimation;
