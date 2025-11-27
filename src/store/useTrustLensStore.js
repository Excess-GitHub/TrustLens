// FILE: src/store/useTrustLensStore.js

import { reactive, computed } from 'vue';
import { FAKE_ANALYSIS_DB } from '../data/fakeAnalysisDb.js';

const state = reactive({
  currentMedia: null,
  lastResult: null,
  history: [],
  isAnalyzing: false,
  analysisProgress: 0,
  lastCancelled: false
});

export function useTrustLensStore() {
  const setCurrentMediaFromFile = (file, source) => {
    const type = file.type.startsWith('image/') ? 'image' : 'video';
    const url = URL.createObjectURL(file);
    
    // Try to match filename to a key in FAKE_ANALYSIS_DB
    let mediaKey = undefined;
    const fileName = file.name.toLowerCase();
    for (const key in FAKE_ANALYSIS_DB) {
      if (fileName.includes(key) || fileName.includes(key.replace(/_/g, '-'))) {
        mediaKey = key;
        break;
      }
    }
    
    state.currentMedia = {
      id: `media_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      source,
      file,
      url,
      mediaKey,
      title: file.name,
      createdAt: new Date()
    };
  };

  const setCurrentMediaFromLink = (url) => {
    let mediaKey = undefined;
    const urlLower = url.toLowerCase();
    for (const key in FAKE_ANALYSIS_DB) {
      if (urlLower.includes(key)) {
        mediaKey = key;
        break;
      }
    }
    
    state.currentMedia = {
      id: `media_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'link',
      source: 'link',
      url,
      mediaKey,
      title: null,
      createdAt: new Date()
    };
  };

  const startAnalysis = () => {
    state.isAnalyzing = true;
    state.analysisProgress = 0;
    state.lastCancelled = false;
  };

  const updateAnalysisProgress = (value) => {
    state.analysisProgress = Math.max(0, Math.min(100, value));
  };

  const completeAnalysis = () => {
    if (!state.currentMedia) return;
    
    let analysis;
    const mediaKey = state.currentMedia.mediaKey;
    
    if (mediaKey && FAKE_ANALYSIS_DB[mediaKey]) {
      analysis = FAKE_ANALYSIS_DB[mediaKey];
    } else {
      // Fallback logic
      const url = state.currentMedia.url || '';
      const title = state.currentMedia.title || '';
      const searchStr = (url + ' ' + title).toLowerCase();
      
      let verdict = 'REAL';
      let flags = [];
      let shortExplanation = 'Analysis completed.';
      let details = [];
      
      if (searchStr.includes('real') || searchStr.includes('authentic')) {
        verdict = 'REAL';
        shortExplanation = 'No significant AI artifacts detected. Content appears authentic.';
      } else if (searchStr.includes('ai') || searchStr.includes('fake') || searchStr.includes('generated')) {
        verdict = 'AI';
        flags = ['smearing', 'lighting'];
        shortExplanation = 'Multiple AI generation indicators detected.';
        details = [
          { cropImage: null, text: 'Unnatural patterns and inconsistencies suggest AI generation.' }
        ];
      } else {
        // Simple rule: use string length
        const key = (url + title).length;
        if (key % 2 === 0) {
          verdict = 'REAL';
          shortExplanation = 'Content shows natural characteristics consistent with authentic media.';
        } else {
          verdict = 'AI';
          flags = ['smearing'];
          shortExplanation = 'Some artifacts suggest possible AI generation.';
          details = [
            { cropImage: null, text: 'Subtle inconsistencies detected in the content.' }
          ];
        }
      }
      
      analysis = {
        verdict,
        shortExplanation,
        flags,
        details
      };
    }
    
    const confidence = 0.75 + Math.random() * 0.2; // 0.75-0.95
    
    state.lastResult = {
      id: `result_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      mediaId: state.currentMedia.id,
      mediaKey: state.currentMedia.mediaKey,
      verdict: analysis.verdict,
      confidence,
      shortExplanation: analysis.shortExplanation,
      flags: analysis.flags,
      details: analysis.details,
      createdAt: new Date(),
      media: { ...state.currentMedia } // Store media info for reference
    };
    
    state.history.push(state.lastResult);
    state.isAnalyzing = false;
  };

  const cancelAnalysis = () => {
    state.isAnalyzing = false;
    state.analysisProgress = 0;
    state.currentMedia = null;
    state.lastCancelled = true;
  };

  const getStats = () => {
    const totalUploads = state.history.length;
    let realCount = 0;
    let aiCount = 0;
    const flagCounts = {};
    
    state.history.forEach(result => {
      if (result.verdict === 'REAL') {
        realCount++;
      } else {
        aiCount++;
      }
      
      result.flags.forEach(flagId => {
        flagCounts[flagId] = (flagCounts[flagId] || 0) + 1;
      });
    });
    
    return {
      totalUploads,
      realCount,
      aiCount,
      flagCounts
    };
  };

  const getMediaById = (id) => {
    const result = state.history.find(r => r.mediaId === id || r.media?.id === id);
    return result?.media || null;
  };

  const clearLastCancelled = () => {
    state.lastCancelled = false;
  };

  const setLastResult = (result) => {
    state.lastResult = result;
    if (result?.media) {
      state.currentMedia = result.media;
    }
  };

  return {
    // State (as computed refs for reactivity)
    currentMedia: computed(() => state.currentMedia),
    lastResult: computed(() => state.lastResult),
    history: computed(() => state.history),
    isAnalyzing: computed(() => state.isAnalyzing),
    analysisProgress: computed(() => state.analysisProgress),
    lastCancelled: computed(() => state.lastCancelled),
    
    // Actions
    setCurrentMediaFromFile,
    setCurrentMediaFromLink,
    startAnalysis,
    updateAnalysisProgress,
    completeAnalysis,
    cancelAnalysis,
    clearLastCancelled,
    setLastResult,
    
    // Getters
    getStats,
    getMediaById
  };
}

