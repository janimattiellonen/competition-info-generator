import {
  Page,
  Text,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
  View,
} from '@react-pdf/renderer';

import { getCompetitionHostConfig } from '../utils/competition-host.ts';
import backgroundImage from '../assets/tali.png';

const styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
  },
  contentWrapper: {
    paddingTop: 35,
    paddingHorizontal: 50,
    paddingBottom: 40,
  },
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
  page: {},
  // Semi-transparent overlays for text sections
  textOverlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  headerOverlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 65,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    color: '#000000',
  },
  subtitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
  },
  urlDescription: {
    fontSize: 20,
    textAlign: 'left',
    color: '#000000',
  },
  mainUrl: {
    fontSize: 20,
    textAlign: 'left',
    color: '#0066CC',
    marginTop: 5,
  },
  minorUrl: {
    color: '#0066CC',
    fontWeight: 'bold',
  },
  content: {
    fontSize: 30,
    color: '#000000',
  },
  image: {
    width: 250,
    height: 250,
    margin: '0 auto',
  },
});

type PreviewProps = {
  title?: string;
  date?: string;
  description?: string;
  qrCode?: string;
  url?: string;
  content?: string;
  competitionHost?: string;
  overrideCompetitionHost?: boolean;
  customCompetitionHostName?: string;
  customCompetitionHostUrl?: string;
  useTextOverlay?: boolean;
};
export function Preview({
  title,
  date,
  qrCode,
  description,
  url,
  content,
  competitionHost,
  overrideCompetitionHost,
  customCompetitionHostName,
  customCompetitionHostUrl,
  useTextOverlay = false,
}: PreviewProps) {
  if (!competitionHost && !overrideCompetitionHost) {
    return null;
  }

  const competitionHostConfig = getCompetitionHostConfig(
    competitionHost,
    overrideCompetitionHost,
    customCompetitionHostName,
    customCompetitionHostUrl
  );

  return (
    <PDFViewer style={{ width: '100%', height: '1500px' }}>
      <Document>
        <Page size="A4" style={styles.page} >
          <Image style={styles.backgroundImage} src={backgroundImage} />
          <View style={styles.contentWrapper}>
            {competitionHostConfig.image !== '' && (
              <Image style={styles.logoLeft} src={competitionHostConfig.image} />
            )}
            {competitionHostConfig.image !== '' && (
              <Image style={styles.logoRight} src={competitionHostConfig.image} />
            )}

            {/* Header section with optional semi-transparent overlay */}
            <View style={useTextOverlay ? styles.headerOverlay : { marginTop: 65, marginBottom: 10 }}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.subtitle}>{date}</Text>
            </View>

            {/* URL section with optional semi-transparent overlay */}
            <View style={useTextOverlay ? styles.textOverlay : { marginBottom: 10 }}>
              <Text style={styles.urlDescription}>{description}</Text>
              <Text style={styles.mainUrl}>{url}</Text>
            </View>

            {/* Content section with optional semi-transparent overlay */}
            {content && (
              <View style={useTextOverlay ? styles.textOverlay : { marginBottom: 10 }}>
                <Text style={styles.content}>{content}</Text>
              </View>
            )}

            {/* Footer section with optional semi-transparent overlay */}
            <View style={useTextOverlay ? styles.textOverlay : { marginBottom: 10 }}>
              <Text style={{ marginBottom: 5, color: '#000000' }}>Terveisin</Text>
              <Text style={{ color: '#000000' }}>
                {competitionHostConfig.name}{' '}
                {competitionHostConfig.url && (
                  <Text>
                    (
                    <Text style={styles.minorUrl}>
                      {competitionHostConfig.url}
                    </Text>
                    )
                  </Text>
                )}
              </Text>
            </View>

            {/* QR Code section with optional semi-transparent overlay */}
            <View style={useTextOverlay ? [styles.textOverlay, { alignItems: 'center' }] : { alignItems: 'center', marginBottom: 10 }}>
              <Image src={qrCode} style={styles.image} />
              <Text style={{ textAlign: 'center', marginTop: 10, color: '#000000' }}>
                (<Text style={styles.minorUrl}>{url}</Text>)
              </Text>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
