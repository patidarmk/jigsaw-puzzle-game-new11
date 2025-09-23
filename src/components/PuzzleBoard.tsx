import React, { useState, useEffect, useRef } from 'react';
import { PuzzleImage } from '@/data/puzzle-images';

interface Piece {
  id: number;
  x: number;
  y: number;
  correctX: number;
  correctY: number;
  isDragging: boolean;
}

interface PuzzleBoardProps {
  image: PuzzleImage;
  pieceCount: number;
}

export const PuzzleBoard: React.FC<PuzzleBoardProps> = ({ image, pieceCount }) => {
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [boardSize, setBoardSize] = useState({ width: 0, height: 0 });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [draggingPiece, setDraggingPiece] = useState<number | null>(null);
  const [pointerOffset, setPointerOffset] = useState({ x: 0, y: 0 });
  const boardRef = useRef<HTMLDivElement>(null);

  const gridSize = Math.sqrt(pieceCount);
  const pieceWidth = imageSize.width / gridSize;
  const pieceHeight = imageSize.height / gridSize;

  useEffect(() => {
    const img = new Image();
    img.src = image.url;
    img.onload = () => {
      const aspectRatio = img.width / img.height;
      const containerWidth = boardRef.current?.clientWidth || 600;
      const containerHeight = boardRef.current?.clientHeight || 600;
      
      let newWidth = containerWidth;
      let newHeight = newWidth / aspectRatio;

      if (newHeight > containerHeight) {
        newHeight = containerHeight;
        newWidth = newHeight * aspectRatio;
      }
      
      setImageSize({ width: newWidth, height: newHeight });
      setBoardSize({ width: containerWidth, height: containerHeight });
    };
  }, [image.url]);

  useEffect(() => {
    if (imageSize.width > 0) {
      const newPieces: Piece[] = [];
      for (let i = 0; i < pieceCount; i++) {
        const row = Math.floor(i / gridSize);
        const col = i % gridSize;
        newPieces.push({
          id: i,
          correctX: col * pieceWidth,
          correctY: row * pieceHeight,
          x: Math.random() * (boardSize.width - pieceWidth),
          y: Math.random() * (boardSize.height - pieceHeight),
          isDragging: false,
        });
      }
      setPieces(newPieces);
    }
  }, [imageSize, pieceCount, image.url]); // Re-run when image changes

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    e.preventDefault();
    const piece = pieces.find(p => p.id === id);
    if (!piece) return;

    setDraggingPiece(id);
    setPointerOffset({
      x: e.clientX - piece.x,
      y: e.clientY - piece.y,
    });

    // Bring piece to front
    const updatedPieces = pieces.filter(p => p.id !== id);
    updatedPieces.push(piece);
    setPieces(updatedPieces);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (draggingPiece === null) return;

    const newX = e.clientX - pointerOffset.x;
    const newY = e.clientY - pointerOffset.y;

    setPieces(pieces.map(p => 
      p.id === draggingPiece ? { ...p, x: newX, y: newY } : p
    ));
  };

  const handleMouseUp = () => {
    setDraggingPiece(null);
  };

  return (
    <div 
      ref={boardRef}
      className="w-full h-full bg-blue-100/50 rounded-lg shadow-inner relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ minHeight: '600px' }}
    >
      {pieces.map((piece) => (
        <div
          key={piece.id}
          onMouseDown={(e) => handleMouseDown(e, piece.id)}
          className="absolute cursor-grab active-cursor-grabbing rounded-sm shadow-md"
          style={{
            width: `${pieceWidth}px`,
            height: `${pieceHeight}px`,
            backgroundImage: `url(${image.url})`,
            backgroundSize: `${imageSize.width}px ${imageSize.height}px`,
            backgroundPosition: `-${piece.correctX}px -${piece.correctY}px`,
            transform: `translate(${piece.x}px, ${piece.y}px)`,
            zIndex: draggingPiece === piece.id ? 100 : 1,
            transition: draggingPiece === piece.id ? 'none' : 'transform 0.1s',
          }}
        />
      ))}
    </div>
  );
};