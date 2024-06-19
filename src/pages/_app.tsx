import "@/styles/globals.css";
import type { AppProps, AppType } from "next/app";
import { SessionProvider } from "next-auth/react";
import { trpc } from "@/utils/trpc";
import { FormProvider, useForm } from "react-hook-form";
import Navbar from "@/components/navbar";

const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  const form = useForm();

  return (
    <SessionProvider session={session}>
      <FormProvider {...form}>
        <Navbar />
        <Component {...pageProps} />
      </FormProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
