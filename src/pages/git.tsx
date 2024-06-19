import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const GitSign = () => {
  const { data: session } = useSession();

  if (session) {
    console.log("session up", session);
  } else {
    console.log("noSession", session);
  }

  const router = useRouter();

  const handleGitLog = async () => {
    try {
      await signIn("github");
      router.push("/hello");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Button onClick={() => handleGitLog()}>Sign in with github</Button>
    </div>
  );
};

export default GitSign;
