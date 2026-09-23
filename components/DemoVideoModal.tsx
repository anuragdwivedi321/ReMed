"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  X,
  CheckCircle2,
  Scan,
  ShieldCheck,
  Truck,
  Banknote,
  QrCode,
  MapPin,
  Sparkles,
  Smartphone,
  ArrowRight,
  Clock,
  Maximize2,
  Minimize2,
} from "lucide-react";

interface DemoVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface StepInfo {
  id: number;
  title: string;
  shortTitle: string;
  startTime: number;
  endTime: number;
  hindiTitle: string;
  hindiSpeech: string;
  englishSpeech: string;
  hindiSubtitle: string;
  englishSubtitle: string;
}

const STEPS: StepInfo[] = [
  {
    id: 1,
    title: "Step 1: One-Click Login / Signup",
    shortTitle: "1. Login",
    startTime: 0,
    endTime: 9,
    hindiTitle: "स्टेप 1: मोबाइल नंबर से आसान लॉगिन",
    hindiSpeech: "स्टेप 1: सबसे पहले अपने मोबाइल नंबर से लॉगिन करें। 6 अंकों का ओटीपी डालते ही आपका अकाउंट तुरंत वेरिफाई हो जाता है।",
    englishSpeech: "Step 1: Fast login with your mobile number. Instant OTP verification connects your secure account.",
    hindiSubtitle: "स्टेप 1: अपने 10-अंकों के मोबाइल नंबर से लॉगिन करें। OTP डालते ही अकाउंट तुरंत सुरक्षित शुरू हो जाता है।",
    englishSubtitle: "Step 1: Enter your mobile number. Instant 6-digit OTP verification logs you in securely in 5 seconds.",
  },
  {
    id: 2,
    title: "Step 2: AI Medicine Camera Scan",
    shortTitle: "2. AI Scan",
    startTime: 9,
    endTime: 18,
    hindiTitle: "स्टेप 2: दवाई की स्ट्रिप को स्कैन करें",
    hindiSpeech: "स्टेप 2: अपने फोन के कैमरे से दवाई की स्ट्रिप स्कैन करें। हमारा स्मार्ट एआई खुद नाम, बैच नंबर और एक्सपायरी डेट पहचान लेता है।",
    englishSpeech: "Step 2: Scan your medicine strip with the camera. Our AI automatically detects brand, batch number, and expiry date.",
    hindiSubtitle: "स्टेप 2: कैमरे से दवाई की फोटो लें। हमारा AI अपने आप ब्रांड नाम, बैच नंबर और एक्सपायरी डेट पहचान लेता है।",
    englishSubtitle: "Step 2: Snap a photo. ReMeD AI instantly recognizes medicine name, batch number, and expiry date.",
  },
  {
    id: 3,
    title: "Step 3: Instant Fair Valuation",
    shortTitle: "3. Valuation",
    startTime: 18,
    endTime: 27,
    hindiTitle: "स्टेप 3: तुरंत कैश बैक वैल्यू कैलकुलेट",
    hindiSpeech: "स्टेप 3: रीमेड का स्मार्ट एल्गोरिदम दवाई की सील और एक्सपायरी चेक करके सबसे बेस्ट फेयर कैश बैक प्राइस बताता है।",
    englishSpeech: "Step 3: ReMeD algorithm verifies strip condition and gives you an instant, transparent cashback quote.",
    hindiSubtitle: "स्टेप 3: रीमेड एल्गोरिदम दवाई की वैलिडिटी चेक करके तुरंत फेयर कैश बैक प्राइस कैलकुलेट करता है।",
    englishSubtitle: "Step 3: Real-time price calculation ensures maximum cashback for unexpired, sealed medicines.",
  },
  {
    id: 4,
    title: "Step 4: Schedule Doorstep Pickup",
    shortTitle: "4. Pickup Slot",
    startTime: 27,
    endTime: 36,
    hindiTitle: "स्टेप 4: डोरस्टेप पिकअप शेड्यूल करें",
    hindiSpeech: "स्टेप 4: अपना एड्रेस और पसंदीदा टाइम स्लॉट चुनें। रीमेड का वेरिफाइड डिलीवरी एजेंट आपके घर पिकअप के लिए असाइन हो जाता है।",
    englishSpeech: "Step 4: Select your home address and preferred time slot. A certified ReMeD agent is scheduled for doorstep pickup.",
    hindiSubtitle: "स्टेप 4: अपना पता और मनपसंद टाइम चुनें। रीमेड का वेरिफाइड एजेंट आपके घर के लिए शेड्यूल हो जाता है।",
    englishSubtitle: "Step 4: Pick your address and time slot. A verified ReMeD executive is scheduled for free doorstep collection.",
  },
  {
    id: 5,
    title: "Step 5: Doorstep Verification & Instant Payout",
    shortTitle: "5. UPI Payout",
    startTime: 36,
    endTime: 45,
    hindiTitle: "स्टेप 5: डोरस्टेप वेरिफिकेशन और तुरंत बैंक पेमेंट",
    hindiSpeech: "स्टेप 5: एजेंट आपके घर आकर दवाई चेक करता है और तुरंत आपके यूपीआई या बैंक खाते में पैसे ट्रांसफर हो जाते हैं।",
    englishSpeech: "Step 5: The agent inspects medicines at your doorstep, and cashback is instantly transferred to your UPI account.",
    hindiSubtitle: "स्टेप 5: एजेंट घर आकर स्ट्रिप चेक करता है और सेकंडों में यूपीआई (GPay/PhonePe) में पैसे ट्रांसफर हो जाते हैं!",
    englishSubtitle: "Step 5: Quick doorstep verification and instant UPI transfer directly into your Google Pay / PhonePe / Bank!",
  },
];

