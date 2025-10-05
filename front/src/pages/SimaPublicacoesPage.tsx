import { useState } from "react";
import styled from "styled-components";
import { BookOpen, FileText, Calendar, Hash, Layers, Book, ExternalLink } from "lucide-react";

// Container and section styles aligned with SimaSPAPage
const PageContainer = styled.div`
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
  font-size: 2.25rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const SectionSubtitle = styled.p`
  font-size: 1.05rem;
  color: #475569;
  margin: 0 0 1.25rem 0;
`;

const PublicationsContainer = styled.div`
  background: #f8fafc;
  border-radius: 16px;
  padding: 1.5rem;
  margin: 1.5rem 0 0 0;
  border: 1px solid #e5e7eb;
  box-shadow:
    0 10px 20px rgba(2, 6, 23, 0.04),
    0 2px 6px rgba(2, 6, 23, 0.04);
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
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

const ToolbarRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const ClearButton = styled.button`
  background: white;
  border: 1px solid #cbd5e1;
  color: #334155;
  font-weight: 600;
  padding: 0.55rem 0.9rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover { background: #f1f5f9; border-color: #94a3b8; }
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
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 1.25rem;
  margin-top: 1rem;
`;

const PublicationCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.25rem 1.25rem 1rem 1.25rem;
  border: 1px solid #e5e7eb;
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
  margin-bottom: 1rem;
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
  font-size: 1.05rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 0.5rem 0;
  line-height: 1.45;
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
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 0.5rem 0.75rem;
  margin-top: 0.5rem;
  padding-top: 0.75rem;
  border-top: 1px solid #eef2f7;
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
  color: #1e3a8a;
  background: #eef2ff;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.9rem;
  margin-top: 0.75rem;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  transition: all 0.2s ease;
  box-shadow: none;

  &:hover {
    background: #e0e7ff;
    transform: translateY(-1px);
  }
`;

const ResultsCount = styled.div`
  color: #64748b;
  font-size: 0.9rem;
  margin-top: 1rem;
  text-align: center;
`;

type Publication = {
  id: number;
  category: string;
  title: string;
  authors: string;
  journal: string | null;
  volume: string | null;
  pages: string | null;
  year: string;
  issn: string | null;
  link: string | null;
};
const publicationsData: Publication[] = [];

function SimaPublicacoesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const filteredPublications = publicationsData.filter((pub) => {
    const matchesSearch =
      pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (pub.journal ? pub.journal.toLowerCase().includes(searchTerm.toLowerCase()) : false);

    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(pub.category);
    return matchesSearch && matchesCategory;
  });

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
  };

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

  return (
    <PageContainer>
      <MainContent>
        <Section>
          <SectionTitle>
            <BookOpen size={40} /> Publicações Científicas
          </SectionTitle>
          <SectionSubtitle>Explore o acervo de publicações relacionadas ao SIMA com filtros e busca.</SectionSubtitle>

          <PublicationsContainer>
            <ToolbarRow>
              <SearchContainer>
              <InputWrapper>
                <SearchIconLeft>
                  <FileText size={18} />
                </SearchIconLeft>
                <SearchInput
                  type="text"
                  placeholder="Buscar por título, autor ou revista..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputWrapper>
              </SearchContainer>
              <ClearButton onClick={clearFilters}>Limpar filtros</ClearButton>
            </ToolbarRow>

            <FilterChips>
              {[
                { key: "artigo", label: "Artigos" },
                { key: "livro", label: "Livro" },
                { key: "capitulo", label: "Capítulos de livros" },
                { key: "evento", label: "Eventos" },
                { key: "tese", label: "Teses e dissertações" },
              ].map((c) => (
                <FilterChip key={c.key} $active={selectedCategories.includes(c.key)} onClick={() => toggleCategory(c.key)}>
                  {c.label} ({publicationsData.filter((p) => p.category === c.key).length})
                </FilterChip>
              ))}
            </FilterChips>

            <PublicationsGrid>
              {filteredPublications.map((publication) => (
                <PublicationCard key={publication.id}>
                  <AccentBar $category={publication.category} />
                  <PublicationHeader>
                    <PublicationCategory $category={publication.category}>
                      {getCategoryName(publication.category)}
                    </PublicationCategory>
                    <PublicationTitle>{publication.title}</PublicationTitle>
                    <PublicationAuthors>{publication.authors}</PublicationAuthors>
                  </PublicationHeader>

                  <PublicationDetails>
                    {publication.journal && (
                      <PublicationDetail>
                        <Book size={16} /> {publication.journal}
                      </PublicationDetail>
                    )}
                    {publication.volume && (
                      <PublicationDetail>
                        <Layers size={16} /> Volume: {publication.volume}
                      </PublicationDetail>
                    )}
                    {publication.pages && (
                      <PublicationDetail>
                        <FileText size={16} /> Páginas: {publication.pages}
                      </PublicationDetail>
                    )}
                    <PublicationDetail>
                      <Calendar size={16} /> {publication.year}
                    </PublicationDetail>
                    {publication.issn && (
                      <PublicationDetail>
                        <Hash size={16} /> ISSN: {publication.issn}
                      </PublicationDetail>
                    )}
                  </PublicationDetails>

                  {publication.link && (
                    <PublicationCTA href={publication.link} target="_blank" rel="noopener noreferrer">
                      Acessar publicação <ExternalLink size={16} />
                    </PublicationCTA>
                  )}
                </PublicationCard>
              ))}
            </PublicationsGrid>

            <ResultsCount>
              {filteredPublications.length} de {publicationsData.length} publicações encontradas
            </ResultsCount>
          </PublicationsContainer>
        </Section>
      </MainContent>
    </PageContainer>
  );
}

export default SimaPublicacoesPage;

