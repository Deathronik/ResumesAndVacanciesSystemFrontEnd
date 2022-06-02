import React, {useEffect, useState} from 'react';
import axios from "axios";
import "./Profile.scss"
import {Link} from "react-router-dom";

const Profile = () => {
    const [currentUser, setCurrentUser] = useState({})
    const [companyName, setCompanyName] = useState("")
    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [birthDay, setBirthDay] = useState("")

    function onCompanyNameChange(event) {
        setCompanyName(event.target.value)
    }

    function onUserNameChange(event) {
        setUserName(event.target.value)
    }

    function onEmailChange(event) {
        setUserEmail(event.target.value)
    }

    function onPhoneNumberChange(event) {
        setPhoneNumber(event.target.value)
    }

    function onPasswordChange(event) {
        setUserPassword(event.target.value)
    }

    function onBirthDayChange(event) {
        setBirthDay(event.target.value)
    }

    async function getUserInfo() {
        let user = JSON.parse(localStorage.getItem("user"))

        if (user.AccountType === 1) {
            let response = await axios.get(`https://localhost:44335/api/Hirer/${user.Id}`)
            setCompanyName(response.data.CompanyName)
            setUserName(response.data.Names)
            setPhoneNumber(response.data.PhoneNumber)
            setUserEmail(response.data.Email)
            setUserPassword(response.data.Password)
        } else if (user.AccountType === 2) {
            let response = await axios.get(`https://localhost:44335/api/Worker/${user.Id}`)
            setUserName(response.data.Names)
            setPhoneNumber(response.data.PhoneNumber)
            setUserEmail(response.data.Email)
            setUserPassword(response.data.Password)
            setBirthDay(response.data.DateOfBirth)
        }
    }

    async function onHirerChange() {
        if (companyName !== "" && userName !== "" && phoneNumber !== "" && userEmail !== "" && userPassword !== "") {
            let newObj = {
                Id: currentUser.Id,
                CompanyName: companyName,
                Names: userName,
                PhoneNumber: phoneNumber,
                Email: userEmail,
                Password: userPassword,
                Vacations: currentUser.Vacations,
                Resume: currentUser.Resume
            }

            let response = await axios.put(`https://localhost:44335/api/Hirer`, newObj)
            if (response.status === 204) {
                alert("Успішно збережено")
                window.location.reload();
            } else
                alert(`Помилка: ${response.status}`)
        } else {
            alert("Всі поля повинні бути заповнені")
        }
    }

    async function onWorkerChange() {
        if (birthDay !== "" && userName !== "" && phoneNumber !== "" && userEmail !== "" && userPassword !== "") {
            let newObj = {
                Id: currentUser.Id,
                Names: userName,
                PhoneNumber: phoneNumber,
                Email: userEmail,
                Password: userPassword,
                DateOfBirth: birthDay,
                Resumes: currentUser.Resumes,
                Vacations: currentUser.Vacations
            }

            let response = await axios.put(`https://localhost:44335/api/Worker`, newObj)
            if (response.status === 204) {
                alert("Успішно збережено")
                window.location.reload();
            } else
                alert(`Помилка: ${response.status}`)
        } else {
            alert("Всі поля повинні бути заповнені")
        }
    }

    function onExitClick() {
        localStorage.removeItem("user")
        window.location.href = ""
    }

    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem("user")))
        getUserInfo()
    }, [])

    return (
        <div className="container rounded mt-5 mb-5">
            <div className="row">
                <div className="col-md-3 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                        <img
                            className="rounded-circle mt-5" width="150px"
                            src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"/>
                        <span className="font-weight-bold">{currentUser.Names}</span>
                        <span className="text-black-50">{currentUser.Email}</span>
                        <span/>
                    </div>
                </div>
                <div className="cardbody-color  col-md-5 border-right border">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right">{currentUser.AccountType === 1 ? "Ваш профіль наймача" : "Ваш профіль працівника"}</h4>
                        </div>
                        {currentUser.AccountType === 1 && <div className="row mt-2">
                            <div className="mb-3">
                                <label className="text">Назва вашої компанії</label>
                                <input value={companyName} onChange={event => onCompanyNameChange(event)}
                                       type="text" className="form-control" id="company"
                                       placeholder="Назва вашої компанії"/>
                            </div>
                            <div className="mb-3">
                                <label className="text">Ваші ініціали</label>
                                <input value={userName} onChange={event => onUserNameChange(event)} type="text"
                                       className="form-control" id="name"
                                       placeholder="Ваші ініціали"/>
                            </div>
                            <div className="mb-3">
                                <label className="text">Пошта</label>
                                <input value={userEmail} onChange={event => onEmailChange(event)} type="text"
                                       className="form-control" id="email"
                                       placeholder="Пошта"/>
                            </div>
                            <div className="mb-3">
                                <label className="text">Ваш номер телефону</label>
                                <input value={phoneNumber} onChange={event => onPhoneNumberChange(event)}
                                       type="text" className="form-control" id="number"
                                       placeholder="Ваш номер телефону"/>
                            </div>
                            <div className="mb-3">
                                <label className="text">Пароль</label>
                                <input value={userPassword} onChange={event => onPasswordChange(event)}
                                       type="password" className="form-control" id="password"
                                       placeholder="Пароль"/>
                            </div>
                            <div className="text-center">
                                <button onClick={onHirerChange} type="submit"
                                        className="btn btn-color px-5 w-100">Зберегти зміни
                                </button>
                            </div>
                            <div className="text-center">
                                <button onClick={onExitClick} type="submit"
                                        className="btn btn-exit-color mt-2 px-5 w-100">Вийти з акаунту
                                </button>
                            </div>
                        </div>}

                        {currentUser.AccountType === 2 && <div>
                            <div className="mb-3">
                                <label className="text">Ваші ініціали</label>
                                <input value={userName} onChange={event => onUserNameChange(event)} type="text"
                                       className="form-control" id="name"
                                       placeholder="Ваші ініціали"/>
                            </div>
                            <div className="mb-3">
                                <label className="text">Пошта</label>
                                <input value={userEmail} onChange={event => onEmailChange(event)} type="text"
                                       className="form-control" id="email"
                                       placeholder="Пошта"/>
                            </div>
                            <div className="mb-3">
                                <label className="text">Ваш номер телефону</label>
                                <input value={phoneNumber} onChange={event => onPhoneNumberChange(event)}
                                       type="text" className="form-control" id="number"
                                       placeholder="Ваш номер телефону"/>
                            </div>
                            <div className="mb-3">
                                <label className="text">Дата народження</label>
                                <input value={birthDay} onChange={event => onBirthDayChange(event)} type="text"
                                       className="form-control" id="birthday"
                                       placeholder="Дата народження (12.03.1986)"/>
                            </div>
                            <div className="mb-3">
                                <label className="text">Пароль</label>
                                <input value={userPassword} onChange={event => onPasswordChange(event)}
                                       type="password" className="form-control" id="password"
                                       placeholder="Пароль"/>
                            </div>
                            <div className="text-center">
                                <button onClick={onWorkerChange} type="submit"
                                        className="btn btn-color px-5 w-100">Зберегти зміни
                                </button>
                            </div>
                            <div className="text-center">
                                <button onClick={onExitClick} type="submit"
                                        className="btn btn-exit-color mt-2 px-5 w-100">Вийти з акаунту
                                </button>
                            </div>
                        </div>}
                    </div>
                </div>
                <div className="cardbody-color col-md-4 border border-start-0">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right">Можливі дії</h4>
                        </div>
                        {currentUser.AccountType === 1 &&
                            <div className="text-center">
                                <Link to="/create">
                                    <button type="submit"
                                            className="btn btn-primary mt-2 px-5 w-100">Створити вакансію
                                    </button>
                                </Link>
                                <Link to="/vacation-wrapper">
                                    <button type="submit"
                                            className="btn btn-primary mt-2 px-5 w-100">Переглянути створені вакансії
                                    </button>
                                </Link>
                                <Link to="/resume-search">
                                    <button type="submit"
                                            className="btn btn-primary mt-2 px-5 w-100">Пошук резюме
                                    </button>
                                </Link>
                            </div>}
                        {currentUser.AccountType === 2 &&
                            <div className="text-center">
                                <Link to="/create">
                                    <button type="submit"
                                            className="btn btn-primary mt-2 px-5 w-100">Створити резюме
                                    </button>
                                </Link>
                                <Link to="/your-resume">
                                    <button type="submit"
                                            className="btn  btn-primary mt-2 px-5 w-100">Переглянути створене резюме
                                    </button>
                                </Link>
                                <Link to="/vacation-search">
                                    <button type="submit"
                                            className="btn btn-primary mt-2 px-5 w-100">Пошук вакансій
                                    </button>
                                </Link>
                            </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;