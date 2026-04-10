import { useState, useRef, useCallback, useEffect } from 'react';
import { Toolbar, PanelSidebar } from './components/Toolbar';
import { FloatingPanel } from './components/FloatingPanel';
import { ArchCanvas } from './components/ArchCanvas';
import { LossModal } from './components/LossModal';
import { TrainingPanel } from './components/panels/TrainingPanel';
import { GenPanel } from './components/panels/GenPanel';
import { AttnPanel } from './components/panels/AttnPanel';
import { EmbPanel } from './components/panels/EmbPanel';
import { EmbPcaPanel } from './components/panels/EmbPcaPanel';
import { HiddenPanel } from './components/panels/HiddenPanel';
import { MlpPanel } from './components/panels/MlpPanel';
import { PredPanel } from './components/panels/PredPanel';
import { DatasetPanel } from './components/panels/DatasetPanel';
import { useTraining } from './hooks/useTraining';
import { usePcaCanvas } from './hooks/usePcaCanvas';
import { LiveBadge } from './components/LiveBadge';
import { mbt, isMbtReady } from './mbt/ffi';
import { executeDisplayList } from './canvas/displayList';

// Panel z-index management
const BASE_Z = 400;

interface VizState {
  attnFlat: number[];
  seq: number;
  tokens: string[];
  hiddenFlat: number[];
  mlpFlat: number[];
  logitsFlat: number[];
  vocab: string[];
  embTrigger: number;
  predOutput: string;
}

