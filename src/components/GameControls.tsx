import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { puzzleImages, PuzzleImage } from '@/data/puzzle-images';
import { RotateCcw, Image as ImageIcon } from 'lucide-react';

interface GameControlsProps {
  pieceCount: number;
  setPieceCount: (count: number) => void;
  selectedImage: PuzzleImage;
  setSelectedImage: (image: PuzzleImage) => void;
  onRestart: () => void;
}

export const GameControls: React.FC<GameControlsProps> = ({
  pieceCount,
  setPieceCount,
  selectedImage,
  setSelectedImage,
  onRestart,
}) => {
  const handleImageChange = (id: string) => {
    const image = puzzleImages.find((img) => img.id === id);
    if (image) {
      setSelectedImage(image);
    }
  };

  return (
    <Card className="w-full max-w-sm bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Game Settings</CardTitle>
        <CardDescription>
          Choose an image and difficulty to start.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="image-select">
            <ImageIcon className="w-4 h-4 inline-block mr-2" />
            Choose Image
          </Label>
          <Select value={selectedImage.id} onValueChange={handleImageChange}>
            <SelectTrigger id="image-select">
              <SelectValue placeholder="Select an image" />
            </SelectTrigger>
            <SelectContent>
              {puzzleImages.map((image) => (
                <SelectItem key={image.id} value={image.id}>
                  {image.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="difficulty-select">Difficulty (Piece Count)</Label>
          <Select
            value={String(pieceCount)}
            onValueChange={(val) => setPieceCount(Number(val))}
          >
            <SelectTrigger id="difficulty-select">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="25">25 Pieces (Easy)</SelectItem>
              <SelectItem value="100">100 Pieces (Medium)</SelectItem>
              <SelectItem value="225">225 Pieces (Hard)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={onRestart}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Restart Puzzle
        </Button>
      </CardContent>
    </Card>
  );
};