import { Page, Text, Document, StyleSheet, PDFViewer,Image } from '@react-pdf/renderer';

import PSLogo from '../assets/puskasoturit-logo2.png';

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
    fontSize: 30,
    textAlign: 'left',
    color: 'blue',
    marginBottom: 30,
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
  title: string;
  date: string;
  description: string;
  qrCode: string;
  url: string;
  content: string;
}
export function Preview({title, date, qrCode, description, url, content}: PreviewProps) {


  return (
    <PDFViewer style={{width: '100%', height: '1500px'}}>
    <Document>
      <Page size="A4" style={styles.page} >
        <Image style={styles.logoLeft} src={PSLogo}/>
        <Image style={styles.logoRight} src={PSLogo}/>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{date}</Text>
        <Text style={styles.urlDescription}>{description}</Text>
        <Text style={styles.mainUrl}>{url}</Text>
        <Text style={styles.content}>{content}</Text>

        <Text style={{marginTop: 20}}>Terveisin</Text>
        <Text>Puskasoturit ry (<Text style={styles.minorUrl}>www.puskasoturit.com</Text>)</Text>
        <Image src={qrCode} style={styles.image}/>
        <Text style={{textAlign: 'center'}}>(<Text style={styles.minorUrl}>{url}</Text>)</Text>
      </Page>
    </Document>
    </PDFViewer>
  );
}
