import React from "react";
import { AudioLines, Moon, Sun, Settings, Languages } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useTheme } from "../context/ThemeContext";
import { type Status } from "../types";

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

interface HeaderProps {
  activeTab: "transcribe" | "translate";
  setActiveTab: (tab: "transcribe" | "translate") => void;
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
  tauriEnv: boolean;
  status: Status;
  setStatus: (status: Status) => void;
  setTranscription: (text: string) => void;
  setError: (text: string) => void;
  setTranslationInitialText: (text: string) => void;
}

export function Header({
  activeTab,
  setActiveTab,
  showSettings,
  setShowSettings,
  tauriEnv,
  status,
  setStatus,
  setTranscription,
  setError,
  setTranslationInitialText,
}: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  const handleSwitchToTranscribe = () => {
    setActiveTab("transcribe");
    if (status !== "done") {
      setStatus("idle");
      setTranscription("");
      setError("");
      setTranslationInitialText("");
    }
  };

  const handleSwitchToTranslate = () => {
    setActiveTab("translate");
  };

  return (
    <header
      className={cn(
        "sticky z-10 transition-colors duration-200 mb-10 w-full",
        tauriEnv ? "top-8 pt-2" : "top-0 pt-[env(safe-area-inset-top)]",
      )}
    >
      <div className="max-w-4xl mx-auto px-3 sm:px-6 py-2">
        <div className="flex rounded-[28px] border border-outline/25 bg-surface-container/95 backdrop-blur-md px-3 sm:px-5 py-2.5 sm:py-3 items-center gap-2 overflow-hidden shadow-[0_4px_16px_rgba(22,27,45,0.06)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.15)]">

          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex-shrink-0 flex items-center justify-center text-on-primary bg-primary shadow-[0_8px_18px_rgba(79,70,229,0.35)] dark:shadow-none">
              <AudioLines className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
            </div>
            <h1 className="text-base sm:text-xl font-extrabold tracking-tight text-on-surface hidden sm:block">
              SpeechForge
            </h1>
          </div>

          {/* Tab switcher — center */}
          <div className="flex-1 flex items-center justify-center">
            <div
              className="flex items-center gap-1 rounded-2xl bg-surface-container-high p-1"
              role="tablist"
              aria-label="Mode selection"
            >
              <button
                id="tab-transcribe"
                role="tab"
                aria-selected={activeTab === "transcribe"}
                onClick={handleSwitchToTranscribe}
                className={cn(
                  "flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                  activeTab === "transcribe"
                    ? "bg-primary text-on-primary shadow-[0_4px_12px_rgba(79,70,229,0.35)]"
                    : "text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface",
                )}
              >
                <AudioLines className="w-4 h-4 flex-shrink-0" />
                <span>Transcribe</span>
              </button>

              <button
                id="tab-translate"
                role="tab"
                aria-selected={activeTab === "translate"}
                onClick={handleSwitchToTranslate}
                className={cn(
                  "flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-tertiary/40",
                  activeTab === "translate"
                    ? "bg-tertiary text-on-tertiary shadow-[0_4px_12px_rgba(99,89,220,0.35)]"
                    : "text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface",
                )}
              >
                <Languages className="w-4 h-4 flex-shrink-0" />
                <span>Translate</span>
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-1.5 sm:gap-2 flex-shrink-0">
            <button
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 rounded-2xl bg-surface-container-high hover:bg-surface-container-highest transition-colors text-on-surface-variant focus-visible:ring-2 focus-visible:ring-primary/40 outline-none"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={cn(
                "p-2 sm:p-2.5 rounded-2xl bg-primary-container text-on-primary-container hover:opacity-90 transition-colors focus-visible:ring-2 focus-visible:ring-primary/40 outline-none",
                showSettings && "ring-2 ring-primary/30",
              )}
              aria-label="Settings"
            >
              <Settings
                className={cn(
                  "w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300",
                  showSettings && "rotate-90",
                )}
              />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
