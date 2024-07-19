/** @type {import('tailwindcss').Config} */

import withMT from '@material-tailwind/react/utils/withMT';

export default withMT({
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {},
    plugins: [],
});
