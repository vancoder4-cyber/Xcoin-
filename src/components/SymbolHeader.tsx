import React, { useState } from 'react';
import { ChevronDown, Star, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

const stockTokens = [
  { name: 'Tesla', ticker: 'TSLAps/USDT', price: '489.00', change: '+0.58%' },
  { name: 'Apple', ticker: 'AAPLps/USDT', price: '182.45', change: '-0.12%' },
  { name: 'Nvidia', ticker: 'NVDAps/USDT', price: '726.13', change: '+2.45%' },
  { name: 'Google', ticker: 'GOOGps/USDT', price: '143.96', change: '+0.88%' },
  { name: 'Amazon', ticker: 'AMZNps/USDT', price: '174.42', change: '+1.20%' },
  { name: 'Microsoft', ticker: 'MSFTps/USDT', price: '406.32', change: '-0.45%' },
  { name: 'Meta', ticker: 'METAps/USDT', price: '484.03', change: '+3.12%' },
  { name: 'Netflix', ticker: 'NFLXps/USDT', price: '591.15', change: '+0.67%' },
  { name: 'Alibaba', ticker: 'BABAps/USDT', price: '74.28', change: '-1.54%' },
  { name: 'Nio', ticker: 'NIOps/USDT', price: '6.12', change: '-2.31%' },
];

export const SymbolHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Spot');
  const [activeSubCategory, setActiveSubCategory] = useState('Security Token');

  const mainCategories = ['Favorites', 'Spot', 'Futures', 'Options'];
  const subCategories = ['All', 'Crypto', 'RWA'];

  return (
    <div className="h-14 border-b border-border flex items-center px-4 gap-8 bg-background relative z-[100]">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-sm">
          T
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1 relative">
            <div 
              className="flex items-center gap-1 cursor-pointer hover:bg-muted/50 px-2 py-0.5 rounded transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="font-bold text-lg leading-none">TSLAps/USDT</span>
              <ChevronDown size={16} className={`text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </div>
            <Star size={16} className="text-muted-foreground ml-1 cursor-pointer hover:text-yellow-500" />
          </div>
          <div className="px-2">
            <span className="text-[10px] text-black bg-primary px-1.5 py-0.5 rounded font-bold">24/7 Trading</span>
          </div>
        </div>

        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-[480px] bg-background border border-border rounded-md shadow-2xl flex flex-col overflow-hidden">
            <div className="p-3 border-b border-border flex items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
                <Input placeholder="Search" className="h-8 pl-8 bg-muted border-none text-xs" />
              </div>
            </div>
            
            <div className="flex flex-col h-[420px]">
              <div className="flex border-b border-border bg-muted/30 px-2">
                {mainCategories.map((cat) => (
                  <div 
                    key={cat}
                    className={`px-4 py-2 text-xs cursor-pointer transition-colors border-b-2 ${activeCategory === cat ? 'border-primary text-primary font-medium' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </div>
                ))}
              </div>

              {(activeCategory === 'Spot' || activeCategory === 'Futures') && (
                <div className="flex gap-4 px-4 py-2 bg-muted/10 border-b border-border">
                  {subCategories.map((sub) => (
                    <div 
                      key={sub}
                      className={`text-[11px] cursor-pointer transition-colors ${activeSubCategory === sub ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'}`}
                      onClick={() => setActiveSubCategory(sub)}
                    >
                      {sub}
                    </div>
                  ))}
                </div>
              )}
              
              <div className="flex-1 flex flex-col">
                <div className="grid grid-cols-3 px-4 py-2 text-[10px] text-muted-foreground border-b border-border">
                  <span>Ticker</span>
                  <span className="text-right">Price</span>
                  <span className="text-right">Change</span>
                </div>
                <ScrollArea className="flex-1">
                  <div className="flex flex-col">
                    {stockTokens.map((token) => (
                      <div key={token.ticker} className="grid grid-cols-3 px-4 py-2 text-xs hover:bg-muted/50 cursor-pointer group">
                        <div className="flex flex-col">
                          <span className="font-medium group-hover:text-primary">{token.ticker}</span>
                          <span className="text-[10px] text-muted-foreground">{token.name}</span>
                        </div>
                        <span className="text-right flex items-center justify-end">{token.price}</span>
                        <span className={`text-right flex items-center justify-end ${token.change.startsWith('+') ? 'text-primary' : 'text-destructive'}`}>
                          {token.change}
                        </span>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-8">
        <div className="flex flex-col">
          <span className="text-primary font-bold text-lg">489.00</span>
          <span className="text-[10px] text-primary">+8.3 +0.58%</span>
        </div>

        <div className="flex gap-6">
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground">24h High</span>
            <span className="text-xs font-medium">491.37</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground">24h Low</span>
            <span className="text-xs font-medium">472.14</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground">24h Volume (TSLAps)</span>
            <span className="text-xs font-medium">27,870,238.88</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground">24h Volume (USDT)</span>
            <span className="text-xs font-medium">1,788,470,385.10</span>
          </div>
        </div>
      </div>
    </div>
  );
};
