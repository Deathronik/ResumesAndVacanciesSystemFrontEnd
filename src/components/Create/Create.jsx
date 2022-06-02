import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

function Create() {
    const [currentUser, setCurrentUser] = useState({})
    const [userInfo, setUserInfo] = useState(null)
    const [jobTitle, setJobTitle] = useState("")
    const [salary, setSalary] = useState("")
    const [experience, setExperience] = useState("")
    const [higherEducation, setHigherEducation] = useState("")
    const [description, setDescription] = useState("")
    const [characterInfo, setCharacterInfo] = useState("")
    const [bonus, setBonus] = useState("")
    const [cityName, setCityName] = useState("")

    async function getUserInfo() {
        let user = JSON.parse(localStorage.getItem("user"))

        if (user.AccountType === 1) {
            let response = await axios.get(`https://localhost:44335/api/Hirer/${user.Id}`)
            setUserInfo(response.data)
        } else if (user.AccountType === 2) {
            let response = await axios.get(`https://localhost:44335/api/Worker/${user.Id}`)
            setUserInfo(response.data)
            checkResumeExist(response.data)
        }
    }

    async function onResumeCreate() {
        if (jobTitle !== "" && salary !== "" && experience !== "" && description !== "" && characterInfo !== "") {
            let newObj = {
                UserNames: userInfo.Names,
                JobTitle: jobTitle,
                OfferedSalary: salary,
                DateOfBirth: userInfo.DateOfBirth,
                Experience: experience,
                IsHigherEducation: higherEducation === "1" ? false : true,
                PhoneNumber: userInfo.PhoneNumber,
                Email: userInfo.Email,
                Description: description,
                CharacterInfo: characterInfo,
                WorkerId: userInfo.Id
            }

            let response = await axios.post(`https://localhost:44335/api/Worker?workerID=${currentUser.Id}`, newObj)
            if (response.status === 204) {
                alert("Успішно створено")
                window.location.href="/profile";
            }
            else
                alert(`Помилка: ${response.status}`)
        } else {
            alert("Всі поля повинні бути заповнені")
        }
    }

    function checkResumeExist(data) {
        console.log(data)
        if (data.Resumes.length === 1) {
            alert("Ви вже маєте створене резюме, нажміть ок, щоб повернутися в профіль!")
            window.location.href = "/profile"
        }
    }


    async function onVacationCreate() {
        if (jobTitle !== "" && salary !== "" && experience !== "" && description !== "" && cityName !== "") {
            let newObj = {
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
                HirerId: userInfo.Id
            }

            let response = await axios.post(`https://localhost:44335/api/Hirer?hirerID=${currentUser.Id}`, newObj)
            if (response.status === 204) {
                alert("Успішно створено")
                window.location.href="/profile";
            }
            else
                alert(`Помилка: ${response.status}`)
        } else {
            alert("Всі поля повинні бути заповнені")
        }
    }

    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem("user")))
        getUserInfo()
    }, [])

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h2 className="text-center text-dark mt-5">Форма
                        створення {currentUser.AccountType === 1 ? "вакансії" : "резюме"}</h2>
                    <div className="text-center mb-5 text-dark">Система резюме та вакансій</div>
                    <div className="card my-5">
                        <div className="card-body cardbody-color p-lg-5">
                            {currentUser.AccountType === 2 &&
                                <div>
                                    <div className="mb-3">
                                        <input value={jobTitle} onChange={event => setJobTitle(event.target.value)}
                                               type="text" className="form-control" id="company"
                                               placeholder="Назва резюме"/>
                                    </div>
                                    <div className="mb-3">
                                        <input value={salary} onChange={event => setSalary(event.target.value)}
                                               type="text" className="form-control" id="company"
                                               placeholder="Бажана заробітна плата"/>
                                    </div>
                                    <div className="mb-3">
                                        <input value={experience} onChange={event => setExperience(event.target.value)}
                                               type="text" className="form-control" id="company"
                                               placeholder="Років досвіду"/>
                                    </div>
                                    <select value={higherEducation} onChange={event => setHigherEducation(event.target.value)} className="form-select mb-3">
                                        <option value="1">Немає вищої освіти</option>
                                        <option value="2">Є вища освіта</option>
                                    </select>
                                    <div className="form-group">
                                        <label>Коротка біографія</label>
                                        <textarea value={description} onChange={event => setDescription(event.target.value)} className="form-control rounded-0" id="description"
                                                  rows="3"></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label>Опишіть свої навички</label>
                                        <textarea value={characterInfo} onChange={event => setCharacterInfo(event.target.value)} className="form-control rounded-0" id="description"
                                                  rows="3"></textarea>
                                    </div>
                                    <div className="text-center">
                                        <button onClick={onResumeCreate} type="submit" className="btn btn-color px-5 mt-3 w-100">Створити резюме
                                        </button>
                                    </div>
                                </div>
                            }

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
                                        <button onClick={onVacationCreate} type="submit" className="btn btn-color px-5 mt-3 w-100">Створити вакансію
                                        </button>
                                    </div>
                                </div>
                            }
                            <Link to="/profile">
                                <div className="text-center">
                                    <button type="submit"
                                            className="btn btn-exit-color mt-2 px-5 w-100">Повернутися в профіль
                                    </button>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Create;