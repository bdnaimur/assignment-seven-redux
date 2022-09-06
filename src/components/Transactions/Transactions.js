import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  cehckRadioBtn,
  fetchTransactions,
  setSearchInput,
} from "../../features/transaction/transactionSlice";
import Transaction from "./Transaction";
import { Pagination } from "easy-pagination-1";

export default function Transactions({ view }) {
  const dispatch = useDispatch();

  const { transactions, isLoading, isError, searchInput } = useSelector(
    (state) => state.transaction
  );
  const [type, setType] = useState("");
  const showPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const { viewItems, paginationList, paginationListView } = Pagination(
    transactions,
    currentPage,
    showPerPage
  );

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  // decide what to render
  let content = null;
  if (isLoading) content = <p>Loading...</p>;

  if (!isLoading && isError)
    content = <p className="error">There was an error occured</p>;

  if (!isLoading && !isError && transactions?.length === 0) {
    content = <p>No transactions found!</p>;
  }

  if (!isLoading && !isError && transactions?.length > 0) {
    if (!view) {
      content = [...transactions]
        .reverse()
        .slice(0, 5)
        .map((transaction) => (
          <Transaction key={transaction.id} transaction={transaction} />
        ));
    } else {
      content = viewItems.map((transaction) => (
        <Transaction key={transaction.id} transaction={transaction} />
      ));
    }
  }

  return (
    <>
      <p className="second_heading">Your Transactions:</p>

      <div className="shorting">
        <div className="form-group radio">
          <div className="radio_group">
            <input
              required
              type="radio"
              value="income"
              name="type"
              checked={type === "income"}
              onChange={(e) => {
                setType("income");
                dispatch(cehckRadioBtn("income"));
              }}
            />
            <label>Income</label>
          </div>
          <div className="radio_group">
            <input
              type="radio"
              value="expense"
              name="type"
              placeholder="Expense"
              checked={type === "expense"}
              onChange={(e) => {
                setType("expense");
                dispatch(cehckRadioBtn("expense"));
              }}
            />
            <label>Expense</label>
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              className="outline-none border-none mr-2"
              type="search"
              name="search"
              placeholder="Search"
              value={searchInput}
              onChange={(e) => dispatch(setSearchInput(e.target.value))}
            />
          </form>
        </div>
      </div>

      <div className="conatiner_of_list_of_transactions">
        <ul>{content}</ul>
      </div>
      {/* paginations */}

      {view && (
        <ul className="ulStyle">
          {currentPage > 1 && (
            <li
              onClick={() => setCurrentPage(currentPage - 1)}
              className="prevNextBtn"
            >
              <a>Prev</a>
            </li>
          )}
          {paginationListView.map((paginateData, index) => (
            <li
              onClick={() =>
                typeof paginateData == "number" && setCurrentPage(paginateData)
              }
              key={index}
              className={
                paginateData == currentPage ? "activeListCssStyle" : "listStyle"
              }
            >
              <a>{paginateData}</a>
            </li>
          ))}

          {paginationList.length !== currentPage && (
            <li
              onClick={() => setCurrentPage(currentPage + 1)}
              className="prevNextBtn"
            >
              <a>Next</a>
            </li>
          )}
        </ul>
      )}

      {!view && <Link to={"/transactions"}>View All Transactions</Link>}
    </>
  );
}
