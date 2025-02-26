import React, { useState } from 'react';
import Toolbar from './components/Toolbar';
import FormatToolbar from './components/FormatToolbar';
import Sheet from './components/Sheet';
import styled from 'styled-components';
import NameBoxAndFormulaBar from './components/NameBoxAndFormulaBar';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw; // Full viewport width
  height: 100vh; // Full viewport height
  overflow: hidden; // Prevents scrollbars on the app container
`;



function App() {
  // Set the default selected cell as A1 (rowIndex: 0, colIndex: 0)
  const [selectedCell, setSelectedCell] = useState({ rowIndex: 0, colIndex: 0 });
  const [cellFormats, setCellFormats] = useState({});
  const [formula, setFormula] = useState('');

  const handleFormattingChange = (key, value) => {
    if (selectedCell.rowIndex !== null && selectedCell.colIndex !== null) {
      const cellKey = `${selectedCell.rowIndex}-${selectedCell.colIndex}`;
      setCellFormats((prev) => ({
        ...prev,
        [cellKey]: {
          ...prev[cellKey],
          [key]: value,
        },
      }));
    }
  };

  const handleFormulaChange = (value) => {
    setFormula(value);
  };

  return (
    <AppContainer>
      <Toolbar />
      <FormatToolbar
        selectedCell={selectedCell}
        onFormattingChange={handleFormattingChange}
        cellFormats={cellFormats}
      />
      <NameBoxAndFormulaBar
        selectedCell={selectedCell}
        formula={formula}
        onFormulaChange={handleFormulaChange}
      />
      <Sheet selectedCell={selectedCell} onSelectCell={setSelectedCell} cellFormats={cellFormats} />
    </AppContainer>
  );
}

export default App;
