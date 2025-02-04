import { WorkTactics as WorkTacticsType } from '@/types';
import Image from 'next/image';

export function WorkTactics({ tactics, tacticsImage }: WorkTacticsType) {
  return (
    <div className="py-12">
      <ul className="mb-8">
        {tactics.map((tactic, index) => (
          <li key={index} className="mb-2">
            {tactic}
          </li>
        ))}
      </ul>
      {tacticsImage && (
        <div className="relative w-full h-[400px]">
          <Image
            src={tacticsImage.url}
            alt="Tactics illustration"
            fill
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
}
