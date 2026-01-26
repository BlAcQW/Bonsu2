// Vapi Voice Agent Integration
// Documentation: https://docs.vapi.ai

const VAPI_PUBLIC_KEY = '0c22dcea-0d6c-4fc0-8fb2-93292d8575e8';
const AGENT_ID = 'b67b4257-b25b-4027-95c0-2474dc7260e0';

let vapiInstance: any = null;

// Dynamically load Vapi SDK from CDN only
const loadVapiSDK = async (): Promise<any> => {
  return new Promise((resolve, reject) => {
    // Check if already loaded
    if ((window as any).Vapi) {
      resolve((window as any).Vapi);
      return;
    }

    // Load from CDN
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@vapi-ai/web@2.0.2/dist/index.umd.js';
    script.onload = () => {
      if ((window as any).Vapi) {
        console.log('Vapi SDK loaded successfully from CDN');
        resolve((window as any).Vapi);
      } else {
        reject(new Error('Vapi SDK failed to load from CDN'));
      }
    };
    script.onerror = () => reject(new Error('Failed to load Vapi SDK script'));
    document.head.appendChild(script);
  });
};

export const startVapiAgent = async (): Promise<void> => {
  console.log('Starting Vapi Agent...');
  console.log('Public Key:', VAPI_PUBLIC_KEY);
  console.log('Agent ID:', AGENT_ID);

  try {
    // Load Vapi SDK from CDN
    const Vapi = await loadVapiSDK();
    console.log('Vapi SDK loaded successfully');

    vapiInstance = new Vapi(VAPI_PUBLIC_KEY);
    console.log('Vapi instance created');

    // Start the call with your assistant
    console.log('Starting call with agent:', AGENT_ID);
    await vapiInstance.start(AGENT_ID);
    console.log('Call started successfully');

    // Listen to call events
    vapiInstance.on('call-start', () => {
      console.log('✅ Call started - Bonsu is ready to talk');
    });

    vapiInstance.on('call-end', () => {
      console.log('📞 Call ended');
    });

    vapiInstance.on('speech-start', () => {
      console.log('🎤 User started speaking');
    });

    vapiInstance.on('speech-end', () => {
      console.log('🔇 User stopped speaking');
    });

    vapiInstance.on('volume-level', (volume: number) => {
      console.log('🔊 Volume level:', volume);
    });

    vapiInstance.on('error', (error: any) => {
      console.error('❌ Vapi error:', error);
    });

    vapiInstance.on('message', (message: any) => {
      console.log('💬 Message:', message);
    });
  } catch (error: any) {
    console.error('Failed to start Vapi agent:', error);
    console.error('Error details:', {
      message: error?.message,
      stack: error?.stack,
      name: error?.name
    });
    throw error;
  }
};

export const endVapiCall = (): void => {
  if (vapiInstance) {
    console.log('Ending Vapi call...');
    try {
      vapiInstance.stop();
      console.log('✅ Call ended successfully');
    } catch (error) {
      console.error('Error ending call:', error);
    }
    vapiInstance = null;
  }
};