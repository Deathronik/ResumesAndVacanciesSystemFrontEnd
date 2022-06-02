import {Link} from "react-router-dom";

const Resume = ({resume}) => {
    return(
        <div className="card text-center mb-3">
            <div className="card-body">
                <div>
                    <h5 className="card-title">{resume.JobTitle}</h5>
                </div>
                <p className="card-text mt-4">{resume.Description}</p>
                <div className="d-flex justify-content-between">
                    <span className="text-black-info">Досвід роботи: {resume.Experience}</span>
                    <span className="text-black-info">Заробітна плата: {resume.OfferedSalary}$</span>
                </div>
                <Link to={`${resume.Id}`}>
                    <button className="btn btn-primary mt-3 mw">Переглянути детально</button>
                </Link>
            </div>
        </div>
    )
}

export default Resume;