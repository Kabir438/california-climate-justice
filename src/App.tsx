import { useState } from 'react';
import type { AppMode, ClimateVariable, CountyName, SocialVariable } from './types';
import { AboutPanel } from './components/AboutPanel';
import { CorrelationView } from './components/CorrelationView';
import { CountyDetailPanel } from './components/CountyDetailPanel';
import { DensityAnalysisView } from './components/DensityAnalysisView';
import { DiffMapView } from './components/DiffMapView';
import { IntroModal } from './components/IntroModal';
import { SourcesPanel } from './components/SourcesPanel';
import { SplitMapView } from './components/SplitMapView';
import { Ticker } from './components/Ticker';
import { TopNav } from './components/TopNav';

function App() {
  const [mode, setMode] = useState<AppMode>('split');
  const [showIntro, setShowIntro] = useState(true);
  const [showAbout, setShowAbout] = useState(false);
  const [showSources, setShowSources] = useState(false);
  const [selectedCounty, setSelectedCounty] = useState<CountyName | null>(null);
  const [socialVar, setSocialVar] = useState<SocialVariable>('pctLatino');
  const [climateVar, setClimateVar] = useState<ClimateVariable>('cesScore');

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[var(--bg-0)] text-[var(--text-primary)]">
      {showIntro && <IntroModal onClose={() => setShowIntro(false)} />}
      {showAbout && <AboutPanel onClose={() => setShowAbout(false)} />}
      {showSources && <SourcesPanel onClose={() => setShowSources(false)} />}

      <TopNav
        mode={mode}
        onAbout={() => setShowAbout(true)}
        onModeChange={setMode}
        onSources={() => setShowSources(true)}
      />

      <main className="relative min-h-0 flex-1 overflow-hidden">
        {mode === 'split' && (
          <SplitMapView
            climateVar={climateVar}
            onClimateVarChange={setClimateVar}
            onCountySelect={setSelectedCounty}
            onSocialVarChange={setSocialVar}
            selectedCounty={selectedCounty}
            socialVar={socialVar}
          />
        )}

        {mode === 'diff' && (
          <DiffMapView onCountySelect={setSelectedCounty} selectedCounty={selectedCounty} />
        )}

        {mode === 'correlation' && (
          <CorrelationView
            climateVar={climateVar}
            onClimateVarChange={setClimateVar}
            onSocialVarChange={setSocialVar}
            socialVar={socialVar}
          />
        )}

        {mode === 'density' && (
          <DensityAnalysisView onCountySelect={setSelectedCounty} selectedCounty={selectedCounty} />
        )}

        {selectedCounty && (
          <CountyDetailPanel
            climateVar={climateVar}
            county={selectedCounty}
            onClose={() => setSelectedCounty(null)}
            socialVar={socialVar}
          />
        )}
      </main>

      <Ticker />
    </div>
  );
}

export default App;
