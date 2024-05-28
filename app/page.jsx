import { signIn, signOut } from "@/auth";

const Home = () => {
  return (
    <div>
      <h1>Auth</h1>
      <form
        action={async () => {
          "use server";

          await signIn();
        }}
      >
        <button type="submit">SignIn</button>
      </form>
    </div>
  );
};

export default Home;
