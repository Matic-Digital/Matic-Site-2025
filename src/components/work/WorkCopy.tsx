import { WorkCopy as WorkCopyType } from '@/types';

export function WorkCopy({ eyebrowHeader, header, copy }: WorkCopyType) {
  return (
    <div className="py-12">
      {eyebrowHeader && <p className="text-sm mb-2">{eyebrowHeader}</p>}
      <h2 className="text-2xl font-bold mb-4">{header}</h2>
      {copy && <p className="text-lg">{copy}</p>}
    </div>
  );
}
