import React from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import User from '@/types/user.type';
import styles from './index.module.scss';
import { Button } from '../button';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  user: User;
  address: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onClick,
  address
}) => {
  const navigate = useNavigate();

  const onLogout = (): void => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div
      className={`${styles.searchBar} rounded-lg border bg-card text-card-foreground shadow-sm`}
    >
      <Button variant={'ghost'} onClick={onClick} className={styles.searchButton} > 
        <Search size={24} />
        { address } 
        <ChevronDown /> 
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarFallback> {user.email.at(0)?.toUpperCase()} </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel> {user.email} </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onLogout}>
            <Button style={{ width: '100%' }} variant={'destructive'}>
                    Logout
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
