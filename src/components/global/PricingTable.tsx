'use client';
import Image from 'next/image';

interface PricingTableProps {
  title: string;
  items: {
    name: string;
    values: (number | boolean)[];
  }[];
  isFirst?: boolean;
  isLast?: boolean;
}

export function PricingTable({ title, items, isFirst, isLast }: PricingTableProps) {
  return (
    <div className="overflow-hidden">
      <table className={`${isFirst ? 'rounded-t-none' : ''} ${isLast ? 'rounded-b-lg' : ''}`}>
        <thead className="bg-background/20">
          <tr>
            <th className="h-[64px] bg-background dark:bg-text px-6 uppercase text-[12px] text-purple leading-[14.52px] tracking-[0.16em] font-semibold">
              {title}
            </th>
            <th className="h-[64px] bg-background dark:bg-text px-6"></th>
            <th className="h-[64px] bg-background dark:bg-text px-6"></th>
            <th className="h-[64px] bg-background dark:bg-text px-6"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td className="h-[64px] whitespace-nowrap bg-background dark:bg-text text-[14px] font-medium leading-[20px] px-6">
                {item.name}
              </td>
              {item.values.map((value, valueIndex) => (
                <td 
                  key={valueIndex} 
                  className="h-[64px] text-center bg-background dark:bg-text px-6"
                >
                  {typeof value === 'number' ? (
                    <span className="text-[16px] font-normal leading-[20px]">{value.toLocaleString()}</span>
                  ) : value ? (
                    <div className="flex items-center justify-center">
                      <Image 
                        src="/check.svg" 
                        alt="Included" 
                        width={24}
                        height={24}
                        className="rounded-none border-none"
                      />
                    </div>
                  ) : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
