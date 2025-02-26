import React from 'react';
import styled from 'styled-components';

const FormatToolbarContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f1f3f4;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  gap: 10px; // Adds space between items
`;

const Dropdown = styled.select`
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
`;

const Button = styled.button`
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`;

const FormatToolbar = ({ selectedCell, onFormattingChange, cellFormats }) => {
    const cellKey = `${selectedCell.rowIndex}-${selectedCell.colIndex}`;
    const formatting = cellFormats[cellKey] || {
        font: 'Arial',
        fontSize: '12',
        isBold: false,
        isItalic: false,
        isUnderline: false,
        color: '#000000',
        backgroundColor: '#ffffff',
    };

    return (
        <FormatToolbarContainer>
            {/* Font Dropdown */}
            <Dropdown
                value={formatting.font}
                onChange={(e) => onFormattingChange('font', e.target.value)}
            >
                <option value="Arial">Arial</option>
                <option value="Calibri">Calibri</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Bradley Hand">Bradley Hand</option>
                <option value="Montserrat">Montserrat</option>
                <option value="Garamond">Garamond</option>
                <option value="Roboto">Roboto</option>
                <option value="Didot">Didot</option>
            </Dropdown>

            {/* Bold Button */}
            <Button
                style={{ fontWeight: formatting.isBold ? 'bold' : 'normal' }}
                onClick={() => onFormattingChange('isBold', !formatting.isBold)}
            >
                Bold
            </Button>

            {/* Italics Button */}
            <Button
                style={{ fontStyle: formatting.isItalic ? 'italic' : 'normal' }}
                onClick={() => onFormattingChange('isItalic', !formatting.isItalic)}
            >
                Italic
            </Button>

            {/* Underline Button */}
            <Button
                style={{ textDecoration: formatting.isUnderline ? 'underline' : 'none' }}
                onClick={() => onFormattingChange('isUnderline', !formatting.isUnderline)}
            >
                Underline
            </Button>

            {/* Font Size Dropdown */}
            <Dropdown
                value={formatting.fontSize}
                onChange={(e) => onFormattingChange('fontSize', e.target.value)}
            >
                <option value="10">10</option>
                <option value="12">12</option>
                <option value="14">14</option>
                <option value="16">16</option>
                <option value="18">18</option>
                <option value="20">20</option>
            </Dropdown>

            {/* Text Color Picker */}
            <input
                type="color"
                value={formatting.color}
                onChange={(e) => onFormattingChange('color', e.target.value)}
                style={{ width: '30px', height: '30px', cursor: 'pointer' }}
            />

            {/* Background Color Picker */}
            <input
                type="color"
                value={formatting.backgroundColor}
                onChange={(e) => onFormattingChange('backgroundColor', e.target.value)}
                style={{ width: '30px', height: '30px', cursor: 'pointer' }}
            />
        </FormatToolbarContainer>
    );
};

export default FormatToolbar;