"use client";
import { AxiosError } from 'axios';
import { FormEvent, useState } from "react";
import { loginUser, registerUser } from "../../../lib/api/clientApi";
import { useRouter } from "next/navigation";
import css from "./SignUpPage.module.css";
import { useAuthStore } from "../../../lib/store/authStore";

export default function SignUpPage() {
  const [error, setError] = useState("");
  const router = useRouter();
  const { setUser } = useAuthStore();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const user = await loginUser(email, password); // или registerUser
      setUser(user);
      router.push("/profile");
    } catch (err: unknown) {
      const error = err as AxiosError<{ error: string }>;
      setError(error.response?.data?.error || "Error");
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form onSubmit={handleSubmit} className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required className={css.input} />
        </div>
        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" required className={css.input} />
        </div>
        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>Register</button>
        </div>
        <p className={css.error}>{error}</p>
      </form>
    </main>
  );
}
