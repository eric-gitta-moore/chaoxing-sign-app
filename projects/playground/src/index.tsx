import {createRoot} from 'react-dom/client';
import React from "react";

const container = document.getElementById('app');
const root = createRoot(container);


function App() {
  return <div>
    test
  </div>;
}

root.render(<App/>);


