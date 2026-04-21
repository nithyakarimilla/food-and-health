/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import { AnimatePresence, motion } from "motion/react";

export default function App() {
  const [view, setView] = useState<"landing" | "dashboard">("landing");

  return (
    <div className="min-h-screen bg-[#030712]">
      <AnimatePresence mode="wait">
        {view === "landing" ? (
          <motion.div
            key="landing"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <LandingPage onStart={() => setView("dashboard")} />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Dashboard onLogout={() => setView("landing")} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

