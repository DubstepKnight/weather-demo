import User from '@/types/user';

export const getUser = async (): Promise<User | null> => {
  try {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');

      if (user) {
        return JSON.parse(user) as User;
      }
    }
  } catch (error) {
    console.error('Error while retrieving user:', error);
  }

  return null;
};
