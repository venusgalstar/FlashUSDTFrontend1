import {Helmet} from "react-helmet";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

import Layout from "./components/Layout";
import Main from './pages/main';

function App() {
  return (
    <div className="App">
      <Helmet>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>
          GrandPass
        </title>
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
        <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
      </Helmet>
      <Layout>
        <Switch>
          <Route path="/" component={Main} />
        </Switch>
      </Layout>
      <ToastContainer />
    </div>
  );
}

export default App;
