import { useState } from "react";
import styled from "styled-components";
import {
  Target,
  Clock,
  Activity,
  Shield,
  MapPin,
  Database,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  Thermometer,
  Droplets,
  Wind,
  Sun,
  Waves,
  Zap,
  Gauge,
  Eye,
  Droplet,
  TestTube,
  Navigation,
  Battery,
  CloudRain,
  AlertCircle,
  BookOpen,
  Calendar,
  ExternalLink,
  Hash,
  FileText,
  Book,
  Layers,
  Users,
} from "lucide-react";
import { CsvExportButton } from "../components/CsvExportButton";
import { useSimaApi } from "../hooks/useSimaApi";
import { useEstacoes } from "../hooks/useEstacoes";
import estruturaSima1 from "../../img/sima/estrutura_sima1.png";
import estruturaSima2 from "../../img/sima/estrutura_sima2.png";
import funcionamentoSima from "../../img/sima/funcionamento_sima.png";
import sondaSima from "../../img/sima/sonda_sima.png";
import simaLogo from "../../img/sima/sima_spa_logo-removebg-preview.png";

const SimaSPAContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
`;

const MainContent = styled.main`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  overflow-x: visible;
`;

const Section = styled.section`
  background: white;
  border-radius: 20px;
  padding: 3rem;
  margin-bottom: 3rem;
  border: 2px solid #e2e8f0;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  ${({ theme }) => theme.media.mobile} {
    font-size: 2rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  color: #64748b;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

// Shared team layout (matching BALCAR)
const GroupTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin: 1rem 0 0.75rem 0;
`;

const TeamGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const TeamGrid = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 1.25rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 0.75rem 1rem;
`;

const PersonItem = styled.li`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 0.75rem 1rem;
`;

const PersonName = styled.span`
  color: #111827;
  font-weight: 600;
`;

const NameLink = styled.a`
  color: #111827;
  font-weight: 600;
  text-decoration: none;
  &:hover { text-decoration: underline; }
`;

const PersonMeta = styled.div`
  color: #6b7280;
  font-size: 0.9rem;
  margin-top: 0.25rem;
`;

const InstitutionTag = styled.span`
  font-weight: 600;
  color: #374151;
`;

const TeamSubtitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #1e40af;
  margin: 2rem 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e2e8f0;
`;

const TeamList = styled.div`
  margin-bottom: 1.5rem;
  line-height: 1.8;
`;

const TeamRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 0.75rem;
`;

const TeamMember = styled.div`
  color: #374151;
  padding: 0.5rem 0;
`;

const TeamEmail = styled.span`
  color: #3b82f6;
  font-weight: 500;
`;

const TeamLink = styled.span`
  color: #3b82f6;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #1e40af;
  }
`;

const SectionText = styled.p`
  font-size: 1.1rem;
  color: #64748b;
  line-height: 1.7;
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const MapPlaceholder = styled.div`
  background: #f8fafc;
  border: 2px dashed #cbd5e1;
  border-radius: 16px;
  padding: 4rem 2rem;
  margin: 2rem 0;
  color: #64748b;
  text-align: center;
`;

const FilterButton = styled.button`
  background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
  border: none;
  border-radius: 12px;
  padding: 1rem 2rem;
  color: white;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 auto;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const ControlsSection = styled.div`
  background: #f9fafb;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid #e5e7eb;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
`;

const ControlsGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  width: 100%;
  max-width: 100%;
`;

const DateRangeGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const DateRangeContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const DateRangeInput = styled.input`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: border-color 0.2s ease;
  flex: 1;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const DateRangeSeparator = styled.span`
  color: #6b7280;
  font-weight: 500;
  font-size: 0.9rem;
`;

const ControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ControlLabel = styled.label`
  font-weight: 600;
  color: #374151;
  font-size: 0.9rem;
`;

const ControlSelect = styled.select`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.9rem;
  background: white;
  transition: border-color 0.2s ease;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  max-width: 100%;
`;

const ActionButton = styled.button`
  background: #6b7280;
  border: 1px solid #9ca3af;
  border-radius: 8px;
  padding: 0.8rem 1.5rem;
  color: white;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  flex: 1;
  min-width: 150px;

  &:hover {
    background: #4b5563;
    border-color: #6b7280;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SearchButton = styled(ActionButton)`
  background: white;
  border-color: #9ca3af;
  color: #374151;

  &:hover {
    background: #f9fafb;
    border-color: #6b7280;
  }
