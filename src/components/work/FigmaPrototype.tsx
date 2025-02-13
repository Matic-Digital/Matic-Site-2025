import { FigmaPrototype as FigmaPrototypeType } from '@/types';

export function FigmaPrototype({ embedLink }: FigmaPrototypeType) {
  return (
    <div className="py-12">
      <iframe 
        src={embedLink}
        className="w-full h-[600px]"
        allowFullScreen
      />
    </div>
  );
}
