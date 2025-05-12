import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import whyDidYouRender from '@welldone-software/why-did-you-render';

if (import.meta.env.DEV && import.meta.env.VITE_WHY_DID_YOU_RENDER === 'true') {
  console.log("whyDidYouRender is active");
  // Skip tracking Zustand hooks to avoid complexity in ESM
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    trackHooks: true,
    logOnDifferentValues: true,
    logOwnerReasons: true
  });
} else if (import.meta.env.DEV) {
  console.log("whyDidYouRender is available but not active. Set VITE_WHY_DID_YOU_RENDER=true in .env.development to enable.");
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
