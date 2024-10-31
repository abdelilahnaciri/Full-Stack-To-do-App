import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

interface IFormInput {
  username: String;
  email: String;
  password: String;
}

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  console.log({ errors });
  // console.log({ ...register("username") });
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">
        Register to get access!
      </h2>
      <form action="" className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            type="text"
            placeholder="Username"
            {...register("username", { required: "Username is required!" })}
          />
          {/* {errors?.username?.message && <p>Username is required!</p>} */}
        </div>
        <div>
          <Input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required!" })}
          />
        </div>
        <div>
          <Input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required!" })}
          />
        </div>
        <Button>Register</Button>
      </form>
    </div>
  );
};

export default RegisterPage;
