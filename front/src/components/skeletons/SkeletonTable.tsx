import React from "react";
import styled from "styled-components";
import SkeletonBase from "./Skeleton";

const TableContainer = styled.div`
  width: 100%;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  padding: 0.8rem 1rem;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  padding: 0.6rem 1rem;
  border-bottom: 1px solid #e2e8f0;

  &:nth-child(even) {
    background: #fafafa;
  }
`;

interface SkeletonTableProps {
  rows?: number;
  columns?: number;
}

const SkeletonTable: React.FC<SkeletonTableProps> = ({ rows = 5, columns = 5 }) => {
  return (
    <TableContainer>
      <TableHeader>
        {Array.from({ length: columns }).map((_, index) => (
          <SkeletonBase key={`header-${index}`} $height="20px" $borderRadius="4px" />
        ))}
      </TableHeader>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={`row-${rowIndex}`}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <SkeletonBase key={`cell-${rowIndex}-${colIndex}`} $height="35px" $borderRadius="4px" />
          ))}
        </TableRow>
      ))}
    </TableContainer>
  );
};

export default SkeletonTable;