const TOTAL_DURATION = 45; // seconds

export default function DemoVideoModal({ isOpen, onClose }: DemoVideoModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [speed, setSpeed] = useState<number>(1);
  const [voiceLanguage, setVoiceLanguage] = useState<"hi" | "en">("hi");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const videoContainerRef = useRef<HTMLDivElement>(null);
  const lastSpokenStepRef = useRef<number>(-1);
  const speechTimerRef = useRef<NodeJS.Timeout | null>(null);

  const voiceLanguageRef = useRef(voiceLanguage);
  const soundEnabledRef = useRef(soundEnabled);
  const speedRef = useRef(speed);
  const activeStepIndexRef = useRef(activeStepIndex);
  const isPlayingRef = useRef(isPlaying);

  // Keep refs in sync with state in an effect
  useEffect(() => {
    voiceLanguageRef.current = voiceLanguage;
    soundEnabledRef.current = soundEnabled;
    speedRef.current = speed;
    activeStepIndexRef.current = activeStepIndex;
    isPlayingRef.current = isPlaying;
  }, [voiceLanguage, soundEnabled, speed, activeStepIndex, isPlaying]);

  // Determine current active step
  const currentStep = STEPS[activeStepIndex] || STEPS[0];

  // Speech Narration handler - stable callback with zero external reactive dependencies
  const speakStep = useCallback((stepIdx: number, langOverride?: "hi" | "en") => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    // Cancel any active speech synthesis and pending timers
    window.speechSynthesis.cancel();
    if (speechTimerRef.current) {
      clearTimeout(speechTimerRef.current);
      speechTimerRef.current = null;
    }

    if (!soundEnabledRef.current) {
      return;
    }

    const targetLang = langOverride || voiceLanguageRef.current;
    const currentSpd = speedRef.current;
    const step = STEPS[stepIdx];
    if (!step) return;

    const textToSpeak =
      targetLang === "hi" ? step.hindiSpeech : step.englishSpeech;

    // Small delay ensures Chromium resets its audio channel cleanly
    speechTimerRef.current = setTimeout(() => {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = targetLang === "hi" ? "hi-IN" : "en-US";
        utterance.rate = 1.05 * currentSpd;
        utterance.pitch = 1.0;
        window.speechSynthesis.speak(utterance);
      } catch {
        // Ignore speech synthesis errors gracefully
      }
    }, 60);
  }, []);

  // Reset playback state during render when isOpen changes
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (prevIsOpen !== isOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setCurrentTime(0);
      setActiveStepIndex(0);
      setIsPlaying(true);
    }
  }

  // Handle language switch cleanly without dual audio
  const handleLanguageChange = useCallback(
    (newLang: "hi" | "en") => {
      if (voiceLanguageRef.current === newLang) return;

      // 1. Immediately cancel any currently playing or queued utterance
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      if (speechTimerRef.current) {
        clearTimeout(speechTimerRef.current);
        speechTimerRef.current = null;
      }

      // 2. Set new language state & ref
      voiceLanguageRef.current = newLang;
      setVoiceLanguage(newLang);

      // 3. Immediately speak current step in the new language
      speakStep(activeStepIndexRef.current, newLang);
      lastSpokenStepRef.current = activeStepIndexRef.current;
    },
    [speakStep]
  );

  // Handle sound toggle
  const handleSoundToggle = useCallback(() => {
    if (soundEnabledRef.current) {
      soundEnabledRef.current = false;
      setSoundEnabled(false);
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      if (speechTimerRef.current) {
        clearTimeout(speechTimerRef.current);
        speechTimerRef.current = null;
      }
    } else {
      soundEnabledRef.current = true;
      setSoundEnabled(true);
      speakStep(activeStepIndexRef.current);
      lastSpokenStepRef.current = activeStepIndexRef.current;
    }
  }, [speakStep]);

  // Handle Play/Pause
  const handleTogglePlay = useCallback(() => {
    setIsPlaying((prev) => {
      const next = !prev;
      isPlayingRef.current = next;
      if (!next) {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
          window.speechSynthesis.cancel();
        }
        if (speechTimerRef.current) {
          clearTimeout(speechTimerRef.current);
          speechTimerRef.current = null;
        }
      } else {
        speakStep(activeStepIndexRef.current);
      }
      return next;
    });
  }, [speakStep]);

  // Handle close
  const handleClose = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    if (speechTimerRef.current) {
      clearTimeout(speechTimerRef.current);
      speechTimerRef.current = null;
    }
    onClose();
  }, [onClose]);

  // Open/Close DOM and Speech side-effects
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      lastSpokenStepRef.current = 0;
      const timer = setTimeout(() => {
        speakStep(0);
      }, 350);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
          window.speechSynthesis.cancel();
        }
        if (speechTimerRef.current) {
          clearTimeout(speechTimerRef.current);
          speechTimerRef.current = null;
        }
      };
    } else {
      document.body.style.overflow = "";
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      if (speechTimerRef.current) {
        clearTimeout(speechTimerRef.current);
        speechTimerRef.current = null;
      }
    }
  }, [isOpen, speakStep]);

  // Keyboard shortcut listener (Escape to close, Space to play/pause)
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        handleClose();
      } else if (e.key === " " && e.target === document.body) {
        e.preventDefault();
        handleTogglePlay();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose, handleTogglePlay]);

  // Main playback loop
  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const intervalMs = 100;

    const interval = setInterval(() => {
      const increment = (intervalMs / 1000) * speedRef.current;
      setCurrentTime((prev) => {
        const next = prev + increment;
        if (next >= TOTAL_DURATION) {
          setIsPlaying(false);
          isPlayingRef.current = false;
          return TOTAL_DURATION;
        }

        // Determine step index based on time
        const newStepIndex = STEPS.findIndex(
          (s) => next >= s.startTime && next < s.endTime
        );
        if (newStepIndex !== -1 && newStepIndex !== activeStepIndexRef.current) {
          setActiveStepIndex(newStepIndex);
          activeStepIndexRef.current = newStepIndex;
          if (lastSpokenStepRef.current !== newStepIndex) {
            speakStep(newStepIndex);
            lastSpokenStepRef.current = newStepIndex;
          }
        }

        return next;
      });
    }, intervalMs);

    return () => clearInterval(interval);
  }, [isOpen, isPlaying, speakStep]);

  // Jump to specific step
  function jumpToStep(stepIdx: number) {
    const targetTime = STEPS[stepIdx].startTime;
    setCurrentTime(targetTime);
    setActiveStepIndex(stepIdx);
    activeStepIndexRef.current = stepIdx;
    setIsPlaying(true);
    isPlayingRef.current = true;
    speakStep(stepIdx);
    lastSpokenStepRef.current = stepIdx;
  }

  // Restart video
  function handleRestart() {
    setCurrentTime(0);
    setActiveStepIndex(0);
    activeStepIndexRef.current = 0;
    setIsPlaying(true);
    isPlayingRef.current = true;
    speakStep(0);
    lastSpokenStepRef.current = 0;
  }

  // Toggle fullscreen
  function toggleFullscreen() {
    if (!videoContainerRef.current) return;
    if (!isFullscreen) {
      if (videoContainerRef.current.requestFullscreen) {
        videoContainerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  }

  if (!isOpen) return null;

  const progressPercent = Math.min(100, (currentTime / TOTAL_DURATION) * 100);
  const formattedCurrentTime = `0:${Math.floor(currentTime).toString().padStart(2, "0")}`;
  const formattedTotalTime = `0:${TOTAL_DURATION}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="ReMeD Product Walkthrough Video"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        ref={videoContainerRef}
        className="relative flex flex-col w-full max-w-4xl max-h-[94vh] rounded-3xl border border-slate-700/80 bg-slate-900 shadow-2xl shadow-blue-500/20 overflow-hidden text-white"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/90 px-4 sm:px-6 py-3 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#0072d2] text-white shadow-xs">
              <Play size={16} className="fill-white ml-0.5" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-white tracking-wide flex items-center gap-2">
                ReMeD Walkthrough Video
                <span className="hidden min-[480px]:inline-flex items-center rounded-full bg-emerald-500/20 text-emerald-400 px-2 py-0.5 text-[10px] font-semibold border border-emerald-500/30">
                  Login to Doorstep Pickup
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">
                {currentStep.hindiTitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language voice toggle */}
            <div className="flex items-center rounded-xl bg-slate-800 p-0.5 border border-slate-700 text-xs font-bold">
              <button
                type="button"
                onClick={() => handleLanguageChange("hi")}
                className={`rounded-lg px-2.5 py-1 transition-all ${
                  voiceLanguage === "hi"
                    ? "bg-[#0072d2] text-white shadow-xs"
                    : "text-slate-400 hover:text-white"
                }`}
                title="Hindi Voiceover"
              >
                हिंदी
              </button>
              <button
                type="button"
                onClick={() => handleLanguageChange("en")}
                className={`rounded-lg px-2.5 py-1 transition-all ${
                  voiceLanguage === "en"
                    ? "bg-[#0072d2] text-white shadow-xs"
                    : "text-slate-400 hover:text-white"
                }`}
                title="English Voiceover"
              >
                ENG
              </button>
            </div>

            {/* Sound toggle */}
            <button
              type="button"
              onClick={handleSoundToggle}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-all"
              aria-label={soundEnabled ? "Mute narration" : "Unmute narration"}
              title={soundEnabled ? "Mute Voiceover" : "Enable Voiceover"}
            >
              {soundEnabled ? (
                <Volume2 size={16} className="text-emerald-400" />
              ) : (
                <VolumeX size={16} className="text-slate-400" />
              )}
            </button>

            {/* Close button */}
            <button
              type="button"
              onClick={handleClose}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 text-slate-300 hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-400 transition-all"
              aria-label="Close walkthrough"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Video Canvas / Animation Stage */}
        <div className="relative flex-1 min-h-[300px] sm:min-h-[380px] md:min-h-[420px] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden select-none">
          {/* Ambient Video Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[500px] bg-[#0072d2]/15 blur-3xl rounded-full pointer-events-none -z-0" />

          {/* Current Step Watermark Badge */}
          <div className="absolute top-3 left-4 z-10 flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-950/70 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-sky-300 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            {currentStep.title}
          </div>

          {/* ========================================================= */}
          {/* SCENE 1: LOGIN & SIGNUP (0 - 9s)                         */}
          {/* ========================================================= */}
          {activeStepIndex === 0 && (
            <div className="relative z-10 flex flex-col items-center max-w-md w-full animate-in zoom-in-95 duration-300">
              <div className="w-full rounded-2xl border border-slate-700 bg-slate-800/90 p-5 sm:p-6 shadow-2xl backdrop-blur-md">
                <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                  <div className="flex items-center gap-2">
                    <Smartphone size={18} className="text-[#0072d2]" />
                    <span className="text-xs font-bold text-slate-300">
                      ReMeD Mobile Login
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded-full">
                    Instant OTP
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  <div>
                    <label className="text-[11px] font-medium text-slate-400">
                      Mobile Number
                    </label>
                    <div className="mt-1 flex items-center rounded-xl border border-sky-500/50 bg-slate-900 px-3 py-2.5 text-sm font-mono text-white shadow-inner">
                      <span className="text-slate-400 mr-2 font-sans font-semibold">
                        🇮🇳 +91
                      </span>
                      <span className="text-sky-300 font-bold tracking-wider">
                        98765 43210
                      </span>
                      <span className="ml-1 inline-block h-4 w-0.5 bg-sky-400 animate-pulse" />
                    </div>
                  </div>

                  <div className="pt-1">
                    <label className="text-[11px] font-medium text-slate-400">
                      6-Digit One-Time Password
                    </label>
                    <div className="mt-1 grid grid-cols-6 gap-1.5 sm:gap-2 text-center font-mono font-bold text-lg text-emerald-300">
                      {["4", "8", "2", "9", "1", "0"].map((digit, i) => (
                        <div
                          key={i}
                          className="flex h-10 items-center justify-center rounded-lg border border-emerald-500/40 bg-emerald-950/40 shadow-xs animate-in fade-in"
                          style={{ animationDelay: `${i * 150}ms` }}
                        >
                          {digit}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 py-2.5 px-4 text-xs font-bold text-slate-950 shadow-md shadow-emerald-500/20">
                    <CheckCircle2 size={16} /> Logged In: Rahul Sharma
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* SCENE 2: AI SCAN MEDICINE (9 - 18s)                       */}
          {/* ========================================================= */}
          {activeStepIndex === 1 && (
            <div className="relative z-10 flex flex-col items-center max-w-lg w-full animate-in zoom-in-95 duration-300">
              <div className="relative w-full rounded-2xl border-2 border-dashed border-sky-400/60 bg-slate-800/80 p-5 shadow-2xl backdrop-blur-md overflow-hidden">
                {/* Laser scan beam animation */}
                <div className="pointer-events-none absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10b981] animate-bounce" />

                <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                  <div className="flex items-center gap-2">
                    <Scan size={18} className="text-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold text-slate-200">
                      Live AI Viewfinder
                    </span>
                  </div>
                  <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/40">
                    OCR Scan Active
                  </span>
                </div>

                {/* Simulated medicine blister pack */}
                <div className="mt-4 rounded-xl border border-slate-600 bg-slate-900/90 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="inline-block rounded-md bg-sky-500/20 px-2 py-0.5 text-[10px] font-bold text-sky-300">
                        Rx Prescription
                      </div>
                      <h4 className="mt-1 text-base font-extrabold text-white">
                        Azithromycin Tablets IP 500mg
                      </h4>
                      <p className="text-xs text-slate-400">
                        10 Tablets / Strip • Sealed Blister
                      </p>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-900/40 text-sky-400 border border-sky-700">
                      <QrCode size={20} />
                    </div>
                  </div>

                  {/* AI Detected Tag Pills */}
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                    <div className="rounded-lg border border-slate-700 bg-slate-800/90 p-2">
                      <span className="text-[10px] text-slate-400 block">
                        Batch Number
                      </span>
                      <span className="font-mono font-bold text-sky-300">
                        AZ-82914-B
                      </span>
                    </div>
                    <div className="rounded-lg border border-emerald-500/40 bg-emerald-950/40 p-2">
                      <span className="text-[10px] text-emerald-400 block font-semibold">
                        Expiry Date Detected
                      </span>
                      <span className="font-mono font-bold text-emerald-300">
                        12 / 2026 (Valid ✓)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-[#0072d2] py-2 px-3 text-xs font-bold text-white shadow-md">
                  <Sparkles size={14} /> AI Analysis Complete: 18 Months Validity Remaining
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* SCENE 3: INSTANT VALUATION (18 - 27s)                     */}
          {/* ========================================================= */}
          {activeStepIndex === 2 && (
            <div className="relative z-10 flex flex-col items-center max-w-md w-full animate-in zoom-in-95 duration-300">
              <div className="w-full rounded-2xl border border-slate-700 bg-slate-800/90 p-5 sm:p-6 shadow-2xl backdrop-blur-md">
                <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                  <div className="flex items-center gap-2">
                    <Banknote size={18} className="text-[#ff6b2b]" />
                    <span className="text-xs font-bold text-slate-200">
                      Instant Value Quotation
                    </span>
                  </div>
                  <span className="rounded-full bg-orange-500/20 px-2 py-0.5 text-[10px] font-bold text-orange-400 border border-orange-500/40">
                    Live Calculation
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-300 pb-2 border-b border-slate-700/60">
                    <span>Retail MRP (Printed)</span>
                    <span className="font-mono line-through text-slate-400">
                      ₹240.00
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-300 pb-2 border-b border-slate-700/60">
                    <span>Condition Verification</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <ShieldCheck size={13} /> 100% Intact &amp; Sealed
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-300 pb-2 border-b border-slate-700/60">
                    <span>Pickup &amp; Handling</span>
                    <span className="text-sky-400 font-bold">FREE (₹0.00)</span>
                  </div>

                  {/* Highlighted Value Card */}
                  <div className="mt-3 rounded-xl border border-orange-500/40 bg-gradient-to-br from-orange-950/40 to-slate-900 p-4 text-center">
                    <span className="text-[11px] font-semibold text-orange-300 uppercase tracking-wider">
                      Guaranteed Doorstep Cash Back
                    </span>
                    <div className="mt-1 font-display text-4xl font-extrabold text-[#ff6b2b] tracking-tight">
                      ₹180.00
                    </div>
                    <span className="mt-1 inline-block text-[11px] text-slate-300">
                      Instant UPI Transfer on Pickup
                    </span>
                  </div>

                  <div className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ff6b2b] to-[#f97316] py-2.5 px-4 text-xs font-bold text-white shadow-md shadow-orange-500/20">
                    Offer Accepted <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* SCENE 4: SCHEDULE DOORSTEP PICKUP (27 - 36s)              */}
          {/* ========================================================= */}
          {activeStepIndex === 3 && (
            <div className="relative z-10 flex flex-col items-center max-w-lg w-full animate-in zoom-in-95 duration-300">
              <div className="w-full rounded-2xl border border-slate-700 bg-slate-800/90 p-5 shadow-2xl backdrop-blur-md">
                <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                  <div className="flex items-center gap-2">
                    <Truck size={18} className="text-[#0072d2]" />
                    <span className="text-xs font-bold text-slate-200">
                      Doorstep Pickup Scheduled
                    </span>
                  </div>
                  <span className="rounded-full bg-sky-500/20 px-2 py-0.5 text-[10px] font-bold text-sky-400 border border-sky-500/40">
                    Agent Dispatched
                  </span>
                </div>

                <div className="mt-4 space-y-2.5">
                  {/* Address card */}
                  <div className="flex items-start gap-2.5 rounded-xl border border-slate-700 bg-slate-900/90 p-3">
                    <MapPin size={18} className="text-[#ff6b2b] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] font-bold text-white block">
                        Pickup Address: Flat 402, Green Heights
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Sector 62, Noida, Uttar Pradesh • 201301
                      </span>
                    </div>
                  </div>

                  {/* Slot card */}
                  <div className="flex items-center justify-between rounded-xl border border-sky-500/30 bg-sky-950/30 p-3">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-sky-400" />
                      <div>
                        <span className="text-xs font-bold text-sky-200 block">
                          Slot: Tomorrow, 10:00 AM - 1:00 PM
                        </span>
                        <span className="text-[10px] text-slate-400">
                          Free contactless doorstep collection
                        </span>
                      </div>
                    </div>
                    <span className="rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 border border-emerald-500/30">
                      Confirmed
                    </span>
                  </div>

                  {/* Delivery Executive Card */}
                  <div className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-900/80 p-3">
                    <div className="flex items-center gap-2.5">
                      <div className="h-9 w-9 rounded-full bg-[#0072d2] flex items-center justify-center font-bold text-white text-xs border border-sky-300/40">
                        VK
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block">
                          Executive: Vikram Kumar
                        </span>
                        <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
                          <ShieldCheck size={11} /> ReMeD Health Certified • Vaccinated
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-sky-300 font-bold bg-sky-900/50 px-2.5 py-1 rounded-lg border border-sky-700/50">
                      <Truck size={14} className="animate-pulse" /> On Route
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* SCENE 5: DOORSTEP VERIFICATION & PAYOUT (36 - 45s)        */}
          {/* ========================================================= */}
          {activeStepIndex === 4 && (
            <div className="relative z-10 flex flex-col items-center max-w-md w-full animate-in zoom-in-95 duration-300">
              <div className="w-full rounded-2xl border border-emerald-500/40 bg-slate-800/90 p-5 sm:p-6 shadow-2xl backdrop-blur-md">
                <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-emerald-400" />
                    <span className="text-xs font-bold text-slate-200">
                      Doorstep Inspection &amp; Transfer
                    </span>
                  </div>
                  <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/40">
                    Verified ✓
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-3.5 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-300 shrink-0">
                      <QrCode size={20} />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-emerald-300 block">
                        Medicines Scanned &amp; Handed Over
                      </span>
                      <span className="text-[10px] text-slate-300">
                        Doorstep executive verified tamper seal &amp; batch
                      </span>
                    </div>
                  </div>

                  {/* UPI Alert Notification Popup */}
                  <div className="rounded-2xl border-2 border-emerald-400 bg-gradient-to-r from-emerald-900/60 to-slate-900 p-4 shadow-lg shadow-emerald-500/20 animate-in slide-in-from-bottom-2 duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-md bg-white flex items-center justify-center font-bold text-blue-600 text-[10px]">
                          UPI
                        </div>
                        <span className="text-[11px] font-bold text-emerald-300">
                          Payment Received Successfully!
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400">Just now</span>
                    </div>

                    <div className="mt-2 flex items-baseline justify-between">
                      <span className="text-xs text-slate-300">
                        Credited to Bank Account
                      </span>
                      <span className="font-display text-2xl font-extrabold text-emerald-400">
                        +₹180.00
                      </span>
                    </div>
                    <p className="mt-1 text-[10px] text-slate-400">
                      Ref ID: UPI/391028301928 • ReMeD Buyback Payout
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-center gap-2">
                    <span className="text-xs font-bold text-slate-300">
                      🎉 Deal Complete! Safe &amp; Responsible Recycling
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Subtitles Overlay Bar */}
          <div className="absolute bottom-3 inset-x-4 sm:inset-x-8 z-20 rounded-xl border border-slate-700/80 bg-slate-950/80 backdrop-blur-md px-4 py-2 text-center shadow-lg">
            <p className="text-xs sm:text-sm font-semibold text-sky-200">
              {voiceLanguage === "hi"
                ? currentStep.hindiSubtitle
                : currentStep.englishSubtitle}
            </p>
          </div>
        </div>

        {/* Timeline & Step Scrubber Bar */}
        <div className="border-t border-slate-800 bg-slate-950 px-4 sm:px-6 pt-3 pb-2 shrink-0">
          {/* Progress track */}
          <div
            className="relative h-2.5 w-full rounded-full bg-slate-800 cursor-pointer overflow-hidden"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const fraction = Math.max(0, Math.min(1, clickX / rect.width));
              const targetTime = fraction * TOTAL_DURATION;
              setCurrentTime(targetTime);
              const newStepIdx = STEPS.findIndex(
                (s) => targetTime >= s.startTime && targetTime < s.endTime
              );
              if (newStepIdx !== -1) {
                setActiveStepIndex(newStepIdx);
                activeStepIndexRef.current = newStepIdx;
                speakStep(newStepIdx);
                lastSpokenStepRef.current = newStepIdx;
              }
            }}
          >
            <div
              className="h-full bg-gradient-to-r from-[#0072d2] via-[#ff6b2b] to-emerald-400 transition-all duration-100 ease-linear rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* 5 Step Quick Jump Buttons */}
          <div className="mt-2.5 grid grid-cols-5 gap-1 sm:gap-2">
            {STEPS.map((step, idx) => {
              const isActive = activeStepIndex === idx;
              const isPast = currentTime > step.endTime;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => jumpToStep(idx)}
                  className={`rounded-lg py-1 px-1 sm:px-2 text-center text-[10px] sm:text-xs font-bold transition-all truncate ${
                    isActive
                      ? "bg-[#0072d2] text-white shadow-xs"
                      : isPast
                      ? "bg-slate-800/80 text-emerald-400 hover:bg-slate-800"
                      : "bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                  title={step.title}
                >
                  <span className="hidden min-[500px]:inline">{step.shortTitle}</span>
                  <span className="min-[500px]:hidden">{idx + 1}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Video Player Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80 bg-slate-950 px-4 sm:px-6 py-3 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Play/Pause */}
            <button
              type="button"
              onClick={handleTogglePlay}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-950 hover:bg-slate-200 active:scale-95 transition-all shadow-xs"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
            </button>

            {/* Restart */}
            <button
              type="button"
              onClick={handleRestart}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
              aria-label="Replay video"
              title="Restart from beginning"
            >
              <RotateCcw size={16} />
            </button>

            {/* Time Indicator */}
            <div className="text-xs font-mono font-medium text-slate-400 pl-1">
              <span className="text-white font-bold">{formattedCurrentTime}</span> / {formattedTotalTime}
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Playback speed */}
            <button
              type="button"
              onClick={() => {
                const speeds = [1, 1.25, 1.5];
                const nextSpeed = speeds[(speeds.indexOf(speed) + 1) % speeds.length];
                setSpeed(nextSpeed);
              }}
              className="rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1 text-xs font-mono font-bold text-slate-300 hover:bg-slate-800 transition-all"
              title="Change Speed"
            >
              {speed}x
            </button>

            {/* Fullscreen toggle */}
            <button
              type="button"
              onClick={toggleFullscreen}
              className="hidden sm:flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
              aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
              {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
            </button>

            {/* Try It CTA button */}
            <Link
              href="/sell"
              onClick={onClose}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#ff6b2b] to-[#f97316] px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-md shadow-orange-500/25 hover:brightness-105 active:scale-95 transition-all"
            >
              Start Selling <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
