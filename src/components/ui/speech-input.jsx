import { useState } from 'react';
import { Mic } from 'lucide-react';
import { Button } from './button';
import { Input } from './input';
import { toast } from 'sonner';

export function SpeechInput({ 
  name, 
  defaultValue, 
  onChange, 
  required,
  className,
  placeholder,
  type = "text"
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
            name: name,
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
      <Input
        type={type}
        name={name}
        defaultValue={defaultValue}
        onChange={onChange}
        required={required}
        className={className}
        placeholder={placeholder}
      />
      <Button
        size="icon"
        variant="ghost"
        type="button"
        className={`absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 ${
          isListening ? 'text-primary' : ''
        }`}
        onClick={startSpeechRecognition}
      >
        <Mic className="h-4 w-4" />
      </Button>
    </div>
  );
} 