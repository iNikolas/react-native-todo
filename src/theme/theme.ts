import {createTheme} from '@rneui/themed';

export const theme = createTheme({
  lightColors: {success: 'rgba(127, 220, 103, 1)'},
  components: {
    CheckBox: {size: 18, containerStyle: {backgroundColor: 'transparent'}},
  },
});
