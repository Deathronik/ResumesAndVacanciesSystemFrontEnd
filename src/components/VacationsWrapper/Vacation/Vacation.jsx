import {useState} from "react";
import {Link, Route, Router} from "react-router-dom";
import VacationView from "../VacationView/VacationView";
import {NavLink} from "react-bootstrap";

const Vacation = ({vacation}) => {
    return(
        <div className="card text-center mb-3">
            <div className="card-body">
                <h5 className="card-title">{vacation.JobTitle}</h5>
                <p className="card-text">{vacation.Description}</p>
                <Link to={`/vacation/${vacation.Id}`}>
                    <button className="btn btn-primary">Переглянути детально</button>
                </Link>
            </div>
        </div>
    )
}

export default Vacation;