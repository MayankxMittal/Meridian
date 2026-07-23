import { RouterProvider } from "react-router-dom";
import { router } from "@/router";
import MetaBalls from "./components/ui/Cursor";
import { useTheme } from "@/lib/theme"; 

function App() {
  const { theme } = useTheme();
  const cursorColor = theme === "dark" ? "#ffffff" : "#000000";

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-50">
        <MetaBalls
          key={theme}
          cursorBallColor={cursorColor}
          ballCount={0}
          cursorBallSize={0.45}
          hoverSmoothness={0.25}
          enableTransparency
        />
      </div>

      <RouterProvider router={router} />
    </>
  );
}

export default App;