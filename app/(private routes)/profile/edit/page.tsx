'use client';

import { useEffect, useState } from 'react';
import { getMe, updateMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import Image from 'next/image';
import css from './EditProfilePage.module.css';

export default function EditProfilePage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userImage, setUserImage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchMeData() {
      try {
        const user = await getMe();
        setUserName(user.username);
        setUserEmail(user.email);
        setUserImage(user.avatar || '');
      } catch {
        setError('Failed to load profile');
      }
    }
    fetchMeData();
  }, []);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updatedUser = await updateMe({ username: userName });
      setUser(updatedUser);
      router.push('/profile');
    } catch (err) {
      const axiosError = err as AxiosError<{ error: string }>;
      setError(axiosError.response?.data?.error || 'Error');
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={userImage || '/next.svg'}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={handleSave}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              name="username"
              type="text"
              className={css.input}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <p>Email: {userEmail}</p>
          {error && <p className={css.error}>{error}</p>}

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>Save</button>
            <button type="button" className={css.cancelButton} onClick={router.back}>Cancel</button>
          </div>
        </form>
      </div>
    </main>
  );
}