export default function App() {
  const [srcPhrase, setSrcPhrase] = useState('heat olive oil');
  const [openPanels, setOpenPanels] = useState<Set<string>>(new Set());
  const [panelOrder, setPanelOrder] = useState<string[]>([]);
  const [lossModalVisible, setLossModalVisible] = useState(false);
  const [viz, setViz] = useState<VizState>({
    attnFlat: [], seq: 0, tokens: [],
    hiddenFlat: [], mlpFlat: [], logitsFlat: [],
    vocab: [], embTrigger: 0,
    predOutput: '–',
  });

  const netCanvasRef = useRef<HTMLCanvasElement>(null);
  const embPcaCanvasRef = useRef<HTMLCanvasElement>(null);
  const residualPcaCanvasRef = useRef<HTMLCanvasElement>(null);
  const srcPhraseRef = useRef(srcPhrase);
  useEffect(() => { srcPhraseRef.current = srcPhrase; }, [srcPhrase]);
  const useSkipRef = useRef(true);
  const usePosEmbRef = useRef(true);
  const useAttnRef = useRef(true);

  const runNetworkViz = useCallback(() => {
    if (!netCanvasRef.current) return;
    const phrase = srcPhraseRef.current.trim().toLowerCase() || 'heat olive oil';
    try { mbt.runNetworkViz(phrase, 0); } catch (e) { console.error('run_network_viz error:', e); return; }
    const tgt_len = mbt.getNetworkVizTgtLen();
    if (tgt_len === 0) return;
    const predToks = mbt.getNetworkVizTgtTokens().split('|').filter(t => t && t !== '<BOS>' && t !== '<EOS>');
    const predText = predToks.join(' ');

    try {
      const dpr = window.devicePixelRatio || 1;
      const archCtx = netCanvasRef.current!.getContext('2d');
      if (archCtx) {
        const archCmds = mbt.drawArchDiagram(useSkipRef.current, usePosEmbRef.current, useAttnRef.current, dpr);
        executeDisplayList(archCtx, archCmds);
      }
    } catch (e) { console.error('drawArchDiagram error:', e); }

    setViz(prev => ({ ...prev, predOutput: predText || '(empty)' }));
  }, []);

  const runAllViz = useCallback((phrase: string) => {
    const p = (phrase || '').trim().toLowerCase();
    if (!p) return;
    mbt.runAttnViz(p);
    const seq = mbt.getVizSeqLen();
    const tokens = seq > 0 ? mbt.getVizTokens().split('|') : [];
    const attnFlat = seq > 0 ? mbt.getVizAttnFlat() : [];
    const hiddenFlat = mbt.getVizHiddenFlat();
    const mlpFlat = mbt.getVizMlpActsFlat();
    const logitsFlat = mbt.getVizLogitsFlat();
    const vocab = mbt.getVocabString().split('|');
    setViz(prev => ({
      ...prev,
      attnFlat, seq, tokens,
      hiddenFlat, mlpFlat, logitsFlat, vocab,
    }));
    runNetworkViz();
  }, [runNetworkViz]);

  // PCA rAFアニメーションループ（60fps, lerp描画）
  usePcaCanvas(embPcaCanvasRef, residualPcaCanvasRef);

  // N stepごとにPCA計算（重い処理）をトリガー
  const runEmbVizCallback = useCallback(() => {
    setViz(prev => ({ ...prev, embTrigger: prev.embTrigger + 1 }));
    const phrase = srcPhraseRef.current.trim().toLowerCase() || 'heat olive oil';
    try { mbt.computePca(); } catch (_) { /* ignore */ }
    try { mbt.runResidualViz(phrase); } catch (_) { /* ignore */ }
  }, []);

  const [useSkip, setUseSkip] = useState(true);
  const [usePosEmb, setUsePosEmb] = useState(true);
  const [useAttn, setUseAttn] = useState(true);

  const {
    initialized, running, step, loss, losses, currentGPT, numSteps,
    start, pause, reset, switchMode, ensureInit,
  } = useTraining();

  // initial check - runs once on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (isMbtReady()) {
      ensureInit(false, runNetworkViz);
    }
  }, []);

  const handleStart = useCallback(() => {
    ensureInit(currentGPT, runNetworkViz);
    setLossModalVisible(true);
    start(srcPhraseRef.current, runAllViz, runEmbVizCallback);
  }, [ensureInit, currentGPT, runNetworkViz, start, runAllViz, runEmbVizCallback]);

  const handlePause = useCallback(() => {
    pause();
  }, [pause]);

  const handleReset = useCallback(() => {
    reset();
    setLossModalVisible(false);
  }, [reset]);

  const handleSwitchMode = useCallback((useGPT: boolean) => {
    switchMode(useGPT);
    handleReset();
    ensureInit(useGPT, runNetworkViz);
  }, [switchMode, handleReset, ensureInit, runNetworkViz]);

  const handleSetSkip = useCallback((v: boolean) => {
    if (v === useSkip) return;
    useSkipRef.current = v;
    setUseSkip(v);
    mbt.setUseSkip(v);
    reset();
    ensureInit(currentGPT, runNetworkViz);
  }, [useSkip, reset, ensureInit, currentGPT, runNetworkViz]);

  const handleSetPosEmb = useCallback((v: boolean) => {
    if (v === usePosEmb) return;
    usePosEmbRef.current = v;
    setUsePosEmb(v);
    mbt.setUsePosEmb(v);
    reset();
    ensureInit(currentGPT, runNetworkViz);
  }, [usePosEmb, reset, ensureInit, currentGPT, runNetworkViz]);

  const handleSetAttn = useCallback((v: boolean) => {
    if (v === useAttn) return;
    useAttnRef.current = v;
    setUseAttn(v);
    mbt.setUseAttn(v);
    reset();
    ensureInit(currentGPT, runNetworkViz);
  }, [useAttn, reset, ensureInit, currentGPT, runNetworkViz]);

  const handleAnalyze = useCallback(() => {
    runAllViz(srcPhraseRef.current);
    const phrase = srcPhraseRef.current.trim().toLowerCase() || 'heat olive oil';
    try { mbt.computePca(); } catch (_) { /* ignore */ }
    try { mbt.runResidualViz(phrase); } catch (_) { /* ignore */ }
  }, [runAllViz]);

  const [datasetVersion, setDatasetVersion] = useState(0);

  const handleSetDataset = useCallback((phrases: string[]) => {
    reset();
    mbt.clearRawDocs();
    for (const phrase of phrases) {
      mbt.pushRawDoc(phrase);
    }
    ensureInit(currentGPT, runNetworkViz);
    setDatasetVersion(v => v + 1);
  }, [reset, ensureInit, currentGPT, runNetworkViz]);

  const togglePanel = useCallback((id: string) => {
    setOpenPanels(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
    setPanelOrder(prev => {
      if (!prev.includes(id)) return [...prev, id];
      return prev;
    });
  }, []);

  const closePanel = useCallback((id: string) => {
    setOpenPanels(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const bringToFront = useCallback((id: string) => {
    setPanelOrder(prev => {
      const without = prev.filter(p => p !== id);
      return [...without, id];
    });
  }, []);

  const getZ = (id: string) => BASE_Z + panelOrder.indexOf(id);

  const handleToolbarHeight = useCallback((h: number) => {
    document.documentElement.style.setProperty('--toolbar-h', h + 'px');
  }, []);

  const PANELS = [
    {
      id: 'panel-train',
      title: 'Training',
      defaultPos: { x: 20, y: 56 },
      children: (
        <TrainingPanel
          step={step} loss={loss} losses={losses}
          numSteps={numSteps} initialized={initialized}
          currentGPT={currentGPT}
          visible={openPanels.has('panel-train')}
        />
      ),
    },
    {
      id: 'panel-gen',
      title: 'Inference',
      defaultPos: { x: 360, y: 56 },
      children: (
        <GenPanel
          initialized={initialized}
          srcPhrase={srcPhrase}
          onRunViz={runAllViz}
        />
      ),
    },
    {
      id: 'panel-attn',
      title: (
        <>
          Attention Weights
          <LiveBadge running={running} />
        </>
      ),
      defaultPos: { x: 20, y: 56 },
      width: 360,
      children: (
        <AttnPanel
          attnFlat={viz.attnFlat} seq={viz.seq} tokens={viz.tokens}
          currentGPT={currentGPT}
          visible={openPanels.has('panel-attn')}
          running={running}
        />
      ),
    },
    {
      id: 'panel-emb',
      title: (
        <>
          Token Embedding Similarity
          <LiveBadge running={running} />
        </>
      ),
      defaultPos: { x: 400, y: 56 },
      children: (
        <EmbPanel
          initialized={initialized}
          triggerCount={viz.embTrigger}
          visible={openPanels.has('panel-emb')}
        />
      ),
    },
    {
      id: 'panel-emb-pca',
      title: (
        <>
          Embedding PCA
          <LiveBadge running={running} />
        </>
      ),
      defaultPos: { x: 580, y: 56 },
      children: (
        <EmbPcaPanel canvasRef={embPcaCanvasRef} />
      ),
    },
    {
      id: 'panel-residual-pca',
      title: (
        <>
          Pos Embedding Path
          <LiveBadge running={running} />
        </>
      ),
      defaultPos: { x: 980, y: 56 },
      children: (
        <EmbPcaPanel canvasRef={residualPcaCanvasRef} />
      ),
    },
    {
      id: 'panel-hidden',
      title: (
        <>
          Hidden State Evolution
          <LiveBadge running={running} />
        </>
      ),
      defaultPos: { x: 20, y: 56 },
      children: (
        <HiddenPanel
          hiddenFlat={viz.hiddenFlat} seq={viz.seq} tokens={viz.tokens}
          visible={openPanels.has('panel-hidden')}
          running={running}
        />
      ),
    },
    {
      id: 'panel-mlp',
      title: (
        <>
          MLP Activations (FC1 ReLU)
          <LiveBadge running={running} />
        </>
      ),
      defaultPos: { x: 360, y: 56 },
      children: (
        <MlpPanel
          mlpFlat={viz.mlpFlat} seq={viz.seq} tokens={viz.tokens}
          visible={openPanels.has('panel-mlp')}
          running={running}
        />
      ),
    },
    {
      id: 'panel-pred',
      title: (
        <>
          Next-word Predictions
          <LiveBadge running={running} />
        </>
      ),
      defaultPos: { x: 700, y: 56 },
      children: (
        <PredPanel
          logitsFlat={viz.logitsFlat} seq={viz.seq} vocab={viz.vocab} tokens={viz.tokens}
          visible={openPanels.has('panel-pred')}
          running={running}
        />
      ),
    },
    {
      id: 'panel-data',
      title: 'Training Dataset',
      defaultPos: { x: 80, y: 80 },
      width: 400,
      children: (
        <DatasetPanel
          initialized={initialized}
          visible={openPanels.has('panel-data')}
          datasetVersion={datasetVersion}
          onSetDataset={handleSetDataset}
        />
      ),
    },
  ];

  return (
    <>
      <Toolbar
        step={step} loss={loss} numSteps={numSteps}
        running={running} initialized={initialized} currentGPT={currentGPT}
        srcPhrase={srcPhrase} predOutput={viz.predOutput}
        onSrcPhraseChange={setSrcPhrase}
        onAnalyze={handleAnalyze}
        onModeEnc={() => handleSwitchMode(false)}
        onModeGpt={() => handleSwitchMode(true)}
        onToolbarHeightChange={handleToolbarHeight}
      />

      <ArchCanvas canvasRef={netCanvasRef} />

      <PanelSidebar
        running={running} initialized={initialized} step={step}
        openPanels={openPanels}
        useSkip={useSkip} usePosEmb={usePosEmb} useAttn={useAttn}
        onStart={handleStart}
        onPause={handlePause}
        onReset={handleReset}
        onTogglePanel={togglePanel}
        onToggleSkip={handleSetSkip}
        onTogglePosEmb={handleSetPosEmb}
        onToggleAttn={handleSetAttn}
      />

      {PANELS.map(({ id, title, defaultPos, width, children }) => (
        <FloatingPanel
          key={id}
          id={id}
          title={title}
          visible={openPanels.has(id)}
          defaultPos={defaultPos}
          width={width}
          onClose={() => closePanel(id)}
          onFocus={() => bringToFront(id)}
          zIndex={getZ(id)}
        >
          {children}
        </FloatingPanel>
      ))}

      <LossModal
        losses={losses}
        visible={lossModalVisible}
        onClose={() => setLossModalVisible(false)}
      />
    </>
  );
}
