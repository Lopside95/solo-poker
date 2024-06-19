import Image from "next/image";
import { Inter } from "next/font/google";
import { Input } from "@/components/ui/input";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Login, User, loginSchema, userSchema } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/utils/trpc";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { getServerAuthSession } from "@/server/auth";
import { error } from "console";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const form = useForm<Login>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "james@email.com",
      password: "pass1",
    },
  });

  const { data: session } = useSession();

  const utils = trpc.useUtils();

  if (session) {
    console.log("session", session);
  }

  const router = useRouter();
  const onSubmit: SubmitHandler<Login> = async (data: Login) => {
    try {
      const res = await signIn("credentials", {
        ...data,
        // callbackUrl: "/",
        redirect: false,
      });

      if (!res?.ok) {
        console.log("res error");
      } else {
        console.log(res);
        // console.log("no error?");
        console.log(data);
        // router.push("/hello");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form
        className={`flex min-h-screen flex-col items-center justify-between p-24  ${inter.className}`}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Input {...form.register("email")} placeholder="email" />
        <Input {...form.register("password")} placeholder="password" />

        <Button type="submit">Submit</Button>
      </form>
      <Button onClick={() => signIn("github")}>Sign in with github</Button>
    </div>
  );
}
