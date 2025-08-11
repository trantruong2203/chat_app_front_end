// components/EmojiPicker.tsx
import React from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

interface EmojiPickerProps {
  onSelect: (emoji: { native: string }) => void;
  setMessage: (message: string) => void;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onSelect, setMessage }) => {
  return (
    <Picker
      data={data}
      onEmojiSelect={(emoji) => {
        onSelect(emoji);
        setMessage(emoji.native);
      }}
      theme="light"
      set="native"  
      previewPosition="none"
      skinTonePosition="none"
    />
  );
};

export default EmojiPicker;
