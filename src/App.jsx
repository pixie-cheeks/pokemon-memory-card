import { useState, useEffect } from 'react';

function Clock() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const key = setInterval(() => {
      setCounter((count) => count + 1);
    }, 1_000);

    return () => clearInterval(key);
  }, []);

  return <p>{counter} seconds have passed.</p>;
}

function App() {
  return (
    <>
      <p>Hello World!</p>
      <Clock />
    </>
  );
}

export default App;
