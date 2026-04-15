import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Search, ChevronDown, Maximize2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

const assetData = [
  { token: 'BTC', type: 'Crypto', equity: '499,215.2812', balance: '499,215.2812', pnl: '0.0000', liability: '0.0000', repay: '-' },
  { token: 'USD', type: 'Fiat', equity: '499,215.2812', balance: '499,215.2812', pnl: '0.0000', liability: '0.0000', repay: '-' },
  { token: 'ETH', type: 'Crypto', equity: '499,215.2812', balance: '499,215.2812', pnl: '0.0000', liability: '0.0000', repay: '|||||' },
  { token: 'AAPLps', type: 'Crypto', equity: '499,215.2812', balance: '499,215.2812', pnl: '0.0000', liability: '0.0000', repay: '|||||' },
  { token: 'TSLAps', type: 'Crypto', equity: '499,215.2812', balance: '499,215.2812', pnl: '0.0000', liability: '0.0000', repay: '|||||' },
  { token: 'USDT', type: 'Crypto', equity: '499,215.2812', balance: '499,215.2812', pnl: '0.0000', liability: '0.0000', repay: '|||||' },
  { token: 'SOL', type: 'Crypto', equity: '499,215.2812', balance: '499,215.2812', pnl: '0.0000', liability: '0.0000', repay: '-' },
  { token: 'EUR', type: 'Fiat', equity: '499,215.2812', balance: '499,215.2812', pnl: '0.0000', liability: '0.0000', repay: '-' },
];

export const BottomTabs = () => {
  return (
    <div className="flex-1 flex flex-col bg-background border-t border-border overflow-hidden">
      <div className="h-10 border-b border-border flex items-center px-2 justify-between shrink-0">
        <Tabs defaultValue="assets" className="h-full">
          <TabsList className="h-full bg-transparent p-0 gap-4">
            <TabsTrigger value="position" className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 text-xs">Position (14)</TabsTrigger>
            <TabsTrigger value="open" className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 text-xs">Open orders (10)</TabsTrigger>
            <TabsTrigger value="history" className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 text-xs">Order history</TabsTrigger>
            <TabsTrigger value="trade" className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 text-xs">Trade history</TabsTrigger>
            <TabsTrigger value="transaction" className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 text-xs">Transaction history</TabsTrigger>
            <TabsTrigger value="greeks" className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 text-xs">Greeks</TabsTrigger>
            <TabsTrigger value="assets" className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-2 text-xs">Assets</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Maximize2 size={14} className="cursor-pointer hover:text-foreground" />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="relative w-48">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
              <Input placeholder="Search" className="h-8 pl-8 bg-muted border-none text-xs" />
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground cursor-pointer bg-muted px-2 py-1 rounded">
              All types <ChevronDown size={12} />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="border-none hover:bg-transparent">
                <TableHead className="text-[10px] uppercase h-8">Token</TableHead>
                <TableHead className="text-[10px] uppercase h-8">Type</TableHead>
                <TableHead className="text-[10px] uppercase h-8 text-right">Equity</TableHead>
                <TableHead className="text-[10px] uppercase h-8 text-right">Net balance</TableHead>
                <TableHead className="text-[10px] uppercase h-8 text-right">Unrealized pnl</TableHead>
                <TableHead className="text-[10px] uppercase h-8 text-right">Liability</TableHead>
                <TableHead className="text-[10px] uppercase h-8 text-right">Auto repay</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assetData.map((asset, i) => (
                <TableRow key={i} className="border-none hover:bg-muted/50 h-10">
                  <TableCell className="text-xs font-medium py-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-muted rounded-full flex items-center justify-center text-[8px]">{asset.token[0]}</div>
                      {asset.token}
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground py-2">{asset.type}</TableCell>
                  <TableCell className="text-xs text-right py-2">{asset.equity}</TableCell>
                  <TableCell className="text-xs text-right py-2">{asset.balance}</TableCell>
                  <TableCell className="text-xs text-right py-2">{asset.pnl}</TableCell>
                  <TableCell className="text-xs text-right py-2">{asset.liability}</TableCell>
                  <TableCell className="text-xs text-right py-2 text-muted-foreground">{asset.repay}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex items-center justify-end gap-4 text-[10px] text-muted-foreground mt-4">
            <div className="flex items-center gap-1">
              Rows Per Page 
              <span className="text-foreground flex items-center gap-1 cursor-pointer">50 <ChevronDown size={10} /></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="cursor-pointer hover:text-foreground">{'<'}</span>
              <span>1/10</span>
              <span className="cursor-pointer hover:text-foreground">{'>'}</span>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
