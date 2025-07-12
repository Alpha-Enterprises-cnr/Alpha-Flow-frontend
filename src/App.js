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
import Logistics from './Logistics'; // ✅ Newly added component

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
  const [logisticsData, setLogisticsData] = useState([]);

const handleClientFormSubmit = (formData) => {
  setCorrespondenceData((prev) => [...prev, { ...formData, approved: false }]);
  setLogisticsData((prev) => [...prev, { ...formData }]); // send to logistics
  alert('✅ Client form submitted!');
  setCurrentModule(null);
};

  const handleAssignWorkNumber = (index, worknumber) => {
    setCorrespondenceData((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        worknumber,
        status: 'Registered - waiting for survey supporting documents',
      };
      setOperationHeadData((old) => [...old, updated[index]]);
      return updated;
    });
  };

  const handleSubmitToSystems = (submittedCard) => {
    const { worknumber } = submittedCard;
    setOperationHeadData((prev) =>
      prev.filter((item) => item.worknumber !== worknumber)
    );
    setSystemMessages((prev) => {
      const exists = prev.some((msg) => msg.worknumber === worknumber);
      return exists ? prev : [...prev, { ...submittedCard }];
    });
    setCorrespondenceData((prev) =>
      prev.map((entry) =>
        entry.worknumber === worknumber
          ? {
              ...entry,
              surveySubmitted: true,
              status: '📸 Work survey supporting documents have been submitted',
            }
          : entry
      )
    );
    alert(`✅ Work Number ${worknumber} submitted to Systems`);
  };

  const handleForwardToAccounts = (entry) => {
    setAccountsData((prev) => [...prev, entry]);
    setSystemMessages((prev) =>
      prev.filter((msg) => msg.worknumber !== entry.worknumber)
    );
    setCorrespondenceData((prev) =>
      prev.map((e) =>
        e.worknumber === entry.worknumber
          ? {
              ...e,
              status: '📤 Estimates were sent, waiting for approval',
            }
          : e
      )
    );
  };

  const handleApprovalUpdate = (worknumber) => {
    setCorrespondenceData((prev) =>
      prev.map((entry) =>
        entry.worknumber === worknumber
          ? {
              ...entry,
              approved: true,
              status: 'Approved by Accounts',
            }
          : entry
      )
    );
    setAccountsData((prev) =>
      prev.filter((entry) => entry.worknumber !== worknumber)
    );

    const updated = correspondenceData.find((e) => e.worknumber === worknumber);
    if (updated) {
      setSystemMessages((prev) => [...prev, { ...updated, status: 'Approved by Accounts' }]);
    }
  };

  const handleSendWorkslipToOperationHead = (worknumber, file, entry) => {
    setSystemMessages((prev) =>
      prev.filter((msg) => msg.worknumber !== worknumber)
    );
    setSystemsToOperationHead((prev) => [
      ...prev,
      { ...entry, worknumber, workslip: file, status: '📤 Workslip submitted to Operation Head' },
    ]);
    setCorrespondenceData((prev) =>
      prev.map((e) =>
        e.worknumber === worknumber
          ? {
              ...e,
              status: '📤 Workslip submitted to Operation Head',
            }
          : e
      )
    );
    alert(`✅ Workslip for ${worknumber} sent to Operation Head`);
  };

  const handleSurveyUpload = (worknumber, uploadedFiles = []) => {
    setCorrespondenceData((prev) =>
      prev.map((entry) =>
        entry.worknumber === worknumber
          ? {
              ...entry,
              surveySubmitted: true,
              status: '📦 WORK SURVEY SUPPORTING DOCUMENTS HAVE BEEN SUBMITTED',
            }
          : entry
      )
    );

    if (uploadedFiles.length > 0) {
      const fileInfo = uploadedFiles.map((file) => ({
        name: file.name,
        url: `https://alpha-flow-backend.onrender.com/uploads/${file.name}`,
      }));

      setSystemMessages((prev) => [
        ...prev,
        {
          sender: 'operationhead@gmail.com',
          text: `📁 Work survey documents submitted for Work Number ${worknumber}`,
          file: fileInfo,
          worknumber,
        },
      ]);
    }
  };

  const handleClientFormSubmit = (formData) => {
    setCorrespondenceData((prev) => [...prev, { ...formData, approved: false }]);
    alert('Client form submitted successfully!');
    setCurrentModule(null);
  };

  const handleJobRegistrySubmit = (formData) => {
    setCorrespondenceData((prev) => [...prev, { ...formData, approved: false }]);
    alert('Job registry submitted successfully!');
    setCurrentModule(null);
  };

  const handleLogin = (email) => {
    setUser({ email });
  };

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
        <Login onLogin={handleLogin} />
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
      ) : currentModule === 'logistics' ? (
       <Logistics
  data={logisticsData}
  onBack={() => setCurrentModule(null)}
/>

      ) : (
        <Dashboard onSelect={setCurrentModule} />
      )}
    </div>
  );
}

export default App;
