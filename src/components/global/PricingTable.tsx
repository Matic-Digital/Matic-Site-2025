interface PricingTableProps {
  title: string;
  items: {
    name: string;
    values: (number | boolean)[];
  }[];
}

export function PricingTable({ title, items }: PricingTableProps) {
  return (
    <div className="overflow-hidden">
      <table className="w-full border-collapse border-0">
        <thead className="bg-[#F8F9FC]">
          <tr className="grid grid-cols-4">
            <th className="uppercase text-xs text-[#6D32ED] leading-normal font-medium tracking-wider py-4 px-6">
              {title}
            </th>
            <th className="py-4 px-6"></th>
            <th className="py-4 px-6"></th>
            <th className="py-4 px-6"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className={`grid grid-cols-4 ${index !== items.length - 1 ? 'border-b border-[#DFE0E9] border-[0.25px]' : ''}`}>
              <td className={`whitespace-nowrap text-xs flex items-center justify-start font-medium py-4 px-6 ${index !== items.length - 1 ? 'border-r border-[#DFE0E9] border-[0.25px]' : ''}`}>
                {item.name}
              </td>
              {item.values.map((value, valueIndex) => (
                <td 
                  key={valueIndex} 
                  className={`flex items-center justify-center py-4 px-6 ${valueIndex < item.values.length - 1 && index !== items.length - 1 ? 'border-r border-[#DFE0E9] border-[0.25px]' : ''}`}
                >
                  {typeof value === 'number' ? (
                    <span className="text-xs">{value.toLocaleString()}</span>
                  ) : value ? (
                    <img src="/check.svg" alt="Included" className="h-4 w-4" />
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
