import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { SymbolHeader } from './components/SymbolHeader';
import { TradingChart } from './components/TradingChart';
import { OrderBook } from './components/OrderBook';
import { TradingPanel } from './components/TradingPanel';
import { BottomTabs } from './components/BottomTabs';
import { StatusBar } from './components/StatusBar';

export default function App() {
  const [bottomHeight, setBottomHeight] = useState(300);
  const isResizing = useRef(false);

  const startResizing = useCallback(() => {
    isResizing.current = true;
    document.body.style.cursor = 'row-resize';
    document.body.style.userSelect = 'none';
  }, []);

  const stopResizing = useCallback(() => {
    isResizing.current = false;
    document.body.style.cursor = 'default';
    document.body.style.userSelect = 'auto';
  }, []);

  const resize = useCallback((e: MouseEvent) => {
    if (!isResizing.current) return;
    
    const newHeight = window.innerHeight - e.clientY - 32; // 32 is StatusBar height
    if (newHeight > 100 && newHeight < window.innerHeight - 200) {
      setBottomHeight(newHeight);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [resize, stopResizing]);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background text-foreground selection:bg-primary/30">
      <Navbar />
      <SymbolHeader />
      
      <main className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 flex overflow-hidden">
            <TradingChart />
            <OrderBook />
          </div>
          
          <div 
            style={{ height: `${bottomHeight}px` }} 
            className="relative flex flex-col min-h-[40px]"
          >
            <div 
              onMouseDown={startResizing}
              className="absolute top-0 left-0 right-0 h-1 cursor-row-resize z-50 hover:bg-primary/50 transition-colors"
            />
            <BottomTabs />
          </div>
        </div>
        <TradingPanel />
      </main>

      <StatusBar />
    </div>
  );
}
