import { Header } from "../components/layout/Header";
import { Navbar } from "../components/layout/Navbar";
import { LoginForm } from "../components/auth/LoginForm";
import { PageLocation } from "../components/layout/PageLocation";
import { PageHeading } from "../components/layout/PageHeading";
import { Footer } from "../components/layout/Footer";

export const Login = () => {
  return (
    <>
      <Header />
      <Navbar />
      <div className="flex flex-col justify-center items-center min-h-[calc(100svh-172px)] bg-white dark:bg-black py-20 px-6">
        <PageHeading page="Login" />
        <PageLocation pages={["Login"]} />
        <LoginForm />
      </div>
      <Footer />
    </>
  );
};
