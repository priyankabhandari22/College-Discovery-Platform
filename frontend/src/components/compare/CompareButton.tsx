'use client';

import { GitCompare, Check } from 'lucide-react';
import { useCompareStore } from '@/stores/useCompareStore';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function CompareButton({ id, className }: { id: string, className?: string }) {
  const active = useCompareStore((s) => s.isSelected(id));

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    useCompareStore.getState().toggle(id);
  };

  return (
    <Button 
      variant={active ? 'default' : 'outline'} 
      onClick={toggle}
      className={cn("transition-all duration-300", className)}
    >
      {active ? (
        <>
          <Check className="w-3.5 h-3.5 mr-1.5" />
          Added
        </>
      ) : (
        <>
          <GitCompare className="w-3.5 h-3.5 mr-1.5" />
          Compare
        </>
      )}
    </Button>
  );
}
