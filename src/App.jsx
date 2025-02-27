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
`;

const MainContent = styled.div`
  flex: 1; // Takes up remaining space
  overflow: hidden; // Prevents extra scrollbars
`;

function App() {
  const [selectedCell, setSelectedCell] = useState({ rowIndex: 0, colIndex: 0 });
  const [cellFormats, setCellFormats] = useState({});
  const [cellContent, setCellContent] = useState({}); // Track cell content
  const [formula, setFormula] = useState(''); // Formula input value

  // Handle formatting changes
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

  // Handle formula input changes
  const handleFormulaChange = (value) => {
    setFormula(value);

    // Update the content of the selected cell
    if (selectedCell.rowIndex !== null && selectedCell.colIndex !== null) {
      const cellKey = `${selectedCell.rowIndex}-${selectedCell.colIndex}`;
      setCellContent((prev) => ({
        ...prev,
        [cellKey]: value,
      }));
    }
  };

  // Handle cell selection
  const handleCellSelect = (rowIndex, colIndex) => {
    setSelectedCell({ rowIndex, colIndex });

    // Update the formula input with the content of the selected cell
    const cellKey = `${rowIndex}-${colIndex}`;
    setFormula(cellContent[cellKey] || '');
  };

  // Handle real-time cell content updates
  const handleCellContentChange = (rowIndex, colIndex, content) => {
    const cellKey = `${rowIndex}-${colIndex}`;
    setCellContent((prev) => ({
      ...prev,
      [cellKey]: content,
    }));

    // Update the formula input if the updated cell is the selected cell
    if (rowIndex === selectedCell.rowIndex && colIndex === selectedCell.colIndex) {
      setFormula(content);
    }
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
      <MainContent>
        <Sheet
          selectedCell={selectedCell}
          onSelectCell={handleCellSelect}
          cellFormats={cellFormats}
          cellContent={cellContent}
          onCellContentChange={handleCellContentChange}
        />
      </MainContent>
    </AppContainer>
  );
}

export default App;