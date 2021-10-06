const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
  const choice = ['Deposit', 'Cash Back'];
  console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    <div className="mb-3">
    <label className="form-label">
      <h3> {choice[Number(!isDeposit)]}</h3>
      <input id="number-input" type="number" width="200" onChange={onChange}></input>
      <input type="submit" disabled={!isValid} width="200" value="Submit" id="submit-input"></input>
    </label>
    </div>
  );
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState('');
  const [validTransaction, setValidTransaction] = React.useState(false);
  const Toast = () => {
    return (
        <>

        </>
    )
}
  const [showToast, setShowToast] = React.useState(true);
  const [prevTransactions, setPrevTransactions] = React.useState([]);
  const allDeposits = [];



  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  const handleChange = (event) => {
    console.log(Number(event.target.value));
    if (Number(event.target.value) <= 0) {
      toggleToast;
      return setValidTransaction(false);
    }
    if (atmMode === 'Cash Back' && Number(event.target.value) > totalState) {
      toggleToast;
      setValidTransaction(false);
    } else {
      setValidTransaction(true);
    }
    setDeposit(Number(event.target.value));
  };
  const handleSubmit = (event, allDeposits) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    let thisTransaction = isDeposit ? `Deposit: $${deposit}`:`Withdrawal: -$${deposit}`;
    allDeposits = prevTransactions;
    allDeposits.unshift(thisTransaction);
    setPrevTransactions(allDeposits);
    setTotalState(newTotal);
    setValidTransaction(false);
    
    event.preventDefault();
    return allDeposits;
  };

  const handleModeSelect = (event) => {
    console.log(event.target.value);
    setAtmMode(event.target.value);
    setValidTransaction(false);
    if (event.target.value === 'Deposit') {
      setIsDeposit(true);
    } else {
      setIsDeposit(false);
    }
  };

  function toggleToast() {
    setShowToast(!showToast);
  }

  return (
    <div>
    <form onSubmit={e => {handleSubmit(e, allDeposits)}}>
      <>
        <h2 id="total">{status}</h2>
        <div className="mb-3">
        <label htmlFor="select-action" className="form-label">Select an action below to continue</label>
        </div>
        <div className="mb-3">
        <div className="dropdown">
        <select className="btn btn-secondary dropdown-toggle" id="deposit-withdraw-button" data-bs-toggle="dropdown" onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
          Select An Option
          <option id="no-selection" value=""></option>
          <option className="dropdown-item" id="deposit-selection" value="Deposit">
            Deposit
          </option>
          <option className="dropdown-item" id="cashback-selection" value="Cash Back">
            Cash Back
          </option>
        </select>
        </div>
        </div>
        {atmMode && (
          <ATMDeposit
            onChange={handleChange}
            isDeposit={isDeposit}
            isValid={validTransaction}
          ></ATMDeposit>
        )}
      </>
    </form>
    <ul>{
      prevTransactions.map((trans, i) =>
      <ul key={i}>{trans} 
      </ul>)
      }
      </ul>
      
      <div show={showToast.tostring} onClose={toggleToast} className="position-fixed bottom-0 end-0 p-3" style={{ "zIndex": 11 }}>
        <div id="balance-warning" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
          
          <div className="toast-header">
            <strong className="me-auto">OOPS!!!</strong>
            <small>now</small>
            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div className="toast-body">
            You don't have enough funds for that Withdrawal.
          </div>
          
        </div>
      </div>
    </div>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById('root'));