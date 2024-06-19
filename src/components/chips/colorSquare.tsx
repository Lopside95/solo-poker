import { Chips, ColorProps } from "@/types/chips";
import { useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { FormField } from "../ui/form";
import { Form, useFormContext } from "react-hook-form";

const ColorSquare = ({ colorGroup }: { colorGroup: ColorProps[] }) => {
  const { control, setValue } = useFormContext<Chips>();

  // console.log("group", group);

  // group.forEach((gro) => {
  //   console.log(`#${gro.hex}`);
  // });

  const [isHover, setIsHover] = useState<boolean>();

  // const first = group[1];

  //   const HandleName = (color) => {
  //     return isHover ? <p>{color.name}</p> : "";
  //   };

  // const HoverContent = (color: ColorProps) => {
  //   const name = color.name;
  //   const theme = color.theme.charAt(0).toUpperCase() + color.theme.slice(1);
  //   return (
  //     <div>
  //       <p>{color.name}</p>
  //       <p>{theme}</p>
  //     </div>
  //   );
  // };

  return (
    <FormField
      control={control}
      name="color"
      render={({ field }) => (
        <div className="w-80 h-80 grid  items-center justify-items-center grid-cols-3 grid-rows-3">
          {colorGroup.map((color) => {
            return (
              <span
                onClick={() =>
                  setValue("color", {
                    name: color.name,
                    hex: color.hex,
                    group: color.group,
                  })
                }
                className="w-20 h-20 border rounded-sm"
                key={color.name}
                style={{ background: `#${color.hex}` }}
              ></span>
            );
          })}
        </div>
      )}
    />
  );
};

export default ColorSquare;
