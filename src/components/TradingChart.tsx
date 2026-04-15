import React from 'react';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  Cell 
} from 'recharts';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

const data = Array.from({ length: 50 }).map((_, i) => {
  const base = 480 + Math.sin(i / 5) * 10;
  const open = base + (Math.random() - 0.5) * 4;
  const close = base + (Math.random() - 0.5) * 4;
  const high = Math.max(open, close) + Math.random() * 2;
  const low = Math.min(open, close) - Math.random() * 2;
  return {
    time: `${10 + Math.floor(i / 6)}:${(i % 6) * 10}`,
    open,
    close,
    high,
    low,
    volume: Math.floor(Math.random() * 1000),
    // For range bars in Recharts
    ohlc: [open, close],
    wick: [low, high],
  };
});

const WickShape = (props: any) => {
  const { x, y, width, height, fill } = props;
  return (
    <line 
      x1={x + width / 2} 
      y1={y} 
      x2={x + width / 2} 
      y2={y + height} 
      stroke={fill} 
      strokeWidth={1} 
    />
  );
};

export const TradingChart = () => {
  return (
    <div className="flex-1 flex flex-col bg-background min-h-[400px] overflow-hidden">
      <Tabs defaultValue="chart" className="flex-1 flex flex-col overflow-hidden">
        <div className="h-10 border-b border-border flex items-center px-2 justify-between shrink-0">
          <TabsList className="h-full bg-transparent p-0 gap-4">
            <TabsTrigger value="chart" className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 text-xs">Chart</TabsTrigger>
            <TabsTrigger value="depth" className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 text-xs">Depth</TabsTrigger>
            <TabsTrigger value="info" className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 text-xs">Info</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
            <span className="cursor-pointer hover:text-foreground">Time</span>
            <span className="cursor-pointer hover:text-foreground">1s</span>
            <span className="cursor-pointer hover:text-foreground">15m</span>
            <span className="cursor-pointer hover:text-foreground font-bold text-foreground">1H</span>
            <span className="cursor-pointer hover:text-foreground">4H</span>
            <span className="cursor-pointer hover:text-foreground">1D</span>
            <span className="cursor-pointer hover:text-foreground">1W</span>
            <div className="w-px h-3 bg-border mx-1" />
            <span className="cursor-pointer hover:text-foreground">Indicators</span>
          </div>
        </div>

        <TabsContent value="chart" className="flex-1 flex flex-col p-4 gap-2 overflow-hidden m-0">
          {/* Price Pane */}
          <div className="flex-[3] min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart 
                data={data} 
                margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                barGap="-100%"
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1e2329" vertical={false} />
                <XAxis 
                  dataKey="time" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  stroke="#848e9c"
                  interval={6}
                  hide={true}
                />
                <YAxis 
                  orientation="right" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  stroke="#848e9c"
                  domain={['auto', 'auto']}
                  allowDataOverflow={false}
                />
                <Tooltip 
                  cursor={false}
                  contentStyle={{ backgroundColor: '#161a1e', border: '1px solid #2b3139', fontSize: '10px' }}
                  itemStyle={{ color: '#ffffff' }}
                  labelStyle={{ color: '#848e9c', marginBottom: '4px' }}
                  formatter={(value: any, name: string) => {
                    if (Array.isArray(value)) return [`O: ${value[0].toFixed(2)} C: ${value[1].toFixed(2)}`, 'Price'];
                    return [value, name];
                  }}
                />
                {/* Wick */}
                <Bar dataKey="wick" barSize={8} shape={<WickShape />} isAnimationActive={false}>
                  {data.map((entry, index) => (
                    <Cell key={`wick-${index}`} fill={entry.close >= entry.open ? '#00c076' : '#f6465d'} />
                  ))}
                </Bar>
                {/* Body */}
                <Bar dataKey="ohlc" barSize={8} isAnimationActive={false}>
                  {data.map((entry, index) => (
                    <Cell key={`body-${index}`} fill={entry.close >= entry.open ? '#00c076' : '#f6465d'} />
                  ))}
                </Bar>
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Volume Pane */}
          <div className="flex-1 min-h-0 border-t border-border pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e2329" vertical={false} />
                <XAxis 
                  dataKey="time" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  stroke="#848e9c"
                  interval={6}
                />
                <YAxis 
                  orientation="right" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  stroke="#848e9c"
                  hide={true}
                />
                <Tooltip 
                  cursor={false}
                  contentStyle={{ backgroundColor: '#161a1e', border: '1px solid #2b3139', fontSize: '10px' }}
                  itemStyle={{ color: '#ffffff' }}
                />
                <Bar dataKey="volume" radius={[1, 1, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-vol-${index}`} 
                      fill={entry.close >= entry.open ? '#00c076' : '#f6465d'} 
                      opacity={0.5}
                    />
                  ))}
                </Bar>
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="depth" className="flex-1 p-4 m-0">
          <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
            Depth Chart Placeholder
          </div>
        </TabsContent>

        <TabsContent value="info" className="flex-1 overflow-hidden m-0">
          <ScrollArea className="h-full">
            <div className="p-6 space-y-8 max-w-4xl mx-auto">
              {/* Token Info */}
              <section className="space-y-4">
                <h3 className="text-lg font-bold">Token Info</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  TSLAps 股票代币由 PS Strategic Solutions Limited 发行，底层 1:1 锚定特斯拉（TSLA）普通股，每 1 枚 TSLAps 对应 1 股特斯拉股票，代币可通过合规渠道进行铸造与赎回。
                </p>
                <div className="flex gap-4">
                  <Button variant="outline" size="sm" className="h-8 text-xs gap-2">
                    <ExternalLink size={14} /> Website
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 text-xs gap-2">
                    <ExternalLink size={14} /> Whitepaper
                  </Button>
                </div>
              </section>

              {/* Core Data */}
              <section className="space-y-4">
                <h3 className="text-lg font-bold">Core Data</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="space-y-1">
                    <div className="text-[10px] text-muted-foreground uppercase">Market Cap</div>
                    <div className="text-sm font-medium">$15.24B</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] text-muted-foreground uppercase">FDV</div>
                    <div className="text-sm font-medium">$20.12B</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] text-muted-foreground uppercase">24h Volume</div>
                    <div className="text-sm font-medium">$1.78B</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] text-muted-foreground uppercase">Vol / MCap</div>
                    <div className="text-sm font-medium">0.1168</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] text-muted-foreground uppercase">Circulating Supply</div>
                    <div className="text-sm font-medium">31,165,643 TSLAps</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] text-muted-foreground uppercase">Total Supply</div>
                    <div className="text-sm font-medium">41,165,643 TSLAps</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] text-muted-foreground uppercase">Issue Date</div>
                    <div className="text-sm font-medium">2023-10-12</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] text-muted-foreground uppercase">Underlying Asset</div>
                    <div className="text-sm font-medium">Tesla (TSLA)</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] text-muted-foreground uppercase">Multiplier</div>
                    <div className="text-sm font-medium">1 TSLAps = 1 TSLA</div>
                  </div>
                  <div className="col-span-2 space-y-1">
                    <div className="text-[10px] text-muted-foreground uppercase">Contract Address</div>
                    <div className="text-sm font-mono break-all text-primary">0x742d35Cc6634C0532925a3b844Bc454e4438f44e</div>
                  </div>
                </div>
              </section>

              {/* Stock Info */}
              <section className="space-y-4">
                <h3 className="text-lg font-bold">Stock Info</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Price Data */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Price Data</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm border-b border-border/50 pb-1">
                        <span className="text-muted-foreground">Open</span>
                        <span>485.12</span>
                      </div>
                      <div className="flex justify-between text-sm border-b border-border/50 pb-1">
                        <span className="text-muted-foreground">High</span>
                        <span>492.45</span>
                      </div>
                      <div className="flex justify-between text-sm border-b border-border/50 pb-1">
                        <span className="text-muted-foreground">Low</span>
                        <span>481.20</span>
                      </div>
                      <div className="flex justify-between text-sm border-b border-border/50 pb-1">
                        <span className="text-muted-foreground">Previous Close</span>
                        <span>484.03</span>
                      </div>
                      <div className="flex justify-between text-sm border-b border-border/50 pb-1">
                        <span className="text-muted-foreground">52 Week High</span>
                        <span>512.30</span>
                      </div>
                      <div className="flex justify-between text-sm border-b border-border/50 pb-1">
                        <span className="text-muted-foreground">52 Week Low</span>
                        <span>385.12</span>
                      </div>
                    </div>
                  </div>

                  {/* Financial Data */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Financial Data</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm border-b border-border/50 pb-1">
                        <span className="text-muted-foreground">Volume</span>
                        <span>12.4M</span>
                      </div>
                      <div className="flex justify-between text-sm border-b border-border/50 pb-1">
                        <span className="text-muted-foreground">Avg Volume (3M)</span>
                        <span>15.1M</span>
                      </div>
                      <div className="flex justify-between text-sm border-b border-border/50 pb-1">
                        <span className="text-muted-foreground">Market Cap</span>
                        <span>$1.54T</span>
                      </div>
                      <div className="flex justify-between text-sm border-b border-border/50 pb-1">
                        <span className="text-muted-foreground">P/E Ratio (TTM)</span>
                        <span>45.12</span>
                      </div>
                      <div className="flex justify-between text-sm border-b border-border/50 pb-1">
                        <span className="text-muted-foreground">EPS (TTM)</span>
                        <span>10.84</span>
                      </div>
                      <div className="flex justify-between text-sm border-b border-border/50 pb-1">
                        <span className="text-muted-foreground">ROE</span>
                        <span>24.15%</span>
                      </div>
                      <div className="flex justify-between text-sm border-b border-border/50 pb-1">
                        <span className="text-muted-foreground">Dividend Yield</span>
                        <span>0.00%</span>
                      </div>
                      <div className="flex justify-between text-sm border-b border-border/50 pb-1">
                        <span className="text-muted-foreground">Dividend Frequency</span>
                        <span>N/A</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Company Profile */}
              <section className="space-y-4">
                <h3 className="text-lg font-bold">Company Profile</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="text-[10px] text-muted-foreground uppercase">Industry</div>
                      <div className="text-sm">Automotive & Energy</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-[10px] text-muted-foreground uppercase">Headquarters</div>
                      <div className="text-sm">Austin, Texas, USA</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Tesla, Inc. designs, develops, manufactures, sells, and leases fully electric vehicles and energy generation and storage systems, and offers services related to its products. The company's automotive segment includes the design, development, manufacturing, sales, and leasing of electric vehicles as well as sales of automotive regulatory credits.
                  </p>
                </div>
              </section>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};
