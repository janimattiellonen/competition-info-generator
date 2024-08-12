import {useState, useEffect} from "react";
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

const CheckBoxRow = styled(Row)`
    flex-direction: row;
    
    input {
        width: 50px;
    }
`;

const MainFlex = styled.div`

    
    div:first-of-type {
        flex-basis: 50%;
    }
    
    @media (min-width: 1200px) {
        display: flex;
        flex-direction: row;
    }
`;

const Div = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    margin: 3rem;
    gap: 1rem;
`;

type FormData = {
  title?: string;
  date?: string;
  urlDescription?: string;
  url?: string;
  content?: string;
  qrCode?: string;
  competitionHost?: string;
  noAutoRefresh?: boolean;
}

export function CreateCompetitionInfo() {
  const [title, setTitle] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [urlDescription, setUrlDescription] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [qrCode, setQrCode] = useState<string>('');
  const [competitionHost, setCompetitionHost] = useState<string>('puskasoturit');
  const [noAutoRefresh, setNoAutoRefresh] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({});
  const [forceRefresh, setForceRefresh] = useState<boolean>(false);

  useEffect(() => {
    console.log('Loppa');
    if (noAutoRefresh && !forceRefresh) {
      return;
    }
    setFormData({
      ...formData,
      title,
      date,
      url,
      qrCode,
      content,
      urlDescription,
      competitionHost
    })
    setForceRefresh(false);
  }, [title, date, url, urlDescription, content, qrCode, competitionHost, forceRefresh]);


  const generateQR = async (text: string) => {
    if (!text)  {
      return;
    }

    try {
      const qrData = await QRCode.toDataURL(text)

      setForceRefresh(true);
      setQrCode(qrData);
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <MainFlex>
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
            <label htmlFor="url">Kisan osoite* </label>
            <input id="url" name="url" value={url} onChange={(e) => setUrl(e.target.value)} aria-required aria-invalid={!url} />
          </Row>

          <CheckBoxRow>
            <label htmlFor="noAutoRefresh">Älä päivitä reaaliajassa</label>
            <input id="noAutoRefresh" type="checkbox" name="noAutoRefresh" checked={noAutoRefresh} onChange={ () => setNoAutoRefresh(!noAutoRefresh)} />
          </CheckBoxRow>

          <Row>
            <button disabled={!url} onClick={() => generateQR(url)}>Generoi</button>
          </Row>

          <Row>
            <label htmlFor="">Kilpailun vetäjä</label>
            <select name="competitionHost" onChange={(e) => setCompetitionHost(e.target.value)}>
              <option value="puskasoturit" selected={competitionHost === 'puskasoturit'}>Puskasoturit ry</option>
              <option value="fribakisat" selected={competitionHost === 'fribakisat'}>Fribakisat.fi</option>
              <option value="nbdg" selected={competitionHost === 'nbdg'}>NBDG</option>
              <option value="tt" selected={competitionHost === 'tt'}>Talin Tallaajat</option>
            </select>
          </Row>
        </Div>
      </div>
      {qrCode &&
          <Preview title={formData.title} date={formData.date} description={formData.urlDescription} url={formData.url} content={formData.content} qrCode={formData.qrCode} competitionHost={formData.competitionHost}/>}
    </MainFlex>
  );
}
