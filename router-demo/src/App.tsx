import React from 'react';

import { Layout } from './components/Layout';
import { PageHeader, PageFooter, Sidebar, Menu } from './components/pageParts';
import { Pages } from './components/pages';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';



function App() {
  return (
    <Router>
      <Layout>
        <PageHeader />
        <Menu />
        <Pages />
        <Sidebar />
        <PageFooter />
      </Layout>
    </Router>
  );
}

export default App;