`;

const ClearButton = styled(ActionButton)`
  background: white;
  border-color: #9ca3af;
  color: #374151;

  &:hover {
    background: #f9fafb;
    border-color: #6b7280;
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  margin-top: 1rem;
  position: relative;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 1rem;
  min-width: 100%;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

  th,
  td {
    text-align: center;
    border-bottom: 1px solid #e2e8f0;
    white-space: nowrap;
    min-width: 200px;
    min-height: 35px;
    transition: all 0.2s ease;
    width: auto;
  }

  td {
    padding: 0.6rem 1rem;
  }

  th {
    font-weight: 600;
    color: #374151;
    font-size: 0.9rem;
    position: sticky;
    top: 0;
    z-index: 10;
    background: #f9fafb;
    border-bottom: 1px solid #e5e7eb;
    height: 50px;
    padding: 0.8rem 1rem;
  }

  td {
    font-size: 1rem;
    color: #374151;
    height: 35px;
  }

  tr:hover {
    background: #f3f4f6;
  }

  tr:nth-child(even) {
    background: #fafafa;
  }

  tr:nth-child(even):hover {
    background: #f3f4f6;
  }

  /* Colunas fixas com fundo branco */
  th:nth-child(1),
  td:nth-child(1) {
    position: sticky;
    background: white;
    z-index: 5;
    border-right: 1px solid #e5e7eb;
  }

  th:nth-child(2),
  td:nth-child(2) {
    position: sticky;
    background: white;
    z-index: 5;
    border-right: 1px solid #e5e7eb;
  }

  th:nth-child(3),
  td:nth-child(3) {
    position: sticky;
    background: white;
    z-index: 5;
    border-right: 1px solid #e5e7eb;
  }

  th:nth-child(1),
  th:nth-child(2),
  th:nth-child(3) {
    font-weight: 600;
  }

  /* Categorias de parâmetros com cores mais definidas */
  /* Identificação */
  th:nth-child(4),
  th:nth-child(5),
  th:nth-child(6),
  td:nth-child(4),
  td:nth-child(5),
  td:nth-child(6) {
    background: #fef3c7;
  }

  /* Vento */
  th:nth-child(7),
  th:nth-child(8),
  th:nth-child(9),
  th:nth-child(10),
  td:nth-child(7),
  td:nth-child(8),
  td:nth-child(9),
  td:nth-child(10) {
    background: #dbeafe;
  }

  /* Temperatura Água */
  th:nth-child(11),
  th:nth-child(12),
  th:nth-child(13),
  th:nth-child(14),
  td:nth-child(11),
  td:nth-child(12),
  td:nth-child(13),
  td:nth-child(14) {
    background: #d1fae5;
  }

  /* Atmosfera */
  th:nth-child(15),
  th:nth-child(16),
  th:nth-child(17),
  th:nth-child(18),
  td:nth-child(15),
  td:nth-child(16),
  td:nth-child(17),
  td:nth-child(18) {
    background: #fce7f3;
  }

  /* Radiação */
  th:nth-child(19),
  th:nth-child(20),
  td:nth-child(19),
  td:nth-child(20) {
    background: #fef3c7;
  }

  /* Sistema */
  th:nth-child(21),
  th:nth-child(30),
  td:nth-child(21),
  td:nth-child(30) {
    background: #e5e7eb;
  }

  /* Sonda Aquática */
  th:nth-child(22),
  th:nth-child(23),
  th:nth-child(24),
  th:nth-child(25),
  th:nth-child(26),
  th:nth-child(27),
  th:nth-child(28),
  th:nth-child(29),
  td:nth-child(22),
  td:nth-child(23),
  td:nth-child(24),
  td:nth-child(25),
  td:nth-child(26),
  td:nth-child(27),
  td:nth-child(28),
  td:nth-child(29) {
    background: #dbeafe;
  }

  /* Correntes */
  th:nth-child(31),
  th:nth-child(32),
  td:nth-child(31),
  td:nth-child(32) {
    background: #ddd6fe;
  }

  /* Gases */
  th:nth-child(33),
  th:nth-child(34),
  td:nth-child(33),
  td:nth-child(34) {
    background: #fecaca;
  }

  /* Precipitação */
  th:nth-child(35),
  td:nth-child(35) {
    background: #dbeafe;
  }
`;

const ProblemsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;
`;

const ProblemItem = styled.li`
  background: #fef2f2;
  border-left: 4px solid #ef4444;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0 8px 8px 0;
`;

const SupportList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const SupportItem = styled.div`
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border: 1px solid #cbd5e1;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  font-weight: 600;
  color: #374151;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: #3b82f6;
  }

  a {
    color: inherit;
    text-decoration: none;
    display: block;
    width: 100%;
    height: 100%;
  }
`;

const ImagesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
`;

const ImageWrapper = styled.div`
  text-align: center;
`;

const StructureImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: 300px;
  border-radius: 12px;
  margin-bottom: 1rem;
  object-fit: cover;
  object-position: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const FuncionamentoImage = styled.img`
  width: 100%;
  max-width: 800px;
  height: auto;
  border-radius: 12px;
  margin-bottom: 1rem;
  object-fit: contain;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const ImageCaption = styled.p`
  font-size: 0.9rem;
  color: #64748b;
  font-style: italic;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  color: #64748b;
`;

const ErrorContainer = styled.div`
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  color: #dc2626;
  text-align: center;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const PaginationButton = styled.button`
  background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  color: white;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const PaginationInfo = styled.span`
  color: #64748b;
  font-weight: 500;
`;

const SectionTitleWithLogo = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;

  ${({ theme }) => theme.media.mobile} {
    font-size: 2rem;
  }
`;

const SmallLogo = styled.img`
  width: 200px;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
`;

// Estilos para a seção de publicações
const PublicationsContainer = styled.div`
  background: #f8fafc;
  border-radius: 16px;
  padding: 2rem;
  margin: 2rem 0;
  border: 1px solid #e5e7eb;
  box-shadow:
    0 10px 20px rgba(2, 6, 23, 0.04),
    0 2px 6px rgba(2, 6, 23, 0.04);
`;

const StickyFilters = styled.div`
  position: sticky;
  top: 0;
  z-index: 5;
  background: rgba(248, 250, 252, 0.8);
  backdrop-filter: blur(8px);
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1rem;
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  align-items: center;
  flex-wrap: wrap;
`;

const InputWrapper = styled.div`
  position: relative;
  flex: 1;
  min-width: 300px;
`;

const SearchIconLeft = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  padding-left: 2.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

const FilterChips = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const FilterChip = styled.button<{ $active?: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  border: 1px solid ${({ $active }) => ($active ? "#1e3a8a" : "#e5e7eb")};
  background: ${({ $active }) => ($active ? "linear-gradient(135deg, #1e3a8a, #3b82f6)" : "white")};
  color: ${({ $active }) => ($active ? "#fff" : "#1f2937")};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: ${({ $active }) =>
    $active ? "0 6px 14px rgba(30, 58, 138, 0.25)" : "0 2px 6px rgba(2, 6, 23, 0.04)"};

  &:hover {
    border-color: #1e40af;
    background: ${({ $active }) =>
      $active ? "linear-gradient(135deg, #1e3a8a, #2563eb)" : "#f8fafc"};
    color: ${({ $active }) => ($active ? "#fff" : "#1e40af")};
  }
`;

const PublicationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const PublicationCard = styled.div`
  background: white;
  border-radius: 4px;
  padding: 2rem;
  border: 1px solid #d1d5db;
  transition: all 0.25s ease;
  position: relative;
  box-shadow:
    0 8px 16px rgba(2, 6, 23, 0.04),
    0 2px 6px rgba(2, 6, 23, 0.04);

  &:hover {
    border-color: #1e40af;
    box-shadow:
      0 16px 30px rgba(30, 64, 175, 0.12),
      0 6px 14px rgba(30, 64, 175, 0.06);
    transform: translateY(-2px);
  }
`;

const AccentBar = styled.div<{ $category: string }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 4px;
  width: 100%;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background: ${({ $category }) => {
    switch ($category) {
      case "artigo":
        return "linear-gradient(90deg, #1e40af, #60a5fa)";
      case "livro":
        return "linear-gradient(90deg, #166534, #34d399)";
      case "capitulo":
        return "linear-gradient(90deg, #d97706, #fbbf24)";
      case "evento":
        return "linear-gradient(90deg, #7c3aed, #c4b5fd)";
      case "tese":
        return "linear-gradient(90deg, #dc2626, #fca5a5)";
      default:
        return "#e5e7eb";
    }
  }};
`;

const PublicationHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const PublicationCategory = styled.div<{ $category: string }>`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 1rem;
  background: ${({ $category }) => {
    switch ($category) {
      case "artigo":
        return "#f0f9ff";
      case "livro":
        return "#f0fdf4";
      case "capitulo":
        return "#fffbeb";
      case "evento":
        return "#faf5ff";
      case "tese":
        return "#fef2f2";
      default:
        return "#f9fafb";
    }
  }};
  color: ${({ $category }) => {
    switch ($category) {
      case "artigo":
        return "#1e40af";
      case "livro":
        return "#166534";
      case "capitulo":
        return "#d97706";
      case "evento":
        return "#7c3aed";
      case "tese":
        return "#dc2626";
      default:
        return "#374151";
    }
  }};
  border: 1px solid
    ${({ $category }) => {
      switch ($category) {
        case "artigo":
          return "#dbeafe";
        case "livro":
          return "#dcfce7";
        case "capitulo":
          return "#fed7aa";
        case "evento":
          return "#e9d5ff";
        case "tese":
          return "#fecaca";
        default:
          return "#e5e7eb";
      }
    }};
`;

const PublicationTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
`;

const PublicationAuthors = styled.p`
  color: #475569;
  font-size: 0.9rem;
  margin: 0 0 0.5rem 0;
  line-height: 1.5;
  font-style: italic;
`;

const PublicationDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.75rem 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
`;

const PublicationDetail = styled.div`
  color: #475569;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PublicationCTA = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #fff;
  background: linear-gradient(135deg, #1e40af, #3b82f6);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  margin-top: 1rem;
  padding: 0.55rem 0.9rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  box-shadow: 0 6px 14px rgba(30, 64, 175, 0.25);

  &:hover {
    background: linear-gradient(135deg, #1e3a8a, #2563eb);
    transform: translateY(-1px);
  }
`;

const ClearFiltersButton = styled.button`
  background: #f8fafc;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  color: #374151;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background: #f1f5f9;
    border-color: #9ca3af;
  }
`;

const ResultsCount = styled.div`
  color: #64748b;
  font-size: 0.9rem;
  margin-top: 1rem;
  text-align: center;
`;

const EmptyState = styled.div`
  text-align: center;
  color: #64748b;
  background: #ffffff;
  border: 1px dashed #cbd5e1;
  border-radius: 12px;
  padding: 2rem;
`;

// Função auxiliar para formatar valores
const formatValue = (value: number | null | undefined, decimals: number = 1) => {
  if (value === null || value === undefined) return "-";
  return value.toFixed(decimals);
};

// Dados das publicações
export const publicationsData = [
  // Artigos
  {
    id: 1,
    category: "artigo",
    title:
      "Limnological characterization of floodplain lakes in Mamirauá Sustainable Development Reserve, Central Amazon (Amazonas State, Brazil)",
    authors: "AFFONSO, A. G.; QUEIROZ, H. L.; and NOVO, E. M. L. M.",
    journal: "Acta Limnologica Brasiliensia",
    volume: "23(1)",
    pages: "95-108",
    year: "2011",
    issn: "2179-975X",
    link: null,
  },
  {
    id: 2,
    category: "artigo",
    title: "A system for environmental monitoring of hydroelectric reservoirs in Brazil",
    authors: "ALCÂNTARA, E.; CURTARELLI, M.; OGASHAWARA, I; STECH, J.; SOUZA, A.",
    journal: "Revista Ambiente & Água - An Interdisciplinary Journal of Applied Science",
    volume: "v. 8, n.1",
    pages: "6-17",
    year: "2013",
    issn: null,
    link: "http://www.ambi-agua.net/seer/index.php/ambi-agua/article/view/1088/pdf_770",
  },
  {
    id: 3,
    category: "artigo",
    title:
      "Environmental factors associated with long-term changes in chlorophyll-a concentration in the Amazon floodplain",
    authors:
      "ALCÂNTARA, E.; NOVO, E. M.; BARBOSA, C. F.; BONNET, M-P.; STECH, J. L.; and OMETTO, J. P.",
    journal: "Biogeosciences Discussions",
    volume: "8(2)",
    pages: "3739-3770",
    year: "2011",
    issn: null,
    link: "http://www.biogeosciences-discuss.net/8/3739/2011/bgd-8-3739-2011.html",
  },
  {
    id: 4,
    category: "artigo",
    title:
      "Desenvolvimento de modelo conceitual termodinâmico para o reservatório hidrelétrico de Itumbiara baseado em dados de satélite e telemétricos",
    authors: "ALCÂNTARA, E. H.; and STECH, J. L.",
    journal: "Revista Ambiente & Água",
    volume: "6",
    pages: "157-179",
    year: "2011",
    issn: null,
    link: "http://www.ambi-agua.net/seer/index.php/ambi-agua/article/view/572/pdf_469",
  },
  {
    id: 5,
    category: "artigo",
    title: "A contribution to understanding the turbidity behaviour in an Amazon floodplain",
    authors:
      "ALCÂNTARA, E.; NOVO, E.; STECH, J.; LORENZZETTI, J.; BARBOSA, C.; ASSIREU, A.; and SOUZA, A.",
    journal: "Hydrolology and Earth System Sciences",
    volume: "14(2)",
    pages: "351-364",
    year: "2010",
    issn: null,
    link: "http://www.hydrol-earth-syst-sci.net/14/351/2010/hess-14-351-2010.html",
  },
  {
    id: 6,
    category: "artigo",
    title:
      "On the water thermal response to the passage of cold fronts: initial results for Itumbiara reservoir (Brazil)",
    authors:
      "ALCÂNTARA, E. H.; BONNET, M. P.; ASSIREU, A. T.; STECH, J. L.; NOVO, E. M. L. M.; and LORENZZETTI, J. A.",
    journal: "Hydrology and Earth System Sciences Discussions",
    volume: "7",
    pages: "9437-9465",
    year: "2010",
    issn: null,
    link: "http://www.hydrol-earth-syst-sci-discuss.net/7/9437/2010/hessd-7-9437-2010.html",
  },
  {
    id: 7,
    category: "artigo",
    title:
      "Remote sensing of water surface temperature and heat flux over a tropical hydroelectric reservoir",
    authors:
      "ALCÂNTARA, E. H.; STECH, J. L.; LORENZZETTI, J. A.; BONNET, M. P.; CASAMITJANA, X.; ASSIREU, A. T.; and NOVO, E. M. L. M.",
    journal: "Remote Sensing of Environment",
    volume: "114(11)",
    pages: "2651-2665",
    year: "2010",
    issn: null,
    link: "http://www.sciencedirect.com/science/article/pii/S0034425710001926",
  },
  {
    id: 8,
    category: "artigo",
    title:
      "Use of ordinary kriging algorithm and wavelet analysis to understanding the turbidity behavior in an amazon floodplain",
    authors: "ALCÂNTARA, E. H.",
    journal: "Journal of Computational Interdisciplinary Sciences",
    volume: "1(1)",
    pages: "57-70",
    year: "2008",
    issn: null,
    link: "http://epacis.org/files/JCIS11-art.06.PDF",
  },
  {
    id: 9,
    category: "artigo",
    title:
      "Hydro-physical processes at the plunge point: an analysis using satellite and in situ data",
    authors:
      "ASSIREU, A. T.; ALCÂNTARA, E.; NOVO, E. M. L. M.; ROLAND, F.; PACHECO, F. S.; STECH, J. L.; and LORENZZETTI, J. A.",
    journal: "Hydrology and Earth System Sciences",
    volume: "15",
    pages: "3689-3700",
    year: "2011",
    issn: null,
    link: "http://www.hydrol-earth-syst-sci.net/15/3689/2011/hess-15-3689-2011.html",
  },
  {
    id: 10,
    category: "artigo",
    title:
      "Carbon dioxide and methane fluxes in the littoral zone of a tropical savanna reservoir (Corumbá, Brazil)",
    authors: "BERGIER, I.; NOVO, E. M. L. M.; RAMOS; F. M.; MAZZI, E. A.; and RASERA, M. F. F. L.",
    journal: "Oecologia Australis",
    volume: "15(3)",
    pages: "666-681",
    year: "2011",
    issn: null,
    link: "http://www.ambi-agua.net/seer/index.php/ambi-agua/article/view/1083/pdf_824",
  },
  {
    id: 19,
    category: "artigo",
    title:
      "Avaliação da dinâmica temporal da evaporação no reservatório de Itumbiara, GO, utilizando dados obtidos por sensoriamento remoto",
    authors:
      "CURTARELLI, M. P.; ALCÂNTARA, E. H.; ARAÚJO, C. A. S.; STECH, J. L.; LORENZZETTI, J. A.",
    journal: "Ambi-Água, Taubaté",
    volume: "v. 8, n.11",
    pages: "272-289",
    year: "2013",
    issn: "1980-993X",
    link: "http://www.ambi-agua.net/seer/index.php/ambi-agua/article/view/1083/pdf_824",
  },
  {
    id: 20,
    category: "artigo",
    title:
      "Effects of cold fronts on MODIS-derived sensible and latent heat fluxes in Itumbiara reservoir (Central Brazil)",
    authors: "CURTARELLI, M.; ALCÂNTARA, E.; RENNÓ, C; STECH, J.",
    journal: "Advances in Space Research",
    volume: null,
    pages: null,
    year: "2013",
    issn: "0273-1177",
    link: "http://dx.doi.org/10.1016/j.asr.2013.07.037",
  },
  {
    id: 21,
    category: "artigo",
    title:
      "Modeling the effects of cold front passages on the heat ﬂuxes and thermal structure of a tropical hydroelectric reservoir",
    authors: "CURTARELLI, M. P.; ALCÂNTARA, E. H.; RENNÓ, C. D.; STECH, J. L.",
    journal: "Hydrol. Earth Syst. Sci. Discuss.",
    volume: "10",
    pages: "8467–8502",
    year: "2013",
    issn: null,
    link: "http://www.hydrol-earth-syst-sci-discuss.net/10/8467/2013/hessd-10-8467-2013.pdf",
  },
  {
    id: 22,
    category: "artigo",
    title: "Localização de áreas de monitoramento telemétrico em ambientes aquáticos da Amazônia",
    authors: "LIMA, I. B. T.; BARBOSA, C. C.; NOVO, E. M. L. M.; CARVALHO, J. C.; and STECH, J. L.",
    journal: "Acta Amazonica",
    volume: "36(3)",
    pages: "331-334",
    year: "2006",
    issn: null,
    link: "http://www.scielo.br/pdf/%0D/aa/v36n3/v36n3a07.pdf",
  },
  {
    id: 23,
    category: "artigo",
    title: "Caracterização limnológica do reservatório hidrelétrico de Itumbiara, Goiás, Brasil",
    authors: "NASCIMENTO, R. F. F.; ALCÂNTARA, E. H.; KAMPEL, M.; and STECH, J. L.",
    journal: "Revista Ambiente & Água",
    volume: "6",
    pages: "143-156",
    year: "2011",
    issn: null,
    link: "http://www.ambi-agua.net/seer/index.php/ambi-agua/article/view/570/pdf_466",
  },
  {
    id: 24,
    category: "artigo",
    title:
      "Integração de Dados do Sistema de Monitoramento Automático de Variáveis Ambientais (SIMA) e de Imagens Orbitais na Avaliação do Estado Trófico do Reservatório da UHE Funil",
    authors:
      "NOVO, E. M. L. M.; STECH, J. L. ; ALCÂNTARA, E. H.; LONDE, L. R.; ASSIREU, A.; BARBOSA, C. C.; and SOUZA, A. F.",
    journal: "Geografia (Rio Claro. Impresso)",
    volume: "35",
    pages: "641-660",
    year: "2010",
    issn: null,
    link: null,
  },
  {
    id: 25,
    category: "artigo",
    title: "Variability of carbon dioxide flux from tropical (Cerrado) hydroelectric reservoirs",
    authors:
      "ROLAND, F.; VIDAL, L. O.; PACHECO, F. S.; BARROS, N. O.; ASSIREU, A.; OMETTO, J. P. H. B.; CIMBLERIS, A. C. P.; and COLE, J. J.",
    journal: "Aquatic Sciences",
    volume: "72(3)",
    pages: "283-293",
    year: "2010",
    issn: null,
    link: "http://www.springerlink.com/content/jh05152758w0082m/",
  },
  {
    id: 26,
    category: "artigo",
    title:
      "Seasonal and spatial variability of CO2 emission from a large floodplain lake in the lower Amazon",
    authors:
      "RUDORFF, C. M.; MELACK, J. M.; MACINTYRE, S.; BARBOSA, C. C. F.; and NOVO, E. M. L. M.",
    journal: "Journal of Geophysical Research",
    volume: "116",
    pages: "G04007",
    year: "2011",
    issn: null,
    link: "http://www.agu.org/pubs/crossref/2011/2011JG001699.shtml",
  },
  {
    id: 27,
    category: "artigo",
    title: "Telemetric monitoring system for meteorological and limnological data acquisition",
    authors:
      "STECH, J. L.; LIMA, I. B. T.; NOVO, E. M. L. M.; ASSIREU, A. T.; LORENZZETTI, J. A.; CARVALHO, J. C.; and ROSA, R. R.",
    journal: "Proceedings of the International Association of Theoretical and Applied Limnology",
    volume: "29",
    pages: "1747-1750",
    year: "2006",
    issn: null,
    link: null,
  },
  // Livros
  {
    id: 11,
    category: "livro",
    title:
      "Novas tecnologias para o monitoramento e estudo de reservatórios hidrelétricos e grandes lagos",
    authors: "ALCÂNTARA, E. H.; NOVO, E. M. L. M.; and STECH, J. L. (Orgs.)",
    journal: "São José dos Campos: Parêntese",
    volume: null,
    pages: null,
    year: "2011",
    issn: null,
    link: "http://lojavirtual.parentese.com.br/reservatorios.html",
  },
  // Capítulos de livros
  {
    id: 12,
    category: "capitulo",
    title:
      "Tecnologia Espacial para o monitoramento da Temperatura e Fluxos de Calor na Superfície da Água do Reservatório Hidrelétrico de Itumbiara (GO)",
    authors: "ALCÂNTARA, E. H.; STECH, J. L.; LORENZZETTI, J. A.; and NOVO, E. M. L. M.",
    journal:
      "Novas tecnologias para o monitoramento e estudo de reservatórios hidrelétricos e grandes lagos",
    volume: null,
    pages: "15-80",
    year: "2011",
    issn: null,
    link: null,
  },
  {
    id: 13,
    category: "capitulo",
    title:
      "A Successful Combined Use of Telemetric Monitoring System and Spatial Data Modeling to Study the Turbidity Behavior in the Amazon Floodplain",
    authors:
      "ALCÂNTARA, E. H.; NOVO, E. M. L. M.; STECH, J. L.; BARBOSA, C.; LORENZZETTI, J. A.; ASSIREU, A.T.; BONNET, M-P; and SOUZA, A. F.",
    journal: "Floodplains: Physical Geography, Ecology and Societal Interactions",
    volume: null,
    pages: "201-226",
    year: "2011",
    issn: null,
    link: null,
  },
  {
    id: 28,
    category: "capitulo",
    title: "Linking telemetric climatic-limnologic data and online CH4 and CO2 flux dynamics",
    authors:
      "LIMA, I. B. T.; RAMOS, F. M.; NOVO, E. M. L. M; LORENZZETTI, J. A.; ROSA, R. R.; BARBOSA, C. C.; OMETTO, J. P. H. B.; and ASSIREU, A. T.",
    journal: "Global warming and hydroeletric reservoirs. Rio de Janeiro: COPPE",
    volume: null,
    pages: "67-69",
    year: "2005",
    issn: null,
    link: null,
  },
  {
    id: 29,
    category: "capitulo",
    title:
      "SIMA: A near real time buoy data acquisition and telemetry system as support for limnological studies",
    authors: "LORENZETTI, J. A.; STECH, J. L.; NOVO, E. M. L. M.; and LIMA, I. B. T.",
    journal: "Global warming and hydroeletric reservoirs. Rio de Janeiro: COPPE",
    volume: null,
    pages: "71-80",
    year: "2005",
    issn: null,
    link: null,
  },
  {
    id: 30,
    category: "capitulo",
    title: "Space technology contribution for sustainable development in the Amazon Floodplain",
    authors: "NOVO, E. M. L. M.; STECH, J. L.; and BARBOSA, C. C. F.",
    journal: "Ecosystems and sustainable development V. Southampton: WIT Press",
    volume: null,
    pages: "563-570",
    year: "2005",
    issn: null,
    link: null,
  },
  {
    id: 31,
    category: "capitulo",
    title: "Uso de Derivadores Rastreados por Satélite em Ambientes Aquáticos Continentais",
    authors: "PACHECO, F. S.; ASSIREU, A. T.; and ROLAND, F.",
    journal:
      "Novas tecnologias para o monitoramento e estudo de reservatórios hidrelétricos e grandes lagos. São José dos Campos: Parêntese",
    volume: null,
    pages: "193-218",
    year: "2011",
    issn: null,
    link: null,
  },
  {
    id: 32,
    category: "capitulo",
    title:
      "Uso de tecnologia espacial para coleta automática de dados limnológicos e meteorológicos: aplicações nos reservatórios hidrelétricos de Manso e Corumbá",
    authors:
      "STECH, J.; ALCÂNTARA, E. H.; LORENZZETTI, J. A.; NOVO, E. M. L. M.; and LIMA, I. B. T.",
    journal:
      "Novas tecnologias para o monitoramento e estudo de reservatórios hidrelétricos e grandes lagos. São José dos Campos: Parêntese",
    volume: null,
    pages: "163-191",
    year: "2011",
    issn: null,
    link: null,
  },
  // Eventos
  {
    id: 14,
    category: "evento",
    title:
      "Estimativa dos fluxos de calor sensível e latente na superfície da água do reservatório de Itumbiara (GO) por meio de dados MODIS/Terra",
    authors:
      "ALCÂNTARA, E. H; STECH, J. L.; LORENZZETTI, J. A.; NOVO, E. M. L. M.; and SOUZA, A. F.",
    journal: "XV Simpósio Brasileiro de Sensoriamento Remoto - SBSR",
    volume: null,
    pages: "5185-5192",
    year: "2011",
    issn: null,
    link: null,
  },
  {
    id: 15,
    category: "evento",
    title: "Spatially Water Heat Flux using MODIS/terra data",
    authors: "ALCÂNTARA, E.; and STECH, J.",
    journal: "31st EARSeL Symposium and 34th General Assembly",
    volume: null,
    pages: null,
    year: "2011",
    issn: null,
    link: null,
  },
  {
    id: 33,
    category: "evento",
    title:
      "On the spatially water temperature and heat flux variability over a tropical hydroelectric reservoir",
    authors:
      "ALCÂNTARA, E. H.; STECH, J. L.; CASAMITJANA, X.; BONNET, M-P; LORENZZETTI, J. A.; and NOVO, E. M. L. M.",
    journal: "14th International Workshop on Physical Processes in Natural Waters",
    volume: null,
    pages: "8-15",
    year: "2010",
    issn: null,
    link: null,
  },
  {
    id: 34,
    category: "evento",
    title:
      "Cross wavelet, coherence and phase between water surface temperature and heat flux in a tropical hydroelectric reservoir",
    authors: "ALCÂNTARA, E. H.; STECH, J. L.; LORENZZETTI, J. A.; and NOVO, E. M. L. M.",
    journal: "14th International Workshop on Physical Processes in Natural Waters",
    volume: null,
    pages: "86-93",
    year: "2011",
    issn: null,
    link: null,
  },
  {
    id: 35,
    category: "evento",
    title:
      "Integração de dados de alta frequência temporal e imagens MODIS/Terra para o estudo da turbidez na planície de Curuai (PA, Brasil)",
    authors: "ALCÂNTARA, E. H.; STECH, J. L. ; BARBOSA, C.; NOVO, E. ; and SHIMABUKURO, Y.",
    journal: "XIII Simpósio Brasileiro de Sensoriamento Remoto - SBSR",
    volume: null,
    pages: "6549-6556",
    year: "2007",
    issn: null,
    link: "http://marte.dpi.inpe.br/col/dpi.inpe.br/sbsr@80/2006/10.11.04.08/doc/6549-6556.pdf",
  },
  {
    id: 36,
    category: "evento",
    title:
      "O comportamento do rio ao longo do reservatório observado a partir de Sensoriamento Remoto, dados in situ e ensaios de laboratório",
    authors:
      "ASSIREU, A. T.; NOVO, E M. L. M.; ROLAND, F.; PACHECO, F. S.; ALCÂNTARA, E. H.; and STECH, J. L.",
    journal: "XIV Simpósio Brasileiro de Sensoriamento Remoto - SBSR",
    volume: null,
    pages: "4647-4653",
    year: "2009",
    issn: null,
    link: "http://marte.dpi.inpe.br/col/dpi.inpe.br/sbsr@80/2008/11.12.16.41/doc/4647-4653.pdf",
  },
  {
    id: 37,
    category: "evento",
    title:
      "Aplicação do Operador de Fragmentação Assimétrica (FA) na comparação de dados coletados in situ por diferentes sensores e transmitidos pelos satélites brasileiros SCD e CBERS: um exemplo de aplicação ao Sistema de Monitoramento Ambiental (SIMA)",
    authors:
      "ASSIREU, A. T.; STECH, J. L.; NOVO, E. M. L. M.; LORENZETTI, J. A.; LIMA, I. B. T.; and CARVALHO, J. C.",
    journal: "XII Simpósio Brasileiro de Sensoriamento Remoto - SBSR",
    volume: null,
    pages: "2455-2462",
    year: "2005",
    issn: null,
    link: "http://marte.dpi.inpe.br/col/ltid.inpe.br/sbsr/2004/11.26.18.43/doc/2455.pdf",
  },
  {
    id: 38,
    category: "evento",
    title:
      "Integração de dados do sistema automático de monitoramento de variáveis ambientais (SIMA) e de imagens orbitais na avaliação do estado trófico do Reservatório da UHE Funil",
    authors:
      "NOVO, E. M. L. M.; STECH, J. L.; LONDE, L. R.; ASSIREU, A.; BARBOSA, C. C.; ALCÂNTARA, E. H.; and SOUZA, A. F.",
    journal: "XIV Simpósio Brasileiro de Sensoriamento Remoto - SBSR",
    volume: null,
    pages: "4797-4804",
    year: "2009",
    issn: null,
    link: "http://marte.dpi.inpe.br/col/dpi.inpe.br/sbsr@80/2008/11.14.00.00/doc/4797-4804.pdf",
  },
  {
    id: 39,
    category: "evento",
    title:
      "Temporal variability Chlorophyll-a concentration in floodplain lakes in response to seasonality of Amazon River discharge",
    authors:
      "NOVO, E.; BARBOSA, C.; STECH, J.; ALCÂNTARA, E. H.; RUDORFF, C. M.; and ASSIREU, A. T.",
    journal: "Amazônia em Perspectiva. Anais Amazônia em Perspectiva",
    volume: null,
    pages: null,
    year: "2008",
    issn: null,
    link: null,
  },
  {
    id: 40,
    category: "evento",
    title:
      "Arquitetura de um banco de dados para suporte à integração de dados de campo e de sensoriamento remoto em estudos limnológicos e meteorológicos",
    authors: "SOUZA, A. F.; BARBOSA, C. C.; NOVO, E. M. L. M.; and STECH, J. L.",
    journal: "XIV Simpósio Brasileiro de Sensoriamento Remoto - SBSR",
    volume: null,
    pages: "2349-2355",
    year: "2009",
    issn: null,
    link: "http://marte.dpi.inpe.br/col/dpi.inpe.br/sbsr@80/2008/11.17.22.59.52/doc/2349-2355.pdf",
  },
  {
    id: 41,
    category: "evento",
    title:
      "The impacts of the cold fronts on thermal stratification and water quality in a tropical reservoir (Brazil)",
    authors:
      "STECH, J. L.; ALCÂNTARA, E. H.; LORENZZETTI, J. A.; NOVO, E. M. L. M.; and ASSIREU, A. T.",
    journal: "14th International Workshop on Physical Processes in Natural Waters",
    volume: null,
    pages: "94-101",
    year: "2010",
    issn: null,
    link: null,
  },
  {
    id: 42,
    category: "evento",
    title: "Variabilidade dos dados bóia SIMA analisados pelo Operador de Fragmentação Assimétrica",
    authors: "VALÉRIO, A. M.; KAMPEL, M.; STECH, J. L.; and ASSIREU, A. T.",
    journal: "XV Simpósio Brasileiro de Sensoriamento Remoto - SBSR",
    volume: null,
    pages: "5108-5115",
    year: "2011",
    issn: null,
    link: null,
  },
  // Teses e dissertações
  {
    id: 16,
    category: "tese",
    title:
      "Sensoriamento remoto da temperatura e dos fluxos de calor na superfície da água no reservatório de Itumbiara (GO)",
    authors: "ALCÂNTARA, E. H.",
    journal: "Tese (Doutorado em Sensoriamento Remoto) - Instituto Nacional de Pesquisas Espaciais",
    volume: null,
    pages: "136 p",
    year: "2010",
    issn: null,
    link: null,
  },
  {
    id: 17,
    category: "tese",
    title:
      "Análise da turbidez na planície de inundação de Curuaí (PA, Brasil) integrando dados telemétricos e Imagens MODIS/Terra",
    authors: "ALCÂNTARA, E. H.",
    journal:
      "Dissertação (Mestrado em Sensoriamento Remoto) - Instituto Nacional de Pesquisas Espaciais",
    volume: null,
    pages: "217 p",
    year: "2006",
    issn: null,
    link: null,
  },
  {
    id: 18,
    category: "tese",
    title:
      "Caracterização e avaliação da dinâmica sazonal as propriedades bio-ópticas do reservatório de Funil com apoio de sensoriamento remoto, dados in situ e modelos ópticos",
    authors: "AUGUSTO-SILVA, P. B.",
    journal:
      "Dissertação (Mestrado em Sensoriamento Remoto) - Instituto Nacional de Pesquisas Espaciais",
    volume: null,
    pages: "155 p",
    year: "2013",
    issn: null,
    link: "http://mtc-m16d.sid.inpe.br/col/sid.inpe.br/mtc-m19/2013/05.14.17.42/doc/publicacao.pdf",
  },
];

// Função para obter nome da categoria
const getCategoryName = (category: string) => {
  switch (category) {
    case "artigo":
      return "Artigos";
    case "livro":
      return "Livro";
    case "capitulo":
      return "Capítulos de livros";
    case "evento":
      return "Eventos";
    case "tese":
      return "Teses e dissertações";
    default:
      return "Publicação";
  }
};

function SimaSPAPage() {
  const { data, loading, error, pagination, fetchData } = useSimaApi();
  const { estacoes } = useEstacoes();
  const [filters, setFilters] = useState({
    startDate: "2004-01-12", // Menor data disponível no banco SIMA
    endDate: "2016-12-03", // Maior data disponível no banco SIMA
    limit: 10,
    estacao: "", // Filtro por estação
    sortOrder: "desc", // Ordenação: "asc" (mais antigo → mais recente) ou "desc" (mais recente → mais antigo)
  });

  // Estado para publicações
  const [publicationFilters, setPublicationFilters] = useState({
    searchTerm: "",
    selectedCategories: [] as string[],
  });

  // Filtrar publicações
  const filteredPublications = publicationsData.filter((pub) => {
    const matchesSearch =
      pub.title.toLowerCase().includes(publicationFilters.searchTerm.toLowerCase()) ||
      pub.authors.toLowerCase().includes(publicationFilters.searchTerm.toLowerCase()) ||
      pub.journal.toLowerCase().includes(publicationFilters.searchTerm.toLowerCase());

    const matchesCategory =
      publicationFilters.selectedCategories.length === 0 ||
      publicationFilters.selectedCategories.includes(pub.category);

    return matchesSearch && matchesCategory;
  });

  // Função para alternar categoria
  const toggleCategory = (category: string) => {
    setPublicationFilters((prev) => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(category)
        ? prev.selectedCategories.filter((c) => c !== category)
        : [...prev.selectedCategories, category],
    }));
  };

  // Função para limpar filtros
  const clearPublicationFilters = () => {
    setPublicationFilters({
      searchTerm: "",
      selectedCategories: [],
    });
  };

  // Função para buscar datas específicas de uma estação
  const updateDatesForStation = async (estacao: string) => {
    // Atualizar a estação primeiro
    setFilters((prev) => ({
      ...prev,
      estacao: estacao,
    }));

    // Se for "todas as estações", usar as datas gerais
    if (!estacao) {
      setFilters((prev) => ({
        ...prev,
        startDate: "2004-01-12", // Data mais antiga geral
        endDate: "2016-12-03", // Data mais recente geral
        estacao: estacao,
      }));
      return;
    }

    try {
      // Buscar dados da estação específica para obter as datas
      const response = await fetch(
        `http://localhost:3001/sima/all?page=1&limit=1000&startDate=2004-01-01&endDate=2017-12-31&estacao=${estacao}`,
      );

      if (response.ok) {
        const result = await response.json();

        if (result.success && result.data && result.data.length > 0) {
          // Encontrar a data mais antiga e mais recente
          const dates = result.data.map((item: { datahora: string }) => new Date(item.datahora));
          const minDate = new Date(Math.min(...dates.map((d: Date) => d.getTime())));
          const maxDate = new Date(Math.max(...dates.map((d: Date) => d.getTime())));

          // Atualizar os filtros com as novas datas
          setFilters((prev) => ({
            ...prev,
            startDate: minDate.toISOString().split("T")[0],
            endDate: maxDate.toISOString().split("T")[0],
          }));
        }
      }
    } catch (error) {
      console.error("Erro ao buscar datas da estação:", error);
    }
  };

  // Carregamento manual apenas quando clicar em "Buscar Dados"

  const handleSearch = () => {
    fetchData({
      page: 1,
      limit: filters.limit,
      startDate: filters.startDate,
      endDate: filters.endDate,
      estacao: filters.estacao || undefined,
      sortOrder: filters.sortOrder,
    });
  };

  const handlePageChange = (newPage: number) => {
    fetchData({
      page: newPage,
      limit: filters.limit,
      startDate: filters.startDate,
      endDate: filters.endDate,
      estacao: filters.estacao || undefined,
      sortOrder: filters.sortOrder,
    });
  };

  const handleClearFilters = () => {
    setFilters({
      startDate: "2004-01-12", // Menor data disponível no banco SIMA
      endDate: "2016-12-03", // Maior data disponível no banco SIMA
      limit: 10,
      estacao: "",
      sortOrder: "desc",
    });
  };

  // Lista de estações disponíveis no banco SIMA (agora dinâmica)
  const estacoesOptions = [
    { value: "", label: "Todas as estações" },
    ...estacoes.map((estacao) => ({
      value: estacao.idestacao,
      label: estacao.rotulo,
    })),
  ];
  return (
    <SimaSPAContainer>
      <MainContent>
        {/* Seção Sobre o SIMA */}
        <Section id="home">
          <SectionTitleWithLogo>
            <SmallLogo src={simaLogo} alt="Logo SIMA" />
          </SectionTitleWithLogo>
          <SectionSubtitle style={{ textAlign: "center" }}>
            Sistema Integrado de Monitoramento Ambiental
          </SectionSubtitle>

          <SectionText>
            O SIMA (Sistema Integrado de Monitoramento Ambiental) é um conjunto de hardware e
            software desenhado para a coleta de dados e o monitoramento em tempo real de processos
            da hidrosfera. Para a coleta dos dados, o SIMA faz uso de um sistema autônomo fundeado,
            onde são instalados sensores, eletrônica de armazenamento, bateria e antena de
            transmissão.
          </SectionText>

          <SectionText>
            Os dados coletados em intervalo de tempo pré-programado são transmitidos via satélite e
            também armazenados na estação de coleta, sendo que os dados armazenados são aqueles
            obtidos com maior frequência. Este portal permite o acesso aos dados transmitidos por
            satélite poucas horas após a coleta. A associação destas componentes fornece uma
            poderosa ferramenta que pode ser empregada no gerenciamento e controle ambiental de
            recursos hídricos.
          </SectionText>
        </Section>

        {/* Seção Motivação */}
        <Section>
          <SectionTitle>
            <Activity size={40} />
            Motivação do SIMA
          </SectionTitle>

          <ProblemsList>
            <ProblemItem>
              Sistemas aquáticos são muito dinâmicos e podem sofrer mudanças significativas em
              questão de horas.
            </ProblemItem>
            <ProblemItem>
              A logística necessária para amostrar adequadamente os sistemas aquáticos em estudo é
              complexa e cara.
            </ProblemItem>
            <ProblemItem>
              Há necessidade de dados em tempo real para a tomada de decisões.
            </ProblemItem>
          </ProblemsList>
        </Section>

        {/* Seção Estrutura do SIMA */}
        <Section>
          <SectionTitle>
            <Shield size={40} />
            Estrutura do SIMA
          </SectionTitle>
          <SectionText>
            O SIMA é formado por uma plataforma que em alguns modelos pode ser uma bóia toroidal
            (foto abaixo e à esquerda) ou uma estrutura maior (foto abaixo e à direita). No centro
            da plataforma existe uma torre onde são afixados os painéis solares, sensores
            meteorológicos e antena. No vão central um compartimento abriga a eletrônica do sistema,
            baterias e transmissor de satélite. Os sensores submersos são conectados à eletrônica
            por cabos.
          </SectionText>

          <ImagesContainer>
            <ImageWrapper>
              <StructureImage src={estruturaSima1} alt="Estrutura SIMA - Bóia Toroidal" />
              <ImageCaption>Bóia Toroidal</ImageCaption>
            </ImageWrapper>
            <ImageWrapper>
              <StructureImage src={estruturaSima2} alt="Estrutura SIMA - Estrutura Maior" />
              <ImageCaption>Estrutura Maior</ImageCaption>
            </ImageWrapper>
          </ImagesContainer>
        </Section>

        {/* Seção Modo de Funcionamento */}
        <Section>
          <SectionTitle>
            <Clock size={40} />
            Modo de Funcionamento
          </SectionTitle>

          <SectionText>
            <strong>Coleta e transmissão dos dados:</strong> circuitos analógicas e digitais são
            responsáveis por comandar o conjunto de sensores, variáveis de engenharia e ativar o
            transmissor de satélite.
          </SectionText>

          <SectionText>
            <strong>Amostragem:</strong> a cada hora cheia um novo conjunto completo de dados é
            armazenado em um buffer de memória. Após enchimento dos oito buffers, o conjunto mais
            antigo é descartado.
          </SectionText>

          <SectionText>
            <strong>Esquema de transmissão:</strong> a cada 90 segundos, um dos oito buffers é
            transmitido em esquema de carrossel. A transmissão é executada independente de existir
            satélite para receber os dados.
          </SectionText>

          <SectionText>
            <strong>Recepção dos dados:</strong> as unidades do INPE de Cuiabá - MT e Alcântara - MA
            recebem os dados dos satélites e em seguida transmitem para a unidade de Natal - RN,
            onde os dados são processados para filtrar falhas na transmissão e para posterior envio
            para a DSR (Divisão de Sensoriamento Remoto) do INPE de São José dos Campos - SP, onde
            os dados são decodificados, processados e armazenados.
          </SectionText>

          <SectionText>
            <strong>Distribuição dos dados:</strong> este portal é usado para a consulta e
            visualização dos dados armazenados.
          </SectionText>

          <SectionText>
            <strong>Armazenamento interno:</strong> alguns SIMAs possuem a capacidade de armazenar
            as coletas para posterior download por um técnico in situ, ou seja, estes dados não são
            transmitidos por satélite. Neste caso as coletas são realizadas a cada 10 minutos.
          </SectionText>

          <ImageWrapper style={{ marginTop: "2rem" }}>
            <FuncionamentoImage src={funcionamentoSima} alt="Modo de Funcionamento do SIMA" />
            <ImageCaption>Diagrama do Modo de Funcionamento</ImageCaption>
          </ImageWrapper>
        </Section>

        {/* Seção Dados Coletados */}
        <Section>
          <SectionTitle>
            <Database size={40} />
            Dados Coletados
          </SectionTitle>
          <SectionText>
            O SIMA coleta algumas variáveis ambientais a partir de sensores colocados acima da linha
            d'água (temperatura do ar, pressão atmosférica, direção e intensidade de ventos,
            radiação solar incidente e refletida) e abaixo da linha d'água (amônia, nitrato,
            clorofila, condutividade, direção e intensidade da corrente, oxigênio dissolvido, pH e
            temperatura em diferentes profundidades).
          </SectionText>
        </Section>

        {/* Seção História */}
        <Section>
          <SectionTitle>
            <Clock size={40} />
            História
          </SectionTitle>
          <SectionText>
            O SIMA foi desenvolvido em uma parceria entre a Universidade do Vale do Paraíba e o
            INPE. A partir de 1995, o projeto foi transferido para a Neuron Engenharia Ltda. Através
            de uma parceria com a Diretoria de Hidrografia e Navegação (DHN) a Neuron construiu um
            protótipo do SIMA, que ficou fundeado em águas do litoral do Rio de Janeiro durante um
            ano e os dados coletados foram disponibilizados pelo Programa Nacional de Bóia.
          </SectionText>
          <SectionText>
            Os dados coletados neste período foram comparados com dados in situ, o que confirmou o
            bom desempenho do sistema.
          </SectionText>
        </Section>

        {/* Seção Problemas */}
        <Section>
          <SectionTitle>
            <Shield size={40} />
            Problemas Observados
          </SectionTitle>

          <SectionText>
            <strong>Sensores:</strong> Por características específicas de alguns ambientes
            aquáticos, os sensores podem se degradar rapidamente, tornando os dados inválidos. Veja
            como exemplo a foto abaixo tirada da sonda do SIMA fundeado no reservatório de Funil, no
            momento de uma atividade de calibração.
          </SectionText>

          <SectionText>
            <strong>Satélite:</strong> O SIMA faz uma leitura de parâmetros a cada hora, ou seja, 24
            leituras por dia. Acontece que nem sempre são recebidas todas as leituras, pois o
            sistema necessita de satélites para completar a transmissão e por questão de
            posicionamento da constelação de satélites, algumas localidades terrestres não são
            atendidas com a frequência necessária para completar todas as transmissões.
          </SectionText>

          <ImageWrapper style={{ marginTop: "2rem" }}>
            <FuncionamentoImage src={sondaSima} alt="Sonda SIMA no Reservatório de Funil" />
            <ImageCaption>Sonda SIMA no Reservatório de Funil durante calibração</ImageCaption>
          </ImageWrapper>
        </Section>

        {/* Seção Equipe (layout igual ao BALCAR) */}
        <Section id="equipe">
          <SectionTitle>
            <Users size={40} />
            Equipe
          </SectionTitle>

          <TeamGroup>
            <GroupTitle>Coordenação</GroupTitle>
            <TeamGrid>
              <PersonItem>
                <NameLink href="http://lattes.cnpq.br/2691497637313274" target="_blank" rel="noopener noreferrer">José Luiz Stech</NameLink>
                <PersonMeta>Coordenação • <InstitutionTag>INPE</InstitutionTag> • stech@dsr.inpe.br</PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink href="http://lattes.cnpq.br/7939379291404418" target="_blank" rel="noopener noreferrer">Enner Herenio de Alcântara</NameLink>
                <PersonMeta>Coordenação</PersonMeta>
              </PersonItem>
            </TeamGrid>
          </TeamGroup>

          <TeamGroup>
            <GroupTitle>Colaboradores</GroupTitle>
            <TeamGrid>
              <PersonItem>
                <NameLink href="http://lattes.cnpq.br/5535667070825818" target="_blank" rel="noopener noreferrer">André Carlos Prates Cimbleris</NameLink>
                <PersonMeta>Colaborador</PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink href="http://lattes.cnpq.br/8150880476098677" target="_blank" rel="noopener noreferrer">Arcilan Trevenzoli Assireu</NameLink>
                <PersonMeta>Colaborador</PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink href="http://lattes.cnpq.br/7642043789034070" target="_blank" rel="noopener noreferrer">Artur Luiz da Costa da Silva</NameLink>
                <PersonMeta>Colaborador</PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink href="http://lattes.cnpq.br/7466500214796269" target="_blank" rel="noopener noreferrer">Augusto Cesar Fonseca Saraiva</NameLink>
                <PersonMeta>Colaborador</PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink href="http://lattes.cnpq.br/1596449770636962" target="_blank" rel="noopener noreferrer">Cláudio Clemente Faria Barbosa</NameLink>
                <PersonMeta>Colaborador</PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink href="http://lattes.cnpq.br/4775535537651746" target="_blank" rel="noopener noreferrer">Donato Seiji Abe</NameLink>
                <PersonMeta>Colaborador</PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink href="http://lattes.cnpq.br/9857505876280820" target="_blank" rel="noopener noreferrer">Evlyn Márcia Leão de Moraes Novo</NameLink>
                <PersonMeta>Colaborador</PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink href="http://lattes.cnpq.br/0567809153346429" target="_blank" rel="noopener noreferrer">Fábio Roland</NameLink>
                <PersonMeta>Colaborador</PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink href="http://lattes.cnpq.br/3852581196429739" target="_blank" rel="noopener noreferrer">João Antônio Lorenzzetti</NameLink>
                <PersonMeta>Colaborador</PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink href="http://lattes.cnpq.br/0030922264947314" target="_blank" rel="noopener noreferrer">Jorge Machado Damazio</NameLink>
                <PersonMeta>Colaborador</PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink href="http://lattes.cnpq.br/4155308755013168" target="_blank" rel="noopener noreferrer">Marco Aurélio dos Santos</NameLink>
                <PersonMeta>Colaborador</PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink href="http://lattes.cnpq.br/8471974730664804" target="_blank" rel="noopener noreferrer">Maria Elvira Piñeiro Maceira</NameLink>
                <PersonMeta>Colaboradora</PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink href="http://lattes.cnpq.br/5149356080083086" target="_blank" rel="noopener noreferrer">Nelson Luís da Costa Dias</NameLink>
                <PersonMeta>Colaborador</PersonMeta>
              </PersonItem>
            </TeamGrid>
          </TeamGroup>

          <TeamGroup>
            <GroupTitle>Desenvolvimento do Sistema de Coleta de Dados</GroupTitle>
            <TeamGrid>
              <PersonItem>
                <PersonName>Neuron Eletrônica</PersonName>
                <PersonMeta>Desenvolvimento</PersonMeta>
              </PersonItem>
            </TeamGrid>
          </TeamGroup>

          <TeamGroup>
            <GroupTitle>Manutenção do Sistema de Coleta de Dados</GroupTitle>
            <TeamGrid>
              <PersonItem>
                <PersonName>Alexandre Donizetti da Silva</PersonName>
                <PersonMeta>Neuron Eletrônica</PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink href="http://lattes.cnpq.br/4915211809920432" target="_blank" rel="noopener noreferrer">Carlos Alberto Sampaio de Araújo</NameLink>
                <PersonMeta>Manutenção</PersonMeta>
              </PersonItem>
              <PersonItem>
                <PersonName>Geraldo Orlando Mendes</PersonName>
                <PersonMeta>Manutenção</PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink href="http://lattes.cnpq.br/7596795539833144" target="_blank" rel="noopener noreferrer">Joaquim Antônio Dionísio Leão</NameLink>
                <PersonMeta>Manutenção</PersonMeta>
              </PersonItem>
              <PersonItem>
                <NameLink href="http://lattes.cnpq.br/6286335301335965" target="_blank" rel="noopener noreferrer">Vitor Bruno</NameLink>
                <PersonMeta>Manutenção</PersonMeta>
              </PersonItem>
            </TeamGrid>
          </TeamGroup>

          <TeamGroup>
            <GroupTitle>Gerente de Rede do Portal</GroupTitle>
            <TeamGrid>
              <PersonItem>
                <PersonName>João Benedito Diehl</PersonName>
                <PersonMeta>Gerente de Rede</PersonMeta>
              </PersonItem>
            </TeamGrid>
          </TeamGroup>
        </Section>

        {/* Publicações movidas para página dedicada /sima/publicacoes */}

        {/* Seção Apoio */}
        <Section id="apoio">
          <SectionTitle>
            <Target size={40} />
            Apoio Institucional
          </SectionTitle>
          <SectionText>
            Ao longo da existência deste sistema, os fundos para a compra e manutenção dos sistemas
            de coleta e recursos computacionais foram fornecidos pelas seguintes instituições:
          </SectionText>
          <SupportList>
            <SupportItem>
              <a href="https://www.cepel.br/" target="_blank" rel="noopener noreferrer">
                CEPEL
              </a>
            </SupportItem>
            <SupportItem>Chesf</SupportItem>
            <SupportItem>
              <a href="https://www.gov.br/cnpq/pt-br" target="_blank" rel="noopener noreferrer">
                CNPq
              </a>
            </SupportItem>
            <SupportItem>Eletronorte</SupportItem>
            <SupportItem>
              <a href="https://fapesp.br/" target="_blank" rel="noopener noreferrer">
                FAPESP
              </a>
            </SupportItem>
            <SupportItem>
              <a href="https://www.furnas.com.br/" target="_blank" rel="noopener noreferrer">
                Furnas Centrais Elétricas
              </a>
            </SupportItem>
          </SupportList>
        </Section>

        {/* Seção Mapa - agora antes do Banco de Dados */}
        <Section id="mapa">
          <SectionTitle>
            <MapPin size={40} />
            Mapa Interativo
          </SectionTitle>
          <SectionSubtitle>
            Visualize a localização das estações SIMA e dados coletados em tempo real
          </SectionSubtitle>

          <MapPlaceholder>
            <MapPin size={48} style={{ marginBottom: "1rem", opacity: 0.5 }} />
            <h3>Mapa Interativo</h3>
            <p>Esta seção será implementada com um mapa interativo mostrando:</p>
            <ul style={{ textAlign: "left", maxWidth: "400px", margin: "1rem auto" }}>
              <li>Localização das estações SIMA</li>
              <li>Dados em tempo real</li>
              <li>Filtros por período e parâmetros</li>
              <li>Visualização de séries temporais</li>
            </ul>
          </MapPlaceholder>

          <FilterButton>
            <Filter size={20} />
            Configurar Filtros
          </FilterButton>
        </Section>

        {/* Seção Banco de Dados - Mesmo modelo do mapa */}
        <Section id="dados">
          <SectionTitle>
            <Database size={40} />
            Banco de Dados
          </SectionTitle>
          <SectionSubtitle>
            Consulte e visualize os dados coletados pelo SIMA em formato de tabelas
          </SectionSubtitle>

          <ControlsSection>
            <ControlsGrid>
              <DateRangeGroup>
                <ControlLabel>Período</ControlLabel>
                <DateRangeContainer>
                  <DateRangeInput
                    type="date"
                    value={filters.startDate}
                    onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                  />
                  <DateRangeSeparator>até</DateRangeSeparator>
                  <DateRangeInput
                    type="date"
                    value={filters.endDate}
                    onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                  />
                </DateRangeContainer>
              </DateRangeGroup>
              <ControlGroup>
                <ControlLabel>Estação</ControlLabel>
                <ControlSelect
                  value={filters.estacao}
                  onChange={(e) => updateDatesForStation(e.target.value)}
                >
                  {estacoesOptions.map((estacao) => (
                    <option key={estacao.value} value={estacao.value}>
                      {estacao.label}
                    </option>
                  ))}
                </ControlSelect>
              </ControlGroup>
              <ControlGroup>
                <ControlLabel>Registros por página</ControlLabel>
                <ControlSelect
                  value={filters.limit}
                  onChange={(e) => setFilters({ ...filters, limit: parseInt(e.target.value) })}
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </ControlSelect>
              </ControlGroup>
              <ControlGroup>
                <ControlLabel>Ordenação</ControlLabel>
                <ControlSelect
                  value={filters.sortOrder}
                  onChange={(e) => setFilters({ ...filters, sortOrder: e.target.value })}
                >
                  <option value="desc">Mais recente → Mais antigo</option>
                  <option value="asc">Mais antigo → Mais recente</option>
                </ControlSelect>
              </ControlGroup>
            </ControlsGrid>

            <ActionButtons>
              <SearchButton onClick={handleSearch} disabled={loading}>
                <Search size={20} />
                {loading ? "Buscando..." : "Buscar Dados"}
              </SearchButton>
              <ClearButton onClick={handleClearFilters}>
                <Filter size={20} />
                Limpar Filtros
              </ClearButton>
              <CsvExportButton data={data} filename="dados_sima.csv" />
            </ActionButtons>
          </ControlsSection>

          {error && (
            <ErrorContainer>
              <strong>Erro ao carregar dados:</strong> {error}
            </ErrorContainer>
          )}

          {loading ? (
            <LoadingContainer>
              <Search size={24} style={{ marginRight: "0.5rem" }} />
              Carregando dados...
            </LoadingContainer>
          ) : (
            <>
              <TableContainer>
                <StyledTable>
                  <thead>
                    <tr>
                      <th>
                        <Database size={18} /> ID
                      </th>
                      <th>
                        <MapPin size={18} /> Estação
                      </th>
                      <th>
                        <Clock size={18} /> Data/Hora
                      </th>
                      <th>
                        <Activity size={18} /> Reg. No
                      </th>
                      <th>
                        <TestTube size={18} /> Amostras
                      </th>
                      <th>
                        <Navigation size={18} /> Proa Mag
                      </th>
                      <th>
                        <Wind size={18} /> Vento Dir. (°)
                      </th>
                      <th>
                        <Wind size={18} /> Vento Vel. (m/s)
                      </th>
                      <th>
                        <Wind size={18} /> Vento U (m/s)
                      </th>
                      <th>
                        <Wind size={18} /> Vento V (m/s)
                      </th>
                      <th>
                        <Waves size={18} /> Temp. Água 1 (°C)
                      </th>
                      <th>
                        <Waves size={18} /> Temp. Água 2 (°C)
                      </th>
                      <th>
                        <Waves size={18} /> Temp. Água 3 (°C)
                      </th>
                      <th>
                        <Waves size={18} /> Temp. Água 4 (°C)
                      </th>
                      <th>
                        <Thermometer size={18} /> Temp. Ar (°C)
                      </th>
                      <th>
                        <Droplets size={18} /> Umidade (%)
                      </th>
                      <th>
                        <Thermometer size={18} /> Temp. Ar Rotronic (°C)
                      </th>
                      <th>
                        <Gauge size={18} /> Pressão (hPa)
                      </th>
                      <th>
                        <Sun size={18} /> Rad. Solar Inc. (W/m²)
                      </th>
                      <th>
                        <Sun size={18} /> Rad. Solar Ref. (W/m²)
                      </th>
                      <th>
                        <Battery size={18} /> Bateria Painel (V)
                      </th>
                      <th>
                        <Thermometer size={18} /> Sonda Temp. (°C)
                      </th>
                      <th>
                        <Zap size={18} /> Condutividade (μS/cm)
                      </th>
                      <th>
                        <Eye size={18} /> O₂ Saturação (%)
                      </th>
                      <th>
                        <Droplet size={18} /> Oxigênio (mg/L)
                      </th>
                      <th>
                        <TestTube size={18} /> pH
                      </th>
                      <th>
                        <TestTube size={18} /> Amonia (mg/L)
                      </th>
                      <th>
                        <TestTube size={18} /> Nitrato (mg/L)
                      </th>
                      <th>
                        <Eye size={18} /> Turbidez (NTU)
                      </th>
                      <th>
                        <Droplet size={18} /> Clorofila (μg/L)
                      </th>
                      <th>
                        <Battery size={18} /> Sonda Bateria (V)
                      </th>
                      <th>
                        <Navigation size={18} /> Corrente Norte (m/s)
                      </th>
                      <th>
                        <Navigation size={18} /> Corrente Leste (m/s)
                      </th>
                      <th>
                        <AlertCircle size={18} /> CO₂ Baixo (ppm)
                      </th>
                      <th>
                        <AlertCircle size={18} /> CO₂ Alto (ppm)
                      </th>
                      <th>
                        <CloudRain size={18} /> Precipitação (mm)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr key={item.idsima}>
                        <td>
                          <strong>{item.idsima}</strong>
                        </td>
                        <td>
                          <strong>{item.nome_estacao || item.idestacao}</strong>
                        </td>
                        <td>
                          <strong>{new Date(item.datahora).toLocaleString("pt-BR")}</strong>
                        </td>
                        <td>{item.regno || "-"}</td>
                        <td>{item.nofsamples || "-"}</td>
                        <td>{formatValue(item.proamag, 2)}</td>
                        <td>{formatValue(item.dirvt, 1)}</td>
                        <td>{formatValue(item.intensvt, 1)}</td>
                        <td>{formatValue(item.u_vel, 2)}</td>
                        <td>{formatValue(item.v_vel, 2)}</td>
                        <td>{formatValue(item.tempag1, 1)}</td>
                        <td>{formatValue(item.tempag2, 1)}</td>
                        <td>{formatValue(item.tempag3, 1)}</td>
                        <td>{formatValue(item.tempag4, 1)}</td>
                        <td>{formatValue(item.tempar, 1)}</td>
                        <td>{formatValue(item.ur, 1)}</td>
                        <td>{formatValue(item.tempar_r, 1)}</td>
                        <td>{formatValue(item.pressatm, 1)}</td>
                        <td>{formatValue(item.radincid, 1)}</td>
                        <td>{formatValue(item.radrefl, 1)}</td>
                        <td>{formatValue(item.bateria, 2)}</td>
                        <td>{formatValue(item.sonda_temp, 1)}</td>
                        <td>{formatValue(item.sonda_cond, 1)}</td>
                        <td>{formatValue(item.sonda_dosat, 1)}</td>
                        <td>{formatValue(item.sonda_do, 1)}</td>
                        <td>{formatValue(item.sonda_ph, 1)}</td>
                        <td>{formatValue(item.sonda_nh4, 2)}</td>
                        <td>{formatValue(item.sonda_no3, 2)}</td>
                        <td>{formatValue(item.sonda_turb, 1)}</td>
                        <td>{formatValue(item.sonda_chl, 1)}</td>
                        <td>{formatValue(item.sonda_bateria, 2)}</td>
                        <td>{formatValue(item.corr_norte, 2)}</td>
                        <td>{formatValue(item.corr_leste, 2)}</td>
                        <td>{formatValue(item.co2_low, 1)}</td>
                        <td>{formatValue(item.co2_high, 1)}</td>
                        <td>{formatValue(item.precipitacao, 1)}</td>
                      </tr>
                    ))}
                  </tbody>
                </StyledTable>
              </TableContainer>

              {data.length === 0 && !loading && !error && (
                <div style={{ textAlign: "center", padding: "2rem", color: "#666" }}>
                  <Database size={48} style={{ marginBottom: "1rem", opacity: 0.5 }} />
                  <p>Nenhum dado carregado ainda.</p>
                  <p>
                    Configure os filtros e clique em "Buscar Dados" para visualizar as informações.
                  </p>
                </div>
              )}

              {data.length > 0 && (
                <PaginationContainer>
                  <PaginationButton
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page <= 1}
                  >
                    <ChevronLeft size={16} />
                    Anterior
                  </PaginationButton>

                  <PaginationInfo>
                    Página {pagination.page} de {pagination.totalPages}({pagination.total}{" "}
                    registros)
                  </PaginationInfo>

                  <PaginationButton
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page >= pagination.totalPages}
                  >
                    Próxima
                    <ChevronRight size={16} />
                  </PaginationButton>
                </PaginationContainer>
              )}

              {data.length === 0 && !loading && !error && (
                <LoadingContainer>
                  Nenhum dado encontrado para o período selecionado.
                </LoadingContainer>
              )}
            </>
          )}
        </Section>
      </MainContent>
    </SimaSPAContainer>
  );
}

export default SimaSPAPage;
