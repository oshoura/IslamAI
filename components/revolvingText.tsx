import React, { useState, useEffect } from 'react';

const ChangingText = (props: {
  textOptions: string[];
  onClick: (x: string) => {};
}) => {
  const textOptions = props.textOptions;
  const [currentText, setCurrentText] = useState(textOptions[0]);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setOpacity(0);

      setTimeout(() => {
        setCurrentText((prevText) => {
          const currentIndex = textOptions.indexOf(prevText);
          const newIndex = (currentIndex + 1) % textOptions.length;
          return textOptions[newIndex];
        });
        setOpacity(1);
      }, 500);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [textOptions]);

  return (
    <p
      className="text-gray-500 transition-opacity duration-500  text-xl"
      style={{ opacity: opacity }}
      onClick={() => props.onClick(currentText)}
    >
      {currentText}
    </p>
  );
};

export default ChangingText;
