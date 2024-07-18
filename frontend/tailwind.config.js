/** @type {import('tailwindcss').Config} */

import twForms from '@tailwindcss/forms';
import withMT from '@material-tailwind/react/utils/withMT';

export default withMT({
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {},
    plugins: [twForms],
});
