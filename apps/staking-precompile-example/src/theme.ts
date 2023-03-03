import { extendTheme } from '@chakra-ui/react'

// Configure Chakra theme
const theme = extendTheme({
    fonts: {
        heading: `'Open Sans', sans-serif`,
        body: `'Raleway', sans-serif`,
    },
    styles: {
        global: {
            "html, body": {
                height: "100vh",
                width: "100vw",
                backgroundColor: "#000000",
                color: "#ffffff",
            },
        },
    },
});

export default theme;