import { useState, useEffect } from 'react';

export default function useImageRename(image, name) {
  const [renamedImage, setRenamedImage] = useState(null);
  const [renamedImageUrl, setRenamedImageUrl] = useState(null);

  useEffect(() => {
    if (image) {
      let renamedImg = new File([image], `${name}.jpg`, { type: 'image/jpg' });

      setRenamedImage(renamedImg);
      setRenamedImageUrl(URL.createObjectURL(renamedImg));
    }
  }, [image, name]);

  return { renamedImage, renamedImageUrl };
}
