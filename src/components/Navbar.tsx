import React, { useState } from 'react';
import { 
  Search, 
  Moon, 
  Globe, 
  Download, 
  Settings, 
  Bell, 
  User, 
  ChevronDown,
  LayoutGrid,
  TrendingUp,
  Zap,
  PieChart,
  Repeat,
  Wallet,
  Coins
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Navbar = () => {
  const [isCryptoOpen, setIsCryptoOpen] = useState(false);

  return (
    <nav className="h-12 border-b border-border flex items-center justify-between px-4 bg-background relative z-[200]">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl tracking-tight text-white">XCOIN</span>
            <div className="bg-[#B0E0E6] text-black text-[9px] font-bold px-1.5 py-0.5 rounded ml-0.5 uppercase">Test</div>
          </div>
        </div>
        
        <div className="flex items-center gap-6 text-sm font-medium">
          <div className="relative">
            <div 
              className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors py-4"
              onMouseEnter={() => setIsCryptoOpen(true)}
              onMouseLeave={() => setIsCryptoOpen(false)}
            >
              Crypto <ChevronDown size={14} className={`transition-transform ${isCryptoOpen ? 'rotate-180' : ''}`} />
            </div>

            {isCryptoOpen && (
              <div 
                className="absolute top-full left-0 w-[320px] bg-[#161a1e] border border-border rounded-md shadow-2xl p-6 flex flex-col gap-6"
                onMouseEnter={() => setIsCryptoOpen(true)}
                onMouseLeave={() => setIsCryptoOpen(false)}
              >
                <div className="space-y-4">
                  <div className="flex items-start gap-3 group cursor-pointer">
                    <div className="p-2 bg-muted rounded group-hover:bg-primary/20 transition-colors">
                      <LayoutGrid size={18} className="text-muted-foreground group-hover:text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-bold group-hover:text-primary">Markets</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    <TrendingUp size={14} /> Trade
                  </div>
                  <div className="space-y-6 ml-2">
                    {/* Spot Section */}
                    <div className="space-y-3">
                      <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Spot</div>
                      <div className="space-y-3 ml-2">
                        <div className="group cursor-pointer flex flex-col">
                          <div className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-muted-foreground group-hover:bg-primary" />
                            <div className="text-sm font-bold group-hover:text-primary">Crypto</div>
                          </div>
                          <div className="text-[10px] text-muted-foreground ml-3">Trade digital currencies with ease</div>
                        </div>
                        <div className="group cursor-pointer flex flex-col">
                          <div className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-muted-foreground group-hover:bg-primary" />
                            <div className="text-sm font-bold group-hover:text-primary">RWA</div>
                          </div>
                          <div className="text-[10px] text-muted-foreground ml-3">Trade compliant real-world assets</div>
                        </div>
                      </div>
                    </div>

                    {/* Futures Section */}
                    <div className="space-y-3">
                      <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Futures</div>
                      <div className="space-y-3 ml-2">
                        <div className="group cursor-pointer flex flex-col">
                          <div className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-muted-foreground group-hover:bg-primary" />
                            <div className="text-sm font-bold group-hover:text-primary">Crypto</div>
                          </div>
                          <div className="text-[10px] text-muted-foreground ml-3">Perpetual and delivery futures</div>
                        </div>
                        <div className="group cursor-pointer flex flex-col">
                          <div className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-muted-foreground group-hover:bg-primary" />
                            <div className="text-sm font-bold group-hover:text-primary">RWA</div>
                          </div>
                          <div className="text-[10px] text-muted-foreground ml-3">Futures for real-world assets</div>
                        </div>
                      </div>
                    </div>

                    <div className="group cursor-pointer flex flex-col">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-muted-foreground group-hover:bg-primary" />
                        <div className="text-sm font-bold group-hover:text-primary">Options</div>
                      </div>
                      <div className="text-[10px] text-muted-foreground ml-3">Capitalize on market volatility</div>
                    </div>
                    <div className="group cursor-pointer flex flex-col">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-muted-foreground group-hover:bg-primary" />
                        <div className="text-sm font-bold group-hover:text-primary">OTC</div>
                      </div>
                      <div className="text-[10px] text-muted-foreground ml-3">Custom multi-leg strategies and OTC</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="cursor-pointer hover:text-primary transition-colors">Security</div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Moon size={18} className="cursor-pointer hover:text-foreground transition-colors" />
          <Globe size={18} className="cursor-pointer hover:text-foreground transition-colors" />
          <Download size={18} className="cursor-pointer hover:text-foreground transition-colors" />
          <Settings size={18} className="cursor-pointer hover:text-foreground transition-colors" />
          <Bell size={18} className="cursor-pointer hover:text-foreground transition-colors" />
          <User size={18} className="cursor-pointer hover:text-foreground transition-colors" />
        </div>
        <Button size="sm" className="bg-primary hover:bg-primary/90 text-white font-semibold h-8 px-4">
          Deposit
        </Button>
      </div>
    </nav>
  );
};
