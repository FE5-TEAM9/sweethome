interface SelectProps {
  name: string;
  options: { name: string, value: string }[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: any;
}

const Select = ({
  options,
  onChange,
  value,
  name
}: SelectProps) => {
  return (
    <select 
      value={value}
      name={name}
      onChange={onChange}
    >
      {options.map(option => (
      <option key={option.value} value={option.value}>
        {option.name}
      </option>
      ))}
    </select>
  )
}

export default Select;