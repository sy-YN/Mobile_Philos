
'use client';

import { useRef, useState, useEffect } from 'react';
import { Play, Pause, PictureInPicture, Heart, Bot } from 'lucide-react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

type VideoPlayerProps = {
  onPlayStateChange?: (isPlaying: boolean) => void;
};


export function VideoPlayer({ onPlayStateChange }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    onPlayStateChange?.(isPlaying);
  }, [isPlaying, onPlayStateChange]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handlePictureInPicture = async () => {
    if (videoRef.current) {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await videoRef.current.requestPictureInPicture();
      }
    }
  };

  const handlePlaybackRateChange = (rate: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden bg-black group shadow-lg">
      <video
        ref={videoRef}
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        className="object-cover w-full h-full"
        loop
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <div 
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={handlePlayPause}
      ></div>
      
      {!isPlaying && (
        <div 
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={handlePlayPause}
        >
          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30 transition-all duration-300 group-hover:scale-110 group-hover:bg-white/30">
            <Play className="h-7 w-7 text-white drop-shadow-lg ml-1" fill="currentColor" />
          </div>
        </div>
      )}

      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="font-bold text-base drop-shadow-md font-headline">第4四半期 全社ミーティング</h3>
        <p className="text-sm opacity-90 drop-shadow-md">CEOからのメッセージ</p>
      </div>

      <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 hover:text-white font-mono text-xs h-7 px-2">
              {playbackRate}x
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {[0.5, 1, 1.5, 2].map(rate => (
              <DropdownMenuItem key={rate} onSelect={() => handlePlaybackRateChange(rate)}>
                {rate}x
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20 hover:text-white h-8 w-8"
          onClick={handlePictureInPicture}
          aria-label="ピクチャーインピクチャー"
        >
          <PictureInPicture className="h-4 w-4" />
        </Button>
        
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 hover:text-white h-8 w-8" onClick={handleLike}>
          <Heart className={`h-5 w-5 ${isLiked ? 'text-red-500 fill-current' : ''}`} />
        </Button>
      </div>
    </div>
  );
}
