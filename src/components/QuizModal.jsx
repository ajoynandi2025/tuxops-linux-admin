import React, { useState } from 'react';
import { X, Award, CheckCircle2, XCircle, RotateCcw, ArrowRight, HelpCircle } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/quizzes';

export default function QuizModal({ isOpen, onClose }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  if (!isOpen) return null;

  const currentQ = QUIZ_QUESTIONS[currentIdx];
  const hasAnsweredCurrent = selectedAnswers[currentIdx] !== undefined;

  const handleSelect = (optionIdx) => {
    if (hasAnsweredCurrent) return; // Prevent changing after revealing
    setSelectedAnswers(prev => ({
      ...prev,
      [currentIdx]: optionIdx
    }));
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedAnswers({});
    setShowResults(false);
  };

  // Calculate score
  let correctCount = 0;
  QUIZ_QUESTIONS.forEach((q, idx) => {
    if (selectedAnswers[idx] === q.correctAnswer) {
      correctCount++;
    }
  });

  const percentage = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in font-sans">
      <div className="bg-[#111726] border border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Award className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-white">Linux SysAdmin Certification Quiz</h3>
              <p className="text-xs text-slate-400">RHCSA / LFCS / Linux+ style challenge</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {!showResults ? (
          <div className="p-6 flex-1 flex flex-col">
            {/* Progress Bar */}
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Question {currentIdx + 1} of {QUIZ_QUESTIONS.length}</span>
              <span className="text-amber-400 font-semibold">{currentQ.module} Track</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-6">
              <div
                className="bg-emerald-500 h-full transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              ></div>
            </div>

            {/* Question Text */}
            <h4 className="text-base sm:text-lg font-semibold text-white mb-6 leading-relaxed">
              {currentQ.question}
            </h4>

            {/* Options */}
            <div className="space-y-3 flex-1">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = selectedAnswers[currentIdx] === optIdx;
                const isCorrect = currentQ.correctAnswer === optIdx;

                let btnStyle = "bg-[#0a0d14] border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-900";
                if (hasAnsweredCurrent) {
                  if (isCorrect) {
                    btnStyle = "bg-emerald-950/40 border-emerald-500 text-emerald-300";
                  } else if (isSelected) {
                    btnStyle = "bg-red-950/40 border-red-500 text-red-300";
                  } else {
                    btnStyle = "bg-[#0a0d14] border-slate-800/40 text-slate-500 opacity-60";
                  }
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelect(optIdx)}
                    disabled={hasAnsweredCurrent}
                    className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {hasAnsweredCurrent && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                    )}
                    {hasAnsweredCurrent && isSelected && !isCorrect && (
                      <XCircle className="w-4 h-4 text-red-400 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation box once answered */}
            {hasAnsweredCurrent && (
              <div className="mt-4 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 animate-fade-in flex items-start gap-2.5">
                <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-cyan-300 block mb-0.5">Explanation:</span>
                  <p>{currentQ.explanation}</p>
                </div>
              </div>
            )}

            {/* Next Button */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={handleNext}
                disabled={!hasAnsweredCurrent}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-bold text-xs sm:text-sm transition flex items-center gap-1.5"
              >
                {currentIdx === QUIZ_QUESTIONS.length - 1 ? "View Results" : "Next Question"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Results View */
          <div className="p-8 text-center flex flex-col items-center">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${
              percentage >= 75 ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
            }`}>
              <Award className="w-10 h-10" />
            </div>

            <h4 className="text-2xl font-bold text-white mb-1">
              {percentage >= 75 ? "Exam Passed! Outstanding Job!" : "Good Attempt! Keep Practicing!"}
            </h4>
            <p className="text-sm text-slate-400 mb-6">
              You scored <span className="text-white font-bold">{correctCount}</span> out of <span className="text-white font-bold">{QUIZ_QUESTIONS.length}</span> ({percentage}%)
            </p>

            {/* Score breakdown badge */}
            <div className="w-full max-w-md bg-[#0a0d14] border border-slate-800 rounded-xl p-4 mb-6 text-left text-xs space-y-2">
              <div className="flex justify-between text-slate-300">
                <span>Passing Grade:</span>
                <span className="font-semibold text-emerald-400">75% or higher</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Status:</span>
                <span className={`font-bold ${percentage >= 75 ? "text-emerald-400" : "text-amber-400"}`}>
                  {percentage >= 75 ? "CERTIFIED READINESS READY" : "REVIEW RECOMMENDED"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleRestart}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Retake Quiz
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition"
              >
                Back to Modules
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
