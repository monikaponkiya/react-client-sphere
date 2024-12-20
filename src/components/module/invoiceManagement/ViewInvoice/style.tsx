import { styled } from 'styled-components';

export const DetailWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  .invoiceRow {
    justify-content: space-between;
    h4 {
      margin-bottom: 5px;
    }
  }
`;

export const CRDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  .invoiceRow {
    justify-content: space-between;
    h4 {
      margin-bottom: 5px;
    }
  }
`;