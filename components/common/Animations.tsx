
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/utils';

interface AnimationProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const ScrollReveal: React.FC<AnimationProps> = ({ children, className, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-1000 ease-out transform",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BlurText: React.FC<AnimationProps & { text: string }> = ({ text, className, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("inline-block overflow-hidden", className)}>
      {text.split(' ').map((word, i) => (
        <span
          key={i}
          style={{ 
            transitionDelay: `${delay + (i * 80)}ms`,
            transitionProperty: 'opacity, filter, transform'
          }}
          className={cn(
            "inline-block mr-[0.25em] transition-all duration-1000 ease-out",
            isVisible ? "opacity-100 blur-0 translate-y-0" : "opacity-0 blur-lg translate-y-4"
          )}
        >
          {word}
        </span>
      ))}
    </div>
  );
};

export const ScrollFloat: React.FC<AnimationProps & { speed?: number }> = ({ children, className, speed = 0.1 }) => {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const top = ref.current.getBoundingClientRect().top;
      setOffset(top * speed);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div
      ref={ref}
      style={{ transform: `translateY(${offset}px)` }}
      className={cn("will-change-transform transition-transform duration-100 linear", className)}
    >
      {children}
    </div>
  );
};
