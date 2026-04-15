import React from 'react';
import { Wifi } from 'lucide-react';

export const StatusBar = () => {
  return (
    <div className="h-8 border-t border-border bg-background flex items-center px-4 justify-between text-[10px] text-muted-foreground">
      <div className="flex items-center gap-4 overflow-hidden">
        <div className="flex gap-4 animate-marquee whitespace-nowrap">
          <span>BTCUSDT <span className="text-primary">+1.04%</span> 0.824</span>
          <span>ETHUSDT <span className="text-destructive">-1.04%</span> 0.824</span>
          <span>FLOKIUSDT <span className="text-primary">+1.04%</span> 0.824</span>
          <span>BTCUSDT <span className="text-primary">+1.04%</span> 0.824</span>
          <span>BTCUSDT <span className="text-primary">+1.04%</span> 0.824</span>
          <span>ETHUSDT <span className="text-destructive">-1.04%</span> 0.824</span>
          <span>FLOKIUSDT <span className="text-primary">+1.04%</span> 0.824</span>
          <span>BTCUSDT <span className="text-primary">+1.04%</span> 0.824</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span>2024-12-12 9:00:00 (UTC+8)</span>
      </div>
    </div>
  );
};
