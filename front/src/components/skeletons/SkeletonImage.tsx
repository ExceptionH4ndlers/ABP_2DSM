import React from "react";
import styled from "styled-components";
import SkeletonBase from "./Skeleton";

const ImageContainer = styled.div<{ width?: string; height?: string }>`
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "auto"};
  min-height: ${({ height }) => (height ? height : "200px")};
  border-radius: 12px;
  overflow: hidden;
  position: relative;
`;

const ImageSkeleton = styled(SkeletonBase)`
  width: 100%;
  height: 100%;
  border-radius: 12px;
`;

interface SkeletonImageProps {
  width?: string;
  height?: string;
  borderRadius?: string;
}

const SkeletonImage: React.FC<SkeletonImageProps> = ({ width, height, borderRadius = "12px" }) => {
  return (
    <ImageContainer width={width} height={height}>
      <ImageSkeleton borderRadius={borderRadius} />
    </ImageContainer>
  );
};

export default SkeletonImage;
