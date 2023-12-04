import type { SetStateAction } from 'react';
import insertToTextArea from './insertToTextArea';

const onImagePasted = async (
  dataTransfer: DataTransfer,
  setMarkdown: (value: SetStateAction<string | undefined>) => void,
) => {
  const files: File[] = [];
  for (let index = 0; index < dataTransfer.items.length; index += 1) {
    const file = dataTransfer.files.item(index);

    if (file) {
      files.push(file);
    }
  }

  await Promise.all(
    files.map(async (file) => {
      console.log(file);
      const url =
        'https://elasticbeanstalk-us-east-1-064991853848.s3.amazonaws.com/thumbnail/8d531220-b1d4-433c-907f-919524e9908a39268032.png';
      //   const url = await fileUpload(file);
      const insertedMarkdown = insertToTextArea(`![](${url})`);
      if (!insertedMarkdown) {
        return;
      }
      setMarkdown(insertedMarkdown);
    }),
  );
};

export default onImagePasted;
