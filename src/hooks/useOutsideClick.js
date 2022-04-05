import { useRef, useState, useEffect } from 'react';

export default function useOutsideClick(initialState) {
  const objectReference = useRef(null);
  const [visible, setVisible] = useState(initialState);

  const handleClickOutside = (event) => {
    if (
      objectReference.current &&
      !objectReference.current.contains(event.target)
    ) {
      setVisible(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Escape') {
      setVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside, true);
    document.addEventListener('keydown', handleKeyPress, true);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
      document.removeEventListener('keydown', handleKeyPress, true);
    };
  }, [objectReference]);

  return { objectReference, visible, setVisible };
}
