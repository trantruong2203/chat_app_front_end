import React from 'react';
import { Button, Tooltip } from 'antd';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import { useTheme } from '../hooks/useTheme';

interface ThemeToggleProps {
  size?: 'small' | 'middle' | 'large';
  type?: 'text' | 'link' | 'default' | 'primary' | 'dashed';
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  size = 'middle', 
  type = 'text',
  className = ''
}) => {
  const { themeMode, toggleTheme } = useTheme();

  return (
    <Tooltip title={themeMode === 'light' ? 'Chuyển sang Dark Mode' : 'Chuyển sang Light Mode'}>
      <Button
        type={type}
        size={size}
        icon={themeMode === 'light' ? <MoonOutlined /> : <SunOutlined />}
        onClick={toggleTheme}
        className={`theme-toggle ${className}`}
        style={{
          color: themeMode === 'light' ? 'var(--yahoo-text)' : 'var(--yahoo-text)',
        }}
      />
    </Tooltip>
  );
};

export default ThemeToggle; 