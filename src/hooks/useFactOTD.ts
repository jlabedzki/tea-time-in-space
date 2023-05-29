import { useEffect, useState } from 'react';
import { spaceFacts } from '../spaceFacts';

export default function useFactOTD() {
  const [factIndex, setFactIndex] = useState<number>();

  useEffect(() => {
    const getFactIndex = async () => {
      const currentTimestamp = new Date().getTime();
      const {
        factOTD: { index, timestamp },
      } = await chrome.storage.local.get('factOTD');

      if (index === undefined) {
        chrome.storage.local.set({
          factOTD: {
            index: 0,
            timestamp: new Date().getTime(),
          },
        });
        setFactIndex(0);
        return;
      }

      if (isDifferentDay(timestamp, currentTimestamp)) {
        const newIndex = (index + 1) % spaceFacts.length;
        chrome.storage.local.set({
          factOTD: {
            index: newIndex,
            timestamp: currentTimestamp,
          },
        });
        setFactIndex(newIndex);
        return;
      }

      setFactIndex(index);
    };

    getFactIndex();
  }, []);

  return factIndex;
}

function isDifferentDay(timestamp1: number, timestamp2: number) {
  const date1 = new Date(timestamp1);
  const date2 = new Date(timestamp2);

  return (
    date1.getFullYear() !== date2.getFullYear() ||
    date1.getMonth() !== date2.getMonth() ||
    date1.getDate() !== date2.getDate()
  );
}
