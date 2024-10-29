import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const RegisterPage = () => {
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">
        Register to get access!
      </h2>
      <form action="" className="space-y-4">
        <div>
          <Input type="text" placeholder="Username" name="username" />
        </div>
        <div>
          <Input type="email" placeholder="Email" name="identifier" />
        </div>
        <div>
          <Input type="password" placeholder="Password" name="password" />
        </div>
        <Button>Register</Button>
      </form>
    </div>
  );
};

export default RegisterPage;
