import { renderToString } from 'react-dom/server';
import App from './App';
export { structuredData } from './data/site';
export function render() { return renderToString(<App />); }
