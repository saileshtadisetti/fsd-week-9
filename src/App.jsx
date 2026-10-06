import React, {
  useState,
  useEffect,
  createContext,
  useContext
} from "react";

import useFetch from "./useFetch";
import "./App.css";

// Context
const ThemeContext = createContext();


// Counter Component
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Counter: {count}</h2>

      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>

      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>

      <button onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
}


// Posts Component
function Posts() {
  const { data, loading } = useFetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5"
  );

  if (loading) {
    return <p>Loading posts...</p>;
  }

  return (
    <div>
      <h2>Posts</h2>

      {data.map((post) => (
        <p key={post.id}>
          {post.id}. {post.title}
        </p>
      ))}
    </div>
  );
}


// Props Drilling
function Child({ user }) {
  return (
    <p>
      Name: {user.name} <br />
      Email: {user.email}
    </p>
  );
}

function Parent({ user }) {
  return <Child user={user} />;
}


// Lifting State Up
function CounterButton({ increase }) {
  return (
    <button onClick={increase}>
      Increase Counter
    </button>
  );
}

function DisplayCounter({ count }) {
  return <h3>Sibling Counter: {count}</h3>;
}

function LiftedCounter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <CounterButton
        increase={() => setCount(count + 1)}
      />

      <DisplayCounter count={count} />
    </div>
  );
}


// Theme Component
function ThemeButton() {
  const { theme, toggleTheme } =
    useContext(ThemeContext);

  return (
    <div>
      <h2>Current Theme: {theme}</h2>

      <button onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
}


// Main App
function App() {
  const [theme, setTheme] = useState("light");

  const user = {
    name: "John",
    email: "john@example.com"
  };

  const toggleTheme = () => {
    setTheme(
      theme === "light" ? "dark" : "light"
    );
  };

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme }}
    >
      <div className={theme}>

        <h1>React Hooks and Data Sharing</h1>


        {/* useState */}
        <section>
          <h2>1. useState Hook</h2>
          <Counter />
        </section>


        {/* useEffect and Custom Hook */}
        <section>
          <h2>2. useEffect and Custom Hook</h2>
          <Posts />
        </section>


        {/* Props */}
        <section>
          <h2>3. Props Drilling</h2>

          <Parent user={user} />
        </section>


        {/* Lifting State */}
        <section>
          <h2>4. Lifting State Up</h2>

          <LiftedCounter />
        </section>


        {/* Context */}
        <section>
          <h2>5. Context API</h2>

          <ThemeButton />
        </section>

      </div>
    </ThemeContext.Provider>
  );
}

export default App;