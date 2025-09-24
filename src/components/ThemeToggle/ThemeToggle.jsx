import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { Button } from '@/components/ui/button';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      size="icon"
      className="relative overflow-hidden transition-all duration-300 hover:scale-110 border-purple-500 hover:border-purple-400"
    >
      <Sun className={`h-[1.2rem] w-[1.2rem] transition-all duration-300 ${
        isDark ? 'rotate-90 scale-0' : 'rotate-0 scale-100'
      }`} />
      <Moon className={`absolute h-[1.2rem] w-[1.2rem] transition-all duration-300 ${
        isDark ? 'rotate-0 scale-100' : '-rotate-90 scale-0'
      }`} />
      <span className="sr-only">Alternar tema</span>
    </Button>
  );
};

export default ThemeToggle;

