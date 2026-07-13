import { ErrorBoundary } from "react-error-boundary";

import Dashboard from "./pages/Dashboard";
import ErrorFallback from "./components/common/ErrorFallback";

function App() {
    return (
        <ErrorBoundary
            FallbackComponent={ErrorFallback}
        >
            <Dashboard />
        </ErrorBoundary>
    );
}

export default App;