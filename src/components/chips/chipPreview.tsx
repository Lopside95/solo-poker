import { ChipMakerInterface } from "@/pages/chipMaker";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

const ChipPreview = ({ color, value, startingAmount }: ChipMakerInterface) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>This is what your chips will look like</CardTitle>
        <CardDescription>Chips description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};

export default ChipPreview;
