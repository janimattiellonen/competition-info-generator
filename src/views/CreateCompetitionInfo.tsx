import {useState} from "react";

import styled from "@emotion/styled";

import {Preview} from "./Preview.tsx";

import {Qr} from "./Qr.tsx";

const Row = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
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

  const [isPreviewVisible, showPreview] = useState<boolean>(false);

  return (
    <div>
      <h1>CreateCompetitionInfo</h1>

      <h2>Values</h2>

      <p>title: {title}</p>
      <p>date: {date}</p>
      <p>urlDescription: {urlDescription}</p>
      <p>url: {url}</p>
      <p>content: {content}</p>

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
          <button onClick={() => showPreview(true)}>Luo</button>
        </Row>
      </Div>

      {isPreviewVisible && <Qr title={title} date={date} description={urlDescription} url={url} content={content}/>}
    </div>
  );
}
