import Link from "next/link";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const AuthCard = ({
  children,
  description,
  callBackUrlText,
  callBackUrl,
  isPending,
  showSocial = true,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-4xl font-bold">Auth</CardTitle>
        <CardDescription className="text-center  py-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex flex-col gap-5">
        {showSocial && (
          <div className="flex items-center w-full justify-between gap-3">
            <Button variant="outline" className="w-full" disabled={isPending}>
              <FcGoogle className="h-5 w-5" />
            </Button>
            <Button variant="outline" className="w-full" disabled={isPending}>
              <FaGithub className="h-5 w-5" />
            </Button>
          </div>
        )}
        <div>
          <Link
            href={`${callBackUrl}`}
            className="text-sm text-black"
            disabled={isPending}
          >
            {callBackUrlText}
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};
