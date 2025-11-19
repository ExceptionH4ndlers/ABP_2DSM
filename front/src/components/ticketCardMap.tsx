import React from "react";
import styled from "styled-components";
import { ChevronDown } from "lucide-react";

interface WrapperProps {
  $open: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  min-width: 260px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 14px;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: ${(p) => (p.$open ? "0 4px 14px rgba(0,0,0,0.15)" : "none")};

  &:hover {
    transform: translateY(-3px);
  }
`;

const Header = styled.div<WrapperProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #111827;

  svg {
    transition: transform 0.25s ease;
    transform: rotate(${(p) => (p.$open ? "180deg" : "0deg")});
  }
`;

const Content = styled.div<WrapperProps>`
  overflow: hidden;
  max-height: ${(p) => (p.$open ? "500px" : "0")};
  opacity: ${(p) => (p.$open ? 1 : 0)};
  transition: all 0.35s ease;
  margin-top: ${(p) => (p.$open ? "10px" : "0")};
`;

export default function TicketCard({
  open,
  onClick,
  title,
  children,
}: {
  open: boolean;
  onClick: () => void;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <Wrapper $open={open} onClick={onClick}>
      <Header $open={open}>
        {title}
        <ChevronDown size={18} />
      </Header>

      <Content $open={open}>{children}</Content>
    </Wrapper>
  );
}
