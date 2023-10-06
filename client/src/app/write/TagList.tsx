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

  console.log(tag);
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
          console.log(event);
          setTag(event.target.value);
        }}
        onKeyDown={(event) => {
          console.log(event.code);
          if (event.code === 'Enter') {
            event.preventDefault();
            if (tagArray.length <= 10) {
              if (!tag.includes('#') && tag.length > 1) {
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
