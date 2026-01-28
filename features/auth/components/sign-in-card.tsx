import { useAuthActions } from "@convex-dev/auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SignInFlow } from "../types";
import { FC, FormEvent, useState } from "react";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { TriangleAlert } from "lucide-react";

interface SignInCardProps {
  setState: (state: SignInFlow) => void;
}

const SignInCard: FC<SignInCardProps> = ({ setState }) => {
  const { signIn } = useAuthActions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const onPasswordSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    signIn("password", { email, password, flow: "signIn" })
      .catch((err) => {
        console.log(err);
        setError("Invalid email or password");
      })
      .finally(() => {
        setPending(false);
      });
  };

  const onProviderSignIn = (value: "github" | "google") => {
    setPending(true);
    signIn(value).finally(() => setPending(false));
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Login to continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      {!!error && (
        <div className="bg-destructive/15 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6 py-3 px-3">
          <TriangleAlert className="size-4" />
          <p>{error}</p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={onPasswordSignIn} className="space-y-2.5">
          <Input
            disabled={pending}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
          />
          <Input
            disabled={pending}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            required
          />
          <Button
            disabled={pending}
            type="submit"
            className="w-full"
            size={"lg"}
          >
            {pending ? <Spinner className="line-clamp-1" /> : "Continue"}
          </Button>
        </form>
        <Separator />
        <div className="flex gap-y-2 5 flex-col">
          <Button
            disabled={pending}
            onClick={() => onProviderSignIn("google")}
            variant={"outline"}
            size={"lg"}
            className="w-full relative"
          >
            {pending ? (
              <Spinner className="line-clamp-1" />
            ) : (
              <>
                <FcGoogle className="size-5 absolute top-2.5 left-2.5" />
                Contine with google
              </>
            )}
          </Button>
          <Button
            disabled={pending}
            onClick={() => onProviderSignIn("github")}
            variant={"outline"}
            size={"lg"}
            className="w-full relative"
          >
            {pending ? (
              <Spinner className="line-clamp-1" />
            ) : (
              <>
                <FaGithub className="size-5 absolute top-2.5 left-2.5" />
                Contine with github
              </>
            )}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Don&apos;t have an account?{" "}
          <span
            onClick={() => setState("signUp")}
            className="text-sky-700 hover:underline cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignInCard;
