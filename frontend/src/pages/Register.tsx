import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import InputErrorMessage from "../components/ui/InputErrorMessage";

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
  // console.log({ errors });
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
            {...register("username", { required: true, minLength: 5 })}
          />
          {errors?.username && errors?.username?.type === "required" && (
            <InputErrorMessage msg="Username is required." />
          )}
          {errors?.username && errors?.username?.type === "minLength" && (
            <InputErrorMessage msg="Username should be at-least 5 characters." />
          )}
        </div>
        <div>
          <Input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: true,
              pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
            })}
          />
          {errors?.email && errors?.email?.type === "required" && (
            <InputErrorMessage msg="Email is required." />
          )}
          {errors?.email && errors?.email?.type === "pattern" && (
            <InputErrorMessage msg="Not valid email." />
          )}
        </div>
        <div>
          <Input
            type="password"
            placeholder="Password"
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors?.password && errors?.password?.type === "required" && (
            <InputErrorMessage msg="Password is required." />
          )}
          {errors?.password && errors?.password?.type === "minLength" && (
            <InputErrorMessage msg="Password should be at-least 6 characters." />
          )}
        </div>
        <Button>Register</Button>
      </form>
    </div>
  );
};

export default RegisterPage;
