import { useState, useEffect } from 'react';
import { Modal, ColorPicker, Button, Stack } from '@mantine/core';

type ColorPickerModalProps = {
  opened: boolean;
  onClose: () => void;
  color: string;
  onChange: (color: string) => void;
  onReset: () => void;
  title: string;
};

export function ColorPickerModal({
  opened,
  onClose,
  color,
  onChange,
  onReset,
  title,
}: ColorPickerModalProps) {
  const [tempColor, setTempColor] = useState(color);

  // Update temp color when prop changes or modal opens
  useEffect(() => {
    if (opened) {
      setTempColor(color);
    }
  }, [color, opened]);

  const handleChangeEnd = (newColor: string) => {
    onChange(newColor);
  };

  const handleReset = () => {
    onReset();
    setTempColor(color);
  };

  return (
    <Modal opened={opened} onClose={onClose} title={title} centered>
      <Stack gap="md">
        <ColorPicker
          format="hex"
          value={tempColor}
          onChange={setTempColor}
          onChangeEnd={handleChangeEnd}
          size="lg"
          fullWidth
        />
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <Button variant="outline" onClick={handleReset}>
            Palauta
          </Button>
          <Button onClick={onClose}>Sulje</Button>
        </div>
      </Stack>
    </Modal>
  );
}
