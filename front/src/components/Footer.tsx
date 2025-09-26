import styled from "styled-components";
import { MapPin, Mail, Phone, ExternalLink } from "lucide-react";

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  color: white;
  padding: 4rem 2rem 2rem;
  position: relative;

  ${({ theme }) => theme.media.mobile} {
    padding: 3rem 1rem 2rem;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;

  ${({ theme }) => theme.media.mobile} {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FooterSection = styled.div``;

const FooterTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #f1f5f9;
`;

const FooterText = styled.p`
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const FooterList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterListItem = styled.li`
  margin-bottom: 0.75rem;
`;

const FooterLink = styled.a`
  color: #94a3b8;
  text-decoration: none;
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: #3b82f6;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  color: #94a3b8;
`;

const ContactIcon = styled.div`
  width: 20px;
  height: 20px;
  color: #3b82f6;
  flex-shrink: 0;
`;

const FooterBottom = styled.div`
  border-top: 1px solid #334155;
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${({ theme }) => theme.media.mobile} {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: #94a3b8;
  margin: 0;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 2rem;

  ${({ theme }) => theme.media.mobile} {
    gap: 1rem;
  }
`;

const FooterBottomLink = styled.a`
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s ease;

  &:hover {
    color: #3b82f6;
  }
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const LogoIcon = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
`;

const LogoText = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #f1f5f9;
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <LogoSection>
              <LogoIcon>INPE</LogoIcon>
              <LogoText>Portal Limnologia</LogoText>
            </LogoSection>
            <FooterText>
              Portal integrado de acesso aos dados limnológicos dos projetos SIMA, Balanço de
              Carbono e BALCAR desenvolvido pelo INPE em parceria com Furnas Centrais Elétricas S.A.
            </FooterText>
          </FooterSection>

          <FooterSection>
            <FooterTitle>Projetos</FooterTitle>
            <FooterList>
              <FooterListItem>
                <FooterLink href="#sima">Sistema Integrado de Monitoramento Ambiental</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink href="#balanco-carbono">
                  Balanço de Carbono nos Reservatórios
                </FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink href="#balcar">Projeto BALCAR</FooterLink>
              </FooterListItem>
            </FooterList>
          </FooterSection>

          <FooterSection>
            <FooterTitle>Recursos</FooterTitle>
            <FooterList>
              <FooterListItem>
                <FooterLink href="#dashboard">Dashboard Interativo</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink href="#mapas">Mapas Interativos</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink href="#graficos">Gráficos Temporais</FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink href="#dashboard">Exportação de Dados</FooterLink>
              </FooterListItem>
            </FooterList>
          </FooterSection>

          <FooterSection>
            <FooterTitle>Contato</FooterTitle>
            <ContactItem>
              <ContactIcon>
                <MapPin size={16} />
              </ContactIcon>
              <span>
                Instituto Nacional de Pesquisas Espaciais
                <br />
                Laboratório de Instrumentação de Sistemas Aquáticos
                <br />
                São José dos Campos - SP
              </span>
            </ContactItem>
            <ContactItem>
              <ContactIcon>
                <Mail size={16} />
              </ContactIcon>
              <span>labisa@inpe.br</span>
            </ContactItem>
            <ContactItem>
              <ContactIcon>
                <Phone size={16} />
              </ContactIcon>
              <span>+55 (12) 3208-6000</span>
            </ContactItem>
          </FooterSection>
        </FooterGrid>

        <FooterBottom>
          <Copyright>
            © 2025 INPE - Instituto Nacional de Pesquisas Espaciais. Todos os direitos reservados.
          </Copyright>
          <FooterLinks>
            <FooterBottomLink href="http://www.inpe.br" target="_blank" rel="noopener noreferrer">
              <ExternalLink size={14} style={{ marginRight: "0.25rem" }} />
              INPE
            </FooterBottomLink>
            <FooterBottomLink
              href="http://www.furnas.com.br"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={14} style={{ marginRight: "0.25rem" }} />
              Furnas
            </FooterBottomLink>
            <FooterBottomLink
              href="http://www.dsr.inpe.br"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={14} style={{ marginRight: "0.25rem" }} />
              DSR/INPE
            </FooterBottomLink>
          </FooterLinks>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
}

export default Footer;
