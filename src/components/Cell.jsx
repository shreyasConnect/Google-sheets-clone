import React from 'react';
import { useRef, useEffect } from 'react';
import styled from 'styled-components';

const CellContainer = styled.div`
  flex: 1; // Ensures the cell grows to fill available space
  border: 1px solid #ddd; // Light border for visibility
  padding: 4px; // Adds padding for better readability
  height: 100%; // Takes up full height of the grid cell
  min-width: 150px; // Sets a minimum width for the cell
  outline: none; // Removes default outline
  white-space: nowrap; // Prevents text from wrapping
  text-overflow: ellipsis; // Adds ellipsis for overflow text
  background-color: ${({ isSelected }) => (isSelected ? '#57c6fa' : 'white')}; // Light blue background when selected

  &:focus {
    background-color: #57c6fa; // Light blue background when focused
  }
`;

const Cell = ({ rowIndex, colIndex, isSelected, onSelect, formatting }) => {
    const cellRef = useRef(null);

    useEffect(() => {
        if (isSelected && cellRef.current) {
            cellRef.current.focus(); // Focus the cell when selected
        }
    }, [isSelected]);

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
        }
    }, [formatting]);

    return (
        <CellContainer
            ref={cellRef}
            contentEditable
            isSelected={isSelected}
            onFocus={onSelect}
        ></CellContainer>
    );
};

export default Cell;