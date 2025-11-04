import React from "react";
import styled from "styled-components";
import SkeletonBase from "./Skeleton";

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 500px;
  position: relative;
  background: #f0f0f0;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const MapHeader = styled.div`
  padding: 1rem;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const MapContent = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ControlsSkeleton = styled.div`
  display: flex;
  gap: 0.5rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 10;
`;

interface SkeletonMapProps {
  showControls?: boolean;
}

const SkeletonMap: React.FC<SkeletonMapProps> = ({ showControls = true }) => {
  return (
    <MapContainer>
      <MapHeader>
        <SkeletonBase width="200px" height="20px" />
        <SkeletonBase width="150px" height="20px" />
        <SkeletonBase width="100px" height="20px" />
      </MapHeader>
      <MapContent>
        {showControls && (
          <ControlsSkeleton>
            <SkeletonBase width="40px" height="40px" borderRadius="8px" />
            <SkeletonBase width="40px" height="40px" borderRadius="8px" />
            <SkeletonBase width="40px" height="40px" borderRadius="8px" />
          </ControlsSkeleton>
        )}
        <SkeletonBase width="80%" height="60%" borderRadius="8px" />
      </MapContent>
    </MapContainer>
  );
};

export default SkeletonMap;
