import { useState } from 'react';
import { Mic } from 'lucide-react';
import { Button } from './button';
import { Textarea } from './textarea';
import { toast } from 'sonner';

export function SpeechTextarea({ 
  name, 
  value,
  defaultValue, 
  onChange, 
  required,
  className
}) {
  const [isListening, setIsListening] = useState(false);

  const startSpeechRecognition = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const simulatedEvent = {
          target: {
            value: transcript
          }
        };
        onChange(simulatedEvent);
      };

      recognition.onerror = (event) => {
        setIsListening(false);
        toast('Error occurred in speech recognition');
      };

      recognition.start();
    } else {
      toast('Speech recognition is not supported in this browser');
    }
  };

  return (
    <div className="relative">
      <Textarea
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        required={required}
        className={className}
      />
      <Button
        size="icon"
        variant="ghost"
        type="button"
        className={`absolute right-2 top-2 h-8 w-8 ${
          isListening ? 'text-primary' : ''
        }`}
        onClick={startSpeechRecognition}
      >
        <Mic className="h-4 w-4" />
      </Button>
    </div>
  );
} 