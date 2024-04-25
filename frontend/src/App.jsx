import { Outlet } from "react-router-dom";
import Layout from "./components/Layout.jsx";

function App() {

  return (
    <> 
      <Layout>
          <Outlet />
      </Layout>
    </>
  )
}

export default App;
