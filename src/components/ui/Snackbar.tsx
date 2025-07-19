import React, { useEffect } from 'react';

export interface SnackbarProps {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const Snackbar: React.FC<SnackbarProps> = ({ 
  message, 
  type, 
  isVisible, 
  onClose, 
  duration = 4000 
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const typeStyles = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
  };

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-bottom-2 duration-300">
      <div className={`
        ${typeStyles[type]} 
        px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 
        min-w-[300px] max-w-[500px]
        transition-all duration-300
      `}>
        <span className="text-lg font-semibold">
          {icons[type]}
        </span>
        <span className="text-sm font-medium flex-1">
          {message}
        </span>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white transition-colors ml-2"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Snackbar;