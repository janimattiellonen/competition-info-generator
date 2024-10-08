import { Page, Text, Document, StyleSheet, PDFViewer,Image } from '@react-pdf/renderer';

import {getCompetitionHostConfig} from "../utils/competition-host.ts";

const styles = StyleSheet.create({
  logoLeft: {
    position: 'absolute',
    top: 35,
    left: 50,
    width: 50,
    height: 50,
  },
  logoRight: {
    position: 'absolute',
    top: 35,
    right: 50,
    width: 50,
    height: 50,
  },
  page: {
    paddingTop: 35,
    paddingHorizontal: 50,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 75,
  },
  subtitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  urlDescription: {
    fontSize: 20,
    textAlign: 'left',
  },
  mainUrl: {
    fontSize: 20,
    textAlign: 'left',
    color: 'blue',
    marginTop: 10,
    marginBottom: 20,
  },
  minorUrl: {
    color: 'blue',
    fontWeight: 'bold',
  },
  content: {
    fontSize: 30,
  },
  image: {
    width: 300,
    height: 300,
    margin: '0 auto'
  }
});

type PreviewProps = {
  title?: string;
  date?: string;
  description?: string;
  qrCode?: string;
  url?: string;
  content?: string;
  competitionHost?: string
  overrideCompetitionHost?: boolean;
  customCompetitionHostName?: string;
  customCompetitionHostUrl?: string;
}
export function Preview({title, date, qrCode, description, url, content, competitionHost, overrideCompetitionHost, customCompetitionHostName, customCompetitionHostUrl}: PreviewProps) {
  if (!competitionHost && !overrideCompetitionHost) {
    return null;
  }

  const competitionHostConfig = getCompetitionHostConfig(competitionHost, overrideCompetitionHost, customCompetitionHostName, customCompetitionHostUrl);

  return (
    <PDFViewer style={{width: '100%', height: '1500px'}}>
    <Document>
      <Page size="A4" style={styles.page} >
        {competitionHostConfig.image !== '' && <Image style={styles.logoLeft} src={competitionHostConfig.image} />}
        {competitionHostConfig.image !== '' && <Image style={styles.logoRight} src={competitionHostConfig.image}/>}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{date}</Text>
        <Text style={styles.urlDescription}>{description}</Text>
        <Text style={styles.mainUrl}>{url}</Text>
        <Text style={styles.content}>{content}</Text>

        <Text style={{marginTop: 20, marginBottom: 5}}>Terveisin</Text>
        <Text>{competitionHostConfig.name} {competitionHostConfig.url && <Text>(<Text style={styles.minorUrl}>{competitionHostConfig.url}</Text>)</Text>}</Text>
        <Image src={qrCode} style={styles.image}/>
        <Text style={{textAlign: 'center'}}>(<Text style={styles.minorUrl}>{url}</Text>)</Text>
      </Page>
    </Document>
    </PDFViewer>
  );
}
