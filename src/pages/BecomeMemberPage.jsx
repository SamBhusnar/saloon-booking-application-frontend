import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useSelector, useDispatch } from "react-redux";

import AuthLayout from "../components/layout/AuthLayout";

import AuthHeader from "../components/layout/AuthHeader";

import FormCard from "../components/form/FormCard";
import TextInput from "../components/form/TextInput";
import PasswordInput from "../components/form/PasswordInput";
import SubmitButton from "../components/form/SubmitButton";
import AuthLinks from "../components/form/AuthLinks";

import { User, Mail, Phone, AtSign } from "lucide-react";

import { registerSchema } from "../validation/authSchema";

import RegisterForm from "./auth/RegisterForm";
import { register as registerUser } from "../features/auth/authThunk";

import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";





function BecomeMemberPage() {
  const { isLoading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    if (isLoading) return;

    const { confirmPassword, ...rest } = data;

    const registerRequest = {
      ...rest,
      roles: "SALON_OWNER".split(","),
    };

    console.log(registerRequest);

    try {


      await dispatch(registerUser(registerRequest)).unwrap();

      toast.success("Registration successful! Please login.");

      navigate("/login");

    } catch (err) {
      console.error("Registration failed:", err);
      toast.error(err?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <AuthLayout
      image="/images/register-banner.jpg"
      title="Create Your Account"
      description="Join thousands of customers who discover premium salons, book appointments instantly and manage every booking from one place."
    >
      <div className="w-full">
        <AuthHeader />

        <FormCard
          title="Salon Owner Registration"
          subtitle="Start growing your salon today"
        >
          <RegisterForm
            onSubmit={onSubmit}
            isLoading={isLoading}
            submitTitle="Become a Salon Owner"
            loadingTitle="Creating Account..."
          />

          <AuthLinks
            question="Already have a salon owner account?"
            actionText="Login"
            actionTo="/login"
            secondaryText="Create Customer Account"
            secondaryTo="/register"
          />
        </FormCard>
      </div>
    </AuthLayout>
  );
}

export default BecomeMemberPage;
