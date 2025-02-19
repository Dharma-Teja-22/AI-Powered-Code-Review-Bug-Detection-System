import CodeReviewSystem from "./components/CodeReviewSystem";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <main className="min-h-screen bg-background bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 text-white">
      <Navbar/>
      <CodeReviewSystem />
    </main>
  )
}
