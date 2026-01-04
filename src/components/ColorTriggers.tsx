import { Button, Stack } from '@mantine/core';
import styled from '@emotion/styled';

const ColorBox = styled.div<{ color: string }>`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background-color: ${(props) => props.color};
  border: 1px solid #ccc;
  margin-right: 8px;
`;

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
`;

type ColorTriggersProps = {
  textColor: string;
  linkColor: string;
  onTextColorClick: () => void;
  onLinkColorClick: () => void;
};

export function ColorTriggers({
  textColor,
  linkColor,
  onTextColorClick,
  onLinkColorClick,
}: ColorTriggersProps) {
  return (
    <Stack gap="sm" style={{ marginBottom: '1rem' }}>
      <Button variant="outline" onClick={onTextColorClick}>
        <ButtonContent>
          <ColorBox color={textColor} />
          Vaiha tekstien väriä
        </ButtonContent>
      </Button>
      <Button variant="outline" onClick={onLinkColorClick}>
        <ButtonContent>
          <ColorBox color={linkColor} />
          Vaihda linkkien väriä
        </ButtonContent>
      </Button>
    </Stack>
  );
}
