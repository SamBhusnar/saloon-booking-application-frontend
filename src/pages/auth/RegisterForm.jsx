import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { User, Mail, Phone, AtSign } from "lucide-react";

import { registerSchema } from "../../validation/authSchema";

import TextInput from "../../components/form/TextInput";
import PasswordInput from "../../components/form/PasswordInput";
import SubmitButton from "../../components/form/SubmitButton";

function RegisterForm({ onSubmit, isLoading, submitTitle, loadingTitle }) {
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* First Name & Last Name */}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <TextInput
          label="First Name"
          name="firstName"
          placeholder="John"
          icon={User}
          register={register}
          error={errors.firstName}
          disabled={isLoading}
        />

        <TextInput
          label="Last Name"
          name="lastName"
          placeholder="Doe"
          icon={User}
          register={register}
          error={errors.lastName}
          disabled={isLoading}
        />
      </div>

      {/* Username */}

      <TextInput
        label="Username"
        name="username"
        placeholder="Enter username"
        icon={AtSign}
        register={register}
        error={errors.username}
        disabled={isLoading}
      />

      {/* Email */}

      <TextInput
        label="Email"
        type="email"
        name="email"
        placeholder="example@gmail.com"
        icon={Mail}
        register={register}
        error={errors.email}
        disabled={isLoading}
      />

      {/* Phone */}

      <TextInput
        label="Phone Number"
        type="tel"
        name="phone"
        placeholder="9876543210"
        icon={Phone}
        register={register}
        error={errors.phone}
        disabled={isLoading}
      />

      {/* Password */}

      <PasswordInput
        label="Password"
        name="password"
        placeholder="Create password"
        register={register}
        error={errors.password}
        disabled={isLoading}
      />

      {/* Confirm Password */}

      <PasswordInput
        label="Confirm Password"
        name="confirmPassword"
        placeholder="Confirm password"
        register={register}
        error={errors.confirmPassword}
        disabled={isLoading}
      />

      <SubmitButton
        title={submitTitle}
        loadingTitle={loadingTitle}
        loading={isLoading}
      />
    </form>
  );
}

export default RegisterForm;
