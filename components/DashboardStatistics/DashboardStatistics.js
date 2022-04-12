/* ==========================

Importing Libraries

============================*/
import styled from "styled-components";
import useUserStat from "../../utils/useUserStat";

export default function DashboardStatistics({ user }) {
  const lettersSent = useUserStat(user.id, "mails");
  const repliesSent = useUserStat(user.id, "replies");

  return (
    <StatsWrapper>
      <StatName>Letters sent</StatName>
      <StatName>Replies sent</StatName>
      <StatNumber>{lettersSent}</StatNumber>
      <StatNumber>{repliesSent}</StatNumber>
    </StatsWrapper>
  );
}

const StatsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: center;
  grid-gap: 0.5em;
  margin-bottom: 1.5rem;
`;

const StatName = styled.div`
  font-size: 1.3em;
  font-weight: bold;
`;

const StatNumber = styled.div`
  font-size: 1.5em;
  place-self: center;
  text-align: center;
  padding: 0.5rem 1rem;
  color: var(--button-text-color);
  background-color: var(--window-background-color);
  border: 2px solid var(--button-border-color);
  border-radius: 999px;
  box-shadow: 5px 3px 2px 1px rgba(78, 10, 71, 0.57);
`;
