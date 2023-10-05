import React, { useState } from 'react';
import { TagContainer, TagTextfield } from './Write.style';
import { Chip } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

function TagList({
  tagArray,
  editTagArray,
}: {
  tagArray: string[];
  editTagArray: (newValue: string[]) => void;
}) {
  const [tag, setTag] = useState('');

  return (
    <TagContainer>
      {tagArray.map((tag, i) => (
        <Chip
          key={i}
          color="primary"
          label={`# ${tag}`}
          deleteIcon={<CancelIcon />}
          onDelete={() => editTagArray(tagArray.filter((tag, index) => index !== i))}
        />
      ))}
      <TagTextfield
        placeholder="태그를 입력해주세요"
        value={tag}
        onChange={(event) => {
          setTag(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === ' ' || event.code === 'Space') {
            if (tagArray.length <= 10) {
              if (!tag.includes('#')) {
                editTagArray([...tagArray, tag]);
                setTag('');
              } else {
                setTag('');
                // setSnackbarOpen(true);
                // setToastMessage('태그에 `#`은 포함될 수 없습니다.');
              }
            } else {
              setTag('');
              // setSnackbarOpen(true);
              // setToastMessage('태그는 최대 10개까지 지정 가능합니다.');
            }
          }
        }}
      />
    </TagContainer>
  );
}

export default TagList;
