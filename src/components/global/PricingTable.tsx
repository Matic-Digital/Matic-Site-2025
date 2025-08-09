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
        <thead className="!bg-[#DFE0E9]">
          <tr>
            <th className="h-[64px] bg-[#DFE0E9] px-6 text-[12px] font-semibold uppercase leading-[14.52px] tracking-[0.16em] text-purple">
              {title}
            </th>
            <th className="h-[64px] bg-[#DFE0E9] px-6"></th>
            <th className="h-[64px] bg-[#DFE0E9] px-6"></th>
            <th className="h-[64px] bg-[#DFE0E9] px-6"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td className="h-[64px] whitespace-nowrap bg-background px-6 text-[14px] font-medium leading-[20px] dark:bg-text">
                {item.name}
              </td>
              {item.values.map((value, valueIndex) => (
                <td
                  key={valueIndex}
                  className="h-[64px] bg-background px-6 text-center dark:bg-text"
                >
                  {typeof value === 'number' ? (
                    <span className="text-[16px] font-normal leading-[20px]">
                      {value.toLocaleString()}
                    </span>
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
