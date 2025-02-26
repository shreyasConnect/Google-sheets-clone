import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #f1f3f4;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  gap: 10px; // Adds space between items
`;

const NameBox = styled.div`
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  min-width: 100px; // Fixed width for the name box
  text-align: center;
`;

const FormulaInput = styled.input`
  flex: 1; // Takes up remaining space
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
`;

const NameBoxAndFormulaBar = ({ selectedCell, onFormulaChange, formula }) => {
    const getCellPosition = () => {
        if (selectedCell.rowIndex === null || selectedCell.colIndex === null) return '';
        const columnHeader = String.fromCharCode(65 + selectedCell.colIndex); // Convert column index to letter (A, B, C, ...)
        const rowNumber = selectedCell.rowIndex + 1; // Convert row index to row number (1, 2, 3, ...)
        return `${columnHeader}${rowNumber}`; // e.g., B4
    };

    return (
        <Container>
            {/* Name Box */}
            <NameBox>{getCellPosition()}</NameBox>

            {/* Formula Bar */}
            <FormulaInput
                type="text"
                placeholder="Enter formula or expression"
                value={formula}
                onChange={(e) => onFormulaChange(e.target.value)}
            />
        </Container>
    );
};

export default NameBoxAndFormulaBar;