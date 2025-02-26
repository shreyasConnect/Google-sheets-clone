import React from 'react';
import styled from 'styled-components';

const ToolbarContainer = styled.div`
  display: flex;
  background-color: white;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const ToolbarButton = styled.button`
  margin-right: 10px;
  padding: 5px 10px;
  border: none;
  background-color: white; // Changed to green
  color: black; // Text color changed to white for better visibility
  cursor: pointer;

  &:hover {
    background-color: #f1f3f4; // Darker green on hover
    
  }
`;

const Toolbar = () => {
    return (
        <ToolbarContainer>
            <ToolbarButton>File</ToolbarButton>
            <ToolbarButton>Edit</ToolbarButton>
            <ToolbarButton>View</ToolbarButton>
            <ToolbarButton>Insert</ToolbarButton>
            <ToolbarButton>Format</ToolbarButton>
            <ToolbarButton>Data</ToolbarButton>
            <ToolbarButton>Tools</ToolbarButton>
            <ToolbarButton>Extensions</ToolbarButton>
            <ToolbarButton>Help</ToolbarButton>
        </ToolbarContainer>
    );
};

export default Toolbar;