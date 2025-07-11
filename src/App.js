import React, { useState, useEffect } from 'react';
import Splash from './Splash';
import Login from './login';
import Dashboard from './Dashboard';
import Inbox from './inbox';
import Compose from './compose';
import MasterCorrespondence from './MasterCorrespondence';
import GeneralCorrespondence from './GeneralCorrespondence';
import ClientForm from './ClientForm';
import JobRegistry from './JobRegistry';
import OperationHeadPanel from './OperationHeadPanel';
import Systems from './Systems';
import Accounts from './Accounts';
import Logistics from './Logistics'; // ✅ NEW LINE

function App() {
  const [user, setUser] = useState(null);
  const [showSplash, setShowSplash] = useState(true);
  const [currentModule, setCurrentModule] = useState(null);

  const [messages, setMessages] = useState([]);
  const [correspondenceData, setCorrespondenceData] = useState([]);
  const [operationHeadData, setOperationHeadData] = useState([]);
  const [systemMessages, setSystemMessages] = useState([]);
  const [accountsData, setAccountsData] = useState([]);
  const [systemsToOperationHead, setSystemsToOperationHead] = useState([]);

  // ... existing handler functions stay unchanged ...

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {showSplash ? (
        <Splash />
      ) : !user ? (
        <Login onLogin={(email) => setUser({ email })} />
      ) : currentModule === 'mail' ? (
        <Inbox
          user={user}
          messages={messages}
          onCompose={() => setCurrentModule('compose')}
          onBack={() => setCurrentModule(null)}
        />
      ) : currentModule === 'compose' ? (
        <Compose
          onSend={(mail) => {
            setMessages([...messages, mail]);
            setCurrentModule('mail');
          }}
          onBack={() => setCurrentModule('mail')}
        />
      ) : currentModule === 'master' ? (
        <MasterCorrespondence
          data={correspondenceData}
          onBack={() => setCurrentModule(null)}
          onAssignWorkNumber={handleAssignWorkNumber}
        />
      ) : currentModule === 'general' ? (
        <GeneralCorrespondence
          data={correspondenceData}
          onBack={() => setCurrentModule(null)}
        />
      ) : currentModule === 'form' ? (
        <ClientForm
          onSubmit={handleClientFormSubmit}
          onBack={() => setCurrentModule(null)}
        />
      ) : currentModule === 'register' ? (
        <JobRegistry
          onSubmit={handleJobRegistrySubmit}
          onBack={() => setCurrentModule(null)}
        />
      ) : currentModule === 'operationHead' ? (
        <OperationHeadPanel
          jobData={operationHeadData}
          currentUser={user?.email}
          systemsWork={systemsToOperationHead}
          onSubmitToSystems={handleSubmitToSystems}
          onSurveyUpload={handleSurveyUpload}
          onBack={() => setCurrentModule(null)}
        />
      ) : currentModule === 'supervisor' ? (
        <Systems
          currentUser={user?.email}
          messages={systemMessages}
          onBack={() => setCurrentModule(null)}
          onSurveyUpload={handleSurveyUpload}
          onSendWorkslipToOperationHead={handleSendWorkslipToOperationHead}
          onForwardToAccounts={handleForwardToAccounts}
        />
      ) : currentModule === 'accounts' ? (
        <Accounts
          accountData={accountsData}
          onBack={() => setCurrentModule(null)}
          onApproveStatus={handleApprovalUpdate}
        />
      ) : currentModule === 'logistics' ? ( // ✅ ADD THIS BLOCK
        <Logistics
          onBack={() => setCurrentModule(null)}
        />
      ) : (
        <Dashboard onSelect={setCurrentModule} />
      )}
    </div>
  );
}

export default App;
