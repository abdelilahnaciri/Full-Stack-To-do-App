import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const LoginPage = () => {
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">
        Login to get access!
      </h2>
      <form action="" className="space-y-4">
        <div>
          <Input type="email" placeholder="Email" name="identifier" />
        </div>
        <div>
          <Input type="password" placeholder="Password" name="password" />
        </div>
        <Button>Login</Button>
      </form>
    </div>
  );
};

export default LoginPage;
