import {useEffect, useState} from "react";
import axios from "axios";
import Vacation from "../VacationsWrapper/Vacation/Vacation";
import VacationInSearch from "./VacationInSearch/VacationInSearch";
import {Link} from "react-router-dom";

const VacationSearch = () => {
    const [vacations, setVacations] = useState([])
    const [salary, setSalary] = useState("")
    const [jobTitle, setJobTitle] = useState("")
    const [experience, setExperience] = useState("")
    const [noHigherEducation, setNoHigherEducation] = useState("1")

    async function getVacations() {
        let response = await axios.get("https://localhost:44335/api/Vacation")
        setVacations(response.data)
    }

    async function onFindClick() {
        let response = await axios.get(`https://localhost:44335/api/Vacation?jobTitle=${jobTitle}&salary=${salary}&experience=${experience}&noHigherEducation=${noHigherEducation === "1" ? true : false}`)
        setVacations(response.data)
    }

    function onFiltersClearClick() {
        setSalary("")
        setJobTitle("")
        setExperience("")
        setNoHigherEducation("1")
        getVacations()
    }

    useEffect(() => {
        getVacations()
    }, [])


    return (
        <div className="container rounded mt-5 mb-5 mw-100">
            <div className="d-flex justify-content-center row">
                <div className="d-flex justify-content-center col-1 cardbody-color  col-md-5 border-right border">
                    <div className="d-flex flex-column container rounded mt-5 mb-5 justify-content-center align-content-center mw-100">
                        <div className="d-flex justify-content-center align-items-center mb-3">
                            <h4 className="text-right">Пошук вакансій</h4>
                        </div>
                        <div>
                            {vacations.map((vacation) => <VacationInSearch vacation={vacation} key={vacation.Id}/>)}
                        </div>
                        <Link to="/profile">
                            <div className="text-center">
                                <button type="submit"
                                        className="btn btn-exit-color mt-2 px-5 w-100">Повернутися в профіль
                                </button>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="d-flex justify-content-center col-2 cardbody-color col-md-4 border border-start-0">
                    <div className="d-flex flex-column justify-content-center align-content-center p-3 py-5">
                        <div className="d-flex justify-content-center mb-3">
                            <h4 className="text-center">Фільтри</h4>
                        </div>
                        <div>
                            <div className="mb-3">
                                <input value={jobTitle} onChange={event => setJobTitle(event.target.value)}
                                       type="text" className="form-control" id="title"
                                       placeholder="Назва вакансії"/>
                            </div>
                            <div className="mb-3">
                                <input value={salary} onChange={event => setSalary(event.target.value)}
                                       type="text" className="form-control" id="salary"
                                       placeholder="Заробітна плата"/>
                            </div>
                            <div className="mb-3">
                                <input value={experience} onChange={event => setExperience(event.target.value)}
                                       type="text" className="form-control" id="experience"
                                       placeholder="Років досвіду"/>
                            </div>
                            <div>
                                <select value={noHigherEducation} onChange={event => setNoHigherEducation(event.target.value)} className="form-select mb-3">
                                    <option value="1">Не потрібна вища освіта</option>
                                    <option value="2">Потрібна вища освіта</option>
                                </select>
                            </div>
                            <div className="text-center">
                                <button onClick={onFindClick} type="submit"
                                        className="btn btn-color mt-2 px-5 w-100">Знайти
                                </button>
                            </div>
                            <div className="text-center">
                                <button onClick={onFiltersClearClick} type="submit"
                                        className="btn btn-color mt-2 px-5 w-100">Скинути фільтри
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VacationSearch