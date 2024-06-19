import { trpc } from "@/utils/trpc";

const Hello = () => {
  const { data: user } = trpc.user.getUserById.useQuery();

  const nameOfUser = JSON.stringify(user);

  console.log("user", user);
  return (
    <div>
      <h1>{!user ? "not allowed here" : nameOfUser}</h1>
    </div>
  );
};

export default Hello;
