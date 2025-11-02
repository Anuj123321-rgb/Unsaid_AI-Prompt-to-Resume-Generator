import React, { useState } from 'react';
import Header from './components/Header';
import PromptInput from './components/PromptInput';
import ResumePreview from './components/ResumePreview';
import JobAnalysis from './components/JobAnalysis';
import { generateResumeFromPrompt, analyzeResumeAgainstJD } from './services/geminiService';
import type { ResumeData, AnalysisResultData } from './types';
import { EXAMPLE_PROMPT } from './constants';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>(EXAMPLE_PROMPT);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [jobDescription, setJobDescription] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResultData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);
    setResumeData(null);
    setAnalysisResult(null);
    setAnalysisError(null);

    try {
      const data = await generateResumeFromPrompt(prompt);
      setResumeData(data);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!jobDescription.trim() || !resumeData) return;

    setIsAnalyzing(true);
    setAnalysisError(null);
    setAnalysisResult(null);

    try {
      const resumeJSON = JSON.stringify(resumeData, null, 2);
      const data = await analyzeResumeAgainstJD(resumeJSON, jobDescription);
      setAnalysisResult(data);
    } catch (err: any) {
      setAnalysisError(err.message || 'An unknown error occurred during analysis.');
    } finally {
      setIsAnalyzing(false);
    }
  };


  return (
    <div className="flex flex-col h-screen font-sans bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <main className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 overflow-hidden">
        <div className="no-print h-full overflow-y-auto flex flex-col gap-4">
          <PromptInput
            prompt={prompt}
            setPrompt={setPrompt}
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />
          {resumeData && !isLoading && (
            <JobAnalysis
              jobDescription={jobDescription}
              setJobDescription={setJobDescription}
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
              analysisResult={analysisResult}
              analysisError={analysisError}
            />
          )}
        </div>
        <div className="h-full overflow-hidden flex flex-col">
          <ResumePreview
            resumeData={resumeData}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
