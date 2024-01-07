import User from '@/types/user.type';

export const getUser = async (): Promise<User | null> => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');

    if (user) {
      return JSON.parse(user) as User;
    }
  }

  return null;
};
