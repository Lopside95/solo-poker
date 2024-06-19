import ColorSelect from "@/components/colorSelect";
import ColorSquare from "@/components/chips/colorSquare";
import TextField from "@/components/textField";
import { Button } from "@/components/ui/button";
import { Chips, ColorGroups, ColorProps, chipsSchema } from "@/types/chips";
import { zodResolver } from "@hookform/resolvers/zod";
import { group } from "console";
import { Circle } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ChipPreview from "@/components/chips/chipPreview";

export interface ChipMakerInterface {
  color?: ColorProps[];
  value?: number;
  startingAmount?: number;
}

interface GetAsGroup {
  groupName: string;
  groupId: ColorProps[];
}

const ChipMaker = () => {
  const [colors, setColors] = useState<ColorProps[] | undefined>();

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const res = await fetch("/colors");
        if (!res.ok) {
          console.log("error fetching");
        }
        const data = await res.json();
        setColors(data.colors);
      } catch (error) {
        console.error(error);
      }
    };

    fetchColors();
  }, []);

  const colorsDictionary: Record<string, ColorProps> = colors
    ? colors.reduce((acc: Record<string, ColorProps>, color) => {
        acc[color.name] = {
          name: color.name,
          hex: color.hex,
          group: color.group,
          theme: color.theme,
          rgb: color.rgb,
        };

        return acc;
      }, {})
    : {};

  const getEachGroup = (groupId: string) => {
    const groupName: ColorProps[] = Object.values(colorsDictionary)
      .filter((color) => color.group === groupId)
      .slice(0, 9);

    return groupName;
  };

  console.log("selectColors", selectColors);

  const form = useForm<Chips>({
    resolver: zodResolver(chipsSchema),
    defaultValues: {
      color: {
        name: "",
        group: "Blue",
        hex: "",
      },
    },
  });

  const inputGroup = form.watch("color.group");

  const onSubmit: SubmitHandler<Chips> = (data: Chips) => {
    console.log("form submitted");
    console.log(data);
  };

  const chosenColor = form.watch("color");

  return (
    <div>
      <FormProvider {...form}>
        <form
          className="flex flex-col items-center"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <section className="flex">
            <article className="w-80">
              <ColorSquare colorGroup={getEachGroup(inputGroup)} />
              <FormField
                control={form.control}
                name="color.group"
                render={({ field }) => (
                  <>
                    <FormItem className="">
                      <FormLabel>You're allowed 7 different chips</FormLabel>
                      <FormMessage className="text-red-200" />
                      <FormControl>
                        <Select
                          onValueChange={(value) => field.onChange(value)}
                          value={field.value}
                        >
                          <SelectTrigger className="w-80">
                            <SelectValue placeholder="Choose a Colour" />
                          </SelectTrigger>
                          <SelectContent>
                            {selectColors.map((color) => {
                              return (
                                <SelectItem key={color} value={color}>
                                  {color}{" "}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  </>
                )}
              />
            </article>
            <article>
              <p>{chosenColor.name}</p>
              {/* TODO: individual colours from the colour square */}
              {/* <ChipPreview color={inputColor} /> */}
            </article>
          </section>
        </form>
      </FormProvider>
      <div></div>
    </div>
  );
};

export default ChipMaker;

export const selectColors: ColorGroups[] = [
  "Red",
  "Blue",
  "Brown",
  "Aqua",
  "Cyan",
  "Green",
  "Orange",
  "Pink",
  "Purple",
  "Yellow",
];

// if number = 69 --> message: Nice. But unfortunately that's not a valid amount
