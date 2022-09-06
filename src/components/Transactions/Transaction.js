import { useDispatch } from "react-redux";
import deleteImage from "../../assets/images/delete.svg";
import editImage from "../../assets/images/edit.svg";
import {
  editActive,
  removeTransaction,
} from "../../features/transaction/transactionSlice";

import { useMatch, useNavigate } from "react-router-dom";

export default function Transaction({ transaction }) {
  const { name, amount, type, id } = transaction || {};

  const dispatch = useDispatch();

  const match = useMatch("/");
  const navigate = useNavigate();

  const handleEdit = () => {
    // if user is not in home page, redirect to home page
    if (!match) {
      navigate("/");
    }
    dispatch(editActive(transaction));
  };

  const handleDelete = () => {
    dispatch(removeTransaction(id));
  };

  return (
    <li className={`transaction ${type}`}>
      <p>{name}</p>
      <div className="right">
        <p>৳ {amount}</p>
        <button className="link" onClick={handleEdit}>
          <img alt="Edit" className="icon" src={editImage} />
        </button>
        <button className="link" onClick={handleDelete}>
          <img alt="Delete" className="icon" src={deleteImage} />
        </button>
      </div>
    </li>
  );
}
