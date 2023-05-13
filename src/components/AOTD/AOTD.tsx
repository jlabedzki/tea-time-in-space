import { StyledButton } from '../../App';
import { useAOTD } from 'hooks';

export default function AOTD() {
  const { data, error, isLoading } = useAOTD();

  if (data) return <img src={data.url} />;

  return <StyledButton>Astronomy Photo of the Day</StyledButton>;
}
