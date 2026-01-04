import { useState, useMemo, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { format as dateFnsFormat } from 'date-fns';
import { fi } from 'date-fns/locale';

import styled from '@emotion/styled';
import { Button } from '@mantine/core';

import { Preview } from './Preview.tsx';

import { Row } from '../components/Row.tsx';
import { ColorPickerModal } from '../components/ColorPickerModal.tsx';
import { ColorTriggers } from '../components/ColorTriggers.tsx';

import { fetchMetrixData } from '../utils/metrix-client.ts';

const CheckBoxRow = styled(Row)`
  flex-direction: row;
  align-items: flex-start;
  gap: 0.75rem;

  input[type="checkbox"] {
    width: 20px;
    height: 20px;
    min-width: 20px;
    margin-top: 2px;
    flex-shrink: 0;
    cursor: pointer;
    accent-color: #228be6;
  }

  label {
    cursor: pointer;
    margin: 0;
    flex: 1;
    line-height: 1.5;
  }
`;

const MainFlex = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  @media (min-width: 1200px) {
    flex-direction: row;
    height: 100vh;
    overflow: hidden;

    & > div:first-of-type {
      flex: 0 0 35%;
      min-width: 0;
      overflow-y: auto;
     /* overflow-x: hidden;*/
      height: 100vh;
    }
  }
`;

const Div = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  margin: 1rem auto;
  padding: 1.5rem;
  gap: 1.25rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    margin: 2rem auto;
    padding: 2rem;
  }

  @media (min-width: 1200px) {
    max-width: 90%;
    margin: 1.5rem;
    padding: 1.5rem 2.5rem 1.5rem 1.5rem;
  }
`;

const PageHeader = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  text-align: center;
  margin: 1.5rem 0 0 0;
  color: #212529;

  @media (min-width: 768px) {
    font-size: 2rem;
    margin: 2rem 0 0 0;
  }
`;

const SectionDivider = styled.div`
  height: 1px;
  background-color: #dee2e6;
  margin: 1rem 0;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PreviewWrapper = styled.div`
  width: 100%;
  margin: 1rem auto;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  min-height: 600px;

  @media (min-width: 768px) {
    margin: 2rem auto;
    min-height: 800px;
  }

  @media (min-width: 1200px) {
    flex: 1;
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    height: 100vh;
    min-height: 100vh;
  }
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
  const [useTextOverlay, setUseTextOverlay] = useState<boolean>(false);
  const [useCustomColors, setUseCustomColors] = useState<boolean>(() => {
    const saved = localStorage.getItem('useCustomColors');
    return saved ? JSON.parse(saved) : false;
  });
  const [textColor, setTextColor] = useState<string>(() => {
    return localStorage.getItem('textColor') || '#000000';
  });
  const [linkColor, setLinkColor] = useState<string>(() => {
    return localStorage.getItem('linkColor') || '#0066CC';
  });
  const [openColorModal, setOpenColorModal] = useState<'text' | 'link' | null>(
    null
  );
  const [backgroundImage, setBackgroundImage] = useState<string | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Save colors to localStorage
  useEffect(() => {
    localStorage.setItem('useCustomColors', JSON.stringify(useCustomColors));
  }, [useCustomColors]);

  useEffect(() => {
    localStorage.setItem('textColor', textColor);
  }, [textColor]);

  useEffect(() => {
    localStorage.setItem('linkColor', linkColor);
  }, [linkColor]);

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
      useTextOverlay,
      textColor: useCustomColors ? textColor : '#000000',
      linkColor: useCustomColors ? linkColor : '#0066CC',
      ...(backgroundImage && { backgroundImage }),
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
      useTextOverlay,
      useCustomColors,
      textColor,
      linkColor,
      backgroundImage,
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

  const handleBackgroundImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      alert('Virheellinen tiedostomuoto. Sallitut muodot: PNG, JPG, JPEG');
      e.target.value = '';
      return;
    }

    // Validate file size (10MB = 10 * 1024 * 1024 bytes)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('Tiedosto on liian suuri. Maksimikoko on 10MB.');
      e.target.value = '';
      return;
    }

    // Convert to data URL
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setBackgroundImage(dataUrl);
    };
    reader.onerror = () => {
      alert('Tiedoston lukeminen epäonnistui');
      e.target.value = '';
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveBackgroundImage = () => {
    setBackgroundImage(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <MainFlex>
      <div>
        <PageHeader>Luo kilpailun infolappunen</PageHeader>
        <Div>
          <FormSection>
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
          </FormSection>

          <SectionDivider />

          <FormSection>
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
              <Button onClick={handleFetch} variant="light">
                Hae Metrix-kisan tiedot
              </Button>
            </Row>
          </FormSection>

          <SectionDivider />

          <FormSection>
            <Row>
            <label htmlFor="backgroundImage">Taustakuva</label>
            <input
              id="backgroundImage"
              name="backgroundImage"
              type="file"
              accept=".png,.jpg,.jpeg"
              onChange={handleBackgroundImageUpload}
              ref={fileInputRef}
            />
            {backgroundImage && (
              <Button
                type="button"
                onClick={handleRemoveBackgroundImage}
                variant="light"
                color="red"
              >
                Poista taustakuva
              </Button>
            )}
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

          <CheckBoxRow>
            <label htmlFor="useTextOverlay">
              Harmaannuta tekstien tausta
            </label>
            <input
              id="useTextOverlay"
              name="useTextOverlay"
              type="checkbox"
              checked={useTextOverlay}
              onChange={() => setUseTextOverlay(!useTextOverlay)}
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

          <CheckBoxRow>
            <label htmlFor="useCustomColors">Muokkaa tekstien väriä</label>
            <input
              id="useCustomColors"
              type="checkbox"
              name="useCustomColors"
              checked={useCustomColors}
              onChange={() => setUseCustomColors(!useCustomColors)}
            />
          </CheckBoxRow>

          {useCustomColors && (
            <>
              <ColorTriggers
                textColor={textColor}
                linkColor={linkColor}
                onTextColorClick={() => setOpenColorModal('text')}
                onLinkColorClick={() => setOpenColorModal('link')}
              />
              <ColorPickerModal
                opened={openColorModal === 'text'}
                onClose={() => setOpenColorModal(null)}
                color={textColor}
                onChange={setTextColor}
                onReset={() => setTextColor('#000000')}
                title="Valitse tekstin väri"
              />
              <ColorPickerModal
                opened={openColorModal === 'link'}
                onClose={() => setOpenColorModal(null)}
                color={linkColor}
                onChange={setLinkColor}
                onReset={() => setLinkColor('#0066CC')}
                title="Valitse linkin väri"
              />
            </>
          )}
          </FormSection>

          <SectionDivider />

          <Row>
            <Button
              disabled={!url}
              onClick={() => generateQR(url)}
              variant="filled"
              size="lg"
              fullWidth
              style={{ maxWidth: '500px' }}
            >
              Generoi
            </Button>
          </Row>
        </Div>
      </div>
      {qrCode && (
        <PreviewWrapper>
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
            useTextOverlay={formData.useTextOverlay}
            textColor={formData.textColor}
            linkColor={formData.linkColor}
            backgroundImage={formData.backgroundImage}
          />
        </PreviewWrapper>
      )}
    </MainFlex>
  );
}
