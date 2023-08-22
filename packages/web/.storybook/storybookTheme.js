// .storybook/YourTheme.js

import { create } from '@storybook/theming/create';
import logo from './images/MAUI-Logo-Full.svg';

export default create({
    base: 'light',
    brandTitle: 'React Custom Component - UI',
    brandUrl: 'https://www.creativelid.com',
    brandImage: logo,
    brandTarget: '_self',
});
