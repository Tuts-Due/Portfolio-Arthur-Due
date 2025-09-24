import { useTiltEffect } from '../../hooks/useTiltEffect';

const TiltCard = ({ 
  children, 
  className = '', 
  tiltOptions = {},
  glare = true,
  ...props 
}) => {
  const tiltRef = useTiltEffect({
    maxTilt: 12,
    perspective: 1000,
    scale: 1.02,
    speed: 400,
    glare: glare,
    maxGlare: 0.3,
    ...tiltOptions
  });

  return (
    <div
      ref={tiltRef}
      className={`relative overflow-hidden ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
      {...props}
    >
      {children}
    </div>
  );
};

export default TiltCard;

