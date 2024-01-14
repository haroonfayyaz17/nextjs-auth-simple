import { Inter } from "next/font/google";
import SignInSignUpForm from "@/components/SignInSignUpForm";

const inter = Inter({ subsets: ["latin"] });

export default function SignIn() {
  return (
    <main className={inter.className}>
      <SignInSignUpForm type="signin" />;
    </main>
  );
}
