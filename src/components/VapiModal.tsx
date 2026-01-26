import React, { useEffect, useState } from 'react';
import { X, Mic, Volume2, Loader2, PhoneOff, AlertCircle } from 'lucide-react';
import { startVapiAgent, endVapiCall } from '../utils/vapiPlaceholder';
interface VapiModalProps {
  isOpen: boolean;
  onClose: () => void;
}
type AgentStatus =
'connecting' |
'connected' |
'listening' |
'speaking' |
'error';
export function VapiModal({ isOpen, onClose }: VapiModalProps) {
  const [status, setStatus] = useState<AgentStatus>('connecting');
  const [errorMessage, setErrorMessage] = useState<string>('');
  useEffect(() => {
    if (isOpen) {
      setStatus('connecting');
      setErrorMessage('');
      startVapiAgent().
      then(() => {
        console.log('Agent started, setting status to connected');
        setStatus('connected');
        setTimeout(() => setStatus('listening'), 500);
      }).
      catch((error) => {
        console.error('Failed to connect:', error);
        setStatus('error');
        // Provide more specific error messages
        let message = 'Failed to connect to Bonsu.';
        if (
        error?.message?.includes('microphone') ||
        error?.message?.includes('permission'))
        {
          message =
          'Microphone access denied. Please allow microphone permissions and try again.';
        } else if (
        error?.message?.includes('network') ||
        error?.message?.includes('fetch'))
        {
          message =
          'Network error. Please check your internet connection and try again.';
        } else if (error?.message?.includes('SDK')) {
          message =
          'Failed to load voice agent. Please refresh the page and try again.';
        } else if (error?.message) {
          message = `Connection error: ${error.message}`;
        }
        setErrorMessage(message);
      });
    }
    // Cleanup: End call when modal closes
    return () => {
      if (isOpen) {
        endVapiCall();
      }
    };
  }, [isOpen]);
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);
  const handleClose = () => {
    endVapiCall();
    onClose();
  };
  const handleEndCall = () => {
    endVapiCall();
    onClose();
  };
  const handleRetry = () => {
    setStatus('connecting');
    setErrorMessage('');
    startVapiAgent().
    then(() => {
      setStatus('connected');
      setTimeout(() => setStatus('listening'), 500);
    }).
    catch((error) => {
      console.error('Retry failed:', error);
      setStatus('error');
      setErrorMessage(
        error?.message || 'Failed to connect. Please try again.'
      );
    });
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
        onClick={handleClose} />


      {/* Modal Content */}
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 transform transition-all duration-300 animate-in slide-in-from-bottom-8 zoom-in-95"
        role="dialog"
        aria-modal="true">

        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
          aria-label="Close modal">

          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col items-center justify-center space-y-8 py-4">
          {/* Status Icon / Waveform Area */}
          <div className="h-32 flex items-center justify-center">
            {status === 'connecting' &&
            <div className="relative">
                <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-75"></div>
                <div className="relative bg-white p-4 rounded-full border-2 border-red-100 shadow-sm">
                  <Loader2 className="w-12 h-12 text-[#DC2626] animate-spin" />
                </div>
              </div>
            }

            {status === 'error' &&
            <div className="relative bg-red-50 p-4 rounded-full border-2 border-red-200">
                <AlertCircle className="w-12 h-12 text-red-600" />
              </div>
            }

            {(status === 'connected' ||
            status === 'listening' ||
            status === 'speaking') &&
            <div className="flex items-center space-x-2 h-16">
                {[1, 2, 3, 4, 5].map((bar) =>
              <div
                key={bar}
                className={`w-3 rounded-full transition-all duration-300 ${status === 'speaking' ? 'bg-[#DC2626]' : 'bg-[#10B981]'}`}
                style={{
                  height: '100%',
                  animation:
                  status === 'connected' ?
                  'none' :
                  `waveform 1s ease-in-out infinite`,
                  animationDelay: `${bar * 0.1}s`
                }} />

              )}
              </div>
            }
          </div>

          {/* Status Text */}
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">
              {status === 'connecting' && 'Connecting to Bonsu...'}
              {status === 'connected' && 'Connected!'}
              {status === 'listening' && 'Bonsu is listening...'}
              {status === 'speaking' && 'Bonsu is speaking...'}
              {status === 'error' && 'Connection Failed'}
            </h3>
            <p className="text-gray-500 text-sm px-4">
              {status === 'connecting' &&
              'Establishing secure voice connection'}
              {status === 'connected' && 'Ready to start conversation'}
              {status === 'listening' && 'Go ahead, ask your question'}
              {status === 'speaking' && 'Listen to the response'}
              {status === 'error' && errorMessage}
            </p>
          </div>

          {/* Controls */}
          {status !== 'error' &&
          <div className="flex items-center space-x-4">
              <div
              className={`p-3 rounded-full ${status === 'listening' ? 'bg-green-100 text-[#10B981]' : 'bg-gray-100 text-gray-400'}`}>

                <Mic className="w-6 h-6" />
              </div>
              <div
              className={`p-3 rounded-full ${status === 'speaking' ? 'bg-red-100 text-[#DC2626]' : 'bg-gray-100 text-gray-400'}`}>

                <Volume2 className="w-6 h-6" />
              </div>
            </div>
          }

          {/* End Call Button */}
          {(status === 'connected' ||
          status === 'listening' ||
          status === 'speaking') &&
          <button
            onClick={handleEndCall}
            className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 shadow-sm hover:shadow-md active:scale-95">

              <PhoneOff className="w-5 h-5" />
              <span className="font-medium">End Call</span>
            </button>
          }

          {/* Retry button for errors */}
          {status === 'error' &&
          <div className="flex flex-col space-y-3 w-full">
              <button
              onClick={handleRetry}
              className="w-full px-6 py-3 bg-[#DC2626] text-white rounded-lg hover:bg-red-700 transition-colors shadow-sm hover:shadow-md active:scale-95 font-medium">

                Try Again
              </button>
              <button
              onClick={handleClose}
              className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">

                Close
              </button>
            </div>
          }
        </div>
      </div>

      <style>{`
        @keyframes waveform {
          0%, 100% { height: 20%; }
          50% { height: 100%; }
        }
      `}</style>
    </div>);

}