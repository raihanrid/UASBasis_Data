"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { IconBrandGoogle } from "@tabler/icons-react";
import Link from "next/link";
import { BottomGradient } from "../misc/bottom-gradient";
import { LabelInputContainer } from "../misc/label-input-container";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await axios.post("/api/user", null, {
        params: {
          email: data.email,
          fullName: data.fullName,
          password: data.password,
          username: data.username,
        },
      });

      const responseSignin = await axios.post("/api/login", null, {
        params: {
          username: data.username,
          password: data.password,
        },
      });

      if (responseSignin) {
        router.push("/");
        router.refresh();
      }
      console.log("Registration successful:", response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.error || "Failed to register");
      } else {
        setError("An unexpected error occurred");
      }
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Signup ke <span className="font-black text-foreground">Lelangku</span>
      </h2>

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="firstname">Full name</Label>
          <Input
            id="firstname"
            name="fullName"
            placeholder="Raihan Ridho"
            type="text"
            required
            disabled={isLoading}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="lastname">Username</Label>
          <Input
            id="lastname"
            name="username"
            placeholder="raihanrid"
            type="text"
            required
            disabled={isLoading}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            placeholder="raihanrid@pelelang.com"
            type="email"
            required
            disabled={isLoading}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            placeholder="••••••••"
            type="password"
            required
            disabled={isLoading}
          />
        </LabelInputContainer>
        <button
          className={`bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Signing up..." : "Sign up"}
          <BottomGradient />
        </button>

        <p className="text-neutral-600 text-sm max-w-sm mt-5 text-center dark:text-neutral-300">
          Already Have An Account?{" "}
          <Link href={"/signin"} className="font-black">
            Sign In.
          </Link>
        </p>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        <div className="flex flex-col space-y-4">
          <button
            className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="button"
            onClick={() => {
              console.log("Google sign in clicked");
            }}
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
}
