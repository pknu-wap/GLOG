'use client';

import { useGetCollectDataQuery } from '@/api/collect-api';
import React from 'react';

function Collect() {
  console.log(useGetCollectDataQuery({ index: 0 }));
  return <div>Collect</div>;
}

export default Collect;
