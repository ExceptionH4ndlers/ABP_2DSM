import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

interface SkeletonProps {
  $width?: string;
  $height?: string;
  $borderRadius?: string;
  $margin?: string;
}

const SkeletonBase = styled.div<SkeletonProps>`
  background: linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 20%, #f0f0f0 40%, #f0f0f0 100%);
  background-size: 1000px 100%;
  animation: ${shimmer} 1.5s infinite;
  width: ${({ $width }) => $width || "100%"};
  height: ${({ $height }) => $height || "20px"};
  border-radius: ${({ $borderRadius }) => $borderRadius || "4px"};
  margin: ${({ $margin }) => $margin || "0"};
`;

export default SkeletonBase;
