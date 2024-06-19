import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

export interface TextProps {
  fieldName: string;
  fieldLabel: string;
}

const SelectField = ({ fieldLabel, fieldName }: TextProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <>
          <FormItem className="">
            <FormLabel>{fieldLabel}</FormLabel>
            <FormMessage className="text-red-200" />
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        </>
      )}
    />
  );
};

export default SelectField;
