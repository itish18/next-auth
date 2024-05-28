import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";

export const ErrorCard = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <Card className="max-w-lg shadow-md ">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold">
            Oops! Something went wrong!
          </CardTitle>
        </CardHeader>

        <CardFooter className="flex flex-col gap-5">
          <Link href="/login" className="text-sm text-black hover:underline">
            Back to login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};
