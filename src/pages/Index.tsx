import { useState } from 'react';
import { GameControls } from '@/components/GameControls';
import { PuzzleBoard } from '@/components/PuzzleBoard';
import { puzzleImages, PuzzleImage } from '@/data/puzzle-images';

const Index = () => {
  const [pieceCount, setPieceCount] = useState(25);
  const [selectedImage, setSelectedImage] = useState<PuzzleImage>(puzzleImages[0]);
  const [gameId, setGameId] = useState(1); // Used to force re-mount of PuzzleBoard

  const handleRestart = () => {
    setGameId(prevId => prevId + 1);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg/w-1/3 xl:w-1/4">
          <GameControls
            pieceCount={pieceCount}
            setPieceCount={setPieceCount}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            onRestart={handleRestart}
          />
        </div>
        <div className="lg:w-2/3 xl:w-3/4">
          <PuzzleBoard 
            key={gameId} // Change key to re-initialize the component
            image={selectedImage} 
            pieceCount={pieceCount} 
          />
        </div>
      </div>
    </div>
  );
};

export default Index;