import { SelectProps } from "~/types";

const Select = ({ options, onChange, value, name }: SelectProps) => {
  return (
    <select
      value={value}
      name={name}
      onChange={onChange}>
      {options.map(option => (
        <option
          key={option.value}
          value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default Select;
