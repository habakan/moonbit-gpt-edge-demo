import { useState, useRef, useCallback, useEffect } from 'react';
import { mbt, isMbtReady } from '../mbt/ffi';

const NUM_STEPS = 2000;
const VIZ_INTERVAL = 5;

export interface TrainingState {
  initialized: boolean;
  running: boolean;
  step: number;
  loss: number;
  losses: number[];
  currentGPT: boolean;
}

export interface TrainingActions {
  start: (phrase: string, onViz: (phrase: string) => void, onEmbViz: () => void) => void;
  pause: () => void;
  reset: () => void;
  switchMode: (useGPT: boolean) => void;
  ensureInit: (_isGPT: boolean, onNetworkViz: () => void) => void;
}

export function useTraining(): TrainingState & TrainingActions & { numSteps: number } {
  const [initialized, setInitialized] = useState(false);
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(0);
  const [loss, setLoss] = useState(-1);
  const [losses, setLosses] = useState<number[]>([]);
  const [currentGPT, setCurrentGPT] = useState(false);

  const runningRef = useRef(false);
  const initializedRef = useRef(false);
  const rafIdRef = useRef<number>(0);

  const ensureInit = useCallback((_isGPT: boolean, onNetworkViz: () => void) => {
    if (initializedRef.current) return;
    mbt.init();
    initializedRef.current = true;
    setInitialized(true);
    setTimeout(() => {
      try { onNetworkViz(); } catch (e) { console.error('viz error:', e); }
    }, 0);
  }, []);

  const doStep = useCallback(
    (phrase: string, onViz: (phrase: string) => void, onEmbViz: () => void) => {
      const lossVal = mbt.trainStep();
      const stepVal = mbt.getStep();

      if (lossVal >= 0) {
        setLosses(prev => [...prev, lossVal]);
      }
      setStep(stepVal);
      setLoss(lossVal);

      if (stepVal > 0 && stepVal % VIZ_INTERVAL === 0) {
        try {
          onViz(phrase);
          onEmbViz();
        } catch (e) { console.error('viz error:', e); }
      }

      if (stepVal >= NUM_STEPS || lossVal < 0) {
        runningRef.current = false;
        setRunning(false);
        onViz(phrase);
        onEmbViz();
      }
    },
    []
  );

  const trainLoop = useCallback(
    (phrase: string, onViz: (phrase: string) => void, onEmbViz: () => void) => {
      if (!runningRef.current) return;
      doStep(phrase, onViz, onEmbViz);
      rafIdRef.current = requestAnimationFrame(() => trainLoop(phrase, onViz, onEmbViz));
    },
    [doStep]
  );

  const start = useCallback(
    (phrase: string, onViz: (phrase: string) => void, onEmbViz: () => void) => {
      if (runningRef.current) return;
      if (!isMbtReady()) return;
      runningRef.current = true;
      setRunning(true);
      rafIdRef.current = requestAnimationFrame(() => trainLoop(phrase, onViz, onEmbViz));
    },
    [trainLoop]
  );

  const pause = useCallback(() => {
    runningRef.current = false;
    setRunning(false);
    cancelAnimationFrame(rafIdRef.current);
  }, []);

  const reset = useCallback(() => {
    runningRef.current = false;
    cancelAnimationFrame(rafIdRef.current);
    initializedRef.current = false;
    setRunning(false);
    setInitialized(false);
    setStep(0);
    setLoss(-1);
    setLosses([]);
  }, []);

  useEffect(() => {
    return () => {
      runningRef.current = false;
      cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  const switchMode = useCallback((useGPT: boolean) => {
    mbt.setGptMode(useGPT);
    setCurrentGPT(useGPT);
  }, []);

  return {
    initialized,
    running,
    step,
    loss,
    losses,
    currentGPT,
    numSteps: NUM_STEPS,
    start,
    pause,
    reset,
    switchMode,
    ensureInit,
  };
}
