import React from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../command';
import { Position } from '@/types/geo-data.type';

interface LocationSearchDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (value: boolean) => void;
  setPosition: (value: Position) => void;
  setAddress: (value: string) => void;
}

const LocationSearchDialog: React.FC<LocationSearchDialogProps> = ({
  isDialogOpen,
  setIsDialogOpen,
  setPosition,
  setAddress
}) => {
  const {
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address: string): Promise<void> => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });

    setAddress(address);

    const { lat, lng } = await getLatLng(results[0]);

    setPosition({ lat, lng });
    setIsDialogOpen(false);
  };

  return (
    <CommandDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <CommandInput
        placeholder="Type a command or search..."
        value={value}
        onValueChange={(value) => setValue(value)}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          {status === 'OK' &&
            data.map(({ place_id, description }) => (
              <CommandItem key={place_id} onSelect={handleSelect}>
                {description}
              </CommandItem>
            ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default LocationSearchDialog;
