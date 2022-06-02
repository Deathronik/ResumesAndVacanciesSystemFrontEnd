import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import data from "bootstrap/js/src/dom/data";

const VacationView = () => {
    const {vacationId} = useParams()
    const [vacationInfo, setVacationInfo] = useState({});
    const [userInfo, setUserInfo] = useState({})
    const [currentUser, setCurrentUser] = useState({})
    const [jobTitle, setJobTitle] = useState("")
    const [salary, setSalary] = useState("")
    const [experience, setExperience] = useState("")
    const [higherEducation, setHigherEducation] = useState("")
    const [description, setDescription] = useState("")
    const [bonus, setBonus] = useState("")
    const [cityName, setCityName] = useState("")

    async function getVacationInfo() {
        let response = await axios.get(`https://localhost:44335/api/Vacation/${vacationId}`)
        setVacationInfo(response.data)
        setJobTitle(response.data.JobTitle)
        setSalary(response.data.Salary)
        setExperience(response.data.Experience)
        setHigherEducation(response.data.IsHigherEducation === true ? "2" : "1")
        setDescription(response.data.Description)
        setCityName(response.data.CityName)
        setBonus(response.data.IsBonus === true ? "2" : "1")
    }

    async function onVacationChange() {
        if (jobTitle !== "" && salary !== "" && experience !== "" && description !== "" && cityName !== "") {
            let newObj = {
                Id: vacationInfo.Id,
                CompanyName: userInfo.CompanyName,
                HirerNames: userInfo.Names,
                JobTitle: jobTitle,
                Salary: salary,
                IsBonus: bonus === "1" ? false : true,
                Experience: experience,
                IsHigherEducation: higherEducation === "1" ? false : true,
                PhoneNumber: userInfo.PhoneNumber,
                Email: userInfo.Email,
                Description: description,
                CityName: cityName,
                HirerId: userInfo.Id,
                WorkerId: vacationInfo.WorkerId
            }

            let response = await axios.put(`https://localhost:44335/api/Vacation`, newObj)
            if (response.status === 204) {
                alert("Успішно збережено")
                window.location.href="/vacation-wrapper";
            }
            else
                alert(`Помилка: ${response.status}`)
        } else {
            alert("Всі поля повинні бути заповнені")
        }
    }

    async function getUserInfo() {
        let user = JSON.parse(localStorage.getItem("user"))
        let response = await axios.get(`https://localhost:44335/api/Hirer/${user.Id}`)
        setUserInfo(response.data)
    }

    async function onDeleteVacation() {
        let response = await axios.delete(`https://localhost:44335/api/Vacation/${vacationInfo.Id}`)
        if (response.status === 204) {
            alert("Успішно видалено")
            window.location.href="/vacation-wrapper";
        }
        else {
            alert(`Помилка: ${response.status}`)
        }
    }

    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem("user")))
        getVacationInfo()
        getUserInfo()
    }, [])

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h2 className="text-center text-dark mt-5">Форма перегляду вакансій</h2>
                    <div className="text-center mb-5 text-dark">Система резюме та вакансій</div>
                    <div className="card my-5">
                        <div className="card-body cardbody-color p-lg-5">
                            {currentUser.AccountType === 1 &&
                                <div>
                                    <div className="mb-3">
                                        <input value={jobTitle} onChange={event => setJobTitle(event.target.value)}
                                               type="text" className="form-control" id="company"
                                               placeholder="Назва вакансії"/>
                                    </div>
                                    <div className="mb-3">
                                        <input value={salary} onChange={event => setSalary(event.target.value)}
                                               type="text" className="form-control" id="company"
                                               placeholder="Заробітна плата"/>
                                    </div>
                                    <div className="mb-3">
                                        <input value={experience} onChange={event => setExperience(event.target.value)}
                                               type="text" className="form-control" id="company"
                                               placeholder="Років досвіду"/>
                                    </div>
                                    <select value={bonus} onChange={event => setBonus(event.target.value)} className="form-select mb-3">
                                        <option value="1">Немає бонусів</option>
                                        <option value="2">Є бонуси</option>
                                    </select>
                                    <select value={higherEducation} onChange={event => setHigherEducation(event.target.value)} className="form-select mb-3">
                                        <option value="1">Не потрібна вища освіта</option>
                                        <option value="2">Потрібна вища освіта</option>
                                    </select>
                                    <div className="mb-3">
                                        <input value={cityName} onChange={event => setCityName(event.target.value)}
                                               type="text" className="form-control" id="company"
                                               placeholder="Місто роботи"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Опис вакансії</label>
                                        <textarea value={description} onChange={event => setDescription(event.target.value)} className="form-control rounded-0" id="description"
                                                  rows="3"></textarea>
                                    </div>
                                    <div className="text-center">
                                        <button onClick={onVacationChange} type="submit" className="btn btn-color px-5 mt-3 w-100">Зберегти зміни
                                        </button>
                                    </div>
                                    <Link to={`/vacation/${vacationId}/resume-offered`}>
                                        <div className="text-center">
                                            <button type="submit"
                                                    className="btn btn-color mt-2 px-5 w-100">Переглянути запропоновані резюме
                                            </button>
                                        </div>
                                    </Link>
                                    <div className="text-center">
                                        <button onClick={onDeleteVacation} type="submit"
                                                className="btn btn-exit-color mt-2 px-5 w-100">Видалити вакансію
                                        </button>
                                    </div>
                                </div>

                            }
                            <Link to="/vacation-wrapper">
                                <div className="text-center">
                                    <button type="submit"
                                            className="btn btn-exit-color mt-2 px-5 w-100">Повернутися до списку вакансій
                                    </button>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VacationView