
import PSLogo from '../assets/puskasoturit-logo2.png';
import FribaKisatLogo from '../assets/Fribakisat.png';
import NBDGLogo from '../assets/nbdg.png';
import TTLogo from '../assets/tt.png';

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

  if (competitionHostKey === 'nbdg') {
    return {
      key: 'nbdg',
      name: 'NBDG',
      image: NBDGLogo,
      url: 'https://nbdg.fi/'
    }
  }

  if (competitionHostKey === 'tt') {
    return {
      key: 't',
      name: 'Talin Tallaajat',
      image: TTLogo,
      url: 'https://www.tallaajat.org/'
    }
  }

  return {
    key: 'puskasoturit',
    name: 'Puskasoturit ry',
    image: PSLogo,
    url: 'https://puskasoturit.com/'
  }

}
