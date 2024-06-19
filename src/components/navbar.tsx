import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { useRouter } from "next/router";

const Navbar = () => {
  const { data: session } = useSession();

  const router = useRouter();

  const AuthButton = () => {
    if (session) {
      return (
        <>
          <Button
            className="text-md text-base-txtClr w-20 hover:underline-offset-[6px]"
            onClick={() => {
              signOut({ callbackUrl: "/" });
            }}
            variant="link"
          >
            Sign out
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button
            className="text-md text-base-txtClr w-20  hover:underline-offset-[6px]"
            // onClick={() => signIn("github")}
            onClick={() => router.push("/git")}
            variant="link"
          >
            sign in with github
          </Button>
        </>
      );
    }
  };

  return (
    <div className="w-full pl-20 mb-10">
      <AuthButton />
      <Button onClick={() => router.push("/")}>Home</Button>
      <Button onClick={() => router.push("/hello")}>Hello</Button>
      <Button onClick={() => router.push("/signup")}>sign up</Button>
      <Button onClick={() => router.push("/git")}>Github</Button>
      {session?.user.role === "ADMIN" && (
        <Button onClick={() => router.push("/chipMaker")}>Make Chips</Button>
      )}
    </div>
  );
};

export default Navbar;
