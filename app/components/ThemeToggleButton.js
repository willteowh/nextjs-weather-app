import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggleButton = ({theme, onClickFn}) => {
  return (
    <button className='p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200' 
    onClick={onClickFn}>
      {theme === 'light' ? (
        <FaSun size={24} color="yellow" />
      ) : (
        <FaMoon size={24} color="black" />
      )}
    </button>
  );
};

export default ThemeToggleButton;