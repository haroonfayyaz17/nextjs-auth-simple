import SignInSignUpForm from "@/Components/SignInSignUpForm";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function SignIn() {
  return (
    <main className={inter.className}>
      <SignInSignUpForm type="signin" />;
    </main>
  );
}
