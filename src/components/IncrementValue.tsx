import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
export type TypeIncrementValue = {
  price: number;
  children: React.ReactNode;
};
const IncrementValue = ({ price, children }: TypeIncrementValue) => {
  const [initialValue, setInitialValue] = useState<number>(0);
  const value = price;
  const incrementBy = Math.ceil(value / 10000);
  const incrementValue = () => {
    const interval = setInterval(() => {
      setInitialValue((prevValue) => {
        const newValue = prevValue + incrementBy;
        if (newValue >= value) {
          clearInterval(interval);
          return value;
        }
        return newValue;
      });
    }, 100);
    return interval;
  };
  useEffect(() => {
    const interval = incrementValue();
    return () => clearInterval(interval);
  }, [price]);
  useEffect(() => {
    setInitialValue(() => 0);
  }, [price]);
  return (
    <p>
      {children}: ${initialValue}
    </p>
  );
};

export default IncrementValue;
