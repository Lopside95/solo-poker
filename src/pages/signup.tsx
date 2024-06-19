import Image from "next/image";
import { Inter } from "next/font/google";
import { Input } from "@/components/ui/input";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { User, userSchema } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/utils/trpc";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const form = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      image: "",
    },
  });

  const { data: session } = useSession();

  const utils = trpc.useUtils();

  const newUser = trpc.user.createUser.useMutation({
    onSuccess: async () => {
      console.log("created user");
      await utils.user.invalidate();
    },
  });

  const onSubmit: SubmitHandler<User> = async (data: User) => {
    try {
      await newUser.mutateAsync(data);
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex min-h-screen flex-col items-center justify-between p-24  ${inter.className}`}
      >
        <Input {...form.register("email")} placeholder="email" />
        <Input {...form.register("username")} placeholder="username" />
        <Input {...form.register("password")} placeholder="password" />
        <Input {...form.register("image")} placeholder="image" />
        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  );
}
