import { useRef, useEffect } from 'react';

export const useTiltEffect = (options = {}) => {
  const {
    maxTilt = 15,
    perspective = 1000,
    scale = 1.05,
    speed = 300,
    glare = false,
    maxGlare = 1,
    glarePrerender = false
  } = options;

  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let isHovering = false;

    const handleMouseEnter = () => {
      isHovering = true;
      element.style.willChange = 'transform';
    };

    const handleMouseLeave = () => {
      isHovering = false;
      element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      element.style.willChange = 'auto';
      
      if (glare) {
        const glareElement = element.querySelector('.tilt-glare');
        if (glareElement) {
          glareElement.style.opacity = '0';
        }
      }
    };

    const handleMouseMove = (e) => {
      if (!isHovering) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * maxTilt;
      const rotateY = ((centerX - x) / centerX) * maxTilt;
      
      element.style.transform = `
        perspective(${perspective}px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        scale3d(${scale}, ${scale}, ${scale})
      `;

      if (glare) {
        const glareElement = element.querySelector('.tilt-glare');
        if (glareElement) {
          const glareX = (x / rect.width) * 100;
          const glareY = (y / rect.height) * 100;
          const glareOpacity = Math.min(
            Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)) / 
            Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2)) * maxGlare,
            maxGlare
          );
          
          glareElement.style.background = `
            linear-gradient(${Math.atan2(y - centerY, x - centerX) * (180 / Math.PI) + 90}deg, 
            rgba(255,255,255,${glareOpacity}) 0%, 
            transparent 80%)
          `;
          glareElement.style.opacity = glareOpacity;
        }
      }
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousemove', handleMouseMove);

    // Add glare element if enabled
    if (glare && !element.querySelector('.tilt-glare')) {
      const glareElement = document.createElement('div');
      glareElement.className = 'tilt-glare';
      glareElement.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: inherit;
        pointer-events: none;
        opacity: 0;
        transition: opacity ${speed}ms ease-out;
        mix-blend-mode: overlay;
      `;
      element.appendChild(glareElement);
    }

    // Set initial styles
    element.style.transformStyle = 'preserve-3d';
    element.style.transition = `transform ${speed}ms ease-out`;

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousemove', handleMouseMove);
    };
  }, [maxTilt, perspective, scale, speed, glare, maxGlare]);

  return ref;
};

