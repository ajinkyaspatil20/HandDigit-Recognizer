import React, {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import "./DrawingCanvas.css";

const DrawingCanvas = forwardRef((props, ref) => {
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    clearCanvas: () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    },
    getImageData: () => {
      const canvas = canvasRef.current;
      // Get the image data as a base64 string
      const imageData = canvas.toDataURL("image/png");
      props.onPredict(imageData);
      return imageData;
    },
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas background to white
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set up drawing properties
    ctx.lineWidth = 15;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "black";
  }, []);

  const startDrawing = (e) => {
    isDrawingRef.current = true;
    const { offsetX, offsetY } = getCoordinates(e);
    lastPosRef.current = { x: offsetX, y: offsetY };
  };

  const draw = (e) => {
    if (!isDrawingRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { offsetX, offsetY } = getCoordinates(e);

    ctx.beginPath();
    ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();

    lastPosRef.current = { x: offsetX, y: offsetY };
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
  };

  // Handle both mouse and touch events
  const getCoordinates = (e) => {
    if (e.nativeEvent.offsetX !== undefined) {
      // Mouse event
      return { offsetX: e.nativeEvent.offsetX, offsetY: e.nativeEvent.offsetY };
    } else {
      // Touch event
      const rect = canvasRef.current.getBoundingClientRect();
      const touch = e.touches[0] || e.changedTouches[0];
      return {
        offsetX: touch.clientX - rect.left,
        offsetY: touch.clientY - rect.top,
      };
    }
  };

  return (
    <div className="drawing-canvas-container">
      <canvas
        ref={canvasRef}
        width={280}
        height={280}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        className="drawing-canvas"
      />
    </div>
  );
});

export default DrawingCanvas;
