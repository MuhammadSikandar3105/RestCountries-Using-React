import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "./contexts/ThemeProvider";


const root = createRoot(document.getElementById('root'))

root.render(
    <Provider>
        <App />
    </Provider>
)