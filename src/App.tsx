import { GlobalStyle } from "./styles/global";
import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import { AsteroidProvider } from "./AsteroidContext";

export function App() {
  return (
    <AsteroidProvider>
      <Header />
      <Dashboard />
      <GlobalStyle />
    </AsteroidProvider>
  );
}
