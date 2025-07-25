'use client';

import { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { Input, Box, Text } from '@chakra-ui/react';

export default function LocationInput({ state, country,changes, city, label, placing, names, values, updateStates, required }) {
  const [autocomplete, setAutocomplete] = useState(null);

  const handlePlaceChanged = () => {
    if (!autocomplete) return;

    const place = autocomplete.getPlace();
    if (!place || !place.address_components) return;

    const components = {
      city: '',
      state: '',
      country: '',
      fullAddress: place.formatted_address || place.name || ''
    };

    place.address_components.forEach(component => {
      const types = component.types;
      if (types.includes('locality')) components.city = component.long_name;
      if (types.includes('administrative_area_level_1')) components.state = component.long_name;
      if (types.includes('country')) components.country = component.long_name;
    });

    if (typeof updateStates === 'function') {
      if (country) updateStates(prev => ({ ...prev, [names]: components.country }));
      if (state) updateStates(prev => ({ ...prev, [names]: components.state }));
      if (city) updateStates(prev => ({ ...prev, [names]: components.city }));
      if (!country && !state && !city) {
        updateStates(prev => ({ ...prev, [names]: components.fullAddress }));
      }
    }
  };

  return (
    <Box>
              <Text className=' text-[15px] font-semibold'>
        {required &&<span style={{ color: 'red', fontSize:'18px' }}>*</span>}{label}
              </Text>
      <div className="w-full rounded-lg h-[48px] grid items-center mt-[10px] bg-[#F6F6F6] text-[15px]">
        <Autocomplete
          onLoad={(autocompleteInstance) => setAutocomplete(autocompleteInstance)}
          onPlaceChanged={handlePlaceChanged}
        >
          <Input
            type="text"
            name={names}
            style={{ width: '100%', padding: '10px', fontSize: '16px' }}
            border="none"
            className="text-[#7C7C7C] text-[14px]"
            placeholder={placing}
            onChange={changes}
            value={values}
          />
        </Autocomplete>
      </div>
    </Box>
  );
}
