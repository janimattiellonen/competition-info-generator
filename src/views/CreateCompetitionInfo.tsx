import { useState, useMemo } from 'react';
import QRCode from 'qrcode';
import { format as dateFnsFormat } from 'date-fns';
import { fi } from 'date-fns/locale';

import styled from '@emotion/styled';

import { Preview } from './Preview.tsx';

import { Row } from '../components/Row.tsx';

import { fetchMetrixData } from '../utils/metrix-client.ts';

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

export function CreateCompetitionInfo() {
  const [title, setTitle] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [urlDescription, setUrlDescription] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [qrCode, setQrCode] = useState<string>('');
  const [competitionHost, setCompetitionHost] =
    useState<string>('puskasoturit');
  const [noAutoRefresh, setNoAutoRefresh] = useState<boolean>(false);
  const [customCompetitionHostName, setCustomCompetitionHostName] =
    useState<string>('');
  const [customCompetitionHostUrl, setCustomCompetitionHostUrl] =
    useState<string>('');
  const [overrideCompetitionHost, setOverrideCompetitionHost] =
    useState<boolean>(false);

  const formData = useMemo(
    () => ({
      title,
      date,
      url,
      qrCode,
      content,
      urlDescription,
      competitionHost,
      overrideCompetitionHost,
      customCompetitionHostName,
      customCompetitionHostUrl,
    }),
    [
      title,
      date,
      url,
      urlDescription,
      content,
      qrCode,
      competitionHost,
      overrideCompetitionHost,
      customCompetitionHostName,
      customCompetitionHostUrl,
    ]
  );

  const generateQR = async (text: string) => {
    if (!text) {
      return;
    }

    try {
      const qrData = await QRCode.toDataURL(text);

      setQrCode(qrData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFetch = async () => {
    const data = await fetchMetrixData(url);

    const competition = data?.Competition;

    if (competition?.Name) {
      setTitle(competition?.Name);
    }

    if (String(competition?.ID) === String(url)) {
      setUrl(`https://discgolfmetrix.com/${competition?.ID}`);
    }

    if (competition?.Date) {
      const formattedDate = dateFnsFormat(
        new Date(competition?.Date),
        'd.M.yyyy',
        {
          locale: fi,
        }
      );

      if (competition?.Time) {
        const formattedTime = dateFnsFormat(
          new Date(`${competition?.Date} ${competition?.Time}`),
          'HH:mm',
          {
            locale: fi,
          }
        );

        setDate(`${formattedDate} ${formattedTime}`);
      } else {
        setDate(formattedDate);
      }
    }
  };

  return (
    <MainFlex>
      <div>
        <h1>Luo kilpailun infolappunen</h1>
        <Div>
          <Row>
            <label htmlFor="title">Otsikko</label>
            <input
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Row>

          <Row>
            <label htmlFor="date">Päivämäärä</label>
            <input
              id="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Row>

          <Row>
            <label htmlFor="urlDescription">Kuvaus</label>
            <input
              id="urlDescription"
              name="urlDescription"
              value={urlDescription}
              onChange={(e) => setUrlDescription(e.target.value)}
            />
          </Row>

          <Row>
            <label htmlFor="content">Sisältö</label>
            <input
              id="content"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Row>

          <Row>
            <label htmlFor="url">Kisan osoite* </label>
            <input
              id="url"
              name="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              aria-required
              aria-invalid={!url}
            />
            <button onClick={handleFetch}>Hae Metrix-kisan tiedot</button>
          </Row>

          <Row>
            <label htmlFor="">Kilpailun vetäjä</label>
            <select
              name="competitionHost"
              value={competitionHost}
              onChange={(e) => setCompetitionHost(e.target.value)}
              disabled={overrideCompetitionHost}
            >
              <option value="puskasoturit">Puskasoturit ry</option>
              <option value="fribakisat">Fribakisat.fi</option>
              <option value="nbdg">NBDG</option>
              <option value="tt">Talin Tallaajat</option>
            </select>
          </Row>

          <CheckBoxRow>
            <label htmlFor="overrideCompetitionHost">
              Muokattu kilpailun vetäjä
            </label>
            <input
              id="overrideCompetitionHost"
              name="overrideCompetitionHost"
              type="checkbox"
              checked={overrideCompetitionHost}
              onChange={() =>
                setOverrideCompetitionHost(!overrideCompetitionHost)
              }
            />
          </CheckBoxRow>

          {overrideCompetitionHost && (
            <>
              <Row>
                <label htmlFor="customCompetitionHostName">Nimi</label>
                <input
                  id="customCompetitionHostName"
                  name="customCompetitionHostName"
                  value={customCompetitionHostName}
                  onChange={(e) => setCustomCompetitionHostName(e.target.value)}
                />
              </Row>

              {/*
              <Row>
                <label htmlFor="customCompetitionHostImageUrl">Kuvaosoite</label>
                <input id="customCompetitionHostImageUrl" name="customCompetitionHostImageUrl"  value={customCompetitionHostImageUrl} onChange={(e) => setCustomCompetitionHostImageUrl(e.target.value)}/>
              </Row>*/}

              <Row>
                <label htmlFor="customCompetitionHostUrl">Kotisivut</label>
                <input
                  id="customCompetitionHostUrl"
                  name="customCompetitionHostUrl"
                  value={customCompetitionHostUrl}
                  onChange={(e) => setCustomCompetitionHostUrl(e.target.value)}
                />
              </Row>
            </>
          )}

          <CheckBoxRow>
            <label htmlFor="noAutoRefresh">Älä päivitä reaaliajassa</label>
            <input
              id="noAutoRefresh"
              type="checkbox"
              name="noAutoRefresh"
              checked={noAutoRefresh}
              onChange={() => setNoAutoRefresh(!noAutoRefresh)}
            />
          </CheckBoxRow>

          <Row>
            <button disabled={!url} onClick={() => generateQR(url)}>
              Generoi
            </button>
          </Row>
        </Div>
      </div>
      {qrCode && (
        <Preview
          title={formData.title}
          date={formData.date}
          description={formData.urlDescription}
          url={formData.url}
          content={formData.content}
          qrCode={formData.qrCode}
          competitionHost={formData.competitionHost}
          overrideCompetitionHost={formData.overrideCompetitionHost}
          customCompetitionHostName={formData.customCompetitionHostName}
          customCompetitionHostUrl={formData.customCompetitionHostUrl}
        />
      )}
    </MainFlex>
  );
}
