import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

// CellContainer component
const CellContainer = styled.div`
  border: 1px solid #f4f4f4; // Light border for visibility
  padding: 4px; // Adds padding for better readability
  height: 100%; // Takes up full height of the grid cell
  min-width: 150px; // Sets a minimum width for the cell
  outline: none; // Removes default outline
  white-space: nowrap; // Prevents text from wrapping
  text-overflow: ellipsis; // Adds ellipsis for overflow text
  background-color: ${(props) => (props.$isSelected ? '#e6f7ff' : 'white')}; // Use transient prop
  

  &:focus {
  
    background-color: #e6f7ff; // Light blue background when focused
  }
`;

const Cell = ({ rowIndex, colIndex, $isSelected, onSelect, formatting, content, onCellContentChange }) => {
    const cellRef = useRef(null);

    useEffect(() => {
        if ($isSelected && cellRef.current) {
            cellRef.current.focus(); // Focus the cell when selected
        }
    }, [$isSelected]);

    useEffect(() => {
        if (cellRef.current) {
            // Apply formatting options to the cell
            cellRef.current.style.fontFamily = formatting.font;
            cellRef.current.style.fontSize = `${formatting.fontSize}px`;
            cellRef.current.style.fontWeight = formatting.isBold ? 'bold' : 'normal';
            cellRef.current.style.fontStyle = formatting.isItalic ? 'italic' : 'normal';
            cellRef.current.style.textDecoration = formatting.isUnderline ? 'underline' : 'none';
            cellRef.current.style.color = formatting.color;
            cellRef.current.style.backgroundColor = formatting.backgroundColor;

            // Set the cell content
            cellRef.current.textContent = content;
        }
    }, [formatting, content]);

    const handleInput = (e) => {
        const newContent = e.target.textContent;
        onCellContentChange(rowIndex, colIndex, newContent); // Notify parent of content change
    };

    return (
        <CellContainer
            ref={cellRef}
            contentEditable
            $isSelected={$isSelected} // Use transient prop
            onFocus={onSelect}
            onInput={handleInput}
        ></CellContainer>
    );
};

export default Cell;