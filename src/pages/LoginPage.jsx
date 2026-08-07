import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector, useDispatch } from "react-redux";

import { loginSchema } from "../validation/authSchema";

import AuthLayout from "../components/layout/AuthLayout";
import AuthHeader from "../components/layout/AuthHeader";

import FormCard from "../components/form/FormCard";
import TextInput from "../components/form/TextInput";
import PasswordInput from "../components/form/PasswordInput";
import SubmitButton from "../components/form/SubmitButton";
import FormDivider from "../components/form/FormDivider";
import AuthLinks from "../components/form/AuthLinks";

import { User, Lock } from "lucide-react";

import { login } from "../features/auth/authThunk";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getHomeRoute } from "../features/auth/authThunk";

function LoginPage() {
  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    if (isLoading) return;

    try {
      const response = await dispatch(login(data)).unwrap();

      toast.success("Login successful.");
      console.log(response);

      navigate(getHomeRoute(response.profile.roles), { replace: true });
    } catch (err) {
      console.error(err);

      toast.error(err?.message || "Login failed. Please try again.");
    }
  };

  return (
    <AuthLayout
      bannerImage="/images/login-banner.jpg"
      bannerTitle="Welcome Back"
      bannerDescription="Manage your salons, appointments, payments and customers from one modern dashboard."
    >
      <div className="w-full">
        <AuthHeader />

        <FormCard title="Login" subtitle="Sign in to continue">
          <fieldset disabled={isLoading}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <TextInput
                label="Username"
                name="username"
                placeholder="Enter username"
                icon={User}
                register={register}
                error={errors.username}
                disabled={isLoading}
              />

              <PasswordInput
                label="Password"
                name="password"
                placeholder="Enter password"
                register={register}
                error={errors.password}
                disabled={isLoading}
              />

              <div className="flex justify-end">
                <button
                  type="button"
                  className={`text-sm font-medium text-emerald-600 transition hover:underline ${isLoading ? "pointer-events-none opacity-60 cursor-not-allowed" : ""}`}
                  disabled={isLoading}
                >
                  Forgot Password?
                </button>
              </div>

              <SubmitButton
                title="Login"
                loadingTitle="Logging in..."
                loading={isLoading}
              />
            </form>
          </fieldset>
          <FormDivider />
          <div className={isLoading ? "pointer-events-none opacity-60" : ""}>
            <AuthLinks
              question="Don't have an account?"
              actionText="Create Account"
              actionTo="/register"
              secondaryText="Become a Salon Owner"
              secondaryTo="/become-member"
            />
          </div>
        </FormCard>
      </div>
    </AuthLayout>
  );
}

export default LoginPage;
