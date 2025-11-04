import React from "react";
import styled from "styled-components";
import SkeletonBase from "./Skeleton";

const CardContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CardHeader = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

interface SkeletonCardProps {
  showHeader?: boolean;
  lines?: number;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ showHeader = true, lines = 3 }) => {
  return (
    <CardContainer>
      {showHeader && (
        <CardHeader>
          <SkeletonBase $width="60px" $height="60px" $borderRadius="50%" />
          <div style={{ flex: 1 }}>
            <SkeletonBase $width="60%" $height="20px" $margin="0 0 0.5rem 0" />
            <SkeletonBase $width="40%" $height="16px" />
          </div>
        </CardHeader>
      )}
      <CardContent>
        {Array.from({ length: lines }).map((_, index) => (
          <SkeletonBase
            key={`line-${index}`}
            $width={index === lines - 1 ? "80%" : "100%"}
            $height="16px"
          />
        ))}
      </CardContent>
    </CardContainer>
  );
};

export default SkeletonCard;
