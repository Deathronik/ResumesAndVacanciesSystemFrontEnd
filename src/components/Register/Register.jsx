import React, {useEffect, useState} from 'react';
import "./Register.scss"
import {Link, Navigate} from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [accountType, setAccountType] = useState("1")
    const [companyName, setCompanyName] = useState("")
    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [birthDay, setBirthDay] = useState("")

    function onAccountTypeSelect(event) {
        setAccountType(event.target.value)
    }

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

    async function onHirerRegister() {
        if (companyName !== "" && userName !== "" && phoneNumber !== "" && userEmail !== "" && userPassword !== "") {
            let newObj = {
                CompanyName: companyName,
                Names: userName,
                PhoneNumber: phoneNumber,
                Email: userEmail,
                Password: userPassword
            }

            let response = await axios.post("https://localhost:44335/api/Hirer", newObj)
            if (response.status === 204) {
                alert("Успішно зареєстровано")
                window.location.href="/login";
            }
            else
                alert(`Помилка: ${response.status}`)
        } else {
            alert("Всі поля повинні бути заповнені")
        }
    }

    async function onWorkerRegister() {
        if (birthDay !== "" && userName !== "" && phoneNumber !== "" && userEmail !== "" && userPassword !== "") {
            let newObj = {
                Names: userName,
                PhoneNumber: phoneNumber,
                Email: userEmail,
                Password: userPassword,
                DateOfBirth: birthDay
            }

            let response = await axios.post("https://localhost:44335/api/Worker", newObj)
            if (response.status === 204) {
                alert("Успішно зареєстровано")
                window.location.href="/login";
            }
            else
                alert(`Помилка: ${response.status}`)
        } else {
            alert("Всі поля повинні бути заповнені")
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h2 className="text-center text-dark mt-5">Форма Реєстрації</h2>
                    <div className="text-center mb-5 text-dark">Система резюме та вакансій</div>
                    <div className="card my-5">
                        <div className="card-body cardbody-color p-lg-5">
                            <select onChange={event => onAccountTypeSelect(event)} className="form-select mb-3">
                                <option value="1">Наймач</option>
                                <option value="2">Працівник</option>
                            </select>
                            {accountType === "1" && <div>
                                <div className="mb-3">
                                    <input value={companyName} onChange={event => onCompanyNameChange(event)}
                                           type="text" className="form-control" id="company"
                                           placeholder="Назва вашої компанії"/>
                                </div>
                                <div className="mb-3">
                                    <input value={userName} onChange={event => onUserNameChange(event)} type="text"
                                           className="form-control" id="name"
                                           placeholder="Ваші ініціали"/>
                                </div>
                                <div className="mb-3">
                                    <input value={userEmail} onChange={event => onEmailChange(event)} type="text"
                                           className="form-control" id="email"
                                           placeholder="Пошта"/>
                                </div>
                                <div className="mb-3">
                                    <input value={phoneNumber} onChange={event => onPhoneNumberChange(event)}
                                           type="text" className="form-control" id="number"
                                           placeholder="Ваш номер телефону"/>
                                </div>
                                <div className="mb-3">
                                    <input value={userPassword} onChange={event => onPasswordChange(event)}
                                           type="password" className="form-control" id="password"
                                           placeholder="Пароль"/>
                                </div>
                                <div className="text-center">
                                    <button onClick={() => onHirerRegister()} type="submit"
                                            className="btn btn-color px-5 mb-5 w-100">Зареєструватися
                                    </button>
                                </div>
                            </div>}

                            {accountType === "2" && <div>
                                <div className="mb-3">
                                    <input value={userName} onChange={event => onUserNameChange(event)} type="text"
                                           className="form-control" id="name"
                                           placeholder="Ваші ініціали"/>
                                </div>
                                <div className="mb-3">
                                    <input value={userEmail} onChange={event => onEmailChange(event)} type="text"
                                           className="form-control" id="email"
                                           placeholder="Пошта"/>
                                </div>
                                <div className="mb-3">
                                    <input value={phoneNumber} onChange={event => onPhoneNumberChange(event)}
                                           type="text" className="form-control" id="number"
                                           placeholder="Ваш номер телефону"/>
                                </div>
                                <div className="mb-3">
                                    <input value={birthDay} onChange={event => onBirthDayChange(event)} type="text" className="form-control" id="birthday"
                                           placeholder="Дата народження (12.03.1986)"/>
                                </div>
                                <div className="mb-3">
                                    <input value={userPassword} onChange={event => onPasswordChange(event)}
                                           type="password" className="form-control" id="password"
                                           placeholder="Пароль"/>
                                </div>
                                <div className="text-center">
                                    <button onClick={onWorkerRegister} type="submit" className="btn btn-color px-5 mb-5 w-100">Зареєструватися
                                    </button>
                                </div>
                            </div>}

                            <div id="emailHelp" className="form-text text-center mb-5 text-dark">Вже маєте акаунт? <Link
                                to="/login" className="text-dark fw-bold"> Авторизуватися в акаунт</Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Register;