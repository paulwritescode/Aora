import {
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Card } from "../ui/card";

interface details {
  title: string;
  description: string;
  content: string;
  footer: number;
}

function ProductCard({ title, description, content, footer }: details) {
  return (
    <>
      <Card className="">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            <img
              className="object-cover w-full h-[10rem] overflow-hidden rounded-md"
              src={description}
              alt={title}
            />
          </CardDescription>
        </CardHeader>
        {/* <CardContent>
          <p> {content} </p>
          fibdnfbbnn
        </CardContent> */}
        <CardFooter>
          <p> {footer} </p>
        </CardFooter>
      </Card>
    </>
  );
}

export default ProductCard;
