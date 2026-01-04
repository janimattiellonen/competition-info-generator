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
  },
  subtitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  urlDescription: {
    fontSize: 20,
    textAlign: 'left',
  },
  mainUrl: {
    fontSize: 20,
    textAlign: 'left',
    marginTop: 5,
  },
  minorUrl: {
    fontWeight: 'bold',
  },
  content: {
    fontSize: 30,
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
  textColor?: string;
  linkColor?: string;
  backgroundImage?: string;
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
  textColor = '#000000',
  linkColor = '#0066CC',
  backgroundImage: customBackgroundImage,
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
    <PDFViewer
      style={{
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        border: 'none',
      }}
    >
      <Document>
        <Page size="A4" style={styles.page} >
          {customBackgroundImage !== undefined && customBackgroundImage !== '' && (
            <Image style={styles.backgroundImage} src={customBackgroundImage} />
          )}
          <View style={styles.contentWrapper}>
            {competitionHostConfig.image !== '' && (
              <Image style={styles.logoLeft} src={competitionHostConfig.image} />
            )}
            {competitionHostConfig.image !== '' && (
              <Image style={styles.logoRight} src={competitionHostConfig.image} />
            )}

            {/* Header section with optional semi-transparent overlay */}
            <View style={useTextOverlay ? styles.headerOverlay : { marginTop: 65, marginBottom: 10, padding: 15 }}>
              <Text style={[styles.title, { color: textColor }]}>{title}</Text>
              <Text style={[styles.subtitle, { color: textColor }]}>{date}</Text>
            </View>

            {/* URL section with optional semi-transparent overlay */}
            <View style={useTextOverlay ? styles.textOverlay : { marginBottom: 10, padding: 10 }}>
              <Text style={[styles.urlDescription, { color: textColor }]}>{description}</Text>
              <Text style={[styles.mainUrl, { color: linkColor }]}>{url}</Text>
            </View>

            {/* Content section with optional semi-transparent overlay */}
            {content && (
              <View style={useTextOverlay ? styles.textOverlay : { marginBottom: 10, padding: 10 }}>
                <Text style={[styles.content, { color: textColor }]}>{content}</Text>
              </View>
            )}

            {/* Footer section with optional semi-transparent overlay */}
            <View style={useTextOverlay ? styles.textOverlay : { marginBottom: 10, padding: 10 }}>
              <Text style={{ marginBottom: 5, color: textColor }}>Terveisin</Text>
              <Text style={{ color: textColor }}>
                {competitionHostConfig.name}{' '}
                {competitionHostConfig.url && (
                  <Text>
                    (
                    <Text style={[styles.minorUrl, { color: linkColor }]}>
                      {competitionHostConfig.url}
                    </Text>
                    )
                  </Text>
                )}
              </Text>
            </View>

            {/* QR Code section with optional semi-transparent overlay */}
            <View style={useTextOverlay ? [styles.textOverlay, { alignItems: 'center' }] : { alignItems: 'center', marginBottom: 10, padding: 10 }}>
              <Image src={qrCode} style={styles.image} />
              <Text style={{ textAlign: 'center', marginTop: 10, color: textColor }}>
                (<Text style={[styles.minorUrl, { color: linkColor }]}>{url}</Text>)
              </Text>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
