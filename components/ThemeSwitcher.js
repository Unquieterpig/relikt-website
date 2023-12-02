import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { SunIcon } from "./SunIcon";
import { MoonIcon } from "./MoonIcon";
import { Switch } from "@nextui-org/react";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    // <button onClick={toggleTheme}>{theme === "light" ? "☀" : "🌑"}</button>
    <div className="flex justify-end items-end">
      <Switch
        size="sm"
        startContent={<MoonIcon />}
        endContent={<SunIcon />}
        onValueChange={toggleTheme}
      ></Switch>
    </div>
  );
}
