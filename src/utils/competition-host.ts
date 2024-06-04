
import PSLogo from '../assets/puskasoturit-logo2.png';
import FribaKisatLogo from '../assets/Fribakisat.png';

type CompetitionHostConfigType = {
  key: string;
  name: string;
  image: string;
  url: string
}
export function getCompetitionHostConfig(competitionHostKey: string): CompetitionHostConfigType {
  if (competitionHostKey === 'fribakisat') {
    return {
      key: 'fribakisat',
      name: 'Fribakisat.fi',
      image: FribaKisatLogo,
      url: 'https://www.fribakisat.fi/'
    }
  }

  return {
    key: 'puskasoturit',
    name: 'Puskasoturit ry',
    image: PSLogo,
    url: 'https://puskasoturit.com/'
  }

}
