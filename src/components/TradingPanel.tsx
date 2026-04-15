import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronDown, Info } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

type OrderType = 'Limit' | 'Market' | 'Trigger' | 'OCO' | 'TP/SL' | 'Trailing stop' | 'Iceberg' | 'TWAP';

export const TradingPanel = () => {
  const [orderType, setOrderType] = useState<OrderType>('Limit');
  const [isConditionalOpen, setIsConditionalOpen] = useState(false);
  const [priceType, setPriceType] = useState<'Limit' | 'Market'>('Limit');

  const conditionalTypes: OrderType[] = ['Trigger', 'OCO', 'TP/SL', 'Trailing stop', 'Iceberg', 'TWAP'];

  return (
    <div className="w-[352px] border-l border-border flex flex-col bg-background overflow-hidden">
      <ScrollArea className="flex-1">
        <div className="p-4 flex flex-col gap-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>TSLAps/USDT</span>
            <div className="flex items-center gap-1">
              <span className="text-primary">Accounts...(0968)</span>
              <span className="bg-muted px-1 rounded text-[10px]">CM Main</span>
              <ChevronDown size={12} />
            </div>
          </div>

          <Tabs defaultValue="buy" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-muted h-9 p-1">
              <TabsTrigger value="buy" className="data-[state=active]:bg-primary data-[state=active]:text-white h-full text-xs">Buy</TabsTrigger>
              <TabsTrigger value="sell" className="data-[state=active]:bg-destructive data-[state=active]:text-white h-full text-xs">Sell</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-4 relative">
            <button 
              onClick={() => { setOrderType('Limit'); setIsConditionalOpen(false); }}
              className={`text-xs pb-1 border-b-2 transition-colors ${orderType === 'Limit' ? 'border-primary text-foreground font-medium' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
            >
              Limit
            </button>
            <button 
              onClick={() => { setOrderType('Market'); setIsConditionalOpen(false); }}
              className={`text-xs pb-1 border-b-2 transition-colors ${orderType === 'Market' ? 'border-primary text-foreground font-medium' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
            >
              Market
            </button>
            <div className="relative">
              <button 
                onClick={() => setIsConditionalOpen(!isConditionalOpen)}
                className={`text-xs pb-1 border-b-2 flex items-center gap-1 transition-colors ${conditionalTypes.includes(orderType) ? 'border-primary text-foreground font-medium' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
              >
                {conditionalTypes.includes(orderType) ? orderType : 'Trigger'} <ChevronDown size={12} />
              </button>
              
              {isConditionalOpen && (
                <div className="absolute top-full left-0 mt-1 w-32 bg-background border border-border rounded shadow-lg z-50 py-1">
                  {conditionalTypes.map((type) => (
                    <div 
                      key={type}
                      className="px-3 py-1.5 text-xs hover:bg-muted cursor-pointer transition-colors"
                      onClick={() => {
                        setOrderType(type);
                        setIsConditionalOpen(false);
                      }}
                    >
                      {type}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Info size={14} className="text-muted-foreground ml-auto cursor-pointer hover:text-foreground" />
          </div>

          <div className="flex flex-col gap-3">
            {/* Dynamic Fields based on Order Type */}
            {orderType === 'Limit' && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>Price</span>
                  <span>USDT</span>
                </div>
                <Input defaultValue="489.00" className="h-9 bg-muted border-none text-right font-medium" />
              </div>
            )}

            {(orderType === 'Trigger' || orderType === 'TP/SL' || orderType === 'Trailing stop') && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>Trigger price</span>
                  <span>USDT</span>
                </div>
                <Input placeholder="0" className="h-9 bg-muted border-none text-right font-medium" />
              </div>
            )}

            {orderType === 'OCO' && (
              <>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>TP limit</span>
                    <span>USDT</span>
                  </div>
                  <Input placeholder="0" className="h-9 bg-muted border-none text-right font-medium" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>SL trigger price</span>
                    <span>USDT</span>
                  </div>
                  <Input placeholder="0" className="h-9 bg-muted border-none text-right font-medium" />
                </div>
              </>
            )}

            {orderType === 'Trailing stop' && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>Callback rate</span>
                  <span>%</span>
                </div>
                <Input placeholder="0" className="h-9 bg-muted border-none text-right font-medium" />
              </div>
            )}

            {(orderType === 'Iceberg' || orderType === 'TWAP') && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>Total quantity</span>
                  <span>TSLAps</span>
                </div>
                <Input placeholder="0" className="h-9 bg-muted border-none text-right font-medium" />
              </div>
            )}

            {orderType === 'Iceberg' && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>Qty. per order</span>
                  <ChevronDown size={10} />
                </div>
                <Input placeholder="0" className="h-9 bg-muted border-none text-right font-medium" />
              </div>
            )}

            {orderType === 'TWAP' && (
              <>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>Total running time</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <Input defaultValue="0" className="h-9 bg-muted border-none text-right pr-6" />
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">h</span>
                    </div>
                    <div className="flex-1 relative">
                      <Input defaultValue="0" className="h-9 bg-muted border-none text-right pr-6" />
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">m</span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {['8h', '4h', '1h', '30m', '5m'].map(t => (
                      <Button key={t} variant="ghost" size="sm" className="h-6 text-[10px] bg-muted/50 flex-1 px-0">{t}</Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>Frequency</span>
                  </div>
                  <div className="flex gap-1">
                    {['5s', '10s', '20s', '30s', '60s'].map(f => (
                      <Button key={f} variant="ghost" size="sm" className={`h-6 text-[10px] flex-1 px-0 ${f === '30s' ? 'bg-primary text-white' : 'bg-muted/50'}`}>{f}</Button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Price Field for most types */}
            {['Limit', 'Trigger', 'OCO', 'TP/SL', 'Trailing stop'].includes(orderType) && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>{orderType === 'Trailing stop' ? 'Preset order price' : orderType === 'OCO' ? 'SL price' : 'Price'}</span>
                  <span>USDT</span>
                </div>
                <div className="flex gap-2">
                  <Input defaultValue="489.00" className="h-9 bg-muted border-none text-right font-medium flex-1" />
                  <div className="relative">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-9 bg-muted border-none text-xs flex items-center gap-1 px-3"
                      onClick={() => setPriceType(priceType === 'Limit' ? 'Market' : 'Limit')}
                    >
                      {priceType} <ChevronDown size={12} />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Quantity / Amount Field */}
            {orderType !== 'Iceberg' && orderType !== 'TWAP' && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>{orderType === 'Market' ? 'Total' : 'Amount'}</span>
                  <span>{orderType === 'Market' ? 'USDT' : 'TSLAps'}</span>
                </div>
                <Input placeholder="0" className="h-9 bg-muted border-none text-right font-medium" />
              </div>
            )}

            <div className="px-2 py-4">
              <Slider defaultValue={[0]} max={100} step={1} className="[&_[role=slider]]:h-3 [&_[role=slider]]:w-3" />
            </div>

            {orderType !== 'Market' && orderType !== 'TWAP' && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>Total</span>
                  <span>USDT</span>
                </div>
                <Input placeholder="0" className="h-9 bg-muted border-none text-right font-medium" />
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="post-only" />
                <label htmlFor="post-only" className="text-[10px] text-muted-foreground">Post-Only</label>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground cursor-pointer">
                TIF GTC <ChevronDown size={10} />
              </div>
            </div>

            <div className="space-y-1 text-[10px] text-muted-foreground pt-2">
              <div className="flex justify-between">
                <span>Available</span>
                <span className="text-foreground">1,856,200.00 USDT <span className="text-primary">+</span></span>
              </div>
              <div className="flex justify-between">
                <span>Max buy</span>
                <span className="text-foreground">20.00088 TSLAps</span>
              </div>
              <div className="flex justify-between">
                <span>Est. Fee</span>
                <span className="text-foreground">-- TSLAps</span>
              </div>
            </div>

            <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-10 mt-2">
              Buy TSLAps
            </Button>
            
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground justify-center">
              <span className="text-primary">%</span> Fee level
            </div>
          </div>
        </div>
      </ScrollArea>

      <div className="mt-auto border-t border-border p-4 space-y-4 shrink-0">
        <div className="flex items-center justify-between text-xs font-medium">
          <span>Unified Margin Account</span>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between text-[10px] text-muted-foreground">
            <div className="flex items-center gap-1">
              Multi-currency margin <ChevronDown size={10} />
            </div>
          </div>

          <div className="space-y-1.5 text-[10px]">
            <div className="flex justify-between">
              <span className="text-muted-foreground">MMR</span>
              <span className="text-primary flex items-center gap-1">
                10.99%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">IMR</span>
              <span className="text-foreground">35.33%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Adjusted equity</span>
              <span className="text-foreground">832.4002 USDT</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Leverage</span>
              <span className="text-foreground">1.00x</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button variant="secondary" size="sm" className="h-8 text-xs bg-muted hover:bg-muted/80">Deposit</Button>
            <Button variant="secondary" size="sm" className="h-8 text-xs bg-muted hover:bg-muted/80">Transfer</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
