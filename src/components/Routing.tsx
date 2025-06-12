import AddHuishoudboekjePage from '../huishoudboekjes/HuishoudboekjeAdd';
import DetailHuishoudboekjePage from '../huishoudboekjes/HuishoudboekjeDetail';
import EditHuishoudboekjePage from '../huishoudboekjes/HuishoudboekjeEdit';
import Login from './Login';
import Logout from './Logout';
import OverviewGearchiveerdeHuishoudboekjePage from '../huishoudboekjes/HuishoudboekjesArchivedOverview';
import OverviewHuishoudboekjePage from '../huishoudboekjes/HuishoudboekjesOverview';
import ProtectedRoute from '../routes/ProtectedRoute';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const NotFound: React.FC = () => <h1>404 - Not Found</h1>;

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="*" element={<NotFound />} />

      <Route element={<ProtectedRoute />}>
      
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/" element={<OverviewHuishoudboekjePage/>}/>
        <Route path="/huishoudboekjes" element={<OverviewHuishoudboekjePage/>}/>
        <Route path="/huishoudboekjes/gearchiveerd" element={<OverviewGearchiveerdeHuishoudboekjePage/>}/>
        <Route path="/huishoudboekjes/toevoegen" element={<AddHuishoudboekjePage/>}/>
        <Route path="/huishoudboekjes/aanpassen/:id" element={<EditHuishoudboekjePage/>}/>
        <Route path="/huishoudboekjes/details/:id" element={<DetailHuishoudboekjePage/>}/>
        
      </Route>

    </Routes>
  );
};

export default App;