import {useState} from "react";
import QRCode from 'qrcode'

import styled from "@emotion/styled";

import {Preview} from "./Preview.tsx";

const Row = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
    
    input {
        width: 250px
    }
`;

const Div = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    margin: 3rem;
    gap: 1rem;
`;

export function CreateCompetitionInfo() {
  const [title, setTitle] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [urlDescription, setUrlDescription] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [qrCode, setQrCode] = useState<string>('');
  const [competitionHost, setCompetitionHost] = useState<string>('puskasoturit');

  const generateQR = async (text: string) => {
    try {
      const qrData = await QRCode.toDataURL(text)

      setQrCode(qrData);
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <h1>Luo kilpailun infolappunen</h1>
      <Div>
        <Row>
          <label htmlFor="title">Otsikko</label>
          <input id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
        </Row>

        <Row>
          <label htmlFor="date">Päivämäärä</label>
          <input id="date" name="date" value={date} onChange={(e) => setDate(e.target.value)}/>
        </Row>

        <Row>
          <label htmlFor="urlDescription">Kuvaus</label>
          <input id="urlDescription" name="urlDescription" value={urlDescription} onChange={(e) => setUrlDescription(e.target.value)}/>
        </Row>

        <Row>
          <label htmlFor="content">Sisältö</label>
          <input id="content" name="content" value={content} onChange={(e) => setContent(e.target.value)}/>
        </Row>

        <Row>
          <label htmlFor="url">Kisan osoite</label>
          <input id="url" name="url" value={url} onChange={(e) => setUrl(e.target.value)}/>
        </Row>
        <Row>
          <button onClick={() => generateQR(url)}>Luo</button>
        </Row>

        <Row>
          <label htmlFor="">Kilpailun vetäjä</label>
          <select name="competitionHost" onChange={(e) => setCompetitionHost(e.target.value)}>
            <option value="puskasoturit" selected={competitionHost === 'puskasoturit'}>Puskasoturit ry</option>
            <option value="fribakisat" selected={competitionHost === 'fribakisat'}>Fribakisat.fi</option>
            <option value="nbdg" selected={competitionHost === 'nbdg'}>NBDG</option>
          </select>
        </Row>
      </Div>

      {qrCode &&
          <Preview title={title} date={date} description={urlDescription} url={url} content={content} qrCode={qrCode} competitionHost={competitionHost}/>}
    </div>
  );
}
