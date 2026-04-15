import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronDown, ArrowUp } from 'lucide-react';

const sellOrders = Array.from({ length: 10 }).map((_, i) => ({
  price: (488.91).toFixed(2),
  amount: (0.015).toFixed(3),
  total: (16.093).toFixed(3),
}));

const buyOrders = Array.from({ length: 10 }).map((_, i) => ({
  price: (489.96).toFixed(2),
  amount: (0.015).toFixed(3),
  total: (16.093).toFixed(3),
}));

const lastTrades = Array.from({ length: 20 }).map((_, i) => ({
  price: (488.91).toFixed(2),
  amount: (0.001).toFixed(3),
  time: '17:39:07',
  side: Math.random() > 0.1 ? 'buy' : 'sell',
}));

export const OrderBook = () => {
  const [activeTab, setActiveTab] = React.useState<'orderbook' | 'trades'>('orderbook');

  return (
    <div className="w-[352px] border-l border-border flex flex-col bg-background">
      <div className="h-10 px-4 flex items-center justify-between border-b border-border shrink-0">
        <div className="flex items-center gap-4 h-full">
          <button 
            onClick={() => setActiveTab('orderbook')}
            className={`text-xs font-medium h-full border-b-2 transition-colors ${activeTab === 'orderbook' ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
          >
            Order Book
          </button>
          <button 
            onClick={() => setActiveTab('trades')}
            className={`text-xs font-medium h-full border-b-2 transition-colors ${activeTab === 'trades' ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
          >
            Last Trades
          </button>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-muted-foreground cursor-pointer">
          0.1 <ChevronDown size={12} />
        </div>
      </div>

      {activeTab === 'orderbook' ? (
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="grid grid-cols-3 px-4 py-2 text-[10px] text-muted-foreground">
            <span>Price (USDT)</span>
            <span className="text-right">Amount (TSLAps)</span>
            <span className="text-right">Total (TSLAps)</span>
          </div>

          <ScrollArea className="flex-1">
            <div className="flex flex-col">
              {sellOrders.map((order, i) => (
                <div key={i} className="grid grid-cols-3 px-4 py-0.5 text-[11px] relative group cursor-pointer hover:bg-muted/50">
                  <div 
                    className="absolute inset-y-0 right-0 bg-destructive/10" 
                    style={{ width: `${(10 - i) * 10}%` }} 
                  />
                  <span className="text-destructive z-10">{order.price}</span>
                  <span className="text-right z-10">{order.amount}</span>
                  <span className="text-right z-10">{order.total}</span>
                </div>
              ))}
            </div>

            <div className="px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-primary font-bold text-lg flex items-center gap-1">
                  489.00 <ArrowUp size={14} />
                </span>
                <span className="text-[10px] text-muted-foreground border-b border-dotted border-muted-foreground">488.91</span>
              </div>
              <span className="text-[10px] text-muted-foreground">中间价格</span>
            </div>

            <div className="flex flex-col">
              {buyOrders.map((order, i) => (
                <div key={i} className="grid grid-cols-3 px-4 py-0.5 text-[11px] relative group cursor-pointer hover:bg-muted/50">
                  <div 
                    className="absolute inset-y-0 right-0 bg-primary/10" 
                    style={{ width: `${(i + 1) * 10}%` }} 
                  />
                  <span className="text-primary z-10">{order.price}</span>
                  <span className="text-right z-10">{order.amount}</span>
                  <span className="text-right z-10">{order.total}</span>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="px-4 py-2 border-t border-border flex items-center justify-between text-[10px] shrink-0">
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground">B</span>
              <span className="text-foreground">56.14%</span>
            </div>
            <div className="flex-1 mx-2 h-1 bg-destructive rounded-full overflow-hidden flex">
              <div className="h-full bg-primary" style={{ width: '56.14%' }} />
            </div>
            <div className="flex items-center gap-1">
              <span className="text-foreground">44.86%</span>
              <span className="text-muted-foreground">S</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="grid grid-cols-3 px-4 py-2 text-[10px] text-muted-foreground">
            <span>Price (USDT)</span>
            <div className="flex items-center justify-end gap-1">
              <span>Amount (TSLAps)</span>
              <ChevronDown size={10} />
            </div>
            <span className="text-right">Time</span>
          </div>
          <ScrollArea className="flex-1">
            {lastTrades.map((trade, i) => (
              <div key={i} className="grid grid-cols-3 px-4 py-0.5 text-[11px] hover:bg-muted/50 cursor-pointer">
                <span className={trade.side === 'buy' ? 'text-primary' : 'text-destructive'}>{trade.price}</span>
                <span className="text-right">{trade.amount}</span>
                <span className="text-right text-muted-foreground">{trade.time}</span>
              </div>
            ))}
          </ScrollArea>
        </div>
      )}
    </div>
  );
};
