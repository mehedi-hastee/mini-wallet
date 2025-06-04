export interface AuthContextType {
  user: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}