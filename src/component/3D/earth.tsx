import React, { useEffect, useRef } from 'react';
import { Application } from '@splinetool/runtime';

const ThreeDScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const app = new Application(canvas);
      
      app.load('https://prod.spline.design/hWP72H21DyXmJBKV/scene.splinecode');
    }
  }, []);

  return <canvas className='' ref={canvasRef} id="canvas3d" style={{ width: '100%', height: '100vh',}}></canvas>;
};

// import { Application } from '@splinetool/runtime';

// const canvas = document.getElementById('canvas3d');
// const app = new Application(canvas);
// app.load('https://prod.spline.design/hWP72H21DyXmJBKV/scene.splinecode');


export default ThreeDScene;
