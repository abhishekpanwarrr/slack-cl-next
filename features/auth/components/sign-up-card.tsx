import { FC, useState } from "react";
import { SignInFlow } from "../types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { TriangleAlert } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";
import { Spinner } from "@/components/ui/spinner";

interface SignUpCardProps {
  setState: (state: SignInFlow) => void;
}
const SignUpCard: FC<SignUpCardProps> = ({ setState }) => {
  const { signIn } = useAuthActions();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const onProviderSignUp = (value: "github" | "google") => {
    setPending(true);
    signIn(value).finally(() => setPending(false));
  };

  const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name === "" || name.length <= 3) {
      setError("Enter you full name");
      return;
    }
    if (password !== confirmPassword) {
      setError("Password do not match");
      return;
    }
    setPending(true);
    signIn("password", { name, email, password, flow: "signUp" })
      .catch((error) => {
        console.error("Signup error:", error);
        setError(getAuthErrorMessage(error));
      })
      .finally(() => {
        setPending(false);
      });
  };
  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Signup to continue</CardTitle>
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
        <form onSubmit={onPasswordSignUp} className="space-y-2.5">
          <Input
            disabled={pending}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            required
          />
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
          <Input
            disabled={pending}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
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
            onClick={() => onProviderSignUp("google")}
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
            disabled={false}
            onClick={() => onProviderSignUp("github")}
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
          Already have an account?{" "}
          <span
            onClick={() => setState("signIn")}
            className="text-sky-700 hover:underline cursor-pointer"
          >
            Sign In
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignUpCard;

function getAuthErrorMessage(error: unknown): string {
  if (!(error instanceof Error)) {
    return "Something went wrong. Please try again.";
  }

  const msg = error.message;

  // Password validation
  if (msg.includes("Invalid password")) {
    return "Password does not meet the required criteria.";
  }

  if (msg.includes("already exists")) {
    return "An account with this email already exists.";
  }

  if (msg.includes("Invalid credentials")) {
    return "Invalid email or password.";
  }

  return "Signup failed. Please try again.";
}
