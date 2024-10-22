import { FC, useEffect, useRef, useState } from 'react';

const DashboardSize: FC = () => {
  const [width, setWidth] = useState(450);
  const isResized = useRef(false);

  useEffect(() => {
    window.addEventListener('mousemove', (e) => {
      if (!isResized.current) {
        return;
      }

      setWidth((previousWidth) => previousWidth + e.movementX);
    });

    window.addEventListener('mouseup', () => {
      isResized.current = false;
    });
  }, []);

  return (
    <div className="flex flex-row h-96">
      <div className="resize flex" style={{ width: `${width / 32}rem` }}>
        <div className="bg-slate-600 w-full overflow-hidden">LoremIpsum</div>
        <div
          className="w-4 cursor-col-resize bg-blue-500"
          onMouseDown={() => {
            isResized.current = true;
          }}
        />
      </div>
      <div className="flex-1 bg-slate-200 p-8 overflow-hidden">B</div>
    </div>
  );
};

export default DashboardSize;
