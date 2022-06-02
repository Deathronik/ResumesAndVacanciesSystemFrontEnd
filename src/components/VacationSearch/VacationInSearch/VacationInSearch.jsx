import {Link} from "react-router-dom";

const VacationInSearch = ({vacation}) => {
    return (
        <div className="card text-center mb-3">
            <div className="card-body">
                <div>
                    <h5 className="card-title">{vacation.JobTitle}</h5>
                </div>
                <p className="card-text mt-4">{vacation.Description}</p>
                <div className="d-flex justify-content-between">
                    <span className="text-black-info">Досвід роботи: {vacation.Experience}</span>
                    <span className="text-black-info">Заробітна плата: {vacation.Salary}$</span>
                </div>
                <Link to={`${vacation.Id}`}>
                    <button className="btn btn-primary mt-3 mw">Переглянути детально</button>
                </Link>
            </div>
        </div>
    )
}

export default VacationInSearch;