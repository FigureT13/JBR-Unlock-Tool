/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Smartphone, 
  Cpu, 
  Download, 
  ExternalLink, 
  Terminal, 
  Lock, 
  Unlock,
  Activity,
  Info,
  Monitor,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const ANDROID_APK_URL = "https://github.com/bmax121/APatch/releases/download/11142/APatch_11142_166daa0_on_HEAD-release-signed.apk";
const IOS_URL = "https://axi0m.vercel.app";

const WINDOWS_STEPS = [
  "Click on the Windows button",
  "Click on the Power icon",
  "Select the 'Lock' option",
  "Press Space to exit the lock screen clock",
  "Click on the Power icon again",
  "Hold SHIFT while clicking 'Restart' (Keep holding until 'Please wait' appears)",
  "Navigate to: Troubleshoot > Advanced options",
  "Select 'Command Prompt'",
  "In CMD, type: cd C:\\Windows\\System32 (or your system drive)",
  "Type: ren Utilman.exe Utilman1.exe",
  "Type: ren cmd.exe Utilman.exe",
  "Close the Command Prompt window",
  "Click 'Continue' to exit and continue to Windows",
  "On the login screen, click the 'Accessibility' button (human icon)",
  "In the command window that opens, type: compmgmt.msc",
  "Navigate to: Local Users and Groups > Users",
  "Then go to: Groups > Administrators",
  "Click 'Add' to add a new member to the group",
  "Enter your system username",
  "Tip: Find your username by typing 'dir /Users' in CMD and checking folder contents",
  "Confirm the addition and close all windows",
  "Reboot your device to apply administrative privileges"
];

export default function App() {
  const [isScanning, setIsScanning] = useState(true);
  const [backendStatus, setBackendStatus] = useState('Checking...');
  const [showWindowsSteps, setShowWindowsSteps] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState({
    platform: 'Detecting...',
    userAgent: navigator.userAgent,
    screen: `${window.screen.width}x${window.screen.height}`,
    language: navigator.language
  });

  useEffect(() => {
    // Check backend health
    fetch('/api/health')
      .then(res => res.json())
      .then(data => setBackendStatus('Connected'))
      .catch(() => setBackendStatus('Offline'));

    const timer = setTimeout(() => {
      const ua = navigator.userAgent;
      const platform = /iPhone|iPad|iPod/.test(ua) ? 'iOS/iPadOS' : 
                       /Android/.test(ua) ? 'Android' : 
                       /Win/.test(ua) ? 'Windows' : 'Desktop/Other';
      setDeviceInfo(prev => ({ ...prev, platform }));
      setIsScanning(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 font-sans selection:bg-indigo-500/30">
      <div className="relative max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            JBR Unlock Utility
          </h1>
          <p className="mt-1 text-zinc-500">Professional administrative privilege access suite for mobile and desktop platforms.</p>
        </header>

        {/* System Status Panel */}
        <motion.section 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 p-6 bg-zinc-900 border border-zinc-800 rounded-xl"
        >
          <div className="flex items-center gap-2 mb-6 text-zinc-400">
            <Activity size={14} className="text-indigo-400" />
            <h2 className="text-[10px] font-bold uppercase tracking-wider">Environment Diagnostics</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="space-y-1">
              <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-tight">Platform</p>
              <p className="text-sm text-zinc-100">{deviceInfo.platform}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-tight">Display</p>
              <p className="text-sm text-zinc-100">{deviceInfo.screen}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-tight">Locale</p>
              <p className="text-sm text-zinc-100">{deviceInfo.language}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-tight">API Link</p>
              <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${backendStatus === 'Connected' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                <p className="text-sm text-zinc-100">{backendStatus}</p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-tight">Status</p>
              <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${isScanning ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
                <p className="text-sm text-zinc-100">{isScanning ? 'Scanning' : 'Ready'}</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Main Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Android Section */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 hover:border-zinc-700 transition-colors"
          >
            <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-6">
              <Smartphone className="text-indigo-400" size={20} />
            </div>
            
            <h3 className="text-xl font-semibold text-white mb-2">Android Privileges</h3>
            <p className="text-zinc-500 text-sm mb-8 leading-relaxed">
              Deploy APatch kernel-based root solution. Provides advanced administrative control for Android devices.
            </p>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-xs text-zinc-400">
                <div className="w-1 h-1 bg-zinc-600 rounded-full" />
                <span>Package: APatch_11142_release</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-zinc-400">
                <div className="w-1 h-1 bg-zinc-600 rounded-full" />
                <span>Method: Kernel Patching</span>
              </div>
            </div>

            <a 
              href={ANDROID_APK_URL}
              className="flex items-center justify-center gap-2 w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <Download size={16} />
              Download APK
            </a>
          </motion.div>

          {/* iOS Section */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 hover:border-zinc-700 transition-colors"
          >
            <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center mb-6">
              <Unlock className="text-zinc-300" size={20} />
            </div>
            
            <h3 className="text-xl font-semibold text-white mb-2">iOS / iPadOS</h3>
            <p className="text-zinc-500 text-sm mb-4 leading-relaxed">
              Access axi0m exploit suite for Apple devices. Specialized tools for bypassing system restrictions.
            </p>
            <div className="mb-8 p-3 bg-amber-500/5 border border-amber-500/20 rounded-lg">
              <p className="text-amber-500 text-[10px] font-bold uppercase tracking-wider text-center">
                WARNING: THIS IS A SEMI JAILBREAK iOS 12-26
              </p>
            </div>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-xs text-zinc-400">
                <div className="w-1 h-1 bg-zinc-600 rounded-full" />
                <span>Source: axi0m.vercel.app</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-zinc-400">
                <div className="w-1 h-1 bg-zinc-600 rounded-full" />
                <span>Target: iOS/iPadOS 15-18+</span>
              </div>
            </div>

            <a 
              href={IOS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-zinc-100 hover:bg-white text-zinc-950 text-sm font-medium rounded-lg transition-colors"
            >
              <ExternalLink size={16} />
              Open Exploit Hub
            </a>
          </motion.div>
        </div>

        {/* Windows Section */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 hover:border-zinc-700 transition-colors"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Monitor className="text-blue-400" size={20} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Windows Administrator Access</h3>
                <p className="text-zinc-500 text-sm">System-level privilege escalation guide.</p>
              </div>
            </div>
            <button 
              onClick={() => setShowWindowsSteps(!showWindowsSteps)}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium rounded-lg transition-colors"
            >
              {showWindowsSteps ? 'Hide Steps' : 'View Instructions'}
            </button>
          </div>

          <AnimatePresence>
            {showWindowsSteps && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-4 space-y-3 border-t border-zinc-800 mt-4">
                  <p className="text-xs text-zinc-400 mb-4 italic">Follow these steps to become an administrator on your Windows device:</p>
                  <div className="grid grid-cols-1 gap-2">
                    {WINDOWS_STEPS.map((step, index) => (
                      <div key={index} className="flex gap-4 p-3 bg-zinc-950/50 rounded-lg border border-zinc-800/50">
                        <span className="text-indigo-500 font-mono text-xs font-bold w-4">{index + 1}.</span>
                        <p className="text-xs text-zinc-300 leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Footer Info */}
        <footer className="mt-16 pt-8 border-t border-zinc-800/50 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-md">
              <ShieldAlert size={12} className="text-amber-500" />
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tight">Use with Caution</span>
            </div>
          </div>
          
          <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-medium">
            © 2026 JBR Unlock Utility
          </p>
        </footer>
      </div>
    </div>
  );
}
