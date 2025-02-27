import React from 'react';
import styled from 'styled-components';
import Cell from './Cell';

const SheetContainer = styled.div`
  display: grid;
  grid-template-columns: 50px repeat(26, minmax(150px, 1fr)); // Adjusted column width
  grid-template-rows: 30px repeat(50, 25px); // 50 rows
  border: 1px solid #ddd;
  width: 100%; // Takes full width of the parent
  height: 100%; // Fixed height to fit all rows
  overflow: auto; // Enables horizontal scrolling
  
`;

// HeaderCell component
const HeaderCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  background-color: ${(props) => (props.$isHighlighted ? '#e6f7ff' : '#f1f3f4')}; // Use transient prop
  font-weight: bold;
`;

// RowNumberCell component
const RowNumberCell = styled(HeaderCell)`
  background-color: ${(props) => (props.$isHighlighted ? '#e6f7ff' : '#f1f3f4')}; // Use transient prop
`;

const Sheet = ({ selectedCell, onSelectCell, cellFormats, cellContent, onCellContentChange }) => {
    const rows = 50;
    const cols = 26;

    // Generate column headers (A, B, C, ..., Z)
    const columnHeaders = Array.from({ length: cols }, (_, i) => String.fromCharCode(65 + i));

    return (
        <SheetContainer>
            {/* Empty top-left corner */}
            <HeaderCell></HeaderCell>

            {/* Column headers */}
            {columnHeaders.map((header, index) => (
                <HeaderCell
                    key={index}
                    $isHighlighted={selectedCell.colIndex === index} // Use transient prop
                >
                    {header}
                </HeaderCell>
            ))}

            {/* Rows */}
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <React.Fragment key={rowIndex}>
                    {/* Row number */}
                    <RowNumberCell
                        $isHighlighted={selectedCell.rowIndex === rowIndex} // Use transient prop
                    >
                        {rowIndex + 1}
                    </RowNumberCell>

                    {/* Cells in the row */}
                    {Array.from({ length: cols }).map((_, colIndex) => {
                        const cellKey = `${rowIndex}-${colIndex}`;
                        const formatting = cellFormats[cellKey] || {
                            font: 'Arial',
                            fontSize: '12',
                            isBold: false,
                            isItalic: false,
                            isUnderline: false,
                            color: '#000000',
                            backgroundColor: '#ffffff',
                        };
                        const content = cellContent[cellKey] || ''; // Get cell content
                        return (
                            <Cell
                                key={cellKey}
                                rowIndex={rowIndex}
                                colIndex={colIndex}
                                $isSelected={
                                    selectedCell.rowIndex === rowIndex && selectedCell.colIndex === colIndex
                                }
                                onSelect={() => onSelectCell(rowIndex, colIndex)}
                                formatting={formatting}
                                content={content}
                                onCellContentChange={onCellContentChange}
                            />
                        );
                    })}
                </React.Fragment>
            ))}
        </SheetContainer>
    );
};

export default Sheet;