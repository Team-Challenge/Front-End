import { useState } from 'react';
import { TooltipProps } from '@/types';
import s from './Tooltip.module.scss';

export const Tooltip = ({ text, children, className }: TooltipProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div
      className={`${s.tooltip_container} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {showTooltip && (
        <div className={s.tooltip_text}>
          <p>{text}</p>
        </div>
      )}
    </div>
  );
};
