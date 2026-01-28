import { UserButton } from "@/features/auth/components/user-button";

export default function Home() {
  return (
    <div className="h-full flex justify-center items-center gap-5 flex-col">
      Logged In
      <UserButton />
    </div>
  );
}
