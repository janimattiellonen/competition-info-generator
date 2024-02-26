import {useEffect, useState } from "react";
//import QRCode from "react-qr-code";

import styled from "@emotion/styled";

import {Preview} from "./Preview.tsx";
import QRCode from 'qrcode'

const Image = styled.img`
    width: 512px;
    height: 512px;

`;

type QrProps = {
  title: string;
  date: string;
  description: string;
  url: string;
  content: string
}
export function Qr({title, date,description, url, content}: QrProps) {
  const [qrCode, setQrCode] = useState<string>('');
  const [isPreviewVisible, showPreview] = useState<boolean>(false);


  const generateQR = async (text: string) => {
    try {
      const qrData = await QRCode.toDataURL(text)

      setQrCode(qrData);
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    generateQR(url);
  }, [url]);

  return (

    <div>
      <p>Hey</p>

      <p><Image src={qrCode}/></p>


      <button onClick={() => showPreview(true)}>Näytä esikatselu</button>

      {isPreviewVisible && <Preview title={title} date={date} description={description} qrCode={qrCode} url={url} content={content}/>}
      {/* <QRCode
        size={256}
        style={{height: "auto", maxWidth: "100%", width: "100%"}}
        value={'https://discgolfmetrix.com/2843206'}
        viewBox={`0 0 512 512`}
      />*/}
    </div>
  );
}
