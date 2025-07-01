import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f9fafe;
  color: #1e293b;
  max-width: 1200px;
  margin: auto;

  @media (max-width: 600px) {
    padding: 1rem;
  }
`;

export const Title = styled.h2`
  color: #0f172a;
  text-align: center;
  font-size: 2rem;

  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  justify-content: space-between;

  label {
    flex: 1 1 45%;
    min-width: 200px;
    display: flex;
    flex-direction: column;
    font-weight: 600;

    input,
    select {
      margin-top: 4px;
      padding: 0.5rem;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      font-size: 1rem;
    }

    @media (max-width: 600px) {
      flex: 1 1 100%;
    }
  }
`;

export const LayerContainer = styled.div`
  border: 1px solid #cbd5e1;
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 8px;
  background: #ffffff;
`;

export const LayerTitle = styled.h4`
  color: #334155;
  margin-bottom: 1rem;
  font-size: 1.2rem;

  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

export const Info = styled.p`
  margin: 0.25rem 0;
  font-size: 1rem;

  @media (max-width: 600px) {
    font-size: 0.9rem;
  }
`;

export const CalculationResult = styled.div`
  margin-top: 10px;
  padding: 0.75rem;
  border-radius: 5px;
  background: ${({ type }) => (type === 'bearing' ? '#dbeafe' : '#dcfce7')};
  color: ${({ type }) => (type === 'bearing' ? '#1e3a8a' : '#166534')};
  font-size: 1rem;

  @media (max-width: 600px) {
    font-size: 0.95rem;
  }
`;

export const MaxOverburdenBox = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background: #f0f8ff;
  border-radius: 8px;
  border: 1px solid #60a5fa;

  h3 {
    color: #1e40af;
    font-size: 1.2rem;

    @media (max-width: 600px) {
      font-size: 1rem;
    }
  }

  p {
    font-size: 1.1rem;

    @media (max-width: 600px) {
      font-size: 0.95rem;
    }
  }
`;

export const Button = styled.button`
  margin-right: 0.5rem;
  padding: 0.5rem 1rem;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 0.5rem;
  font-size: 1rem;

  &:hover {
    background: #1d4ed8;
  }

  @media (max-width: 600px) {
    width: 100%;
    margin-right: 0;
  }
`;

export const AddLayerButton = styled(Button)`
  background: #059669;

  &:hover {
    background: #047857;
  }
`;
