export async function fetchMetrixData(metrixIdOrUrl: string) {
  const parseMetrixId = (): number | null => {
    if (
      metrixIdOrUrl.toLowerCase().includes('discgolfmetrix.com') ||
      metrixIdOrUrl.toLowerCase().includes('dgmtrx.com')
    ) {
      const url = new URL(metrixIdOrUrl);

      return parseInt(url.pathname.replace('/', ''), 10);
    }

    if (!isNaN(parseInt(metrixIdOrUrl, 10))) {
      return parseInt(metrixIdOrUrl, 10);
    }

    return null;
  };

  const response = await fetch(
    `https://discgolfmetrix.com/api.php?content=result&id=${parseMetrixId()}`
  );

  return await response.json();
}
