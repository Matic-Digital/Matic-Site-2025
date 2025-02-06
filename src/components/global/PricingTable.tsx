interface PricingTableProps {
  title: string;
  items: {
    name: string;
    values: (number | boolean)[];
  }[];
}

export function PricingTable({ title, items }: PricingTableProps) {
  return (
    <div>
      <table className="w-full border-none [border:none] [&_*]:border-0">
        <thead className="bg-[#F8F9FC]">
          <tr className="grid grid-cols-4 border-none">
            <th className="uppercase text-xs text-[#6D32ED] leading-normal font-medium tracking-wider py-4 px-6 border-none">
              {title}
            </th>
            <th className="py-4 px-6 border-none"></th>
            <th className="py-4 px-6 border-none"></th>
            <th className="py-4 px-6 border-none"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="grid grid-cols-4 border-none">
              <td className="whitespace-nowrap text-xs flex items-center justify-start font-medium py-4 px-6 border-none">
                {item.name}
              </td>
              {item.values.map((value, valueIndex) => (
                <td key={valueIndex} className="flex items-center justify-center py-4 px-6 border-none">
                  {typeof value === 'number' ? (
                    <span className="text-xs">{value.toLocaleString()}</span>
                  ) : value ? (
                    <img src="/check.svg" alt="Included" className="h-4 w-4 border-none rounded-none" />
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
