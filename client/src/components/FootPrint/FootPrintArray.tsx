'use client';

import React, { useState } from 'react';
import FootPrint from './FootPrint';
import { Stack } from '@mui/material';
import FootPrintWrap from './FootPrintWrap';
import Modal from '../Modal/Modal';

function FootPrintArray() {
  const [open, setOpen] = useState(false);
  const [newFootprints, setNewFootPrints] = useState<number[]>([]);
  const [tooltipOpacity, setTooltipOpacity] = useState(0);

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
      <Stack
        onMouseOver={() => setTooltipOpacity(1)}
        onMouseOut={() => setTooltipOpacity(0)}
        position="fixed"
        onClick={createFootprints}
        bottom={50}
        right={100}
        sx={{
          opacity: newFootprints.length === 0 ? 1 : 0,
          transition: 'all .35s ease-in-out',
        }}
        p={4}
        borderRadius={20}>
        <FootPrint width={60} height={60} />
      </Stack>
      <Stack
        sx={{ opacity: tooltipOpacity, transition: 'all .35s ease-in-out' }}
        bgcolor="primary.light"
        position="fixed"
        width="fit-content"
        bottom={135}
        right={80}
        borderRadius={2}
        px={3}
        py={1}>
        방명록 보러가기
      </Stack>
      {Array.from({ length: 3 }, (_, i) => {
        console.log(bottom, right);
        bottom += 80;
        right += 100;

        return (
          <FootPrintWrap
            sx={{ opacity: newFootprints.includes(i) ? 1 : 0 }}
            key={i}
            bottom={bottom}
            right={right}
          />
        );
      })}
      <Modal open={open} onClose={() => setOpen(false)}>
        asdfasdfasdfadsfdsa
      </Modal>
    </>
  );
}

export default FootPrintArray;
