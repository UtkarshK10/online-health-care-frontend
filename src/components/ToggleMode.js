import React from 'react';
import { ThemeConsumer } from 'styled-components';
import Switch from 'react-switch';

export default function ToggleMode() {
  return (
    <ThemeConsumer>
      {(theme) => (
        <Switch
          checked={theme.mode === 'dark'}
          onChange={() =>
            theme.setTheme(
              theme.mode === 'dark'
                ? { ...theme, mode: 'light' }
                : { ...theme, mode: 'dark' }
            )
          }
          onColor='#282828'
          onHandleColor='#696969'
          handleDiameter={30}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow='0px 1px 5px rgba(0, 0, 0, 0.6)'
          activeBoxShadow='0px 0px 1px 10px rgba(0, 0, 0, 0.2)'
          height={20}
          width={48}
          className='react-switch'
          id='material-switch'
        />
      )}
    </ThemeConsumer>
  );
}
